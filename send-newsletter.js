#!/usr/bin/env node

const axios = require('axios');

// 新闻邮件内容
const newsletterData = {
  title: "📰 Eliza Tang 研究动态 - 2025年1月",
  date: "2025年1月30日",
  content: `
    <h2 style="color: #0ea5e9; font-size: 20px; margin-bottom: 20px;">🔬 最新研究动态</h2>
    
    <div style="margin-bottom: 25px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 12px;">
      <h3 style="color: #0ea5e9; font-size: 16px; margin-bottom: 10px;">📊 偏好外部性研究进展</h3>
      <p style="line-height: 1.6; margin-bottom: 10px;">
        我们的偏好外部性研究在数字平台上的应用取得了重要进展。通过分析用户行为数据，
        我们发现社会信息对支付意愿的影响比预期更加显著，为平台优化提供了新的洞察。
      </p>
      <p style="font-size: 14px; color: #94a3b8;">
        📅 预计2025年3月完成论文初稿
      </p>
    </div>
    
    <div style="margin-bottom: 25px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 12px;">
      <h3 style="color: #0ea5e9; font-size: 16px; margin-bottom: 10px;">🤖 AI在金融预测中的应用</h3>
      <p style="line-height: 1.6; margin-bottom: 10px;">
        结合机器学习算法和金融理论，我们开发了新的市场波动性预测模型。
        该模型在Tesla、Microsoft等股票上的测试结果显示，预测准确率提升了15-20%。
      </p>
      <p style="font-size: 14px; color: #94a3b8;">
        📅 论文已提交至金融会议，等待审稿结果
      </p>
    </div>
    
    <div style="margin-bottom: 25px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 12px;">
      <h3 style="color: #0ea5e9; font-size: 16px; margin-bottom: 10px;">🚀 创业项目更新</h3>
      <p style="line-height: 1.6; margin-bottom: 10px;">
        YITA AVIATION项目在eVTOL技术方面取得突破，与深圳机场集团的合作进展顺利。
        同时，924生成式可见性引擎的用户数量持续增长，AI驱动的SEO优化效果显著。
      </p>
      <p style="font-size: 14px; color: #94a3b8;">
        📅 预计2025年Q2推出测试版本
      </p>
    </div>
    
    <div style="margin-bottom: 25px; padding: 20px; background: rgba(14,165,233,0.1); border-radius: 12px;">
      <h3 style="color: #0ea5e9; font-size: 16px; margin-bottom: 10px;">🎯 行业洞察</h3>
      <p style="line-height: 1.6; margin-bottom: 10px;">
        随着AI技术的快速发展，我们观察到几个重要趋势：
      </p>
      <ul style="list-style: none; padding: 0;">
        <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
          <span style="position: absolute; left: 0; color: #0ea5e9;">🔹</span>
          因果推断在AI决策中的重要性日益凸显
        </li>
        <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
          <span style="position: absolute; left: 0; color: #0ea5e9;">🔹</span>
          多模态数据融合成为研究热点
        </li>
        <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
          <span style="position: absolute; left: 0; color: #0ea5e9;">🔹</span>
          可解释AI在金融领域的应用前景广阔
        </li>
      </ul>
    </div>
    
    <div style="text-align: center; margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 12px;">
      <h3 style="color: #0ea5e9; font-size: 16px; margin-bottom: 15px;">📞 联系我们</h3>
      <p style="line-height: 1.6; margin-bottom: 15px;">
        如果您对我们的研究感兴趣，或者希望进行合作，欢迎随时联系：
      </p>
      <p style="margin-bottom: 10px;">
        <a href="mailto:tangyiting007@gmail.com" style="color: #0ea5e9; text-decoration: none;">
          📧 tangyiting007@gmail.com
        </a>
      </p>
      <p>
        <a href="https://linkedin.com/in/eliza-tang" style="color: #0ea5e9; text-decoration: none;">
          💼 LinkedIn: Eliza Tang
        </a>
      </p>
    </div>
  `
};

// 发送新闻邮件
async function sendNewsletter() {
  try {
    console.log('📧 开始发送新闻邮件...');
    
    const response = await axios.post('http://localhost:3000/api/send-newsletter', newsletterData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.data.success) {
      console.log('✅ 新闻邮件发送成功！');
      console.log(`📊 统计信息:`);
      console.log(`   - 总订阅者: ${response.data.total}`);
      console.log(`   - 发送成功: ${response.data.sent}`);
      console.log(`   - 发送失败: ${response.data.failed}`);
    } else {
      console.error('❌ 新闻邮件发送失败:', response.data.message);
    }
  } catch (error) {
    console.error('❌ 发送新闻邮件时出错:', error.message);
    if (error.response) {
      console.error('服务器响应:', error.response.data);
    }
  }
}

// 检查服务器是否运行
async function checkServer() {
  try {
    const response = await axios.get('http://localhost:3000/api/health');
    if (response.data.success) {
      console.log('✅ 服务器运行正常');
      return true;
    }
  } catch (error) {
    console.error('❌ 服务器未运行，请先启动服务器: node server.js');
    return false;
  }
}

// 主函数
async function main() {
  console.log('🚀 Eliza Tang 新闻邮件发送工具');
  console.log('================================');
  
  const serverRunning = await checkServer();
  if (serverRunning) {
    await sendNewsletter();
  }
}

// 运行主函数
main().catch(console.error);
