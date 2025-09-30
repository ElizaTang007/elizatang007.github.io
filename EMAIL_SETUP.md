# 邮件发送功能配置指南

## 📧 邮件服务配置

### 1. Gmail SMTP 配置

#### 步骤1：启用两步验证
1. 登录您的Gmail账户
2. 进入 [Google账户安全设置](https://myaccount.google.com/security)
3. 启用"两步验证"

#### 步骤2：生成应用密码
1. 在安全设置中找到"应用密码"
2. 选择"邮件"和"其他设备"
3. 生成16位应用密码（如：abcd efgh ijkl mnop）

#### 步骤3：配置环境变量
创建 `.env` 文件：
```bash
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-digit-app-password
PORT=3000
NODE_ENV=production
```

### 2. 其他邮件服务配置

#### Outlook/Hotmail
```javascript
const EMAIL_CONFIG = {
  service: 'hotmail',
  auth: {
    user: 'your-email@outlook.com',
    pass: 'your-password'
  }
};
```

#### 自定义SMTP
```javascript
const EMAIL_CONFIG = {
  host: 'smtp.your-provider.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@domain.com',
    pass: 'your-password'
  }
};
```

## 🚀 使用方法

### 1. 启动服务器
```bash
# 安装依赖
npm install

# 启动服务器
node server.js
```

### 2. 测试邮件发送
```bash
# 发送测试新闻邮件
node send-newsletter.js
```

### 3. API端点

#### 订阅邮箱
```bash
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

#### 发送新闻邮件
```bash
curl -X POST http://localhost:3000/api/send-newsletter \
  -H "Content-Type: application/json" \
  -d '{
    "title": "测试新闻",
    "content": "<h1>测试内容</h1>",
    "date": "2025-01-30"
  }'
```

## 📊 邮件模板

### 欢迎邮件模板
- 自动发送给新订阅者
- 包含个人信息和研究方向
- 说明订阅内容和联系方式

### 新闻邮件模板
- 可自定义标题和内容
- 支持HTML格式
- 包含取消订阅链接

## 🔧 故障排除

### 常见问题

#### 1. 认证失败
```
Error: Invalid login: 535-5.7.8 Username and Password not accepted
```
**解决方案**：
- 检查邮箱和密码是否正确
- 确保已启用两步验证
- 使用应用密码而非账户密码

#### 2. 连接超时
```
Error: Connection timeout
```
**解决方案**：
- 检查网络连接
- 确认SMTP服务器地址和端口
- 检查防火墙设置

#### 3. 邮件被标记为垃圾邮件
**解决方案**：
- 设置SPF记录
- 配置DKIM签名
- 使用专业的邮件服务

### 调试方法

#### 1. 启用详细日志
```javascript
const transporter = nodemailer.createTransporter({
  ...EMAIL_CONFIG,
  debug: true,
  logger: true
});
```

#### 2. 测试邮件发送
```javascript
// 测试邮件配置
transporter.verify((error, success) => {
  if (error) {
    console.log('邮件配置错误:', error);
  } else {
    console.log('邮件配置正确，可以发送邮件');
  }
});
```

## 📈 性能优化

### 1. 批量发送
- 使用队列系统处理大量邮件
- 限制并发发送数量
- 添加发送间隔

### 2. 错误处理
- 记录发送失败的邮件
- 实现重试机制
- 监控发送成功率

### 3. 监控和统计
- 跟踪邮件打开率
- 监控退订率
- 分析用户行为

## 🔒 安全考虑

### 1. 数据保护
- 加密存储订阅者信息
- 定期备份数据
- 遵守GDPR规定

### 2. 邮件安全
- 使用TLS加密
- 验证发件人身份
- 防止邮件伪造

### 3. 隐私保护
- 提供取消订阅选项
- 保护用户隐私
- 遵守反垃圾邮件法规

## 📞 技术支持

如有问题，请联系：
- 邮箱：tangyiting007@gmail.com
- GitHub：https://github.com/ElizaTang007
