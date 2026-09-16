---
name: ui-ux-design
description: >-
  Design and review modern, high-converting UI/UX for foreign trade and independent web applications using Tailwind CSS, Next.js, and modern design systems.
  Enforces visual hierarchy, 8px grid spacing rhythm, micro-interactions, CRO (Conversion Rate Optimization) trust patterns, and mobile-first responsive architecture.
  Activate when writing new UI components, designing landing pages, refactoring layouts, or reviewing aesthetic and interaction quality.
---

# 独立外贸与高转化网站 UI/UX 设计技能 (ui-ux-design)

本技能为 Agent 注入世界级数字产品（如 Stripe、Linear、Apple、Vercel）的设计审美标准，以及针对**海外独立站、外贸站、垂直工具站**的转化率优化（CRO）设计模式。

---

## 1. 核心设计原则 (Design Philosophy)

1. **拒绝“程序员审美”**：
   * 严禁无层次的大色块堆砌，杜绝未调色的纯黑（`#000000`）与刺眼的高饱和度原色。
   * 严禁边框过重（杜绝使用 `border-2 border-black` 或深色硬边线）。
   * 严禁内容过紧密拥挤，保证呼吸感与留白节奏。
2. **现代极简与高级质感 (Craftsmanship)**：
   * 采用微渐变底色、精致的 1px 细边框（`border-slate-200/80 dark:border-slate-800`）、柔和的多层环境光阴影（`shadow-sm hover:shadow-md`）。
   * 交互具有物理弹性与触感（微位移、平滑颜色过渡）。
3. **转化率优先 (CRO First)**：
   * 页面必须有极其清晰的**单一视觉焦点**（Visual Anchor），用户一眼能看清核心行动点（Primary CTA）。
   * 到处布局权威背书、安全合规提示与用户信任要素（Trust Signals）。

---

## 2. 视觉规范与排版律动 (8px Grid & Typography)

### 间距与布局节奏
严格遵循 8px 网格缩放体系，保证模块层级清晰：
* **容器内边距**：卡片内部统一采用 `p-5 sm:p-6 lg:p-8`。
* **卡片/元素间距**：列表项间距 `space-y-3` 或 `gap-3`；功能区块之间使用 `gap-6` 或 `gap-8`；页面大 Section 间距采用 `my-16 sm:my-24`。
* **圆角规范**：统一使用大圆角体系（输入框 `rounded-xl`、卡片与模态框 `rounded-2xl` 或 `rounded-3xl`），营造亲和力与现代感。

### 字体排阶 (Type Scale)
* **Hero 核心主标题**：`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900`（外贸英文站推荐配合负字偶间距 `tracking-tight`，质感倍增）。
* **Section 次标题**：`text-xl sm:text-2xl font-extrabold text-slate-900`。
* **正文说明**：`text-sm sm:text-base text-slate-600 leading-relaxed`（正文必须使用 `leading-relaxed` 保持行距舒适）。
* **标签与辅助信息**：`text-xs font-semibold text-slate-500 uppercase tracking-wider`。

### 60-30-10 色彩平衡法
* **60% 背景基底色**：大面积使用 `bg-white` 或 `bg-slate-50/50`。
* **30% 结构层叠色**：纯白卡片背景 `bg-white`、微深边框 `border-slate-200`、次要图标容器 `bg-slate-100`。
* **10% 品牌提亮点**：整个视口只允许有 1~2 个主色（如品牌蓝 `bg-blue-600 hover:bg-blue-500 text-white` 或祖母绿 `bg-emerald-600`），确保主操作按钮具有绝对吸引力。

---

## 3. 微动效与触感 (Micro-Interactions)

所有交互元素禁止生硬切换，必须配置微交互：
1. **主行动按钮**：
   ```tsx
   className="px-5 py-3 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
   ```
2. **可点击卡片**：
   ```tsx
   className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
   ```
3. **折叠展开 (Accordion)**：
   ```tsx
   className="group-open:rotate-180 transition-transform duration-200 ease-out"
   ```
4. **加载状态骨架屏**：
   ```tsx
   className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded-lg"
   ```

---

## 4. 独立站高转化组件库 (CRO Patterns)

在构建独立外贸站时，必须常态化融入以下设计模式：

*   **信任背书徽章 (Trust Pill)**：在主标题上方提供最新政策或机构背书：
    `[2025 China Customs & GACC Official Compliance Radar]`
*   **双核 CTA (Dual CTA)**：主操作按钮（高对比深色/亮色）+ 次操作幽灵按钮（边框轻质感或带箭头的文字链接）。
*   **移动端吸底操作栏 (Sticky Mobile CTA)**：
    当用户在手机端浏览长页面（如海关政策指南或药品详情）时，屏幕底部始终固定一个轻巧的快捷操作条，保障 100% 转化触达。
*   **双语 / 术语标识卡 (Chemical / Translation Pill)**：
    对于涉外专业词汇，将通用名、CAS号、中文名以精致的微胶囊标签（`font-mono text-xs px-2.5 py-1 rounded-md`）分组呈现，增强权威度。

---

## 5. 多语言排版物理防线与字体抗撕裂 (Layout Elasticity & Anti-Tearing)

出海独立站面临多语种排版挑战（越南语/德语/俄语长度为英语 1.5~2.5 倍），UI 必须具备物理弹性：

1. **容器防暴流护身符**：
   * **所有 Flex 容器中的 Badge/Pill/Tag 必须加 `shrink-0 whitespace-nowrap`**，左右两端对齐容器必须加 `gap-2`，防止文本折行成单个字母或挤压变形。
   * **严禁硬编码固定宽度**：按钮、卡片、输入框禁止使用 `w-32` 等写死宽度，必须使用自适应内边距（`px-4 sm:px-6`）或最小宽度（`min-w-[...]`）。
2. **字符集与字体抗撕裂 (Anti-Tearing)**：
   * 针对越南语（ế, ặ, ở, ứ）等复杂声调语言，字体栈优先声明 Latin Extended 字体（如 `Be Vietnam Pro`, `Inter`）。
   * **全局 CSS 字体栈中，西文/拉丁扩展字体之后，严禁紧接着声明 CJK 中日文字体（如 SimSun / 宋体）**，防止带调西文字母被当成全角汉字渲染导致“字缝巨大撕裂”。
   * 页面根节点必须根据当前语言动态同步 `<html lang="...">`。
3. **文案精炼度铁律 (Brevity)**：
   * 导航栏文案控制在 1~2 个单词；Badge / Pill 严格限制在 8 个字符以内，杜绝整句直译塞进小控件。

---

## 6. UI/UX 编码自检清单 (Pre-Flight Checklist)

在每次编写或修改 UI 代码后，Agent 必须进行这 7 项审查：
1. [ ] **留白审查**：模块之间是否有足够的间距，手机端两侧是否留有 `px-4 sm:px-6`？
2. [ ] **对比度审查**：文本与背景颜色是否有足够对比度（浅灰字在白底上不可过浅）？
3. [ ] **移动端触控**：交互热区高度是否不低于 44px（`min-h-[44px]`）？
4. [ ] **微动效与状态**：按钮是否有 hover、active 和 focus-visible 样式？
5. [ ] **视觉锚点**：用户打开第一屏（First Fold），视线是否能在 3 秒内锁定最重要的核心功能或按钮？
6. [ ] **防暴流审查**：所有 Flex 容器内的 Badge/Tag 是否都添加了 `shrink-0 whitespace-nowrap` 与 `gap-2`？在德语/越南语长文本下是否依然美观？
7. [ ] **无硬编码文案**：组件中是否 100% 杜绝了裸写英文/中文，所有用户可见文本均由分层字典驱动？

