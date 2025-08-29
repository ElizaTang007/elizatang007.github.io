# 动态背景系统 (Dynamic Background System)

这个动态背景系统为你的网站添加了高级的视觉效果，包括浮动的粒子、渐变背景和现代化的毛玻璃效果。

## ✨ 特性

- **浮动粒子**: 50个优雅的浮动粒子，带有发光效果
- **渐变背景**: 动态的渐变背景，支持明暗主题
- **毛玻璃效果**: 现代化的毛玻璃效果，提升视觉层次
- **响应式设计**: 完全响应式，适配所有设备
- **性能优化**: 智能的性能优化，包括页面隐藏时暂停动画
- **无障碍支持**: 尊重用户的减少动画偏好设置
- **主题支持**: 自动检测并适配明暗主题
- **高度可定制**: 通过配置文件轻松自定义所有参数

## 🚀 快速开始

系统已经自动集成到你的网站中。刷新页面即可看到效果！

## ⚙️ 自定义配置

你可以通过修改 `assets/js/dynamic-background-config.js` 文件来自定义背景效果：

### 粒子设置
```javascript
particles: {
  count: 50,           // 粒子数量
  minSize: 1,          // 最小粒子尺寸
  maxSize: 4,          // 最大粒子尺寸
  opacity: 0.15,       // 粒子透明度
  glowIntensity: 0.3,  // 发光强度
  animationSpeed: 6,   // 动画速度
  movementSpeed: 0.5   // 移动速度
}
```

### 背景设置
```javascript
background: {
  primaryGradient: {
    start: '#667eea',   // 主渐变开始颜色
    end: '#764ba2'      // 主渐变结束颜色
  }
}
```

### 动画设置
```javascript
animations: {
  gradientShift: {
    duration: 20,       // 渐变变化持续时间
    easing: 'ease-in-out'
  }
}
```

## 🎨 预设主题

系统包含两个预设主题：

### 明亮主题 (Light)
- 蓝紫色渐变背景
- 半透明白色内容区域
- 柔和的阴影效果

### 暗色主题 (Dark)
- 深蓝灰色渐变背景
- 半透明深色内容区域
- 适合夜间浏览

## 🔧 运行时配置

你也可以在运行时动态更改配置：

```javascript
// 增加粒子数量
updateDynamicBackgroundConfig({
  particles: { count: 100 }
});

// 更改背景颜色
updateDynamicBackgroundConfig({
  background: {
    primaryGradient: {
      start: '#ff6b6b',
      end: '#4ecdc4'
    }
  }
});

// 调整动画速度
updateDynamicBackgroundConfig({
  animations: {
    gradientShift: { duration: 10 }
  }
});
```

## 📱 响应式特性

- 自动适配不同屏幕尺寸
- 移动设备上优化性能
- 触摸设备友好的动画

## ♿ 无障碍功能

- 自动检测用户的减少动画偏好
- 支持高对比度模式
- 键盘导航友好

## 🎯 性能优化

- 页面不可见时自动暂停动画
- 智能的帧率控制
- 优化的粒子渲染算法
- 内存使用优化

## 🛠️ 技术实现

- 纯JavaScript实现，无外部依赖
- CSS3动画和变换
- 现代浏览器API支持
- 模块化设计，易于维护

## 🔍 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📝 文件结构

```
assets/js/
├── dynamic-background-config.js    # 配置文件
└── dynamic-background.js           # 主要功能文件

_sass/
└── _animations.scss                # 样式文件

_includes/
└── scripts.html                    # 脚本引用
```

## 🎨 自定义样式

你可以通过修改 `_sass/_animations.scss` 文件来自定义CSS样式：

```scss
.dynamic-background {
  // 自定义背景样式
}

.particle {
  // 自定义粒子样式
}

.page__inner-wrap {
  // 自定义内容区域样式
}
```

## 🚫 禁用动态背景

如果你想禁用动态背景，可以在 `_includes/scripts.html` 中注释掉相关行：

```html
<!-- <script src="assets/js/dynamic-background-config.js"></script> -->
<!-- <script src="assets/js/dynamic-background.js"></script> -->
```

## 🤝 贡献

欢迎提交问题和改进建议！

## 📄 许可证

MIT License

---

享受你的新动态背景！ 🎉 