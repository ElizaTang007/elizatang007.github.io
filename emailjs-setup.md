# EmailJS 设置指南

## 🚀 快速设置（10分钟完成）

### 1. 注册EmailJS账户
1. 访问 https://www.emailjs.com
2. 点击 "Sign Up" 注册账户
3. 使用您的邮箱：`tangyiting007@gmail.com`

### 2. 创建邮件服务
1. 登录后进入 "Email Services"
2. 点击 "Add New Service"
3. 选择 "Gmail"
4. 连接您的Gmail账户
5. 复制 Service ID

### 3. 创建邮件模板
1. 进入 "Email Templates"
2. 点击 "Create New Template"
3. 设置模板内容：

**模板内容：**
```
Subject: New Subscription - {{subject}}

From: {{from_name}} ({{from_email}})
Date: {{date}}

Message:
{{message}}

Reply to: {{reply_to}}
```

4. 保存模板并复制 Template ID

### 4. 获取用户ID
1. 进入 "Account" > "General"
2. 复制 "User ID"

### 5. 更新网站代码
在 `index.html` 中替换：
- `service_eliza_tang` → 您的 Service ID
- `template_subscription` → 您的 Template ID  
- `YOUR_EMAILJS_USER_ID` → 您的 User ID

## 📧 数据管理

### 查看订阅者
- **邮箱通知**：每次订阅都会发送邮件到 `tangyiting007@gmail.com`
- **邮件内容**：包含订阅者的完整信息
- **回复功能**：可以直接回复邮件

### 优势
- ✅ **完全免费**：每月200封邮件免费
- ✅ **真实保存**：数据永久保存在邮箱中
- ✅ **可靠服务**：专业邮件服务
- ✅ **简单设置**：10分钟完成配置

## 🎯 测试步骤
1. 完成设置后保存代码
2. 推送到GitHub
3. 访问网站测试订阅
4. 检查邮箱是否收到通知
