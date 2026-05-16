# CLAUDE.md

## 项目定位

小丑牌（Balatro 风格）的 Web 单机版 V1.0.0，用于 AI 全流程开发教学演示。  
零依赖，所有逻辑集中在 `index.html` 一个文件里（HTML + CSS + JS 不拆分）。

## 目录约定

```
index.html      游戏主体，改代码只改这个文件
PRD.html        产品需求文档（只读，不改）
DESIGN.html     视觉设计规范（只读，参考颜色/间距变量）
```

## 核心规则（V1.0.0 范围）

- 52 张标准扑克，手牌 8 张，出牌上限 4 次，弃牌上限 3 次，目标分 300
- 10 种牌型，得分 = 基础分 × 倍率（见 PRD.html §③）
- **V1.0.0 不做**：小丑牌 / 增益系统 / 商店 / 动画 / 音效 / 多人

## 常用操作

```bash
# 本地预览
python3 -m http.server 8080

# 直接打开（字体可能走 cache）
open index.html
```

## 修改注意

- CSS 变量统一定义在 `:root` 里，改颜色只改变量
- 游戏状态全在 `gameState` 对象，不要散放全局变量
- 牌型判定逻辑在 `evaluateHand()` 函数
