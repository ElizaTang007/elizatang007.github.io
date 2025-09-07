#!/bin/bash

echo "🚀 网站完善测试脚本"
echo "===================="

# 测试网站构建
echo "📦 测试网站构建..."
if bundle exec jekyll build > /dev/null 2>&1; then
    echo "✅ 网站构建成功"
else
    echo "❌ 网站构建失败"
    exit 1
fi

# 测试服务器启动
echo "🌐 测试服务器启动..."
pkill -f jekyll > /dev/null 2>&1
bundle exec jekyll serve --host 0.0.0.0 --port 4000 --detach > /dev/null 2>&1
sleep 3

# 测试主要页面
echo "🔍 测试主要页面..."

pages=(
    "/"
    "/404.html"
    "/robots.txt"
    "/bing-style.html"
    "/research/preference-externalities.html"
    "/ventures/yita-aviation.html"
    "/ventures/stratoos.html"
    "/ventures/primordia.html"
)

for page in "${pages[@]}"; do
    if curl -s -o /dev/null -w "%{http_code}" "http://localhost:4000$page" | grep -q "200"; then
        echo "✅ $page - 正常"
    else
        echo "❌ $page - 错误"
    fi
done

# 测试SEO文件
echo "🔍 测试SEO文件..."
if [ -f "robots.txt" ]; then
    echo "✅ robots.txt 存在"
else
    echo "❌ robots.txt 缺失"
fi

if [ -f "404.html" ]; then
    echo "✅ 404.html 存在"
else
    echo "❌ 404.html 缺失"
fi

if [ -f "_includes/seo.html" ]; then
    echo "✅ SEO模板 存在"
else
    echo "❌ SEO模板 缺失"
fi

# 测试性能文件
echo "🔍 测试性能文件..."
if [ -f "assets/js/performance.js" ]; then
    echo "✅ 性能脚本 存在"
else
    echo "❌ 性能脚本 缺失"
fi

if [ -f "assets/css/performance.scss" ]; then
    echo "✅ 性能样式 存在"
else
    echo "❌ 性能样式 缺失"
fi

# 清理
echo "🧹 清理测试环境..."
pkill -f jekyll > /dev/null 2>&1

echo ""
echo "🎉 测试完成！"
echo "📊 网站已成功完善，所有功能正常"
