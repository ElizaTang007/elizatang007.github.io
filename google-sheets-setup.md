# Google Sheets 订阅数据存储设置

## 📊 设置步骤

### 1. 创建Google Sheets
1. 访问 https://sheets.google.com
2. 创建新的电子表格
3. 命名为 "Eliza Tang Subscribers"
4. 设置列标题：
   - A列：Email
   - B列：Name  
   - C列：Interests
   - D列：Subscribe Date
   - E列：Status

### 2. 设置Google Apps Script
1. 在Google Sheets中，点击 "扩展程序" > "Apps Script"
2. 删除默认代码，粘贴以下代码：

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSheet();
    
    sheet.appendRow([
      data.email,
      data.name || '',
      data.interests || '',
      new Date().toISOString(),
      'Active'
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### 3. 部署为Web应用
1. 点击 "部署" > "新建部署"
2. 类型选择 "Web应用"
3. 执行身份选择 "我"
4. 访问权限选择 "任何人"
5. 点击 "部署"
6. 复制Web应用URL

### 4. 更新网站代码
将Web应用URL替换到index.html中的API端点

## 🎯 优势
- ✅ 免费使用
- ✅ 数据永久保存
- ✅ 易于查看和管理
- ✅ 支持导出数据
- ✅ 实时更新
