const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// 订阅数据存储文件
const SUBSCRIBERS_FILE = 'subscribers.json';

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
app.post('/api/subscribe', (req, res) => {
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

// 健康检查端点
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  initSubscribersFile();
  console.log('Subscribers database initialized');
});

module.exports = app;
