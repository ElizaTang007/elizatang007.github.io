# 真实数据存储设置指南

## 🎯 推荐方案：使用Supabase（免费）

### 1. 创建Supabase项目
1. 访问 https://supabase.com
2. 注册账户（免费）
3. 创建新项目
4. 选择地区（推荐新加坡或日本）

### 2. 设置数据库表
在SQL编辑器中运行：

```sql
CREATE TABLE subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  interests TEXT,
  subscribe_date TIMESTAMP DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 3. 获取API密钥
1. 进入项目设置 > API
2. 复制以下信息：
   - Project URL
   - anon/public key

### 4. 更新网站代码
将以下信息替换到 `index.html` 中：
- `https://your-project.supabase.co` → 您的Project URL
- `YOUR_SUPABASE_ANON_KEY` → 您的anon key

## 🔄 替代方案

### 方案2：使用Airtable
1. 访问 https://airtable.com
2. 创建新base
3. 设置表格结构
4. 获取API密钥
5. 更新代码中的API端点

### 方案3：使用Google Sheets + Apps Script
1. 创建Google Sheets
2. 设置Apps Script
3. 部署为Web应用
4. 更新API端点

## 📊 数据管理
- **查看数据**：在Supabase仪表板中查看
- **导出数据**：支持CSV导出
- **API访问**：支持REST API查询
- **实时更新**：数据实时同步

## 💰 成本
- **Supabase**：免费额度充足（50,000行/月）
- **Airtable**：免费版1,200行
- **Google Sheets**：完全免费
