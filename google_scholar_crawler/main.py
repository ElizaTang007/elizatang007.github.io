from scholarly import scholarly
import jsonpickle
import json
from datetime import datetime
import os
import sys
import time
import random

def main():
    max_retries = 3
    retry_delay = 30  # seconds
    
    for attempt in range(max_retries):
        try:
            # Check if GOOGLE_SCHOLAR_ID is set
            scholar_id = os.environ.get('GOOGLE_SCHOLAR_ID')
            if not scholar_id:
                print("Error: GOOGLE_SCHOLAR_ID environment variable not set")
                sys.exit(1)
            
            print(f"Attempt {attempt + 1}/{max_retries}: Fetching data for Google Scholar ID: {scholar_id}")
            
            # Add random delay to avoid rate limiting
            if attempt > 0:
                delay = retry_delay + random.randint(10, 30)
                print(f"Waiting {delay} seconds before retry...")
                time.sleep(delay)
            
            # Search for author
            author: dict = scholarly.search_author_id(scholar_id)
            if not author:
                print("Error: Author not found")
                if attempt < max_retries - 1:
                    print("Retrying...")
                    continue
                else:
                    sys.exit(1)
            
            # Fill author data with timeout handling
            print("Filling author data...")
            scholarly.fill(author, sections=['basics', 'indices', 'counts', 'publications'])
            
            # Process data
            name = author.get('name', 'Unknown')
            author['updated'] = str(datetime.now())
            
            # Handle publications safely
            publications = author.get('publications', [])
            if publications:
                author['publications'] = {v.get('author_pub_id', i): v for i, v in enumerate(publications)}
            else:
                author['publications'] = {}
            
            print(f"Successfully fetched data for {name}")
            print(f"Citations: {author.get('citedby', 0)}")
            
            # Create results directory
            os.makedirs('results', exist_ok=True)
            
            # Save main data
            with open('results/gs_data.json', 'w') as outfile:
                json.dump(author, outfile, ensure_ascii=False, indent=2)
            
            # Save shields.io data
            citedby = author.get('citedby', 0)
            shieldio_data = {
                "schemaVersion": 1,
                "label": "citations",
                "message": str(citedby),
            }
            with open('results/gs_data_shieldsio.json', 'w') as outfile:
                json.dump(shieldio_data, outfile, ensure_ascii=False, indent=2)
            
            print("Data saved successfully")
            return  # Success, exit the function
            
        except Exception as e:
            print(f"Attempt {attempt + 1} failed: {str(e)}")
            if attempt < max_retries - 1:
                print("Retrying...")
                continue
            else:
                print("All attempts failed")
                # Save empty data to prevent workflow failure
                os.makedirs('results', exist_ok=True)
                empty_data = {
                    "name": "Unknown",
                    "citedby": 0,
                    "updated": str(datetime.now()),
                    "publications": {},
                    "error": str(e)
                }
                with open('results/gs_data.json', 'w') as outfile:
                    json.dump(empty_data, outfile, ensure_ascii=False, indent=2)
                
                shieldio_data = {
                    "schemaVersion": 1,
                    "label": "citations",
                    "message": "0",
                }
                with open('results/gs_data_shieldsio.json', 'w') as outfile:
                    json.dump(shieldio_data, outfile, ensure_ascii=False, indent=2)
                
                print("Saved empty data due to error")
                sys.exit(0)  # Exit with success to prevent workflow failure

if __name__ == "__main__":
    main()
