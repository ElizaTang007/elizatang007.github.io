const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// 订阅数据存储文件
const SUBSCRIBERS_FILE = 'subscribers.json';

// 邮件配置
const EMAIL_CONFIG = {
  // 使用Gmail SMTP (需要应用密码)
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
};

// 创建邮件传输器
const transporter = nodemailer.createTransport(EMAIL_CONFIG);

// 发送订阅成功邮件
async function sendWelcomeEmail(email, name = '') {
  const mailOptions = {
    from: EMAIL_CONFIG.auth.user,
    to: email,
    subject: '🎉 欢迎订阅 Eliza Tang 的研究动态！',
    html: `
      <div style="font-family: 'JetBrains Mono', 'Noto Sans SC', monospace; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%); color: #e2e8f0;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #0ea5e9; font-size: 28px; margin-bottom: 10px;">欢迎订阅！</h1>
          <p style="font-size: 16px; opacity: 0.9;">感谢您订阅 Eliza Tang 的研究动态</p>
        </div>
        
        <div style="background: rgba(255,255,255,0.08); border-radius: 16px; padding: 30px; margin-bottom: 20px;">
          <h2 style="color: #0ea5e9; font-size: 20px; margin-bottom: 15px;">📚 您将收到的内容</h2>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 10px; padding-left: 20px; position: relative;">
              <span style="position: absolute; left: 0; color: #0ea5e9;">🔬</span>
              最新研究论文和学术成果
            </li>
            <li style="margin-bottom: 10px; padding-left: 20px; position: relative;">
              <span style="position: absolute; left: 0; color: #0ea5e9;">💼</span>
              创业项目和商业动态
            </li>
            <li style="margin-bottom: 10px; padding-left: 20px; position: relative;">
              <span style="position: absolute; left: 0; color: #0ea5e9;">🎯</span>
              行业洞察和技术趋势
            </li>
            <li style="margin-bottom: 10px; padding-left: 20px; position: relative;">
              <span style="position: absolute; left: 0; color: #0ea5e9;">📈</span>
              个人成长和职业发展分享
            </li>
          </ul>
        </div>
        
        <div style="background: rgba(14,165,233,0.1); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <h3 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">🌟 关于 Eliza Tang</h3>
          <p style="line-height: 1.6; margin-bottom: 10px;">
            悉尼大学计量经济学与软件开发学士，专注于因果推断、教育经济学和AI传播研究。
            现任Google数据分析师，在AI投资研究、数字平台研究等领域有丰富经验。
          </p>
          <p style="line-height: 1.6;">
            致力于将学术研究与实际应用相结合，推动AI技术在各个领域的创新应用。
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="font-size: 14px; opacity: 0.8; margin-bottom: 10px;">
            如有任何问题，请随时联系：
          </p>
          <p style="margin-bottom: 20px;">
            <a href="mailto:tangyiting007@gmail.com" style="color: #0ea5e9; text-decoration: none;">
              📧 tangyiting007@gmail.com
            </a>
          </p>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
            <p style="font-size: 12px; opacity: 0.6;">
              如果您不希望收到这些邮件，可以随时取消订阅。
            </p>
          </div>
        </div>
      </div>
    `
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to: ${email}`);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
}

// 发送定期新闻邮件
async function sendNewsletterEmail(subscriber, newsletterData) {
  const mailOptions = {
    from: EMAIL_CONFIG.auth.user,
    to: subscriber.email,
    subject: `📰 ${newsletterData.title}`,
    html: `
      <div style="font-family: 'JetBrains Mono', 'Noto Sans SC', monospace; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%); color: #e2e8f0;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #0ea5e9; font-size: 24px; margin-bottom: 10px;">${newsletterData.title}</h1>
          <p style="font-size: 14px; opacity: 0.8;">${newsletterData.date}</p>
        </div>
        
        <div style="background: rgba(255,255,255,0.08); border-radius: 16px; padding: 30px; margin-bottom: 20px;">
          ${newsletterData.content}
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
          <p style="font-size: 12px; opacity: 0.6;">
            此邮件发送给订阅用户。如需取消订阅，请回复此邮件。
          </p>
        </div>
      </div>
    `
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Newsletter sent to: ${subscriber.email}`);
    return true;
  } catch (error) {
    console.error('Error sending newsletter:', error);
    return false;
  }
}

// 初始化订阅者数据文件
function initSubscribersFile() {
  if (!fs.existsSync(SUBSCRIBERS_FILE)) {
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify({
      subscribers: [],
      lastUpdated: new Date().toISOString()
    }, null, 2));
  }
}

// 读取订阅者数据
function getSubscribers() {
  try {
    const data = fs.readFileSync(SUBSCRIBERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading subscribers file:', error);
    return { subscribers: [], lastUpdated: new Date().toISOString() };
  }
}

// 保存订阅者数据
function saveSubscribers(data) {
  try {
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving subscribers file:', error);
    return false;
  }
}

// 订阅API端点
app.post('/api/subscribe', async (req, res) => {
  const { email, name, interests } = req.body;
  
  // 验证邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid email address' 
    });
  }
  
  try {
    const data = getSubscribers();
    
    // 检查是否已经订阅
    const existingSubscriber = data.subscribers.find(sub => sub.email === email);
    if (existingSubscriber) {
      return res.status(409).json({ 
        success: false, 
        message: 'Email already subscribed' 
      });
    }
    
    // 添加新订阅者
    const newSubscriber = {
      id: Date.now().toString(),
      email: email,
      name: name || '',
      interests: interests || [],
      subscribedAt: new Date().toISOString(),
      status: 'active'
    };
    
    data.subscribers.push(newSubscriber);
    data.lastUpdated = new Date().toISOString();
    
    if (saveSubscribers(data)) {
      console.log(`New subscriber: ${email}`);
      
      // 发送欢迎邮件
      try {
        await sendWelcomeEmail(email, name);
      } catch (error) {
        console.error('Failed to send welcome email:', error);
        // 即使邮件发送失败，订阅仍然成功
      }
      
      res.json({ 
        success: true, 
        message: 'Successfully subscribed!',
        subscriber: newSubscriber
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to save subscription' 
      });
    }
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// 获取订阅者列表API（仅用于管理）
app.get('/api/subscribers', (req, res) => {
  try {
    const data = getSubscribers();
    res.json({
      success: true,
      count: data.subscribers.length,
      subscribers: data.subscribers,
      lastUpdated: data.lastUpdated
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch subscribers' 
    });
  }
});

// 取消订阅API
app.post('/api/unsubscribe', (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email is required' 
    });
  }
  
  try {
    const data = getSubscribers();
    const subscriberIndex = data.subscribers.findIndex(sub => sub.email === email);
    
    if (subscriberIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Email not found in subscribers' 
      });
    }
    
    // 标记为取消订阅
    data.subscribers[subscriberIndex].status = 'unsubscribed';
    data.subscribers[subscriberIndex].unsubscribedAt = new Date().toISOString();
    data.lastUpdated = new Date().toISOString();
    
    if (saveSubscribers(data)) {
      res.json({ 
        success: true, 
        message: 'Successfully unsubscribed' 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to update subscription' 
      });
    }
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// 发送新闻邮件API
app.post('/api/send-newsletter', async (req, res) => {
  const { title, content, date } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ 
      success: false, 
      message: 'Title and content are required' 
    });
  }
  
  try {
    const data = getSubscribers();
    const activeSubscribers = data.subscribers.filter(sub => sub.status === 'active');
    
    if (activeSubscribers.length === 0) {
      return res.json({ 
        success: true, 
        message: 'No active subscribers found',
        sent: 0
      });
    }
    
    const newsletterData = {
      title: title,
      content: content,
      date: date || new Date().toLocaleDateString('zh-CN')
    };
    
    let successCount = 0;
    let failCount = 0;
    
    // 发送邮件给所有活跃订阅者
    for (const subscriber of activeSubscribers) {
      try {
        await sendNewsletterEmail(subscriber, newsletterData);
        successCount++;
      } catch (error) {
        console.error(`Failed to send newsletter to ${subscriber.email}:`, error);
        failCount++;
      }
    }
    
    res.json({ 
      success: true, 
      message: `Newsletter sent successfully`,
      total: activeSubscribers.length,
      sent: successCount,
      failed: failCount
    });
  } catch (error) {
    console.error('Newsletter sending error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// 健康检查端点
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 管理界面 - 只有本地访问
app.get('/admin', (req, res) => {
  // 检查是否为本地访问
  const clientIP = req.ip || req.connection.remoteAddress;
  const isLocalhost = clientIP === '127.0.0.1' || clientIP === '::1' || clientIP === '::ffff:127.0.0.1';
  
  if (!isLocalhost) {
    return res.status(403).send('Access denied. This page is only available locally.');
  }
  
  // 返回管理界面HTML
  const adminHTML = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>订阅者管理 - Eliza Tang</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'JetBrains Mono', 'Noto Sans SC', monospace;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
            color: #e2e8f0;
            line-height: 1.6;
            min-height: 100vh;
            padding: 2rem;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .header {
            text-align: center;
            margin-bottom: 3rem;
        }
        
        .header h1 {
            color: #0ea5e9;
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
        
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-bottom: 3rem;
        }
        
        .stat-card {
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 16px;
            padding: 2rem;
            text-align: center;
        }
        
        .stat-number {
            font-size: 2.5rem;
            font-weight: bold;
            color: #0ea5e9;
            margin-bottom: 0.5rem;
        }
        
        .stat-label {
            color: #94a3b8;
            font-size: 0.9rem;
        }
        
        .subscribers-table {
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 16px;
            overflow: hidden;
        }
        
        .table-header {
            background: rgba(14,165,233,0.1);
            padding: 1.5rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        
        .table-header h2 {
            color: #0ea5e9;
            font-size: 1.5rem;
        }
        
        .subscriber-item {
            padding: 1.5rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            display: grid;
            grid-template-columns: 1fr 1fr 1fr auto;
            gap: 1rem;
            align-items: center;
        }
        
        .subscriber-item:last-child {
            border-bottom: none;
        }
        
        .subscriber-email {
            font-weight: 600;
            color: #e2e8f0;
        }
        
        .subscriber-name {
            color: #94a3b8;
        }
        
        .subscriber-date {
            color: #64748b;
            font-size: 0.9rem;
        }
        
        .subscriber-status {
            background: rgba(34,197,94,0.2);
            color: #22c55e;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        .refresh-btn {
            background: linear-gradient(135deg, rgba(14,165,233,.9), rgba(99,102,241,.85));
            border: none;
            color: white;
            padding: 0.8rem 1.5rem;
            border-radius: 12px;
            font-family: 'JetBrains Mono', 'Noto Sans SC', monospace;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-bottom: 2rem;
        }
        
        .refresh-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(14,165,233,.4);
        }
        
        .loading {
            text-align: center;
            padding: 2rem;
            color: #94a3b8;
        }
        
        .error {
            background: rgba(239,68,68,0.1);
            border: 1px solid rgba(239,68,68,0.3);
            color: #fca5a5;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 2rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📧 订阅者管理</h1>
            <p>Eliza Tang 个人网站订阅者数据</p>
        </div>
        
        <button class="refresh-btn" onclick="loadSubscribers()">🔄 刷新数据</button>
        
        <div id="loading" class="loading">
            <p>正在加载订阅者数据...</p>
        </div>
        
        <div id="error" class="error" style="display: none;">
            <p>❌ 加载数据失败，请检查服务器是否运行</p>
        </div>
        
        <div id="stats" class="stats" style="display: none;">
            <div class="stat-card">
                <div class="stat-number" id="totalSubscribers">0</div>
                <div class="stat-label">总订阅者</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="activeSubscribers">0</div>
                <div class="stat-label">活跃订阅者</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="todaySubscribers">0</div>
                <div class="stat-label">今日新增</div>
            </div>
        </div>
        
        <div id="subscribers" class="subscribers-table" style="display: none;">
            <div class="table-header">
                <h2>📋 订阅者列表</h2>
            </div>
            <div id="subscribersList"></div>
        </div>
    </div>

    <script>
        async function loadSubscribers() {
            const loading = document.getElementById('loading');
            const error = document.getElementById('error');
            const stats = document.getElementById('stats');
            const subscribers = document.getElementById('subscribers');
            
            loading.style.display = 'block';
            error.style.display = 'none';
            stats.style.display = 'none';
            subscribers.style.display = 'none';
            
            try {
                const response = await fetch('/api/subscribers');
                const data = await response.json();
                
                if (data.success) {
                    displaySubscribers(data);
                } else {
                    throw new Error(data.message);
                }
            } catch (err) {
                console.error('Error loading subscribers:', err);
                loading.style.display = 'none';
                error.style.display = 'block';
            }
        }
        
        function displaySubscribers(data) {
            const loading = document.getElementById('loading');
            const stats = document.getElementById('stats');
            const subscribers = document.getElementById('subscribers');
            const subscribersList = document.getElementById('subscribersList');
            
            loading.style.display = 'none';
            stats.style.display = 'grid';
            subscribers.style.display = 'block';
            
            // 更新统计信息
            document.getElementById('totalSubscribers').textContent = data.count;
            document.getElementById('activeSubscribers').textContent = 
                data.subscribers.filter(sub => sub.status === 'active').length;
            
            // 计算今日新增
            const today = new Date().toDateString();
            const todaySubscribers = data.subscribers.filter(sub => 
                new Date(sub.subscribedAt).toDateString() === today
            ).length;
            document.getElementById('todaySubscribers').textContent = todaySubscribers;
            
            // 显示订阅者列表
            subscribersList.innerHTML = data.subscribers.map(subscriber => \`
                <div class="subscriber-item">
                    <div class="subscriber-email">\${subscriber.email}</div>
                    <div class="subscriber-name">\${subscriber.name || '未填写姓名'}</div>
                    <div class="subscriber-date">\${new Date(subscriber.subscribedAt).toLocaleString('zh-CN')}</div>
                    <div class="subscriber-status">\${subscriber.status === 'active' ? '活跃' : '已取消'}</div>
                </div>
            \`).join('');
        }
        
        // 页面加载时自动获取数据
        document.addEventListener('DOMContentLoaded', loadSubscribers);
    </script>
</body>
</html>
  `;
  
  res.send(adminHTML);
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  initSubscribersFile();
  console.log('Subscribers database initialized');
});

module.exports = app;
