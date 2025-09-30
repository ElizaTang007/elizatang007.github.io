# 邮件服务替代方案

## 1. Outlook/Hotmail SMTP
```javascript
const EMAIL_CONFIG = {
  service: 'hotmail',
  auth: {
    user: 'your-email@outlook.com',
    pass: 'your-password'
  }
};
```

## 2. QQ邮箱 SMTP
```javascript
const EMAIL_CONFIG = {
  host: 'smtp.qq.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@qq.com',
    pass: 'your-authorization-code'
  }
};
```

## 3. 163邮箱 SMTP
```javascript
const EMAIL_CONFIG = {
  host: 'smtp.163.com',
  port: 465,
  secure: true,
  auth: {
    user: 'your-email@163.com',
    pass: 'your-authorization-code'
  }
};
```

## 4. 专业邮件服务
- SendGrid
- Mailgun
- Amazon SES
- Sendinblue
