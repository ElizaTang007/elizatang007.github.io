# EmailJS 邮件模板设置

## 📧 邮件模板内容

在EmailJS中创建模板时，使用以下内容：

### 主题 (Subject)
```
Welcome to Eliza Tang's Research & Innovation Updates
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
    <h2 style="color: #0f172a; margin-bottom: 16px; font-size: 24px;">Welcome to Eliza Tang's Research & Innovation Updates</h2>
    
    <p style="color: #475569; line-height: 1.6; margin-bottom: 16px;">
      Thank you for subscribing to my website! I'm excited to share my journey with you — spanning causal machine learning, digital platforms, and urban air mobility.
    </p>

    <p style="color: #475569; line-height: 1.6; margin-bottom: 16px;">
      As a subscriber, you'll get:
    </p>

    <!-- Benefits List -->
    <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #0ea5e9; margin: 20px 0;">
      <p style="margin: 8px 0; color: #475569; font-size: 16px;">✦ Updates on my latest research papers and conference talks</p>
      <p style="margin: 8px 0; color: #475569; font-size: 16px;">✦ Insights from ongoing projects (INFORMS, IJRM, AI & UAM)</p>
      <p style="margin: 8px 0; color: #475569; font-size: 16px;">✦ Occasional notes on entrepreneurship and global initiatives (YITA Aviation, UNAA, IEEE WIE)</p>
    </div>

    <p style="color: #475569; line-height: 1.6; margin-bottom: 24px;">
      I believe in building bridges between academic rigor, entrepreneurial innovation, and global collaboration — and I look forward to keeping you part of that journey.
    </p>

    <!-- Action Button -->
    <div style="text-align: center; margin: 24px 0;">
      <a style="display: inline-block; text-decoration: none; outline: none; color: #fff; background: linear-gradient(135deg, #0ea5e9, #3b82f6); padding: 12px 24px; border-radius: 8px; font-weight: 600; box-shadow: 0 4px 12px rgba(14,165,233,0.3);" 
         href="https://elizatang007.github.io/" target="_blank">
        🔗 Visit Website
      </a>
    </div>

    <!-- Signature -->
    <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
      <p style="color: #475569; margin: 0; font-style: italic;">
        Warmly,<br />
        <strong style="color: #0f172a;">Eliza Yiting Tang</strong>
      </p>
    </div>
  </div>

  <!-- Footer -->
  <div style="text-align: center; margin-top: 24px; padding: 16px; color: #64748b; font-size: 14px;">
    <p style="margin: 0;">
      <a href="https://elizatang007.github.io/" style="color: #0ea5e9; text-decoration: none;">https://elizatang007.github.io/</a>
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
