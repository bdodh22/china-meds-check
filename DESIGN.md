# Design System: ChinaMedsCheck (Customs Medication Compliance Radar)
**Version:** 2.0 (Stitch & Emil Kowalski Enhanced)
**Design Philosophy:** Authoritative Customs Intelligence, Clinical Clarity & Kinetic Physicality

---

## 1. Visual Theme & Atmosphere (视觉主题与氛围)

ChinaMedsCheck 是面向国际差旅人士、跨国商务、外籍就医群体的权威海关药物合规雷达。
整体设计秉持 **"Quiet Authority with Tactical Kinetic Precision"（内敛权威与战术级精准触感）**：
* **Atmosphere:** 清澈（Crystalline）、严肃权威（Authoritative）、科技感微呼吸（Subtle Living Pulse），杜绝花哨杂乱。
* **Density:** 结构紧凑有序，遵循严格的 8px 空间律动（8px Spacing Grid System）。
* **Materiality:** 磨砂玻璃（Frosted Glass Backdrop Blur）、1px 极细微雕边框（Precision 1px Hairlines）、多层柔和环境光漫射（Whisper-soft Ambient Diffused Shadows）。

---

## 2. Color Palette & Semantic Roles (语义化色彩体系)

### Core Brand & Surfaces (基础基底与层叠色)
* **Canvas Snow (#FFFFFF / #F8FAFC):** 60% 呼吸背景，提供绝对清晰的阅读视野。
* **Federal Slate-Navy (#0B132B / #0F172A):** 代表国家海关与法律体系的权威色，用于大标题、夜幕渐变及高价值卡片背景。
* **Muted Horizon (#F1F5F9 / #E2E8F0):** 30% 辅助结构层叠色，用于次级卡片背景与内联分隔线。
* **Hairline Platinum (#E2E8F0 / #CBD5E1):** 精确的 1px 容器边界，替代粗笨黑线。

### Functional & Regulatory Spectrum (海关合规红绿光谱)
* **Inspection Emerald (#059669 / #10B981):**
  * *Role:* 中国海关绿色无申报通道（Green Channel）、个人合理用量全合规准入。
  * *Values:* 50: `#ecfdf5`, 100: `#d1fae5`, 200: `#a7f3d0`, 600: `#059669`, 700: `#047857`.
* **Caution Amber (#D97706 / #F59E0B):**
  * *Role:* 先期机检黄色锁封警示、需医生双语诊断书证明、7-15天受限管制类处方。
  * *Values:* 50: `#fffbeb`, 100: `#fef3c7`, 200: `#fde68a`, 600: `#d97706`, 700: `#b45309`.
* **Prohibited Crimson (#DC2626 / #EF4444):**
  * *Role:* 海关红线绝对严禁物质（冰毒/阿片/安非他命/大麻素）、红线拦截阻断弹窗。
  * *Values:* 50: `#fef2f2`, 100: `#fee2e2`, 200: `#fecaca`, 600: `#dc2626`, 700: `#b91c1c`.
* **Radar Cerulean (#2563EB / #3B82F6):**
  * *Role:* 核心雷达扫描聚焦、首要行动点（Primary CTA）、算法计算器。
  * *Values:* 50: `#eff6ff`, 100: `#dbeafe`, 200: `#bfdbfe`, 600: `#2563eb`, 700: `#1d4ed8`.
* **Imperial Purple (#7C3AED / #8B5CF6):**
  * *Role:* 双语海关申报单（Customs Declaration Card）、官方入境关员提示。

---

## 3. Typography Scale & Rhythms (排版排阶与排版防线)

* **Font Stack:** 
  西文优先 Inter / SF Pro / Apple-system，东亚与东南亚语言隔离（日语 Hiragino Kaku Gothic ProN，韩语 Apple SD Gothic Neo，越南语标准 Latin Extended 字体）。
* **Hero H1 Title:** `text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12]`（配合负字距增加紧凑科技感）。
* **Section Header H2:** `text-2xl sm:text-3xl font-black tracking-tight text-slate-900`。
* **Component Card Header H3:** `text-lg sm:text-xl font-extrabold text-slate-900`。
* **Body Text:** `text-sm sm:text-base text-slate-600 leading-relaxed`。
* **Badges & Pills:** `text-[11px] sm:text-xs font-bold shrink-0 whitespace-nowrap`，严禁整句直译塞入小徽章。

---

## 4. Depth, Shadows & Elevation (深度阴影与环境光漫射)

* **Elevation 0 (Flat Ground):** `bg-white` / `bg-slate-50`，无阴影，用于主视图画布。
* **Elevation 1 (Quiet Resting Card):**
  `border border-slate-200/80 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)]`，宁静的静止卡片。
* **Elevation 2 (Floating Interaction):**
  `hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-slate-300/90`，具备空气浮力的悬停态。
* **Elevation 3 (Floating HUD / Modal):**
  `shadow-[0_24px_64px_-12px_rgba(0,0,0,0.18)] backdrop-blur-xl bg-white/95 border border-slate-200/90`，用于全屏红线拦截模态框与固定吸底栏。
* **Ambient Glow (Backlight Reflex):**
  针对核心 Bento 工具卡，使用 `bg-blue-500/10`、`bg-emerald-500/10`、`bg-purple-500/10` 大圆径高斯模糊发光层作为背景底衬。

---

## 5. Kinetic Micro-interactions (Emil Kowalski 物理动效法则)

1. **按钮物理按压感 (Kinetic Spring):**
   * 默认：`transition-all duration-200 ease-out`
   * 悬浮：`hover:-translate-y-0.5 hover:shadow-md`
   * 按下：`active:scale-[0.98]`
2. **搜索框微聚焦 (Breath Focus):**
   * 杜绝使用刺眼的 `border-2 border-black`；
   * 统一采用 `border-slate-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)]`。
3. **标签与筛选器 (Interactive Pills):**
   * 状态切换带有轻盈的微缩反弹，平滑背景颜色渐变。

---

## 6. Multi-Language Anti-Slop (多语言防自嗨设计规范)

* **一语言一完整块**：任何非英语语言页面绝对禁止穿插未经翻译的英文。
* **防暴流抗撕裂**：所有 Badge/Pill 强制添加 `shrink-0 whitespace-nowrap`，左右排列容器强制添加 `gap-2`。
* **零断行撕裂**：弹性容器杜绝固定宽度，按钮与卡片采用自适应内边距与 `min-w` 保护。
