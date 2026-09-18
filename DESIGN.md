# ChinaMedsCheck 界面设计规范与实施参考手册 (Design Spec for AI Studio)

> 本文档基于最终定稿界面 **《ChinaMedsCheck - 现代灵动毛玻璃合规指南 (V4 Kinetic Elevation)》** 整理，用于直接输入至 AI Studio 或工程团队作为高保真 UI/UX 及前端规范参考。

---

## 1. 核心设计哲学与设计定位 (Design Philosophy)

* **定位**：中国海关入境药物合规查询与自用剂量智能验算便民助手。
* **情绪关键词**：**温润可信赖 (Calm Trust)**、**轻透高科技 (Frosted Modernity)**、**去审查感 (Non-punitive Clarity)**、**高触感反馈 (Kinetic Physicality)**。
* **设计原则**：
  1. **摒弃廉价 AI 味与威慑警务感**：不使用大面积沉闷粗黑、荧光警报色或生硬盾牌警徽，采用“健康出行护理”的温润同理心视角。
  2. **轻透物理毛玻璃体系 (Glassmorphism & Depth)**：多层半透明磨砂玻璃卡片（`backdrop-blur-xl`）结合环境漫射光晕与双层微细内高光边框（`1px` Hairline）。
  3. **低饱和高级合规光谱 (Muted Regulatory Spectrum)**：以柔和的晨露薄荷绿为基调，黄色转为暖麦芽焦糖色，红色转为低饱和干燥玫瑰绯红，确保专业权威且优雅克制。
  4. **Emil Kowalski 物理动效反馈**：组件具备微悬浮反弹、呼吸聚焦、按压弹性微缩与实时联动数据演算。

---

## 2. 颜色系统与设计令牌 (Color System & Semantic Tokens)

### 2.1 主色与基底 (Core & Surfaces)
* **主背景 (Canvas 背景色)**: `#F8FAFC`（珍珠白至极浅晨雾蓝灰底衬，配大直径柔和环境高斯模糊光球）
* **主色/品牌色 (Primary Brand)**: 
  * Primary: `#0D9488` (Teal 600)
  * Light Tint: `#F0FDFA` (Teal 50)
  * Dark 强调色: `#0F766E` (Teal 700)
* **中性文字阶梯 (Typography Slate)**:
  * 标题 (Title / Headings): `#0F172A` (Slate 900)
  * 正文 (Body / Standard): `#334155` (Slate 700)
  * 次要与注解 (Muted / Captions): `#64748B` (Slate 500)
  * 占位符与微文字 (Subtle): `#94A3B8` (Slate 400)

### 2.2 监管与通行三色光谱 (Regulatory Channels)
* **绿色通道 (免申报·完全合规)**:
  * 强调色: `#059669` (Emerald 600) / 浅底: `#ECFDF5` (Emerald 50) / 边框: `#A7F3D0` (Emerald 200)
* **黄色通道 (凭证明·走申报通道)**:
  * 强调色: `#D97706` (Amber 600) / 浅底: `#FFFBEB` (Amber 50) / 边框: `#FDE68A` (Amber 200) / 标签: 焦糖麦芽暖色
* **红色通道 (限制品类·严禁入境)**:
  * 强调色: `#DC2626` (Red 600) / 浅底: `#FEF2F2` (Rose 50) / 边框: `#FECACA` (Red 200) / 标签: 干燥玫瑰绯红

---

## 3. 字体与排版层级 (Typography System)

* **西文与无衬线主字体**: `Plus Jakarta Sans`, `Inter`, `-apple-system`, `BlinkMacSystemFont`, `PingFang SC`, `Hiragino Sans GB`, `sans-serif`
* **排阶与样式**:
  * **主标 (Hero Title)**: `font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-snug`
  * **副标 (Sub-title)**: `font-medium text-sm sm:text-base text-slate-500 max-w-xl mx-auto`
  * **区块标题 (Section Header)**: `font-bold text-2xl text-slate-900 tracking-tight`
  * **卡片标题 (Card Header)**: `font-bold text-lg text-slate-900`
  * **正文 (Body)**: `text-sm text-slate-600 leading-relaxed`
  * **微徽标与状态药丸 (Badges & Pills)**: `text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap shrink-0`

---

## 4. 材质、深度与阴影规范 (Glassmorphism & Elevation)

1. **环境背景漫射光 (Ambient Light Orbs)**:
   * 顶部与卡片深处埋入 `w-96 h-96 rounded-full blur-3xl opacity-40` 渐变漫射光（如 `teal-200/40`, `sky-200/30`, `amber-100/30`）。
2. **磨砂玻璃卡片 (Glass Surface)**:
   * 基础类名：`bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl`
3. **悬浮交互升阶 (Interactive Elevation)**:
   * 卡片悬停：`hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(13,148,136,0.08)] transition-all duration-300 ease-out`
   * 按钮物理按压：`active:scale-[0.98] transition-transform duration-150`

---

## 5. 核心页面模块结构与组件明细 (Screen Blueprint)

### 5.1 顶部导航栏 (Navbar)
* **品牌 Brand**:
  * 极简现代「双十字医疗薄荷叶」圆形微徽标（绿青色底白十字），搭配品牌名 `ChinaMedsCheck` + 浅灰副标 `入境药品合规助手 · Travel Meds Advisor`。
* **导航项**:
  * 查验指南 (Guide, Active 态：青色微发光标签)
  * 药品清单目录 (Med Catalog)
  * 自用剂量计算器 (Calculator)
  * 真实避坑案例 (FAQ)
  * 申报指引 (Declaration)
* **操作区**: 语言切换器 (`CN / EN / JP / KR`)、右侧「官方通关指引」行动按钮。
* **顶置跑马动态条**: 2026/2027 入境通关安全提示（绿点呼吸动效）。

### 5.2 核心首屏：Hero 与智能快搜胶囊 (搜索 Command Capsule)
* **文案**: “带药入境中国，轻松合规不踩坑” + 双语政策自用免申报与携带证明说明。
* **微悬浮搜索舱**:
  * 左侧放大镜图标 + 智能输入框（含 `⌘K` 微角标快捷键提示）。
  * 内嵌功能按键：`拍照识别药盒 (OCR)`、`条码速查 (Barcode)`。
  * 右侧主行动点：`快速核验`（Teal 渐变微凸按钮）。
* **热门快捷药名标签**: 布洛芬、维生素、褪黑素、复方感冒药 (需注意)、阿得拉 (受限)。

### 5.3 核心展示：随身行李放标准对照 (Three Regulatory Tiers)
三列自适应响应式毛玻璃 Bento 卡片：
1. **绿色通道 · 免申报放行**: 适用日常家用非处方药/维生素，列明携带要点（自用量通常不超过旅程7至14天用量、包装完好）及代表药物（对乙酰氨基酚、布洛芬胶囊等）。
2. **黄色通道 · 凭证明走申报通道**: 需持有效医生双语处方/诊断书（不超过处方标示一个月用量），代表药物（胰岛素注射笔、降压慢病药、佐匹克隆等）。
3. **红色品类 · 严禁携带/受限制物质**: 明确含管制麻醉及一类精神药品成分无特许严禁携带（Adderall、含可待因止咳水、CBD精油等），红框柔和警告。

### 5.4 互动引擎：随身剂量与旅行计算器 (Smart Dosage Calculator)
* **左侧交互参数输入**:
  * 停留天数切换：`7天 短途旅行`（默认选中高亮）、`14天 探亲`、`30天 工作长居`。
  * 携带药品类型：常用非处方药 / 慢病处方药 / 管制受限类 单选药丸。
  * 双滑动条（Range Slider）：每日服用频次 (1-4次/天)、每次用量 (1-4粒/次)。
* **右侧实时判定仪表 (Live Verdict Dashboard)**:
  * 顶栏带有绿色脉冲圆点的「实时合规测算正常」状态标签。
  * 中央动态合规徽章（合规盾徽与环状刻度）。
  * 进度槽：自用安全负荷（例如 `87% (安全)`）。
  * 数据卡片对比：当前所带剂量（如 `28 粒`） vs 法定免申报上限（如 `≤ 33 粒`）。
  * CTA：`免费下载双语申报凭条 (Bilingual Slip)`。

### 5.5 深度信息：旅客最关心的合规经验解读 (Accordion FAQ)
* 磨砂折叠手风琴卡片，配带分类微胶囊标签（`法律红线`、`处方严核`、`高频误区`）：
  1. 含可待因 (Codeine) 止咳药的申报与准入要点。
  2. 海外处方精神类药物 (ADHD/镇静类) 的合规准备要求。
  3. 帮亲朋好友代带药品的法律边界与风险提示。

### 5.6 底部行动召唤与页脚 (Clearance Pass CTA & Footer)
* **通关说明卡快速生成组件**:
  * 墨翠渐变背景，带有白色与玻璃态双按钮：`免费下载 PDF 说明卡`、`手机离线码 (QR)`。
* **官方权威背书与服务通道页脚**:
  * 列出 12360 海关政务服务热线、12315 药监热线及北京/上海机场海关咨询专线。
  * 免责声明与中英文双语声明体系。
