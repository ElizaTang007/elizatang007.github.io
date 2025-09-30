# Supabase 在线数据库设置指南

## 🚀 快速设置（10分钟完成）

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
  interests TEXT[],
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
在 `index.html` 中替换：
- `https://your-project.supabase.co` → 您的Project URL
- `YOUR_SUPABASE_ANON_KEY` → 您的anon key

## 📊 数据管理

### 查看订阅者
- **Supabase仪表板**：在线查看所有数据
- **实时更新**：数据实时同步
- **导出功能**：支持CSV导出
- **API访问**：支持REST API查询

### 优势
- ✅ **完全免费**：免费额度充足（50,000行/月）
- ✅ **在线存储**：数据永久保存
- ✅ **实时同步**：数据实时更新
- ✅ **简单设置**：10分钟完成配置

## 🎯 测试步骤
1. 完成设置后保存代码
2. 推送到GitHub
3. 访问网站测试订阅
4. 在Supabase仪表板中查看数据
