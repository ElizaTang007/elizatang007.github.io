# EmailJS 邮件模板设置

## 📧 邮件模板内容

在EmailJS中创建模板时，使用以下内容：

### 主题 (Subject)
```
New Subscription - Eliza Tang Research
```

### 邮件内容 (Message)
```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 16px; background-color: #fff8f1; max-width: 600px; margin: auto; padding: 16px">
  
  <!-- Header -->
  <div style="text-align: center; margin-bottom: 24px; padding: 20px 0; border-bottom: 2px solid #0ea5e9;">
    <div style="font-size: 28px; font-weight: bold; color: #0ea5e9; font-family: 'JetBrains Mono', monospace;">
      Eliza Tang
    </div>
    <div style="font-size: 14px; color: #64748b; margin-top: 4px;">
      Research & Innovation
    </div>
  </div>

  <!-- Main Content -->
  <div style="background-color: white; padding: 24px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <h2 style="color: #0f172a; margin-bottom: 16px; font-size: 24px;">New Subscription Notification</h2>
    
    <p style="color: #475569; line-height: 1.6; margin-bottom: 16px;">
      A new subscriber has joined the Eliza Tang Research community!
    </p>

    <!-- Subscription Details -->
    <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #0ea5e9; margin: 20px 0;">
      <h3 style="color: #0f172a; margin-bottom: 12px; font-size: 18px;">Subscription Details</h3>
      <p style="margin: 8px 0; color: #475569;"><strong>Email:</strong> {{from_email}}</p>
      <p style="margin: 8px 0; color: #475569;"><strong>Name:</strong> {{from_name}}</p>
      <p style="margin: 8px 0; color: #475569;"><strong>Date:</strong> {{date}}</p>
      <p style="margin: 8px 0; color: #475569;"><strong>Interests:</strong> Research, Projects, Updates</p>
    </div>

    <!-- Action Button -->
    <div style="text-align: center; margin: 24px 0;">
      <a style="display: inline-block; text-decoration: none; outline: none; color: #fff; background: linear-gradient(135deg, #0ea5e9, #3b82f6); padding: 12px 24px; border-radius: 8px; font-weight: 600; box-shadow: 0 4px 12px rgba(14,165,233,0.3);" 
         href="{{website_link}}" target="_blank">
        Visit Website
      </a>
    </div>

    <!-- Support Information -->
    <div style="background-color: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 20px;">
      <p style="color: #475569; margin-bottom: 8px;">
        <strong>Need to contact the subscriber?</strong>
      </p>
      <p style="color: #475569; margin: 0;">
        Reply to this email or contact: 
        <a href="mailto:{{company_email}}" style="color: #0ea5e9; text-decoration: none;">{{company_email}}</a>
      </p>
    </div>
  </div>

  <!-- Footer -->
  <div style="text-align: center; margin-top: 24px; padding: 16px; color: #64748b; font-size: 14px;">
    <p style="margin: 0;">Best regards,<br />The {{company_name}} Team</p>
    <p style="margin: 8px 0 0 0;">
      <a href="{{website_link}}" style="color: #0ea5e9; text-decoration: none;">{{website_link}}</a>
    </p>
  </div>
</div>
```

## 🔧 模板变量说明

- `{{from_email}}` - 订阅者邮箱
- `{{from_name}}` - 订阅者姓名
- `{{date}}` - 订阅日期
- `{{website_link}}` - 网站链接
- `{{company_name}}` - 公司名称
- `{{company_email}}` - 公司邮箱

## 📝 设置步骤

1. 在EmailJS中创建新模板
2. 复制上述HTML内容到模板编辑器
3. 保存模板并复制Template ID
4. 更新网站代码中的Template ID
