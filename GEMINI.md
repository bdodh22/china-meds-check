# Next.js 独立外贸/信息站开发规范 (GEMINI.md)

本文件定义了本项目（ChinaMedsCheck 独立站）的开发标准、架构准则与 SEO 强约束规则。所有 AI 辅助开发与代码变更均须严格遵循此规范。

---

## 1. 架构与技术栈

* **核心框架**：Next.js 14+ (App Router)
* **语言规范**：TypeScript (严格模式 Strict Mode，禁止滥用 `any`)
* **样式方案**：Tailwind CSS (原子化、响应式优先，禁止在 tsx 中书写内联 style 或随意引入外部 CSS)
* **图标库**：`lucide-react`

### 目录分层职责
* `app/`：路由定义、服务端渲染数据获取、页面级别 `Metadata` 配置、`layout.tsx` 骨架、`sitemap.ts` 与 `robots.ts`。
* `components/`：UI 组件库，遵循展示与逻辑解耦原则。
* `lib/`：通用工具函数、数据解析器（如 `medications.ts`, `ports.ts`）、搜索索引。
* `data/`：静态数据源与配置 JSON。

---

## 2. 组件开发规范

### 服务端与客户端组件边界 (RSC First)
1. **默认优先使用 React Server Components (RSC)**：
   * 所有 `page.tsx` 页面应作为 RSC，直接在服务端加载数据。
   * 严禁无端在页面或组件顶部声明 `'use client'`。
2. **谨慎使用 `'use client'`**：
   * 只有在明确需要用户交互（如 `useState`, `useEffect`, `useRouter`, 监听 `onClick/onChange` 等浏览器事件）时，将交互部分抽取为独立的叶子 Client Component，再引入到 RSC 中。

### 性能与最佳实践
1. **图片加载**：必须使用 `next/image`（`<Image />`），严禁使用原生 `<img>`。必须显式声明 `alt`（优化 SEO）、`width/height` 或 `fill`。
2. **站内跳转**：必须使用 `next/link`（`<Link />`），严禁使用原生 `<a>` 标签进行站内页面导航。
3. **字体与图标**：使用 `next/font` 优化字体加载；图标统一从 `lucide-react` 按需引入。

### UI/UX 与美学规范 (遵循 ui-ux-design 技能)
1. **8px 律动与呼吸感**：严格遵循 8px 网格间距，容器内边距统一 `p-5 sm:p-6 lg:p-8`；卡片统一采用大圆角 `rounded-2xl` 与精致 1px 边框 `border-slate-200/80`。
2. **微交互与物理触感**：所有可交互按钮与卡片必须配齐 `transition-all duration-200`、轻微上浮 `hover:-translate-y-0.5` 与按压微缩 `active:scale-[0.98]`。
3. **高转化率 (CRO) 架构**：首屏视觉必须存在明确的单一核心操作点（Primary CTA）；移动端长页面采用底部吸底操作栏（Sticky Mobile Bar）。

---

## 3. SEO 强约束标准（独立站核心生命线）

### TDK 元标签标准
每个 `page.tsx` 必须导出静态 `export const metadata: Metadata` 或动态 `export async function generateMetadata()`：
1. **Title（标题）**：
   * 字符长度严格控制在 **35 ~ 60 字符**。
   * 结构必须清晰，包含核心搜索意图关键词及站点后缀（例如：`Adderall in China: Customs Legality & Allowance Guide`）。
2. **Description（描述）**：
   * 字符长度严格控制在 **110 ~ 160 字符**。
   * 必须包含精准关键词与用户价值主张（CTA），避免模糊空洞。
3. **OpenGraph & Twitter Card**：
   * 必须配置 `openGraph.title`、`openGraph.description`，确保在社交媒体和即时通讯工具中分享时具备良好的预览卡片。

### HTML 结构与无障碍 (A11y)
1. **H1 唯一性**：**每个页面必须且只能存在一个 `<h1>` 标签**，且该 `<h1>` 必须与页面核心关键词高度契合。
2. **语义化标签**：严禁全篇 `<div>`，必须合理使用 `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`。
3. **可访问性**：交互按钮、输入框必须有明确的 `aria-label` 或可视文本标签，确保无障碍阅读友好。

### 结构化数据 (JSON-LD)
* 对于指南（Article / Guide）、药物条目（Product / MedicalWebPage / FAQPage），必须在页面中注入标准 Schema.org JSON-LD 脚本，助力 Google 富媒体搜索结果（Rich Snippets）收录。

### 站点地图与路由同步 (Sitemap)
* **每当在 `app/` 下新建一个公开路由**，必须同步在 `app/sitemap.ts` 中注册其静态或动态路由条目与更新频率，确保搜索引擎即时爬取。

---

## 4. 验证流程 (三大上线门禁)

每次完成页面开发或重构后，需依次执行以下三大自动化体检门禁：
1. **i18n 质量体检**：运行 `npm run i18n:audit`，确保字典 100% 对齐、0 裸露英文、组件 locale 透传完整且无缓存污染。
2. **SEO 合规体检**：运行 `npm run seo:audit`，确保 Title/Desc/H1/Sitemap 均为 100% 绿标。
3. **生产构建校验**：运行 `npm run build`，确保 TypeScript 类型安全与全量 SSG 静态页面编译通过。

---

## 5. 出海独立站通用多语言工程落地总纲 (Universal Indie Site i18n Protocol)

在本项目（ChinaMedsCheck）及未来所有出海独立站中，必须无条件执行以下工程总纲：

### 🚨 §0 项目铁律（违反任一条 = 返工）
1. **§0.1 一语言一完整块**：页面内容按语言整块存在。`lang="vi"` 页禁止出现英文句子，`lang="ja"` 页禁止出现未经翻译的英文海关/机场说明。没有完整内容就不发布该语言版本，绝不降级显示另一种语言。
2. **§0.2 严禁跨语言 Fallback**：任何字段禁止 `xx ?? en ?? zh` 式偷懒兜底。取不到就整块不渲染、不生成 URL、不进 Sitemap。杜绝半越半英、半日半英的“缝合怪”页面。
3. **§0.3 严禁半成品上线**：数据不完整的内容不得出现在 sitemap、内链、页面卡片。内容生产与发布彻底物理分离。
4. **§0.4 正文必须 SSR**：给搜索引擎看的内容（正文/列表/表格/释义/FAQ）禁止放进纯客户端 `"use client"` 组件。客户端组件只放交互控件。**自查标准：`curl 页面URL` 必须能看到完整正文（HTML > 8KB）**。
5. **§0.5 文案不许硬编码**：界面文案统一走集中分层字典（`messages/{locale}/*.json`），组件与模板禁止裸写字符串。
6. **§0.6 未启用语言路径与不存在路径返回真 404**：禁止 catch-all 返回首页 200（Soft 404），未启用语言中间件与路由直接响应 HTTP 404。

### 📦 §1 全栈信息架构四象限契约 (4-Layer IA Architecture)
* **L1: 界面框架文案层 (UI Shell)**：按钮、导航、页脚、版权、系统提示。统一走分层字典（`messages/{locale}/*.json`），键值 100% 对齐。
* **L2: 业务实体模型层 (Domain Entities)**：机场指南详情、药品目录条目、海关法律细则。实体数据模型必须将语言作为完整正交维度（`LocalizedEntry<T>`），严禁单语种数据硬塞进多语言系统。
* **L3: 交互控制维度元数据 (Control Facets)**：分类下拉项、表格 HUD 列头、过滤器、Badge。严禁在代码中写死包含自然语言的常量数组，必须全部由多语言字典动态驱动。
* **L4: 长文与 SEO 内容层 (Content Assets)**：行业长文、合规指南、深度 FAQ。按语言目录完全物理隔离（如 `content/{locale}/*.md`），禁止跨语言字段拼接。

### 🚪 §2 就绪发布门禁 (The getEntryUrl Gate)
* **铁律**：Sitemap、站内内链、推荐卡片、`<Link>` **全站统一只调用 `getEntryUrl`**。未就绪的半成品实体自动进不了任何公开入口。

### 🛡️ §3 UI 排版物理防线与字体抗撕裂规范
1. **字符集与字体抗撕裂 (Anti-Tearing)**：越南语等复杂声调语言显式声明 Latin Extended 字体。全局 CSS 字体栈中，西文/拉丁扩展字体之后，严禁紧接着声明 CJK 中日文字体，防止带调西文字母被当成全角汉字渲染导致“字缝巨大撕裂”。
2. **容器防暴流护身符**：所有 Flex 容器中的 Badge/Pill/Tag 必须加 `shrink-0 whitespace-nowrap`，左右对齐容器必须加 `gap-2`。严禁硬编码固定宽度，必须使用自适应内边距（`px-4`）或 `min-w-[...]`。
3. **文案精炼度铁律 (Brevity)**：导航栏控制在 1~2 个单词，Badge / Pill 严格限制在 8 个字符以内，杜绝整句直译塞进小控件。


