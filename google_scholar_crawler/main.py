from scholarly import scholarly
import jsonpickle
import json
from datetime import datetime
import os
import sys

def main():
    try:
        # Check if GOOGLE_SCHOLAR_ID is set
        scholar_id = os.environ.get('GOOGLE_SCHOLAR_ID')
        if not scholar_id:
            print("Error: GOOGLE_SCHOLAR_ID environment variable not set")
            sys.exit(1)
        
        print(f"Fetching data for Google Scholar ID: {scholar_id}")
        
        # Search for author
        author: dict = scholarly.search_author_id(scholar_id)
        if not author:
            print("Error: Author not found")
            sys.exit(1)
        
        # Fill author data
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
        print(json.dumps(author, indent=2))
        
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
        
    except Exception as e:
        print(f"Error: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()
