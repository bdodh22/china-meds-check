# 多语言 (i18n / l10n) 工业级规范与防暴流踩坑手册

本手册融合了实际出海独立站、多语种垂直工具站及高流量站点的实战经验（包括越南语、俄语、日语、德语等多语种接入踩坑复盘）。
当为任何产品接入新语言或重构多语言架构时，必须将本文档作为最高实施规范与验收清单（Checklist）。

---

## 目录
1. 核心 10 大铁律 (Ironclad Rules)
2. 架构与数据层规范 (Architecture & Data Layer)
3. UI 排版与容器防暴流规范 (Layout & Anti-Blowout)
4. 字体与字符集渲染陷阱 (Font & Diacritics Tearing)
5. 新语言接入实施 Checklist (Implementation Checklist)

---

## 1. 核心 10 大铁律 (Ironclad Rules)

### §0.1 一语言一完整块 (Complete Block per Locale)
* **原则**：页面的每个完整内容块（Hero、Features、Calculator、FAQ、Blog、弹窗提示等），要么整块都是目标语言，要么完全不展示。
* **红线**：绝对禁止在非英语页面（如 `/vi/`, `/ja/`, `/ru/`）中夹杂大段未经翻译的纯英文句子。
* **特例**：国际通用缩写与专有名词（如 GACC Notice 43, FDA, OTC, ADHD, SSRI）允许保留英文原名。

### §0.2 严禁跨语言 Fallback (No Cross-Language Fallback)
* **红线**：严禁 `const title = item.titleVi || item.titleEn` 这种偷懒写法。
* **后果**：产生半越半英、半日半英的“缝合怪”页面，极度破坏用户信任，会被 Google 算法判定为低质垃圾内容（Thin/Scraped Content）。
* **规范**：如果目标语言缺失某个数据块，必须在数据层将该项从列表中过滤剔除，或者整块卡片隐藏，绝不能用英文填补半个卡片。

### §0.3 语言不完整不上线，不进 Sitemap (Strict Release Gate)
* **原则**：任何语言版本，只有在该语言“100% 静态文案 + 核心数据块完整本地化”且自检通过后，才允许放入 `sitemap.ts` 和导航语言切换器。
* **红线**：禁止将只有 30% 翻译度的半成品语言暴露给搜索引擎。

### §0.4 未就绪语言返回真 404 (True 404 for Disabled Locales)
* **规范**：对于尚未就绪或禁用的语言路由，必须直接触发 Next.js 的 `notFound()` 返回 HTTP 404。
* **红线**：严禁 301/302 重定向到 `/en/`，防止搜索引擎把非英语 URL 当作重复页面收录或产生软 404（Soft 404）降权。

### §0.5 文案不许硬编码 (Zero Hardcoded Strings)
* **规范**：所有用户可见文本（包括按钮、状态提示、错误信息、占位符、Badge、图例、弹窗、法律免责声明）必须统一定义在语言字典或语言数据块中。
* **代码审查**：在 JSX/TSX 中严禁出现类似 `<p>This medication requires declaration...</p>` 的硬编码字符串。

### §0.6 字典按模块分层 (Layered Dictionaries)
* **规范**：按业务域拆分（`common.json`, `calculator.json`, `drugs.json`, `meta.json` 等），便于模块化复用与按需维护。
* **红线**：杜绝几万行的单一大 JSON。

### §0.7 静态服务端渲染 (Strict SSR/SSG First)
* **规范**：页面所有多语言内容必须在服务端完成渲染（SSR 或 SSG）。
* **红线**：严禁使用客户端 `useEffect` 异步拉取字典导致首屏英文闪烁（FOIT/FLOC）。

### §0.8 字符集与声调抗撕裂 (Anti-Tearing Font Fallback)
* **规范**：必须显式配置支持完整 Latin Extended 的字体（如 `Be Vietnam Pro`、`Inter`、`Roboto` 等）。
* **红线**：在 CSS 字体栈中严禁西文字符回退到 CJK 中日文字体（如 SimSun / 宋体），防止因全角空格映射导致“声调撕裂、间距暴增、高低错位”。

### §0.9 UI 容器长文本防暴流 (Container Elasticity)
* **规范**：德语、俄语、西语、越南语普遍比英语长 30%~60%，某些术语长达 200%。
* **必加属性**：所有 Flex 容器中的 Badge/Pill/Tag 必须加 `shrink-0 whitespace-nowrap`。
* **红线**：严禁硬编码固定宽度（如 `w-32`），必须使用自适应内边距（`px-4`）或 `min-w-[...]`。

### §0.10 URL 结构严格规范 (Localized Routing)
* **规范**：采用二级子目录结构（`/[locale]/path`），全站站内链接跳转必须保留当前 `locale` 前缀。

---

## 2. 架构与数据层实战规范

### 2.1 类型安全的字典结构 (TypeScript)
```typescript
// lib/i18n/dictionaries.ts
import enDict from '@/messages/en.json';
import jaDict from '@/messages/ja.json';
import koDict from '@/messages/ko.json';
import ruDict from '@/messages/ru.json';
import viDict from '@/messages/vi.json';
import { Locale } from './config';

export type Dictionary = typeof enDict;

const dictionaries: Record<Locale, Dictionary> = {
  en: enDict,
  ja: jaDict,
  ko: koDict,
  ru: ruDict,
  vi: viDict,
};

// 严禁 dictionaries[locale] || dictionaries.en 自动回退
export function getDictionary(locale: Locale): Dictionary {
  const dict = dictionaries[locale];
  if (!dict) {
    throw new Error(`[i18n] Dictionary not found for locale: ${locale}`);
  }
  return dict;
}
```

### 2.2 动态内容的“一语言一完整块”数据模型
若数据库或 CMS 中有文章、产品或数据卡片：
```typescript
interface LocalizedArticle {
  id: string;
  slug: string;
  locales: {
    en: { title: string; content: string; excerpt: string };
    vi?: { title: string; content: string; excerpt: string };
  };
}

// 获取页面列表时的安全过滤：
export function getArticlesForLocale(articles: LocalizedArticle[], locale: string) {
  // 严格过滤：只有完整拥有该语言数据的项才展示，绝对禁止展示 half-English 的假翻译
  return articles.filter(a => Boolean(a.locales[locale]?.title && a.locales[locale]?.content));
}
```

---

## 3. UI 排版与容器防暴流规范 (CSS & Tailwind)

### 3.1 徽章与标签 (Badge / Tag / Pill)
当文字从 `Pending` (7字符) 变成德语 `Ausstehend` 或俄语 `В ожидании` 或越南语 `Đang chờ xử lý` 时：
```tsx
// ❌ 错误：在小屏幕或小容器下会被 flex 挤压变形，或折行成单字
<div className="flex items-center gap-2">
  <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs">
    {dict.status}
  </span>
</div>

// ✅ 正确：添加 shrink-0 与 whitespace-nowrap 绝对保护
<div className="flex items-center gap-2">
  <span className="shrink-0 whitespace-nowrap px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
    {dict.status}
  </span>
</div>
```

### 3.2 按钮与固定宽容器
```tsx
// ❌ 错误：固定宽度导致长语言文字溢出容器边界
<button className="w-32 h-10 bg-blue-600 text-white truncate">
  {dict.action}
</button>

// ✅ 正确：自适应内边距与 min-width
<button className="min-w-[120px] px-4 py-2.5 bg-blue-600 text-white font-medium rounded-xl whitespace-nowrap">
  {dict.action}
</button>
```

### 3.3 标题与长文本的断行与平滑降级
在俄语与德语中，存在极长的复合词（如 `Kraftfahrzeug-Haftpflichtversicherung`）：
* 必须在容器上配置 `break-words` 或 `hyphens-auto`（CSS 属性 `hyphens: auto;`）。
* 在卡片描述中，使用 `line-clamp-2 sm:line-clamp-3` 防止卡片高度参差不齐。

---

## 4. 字体与字符集渲染陷阱 (Font & Diacritics)

### 4.1 越南语声调撕裂之痛 (CJK Fallback Bug)
* **故障现象**：在 Windows 或特定浏览器中，越南语带复合声调的字符（如 `ồ`, `ế`, `ặ`, `ữ`）与普通英文字母字高不一致、字距忽大忽小，甚至出现类似全角空格的撕裂空隙。
* **技术根源**：系统的西文字体（如 Arial 或某些 Sans-Serif）没有打包完整 Latin Extended 字符集；渲染引擎向上回退时命中系统中文字体（如 SimSun、SimHei、MS Gothic），中文字体强行将带声调的西文字符当做全角双字节字符渲染！
* **解决方案**：
  1. 在 `layout.tsx` 或 `globals.css` 中引入原生支持 Latin Extended 的现代字体，如 `Be Vietnam Pro`, `Plus Jakarta Sans`, `Inter`。
  2. 字体声明顺序必须严格遵循：
     ```css
     font-family: 'Be Vietnam Pro', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
     ```
  3. 严禁把中文字体放在系统西文字体之前。

### 4.2 俄语西里尔字符集 (Cyrillic)
引入 Google Fonts 时（例如 Inter 或 Roboto），必须显式勾选 `subsets: ['cyrillic', 'latin']`，否则俄语会降级为系统默认宋体或黑体。

---

## 5. 新语言接入实施检查清单 (Checklist)

在合并新语言分支或上线前，必须执行以下 5 步核对：

- [ ] **1. 字典完整性审查**：新语言的 JSON 键值必须与 `en.json` 100% 对应，不能有遗漏的 key。
- [ ] **2. 严禁英文残留审查**：全局搜索目标语言页面编译结果，确认除通用技术术语外，**不存在任何未翻译的硬编码英文整句**。
- [ ] **3. UI 破坏性审查**：
  - 在移动端（375px 宽度）检查所有按钮、Badge、表格表头。
  - 确认所有 Badge 均带有 `shrink-0 whitespace-nowrap`。
  - 确认导航栏语言切换后不会换行掉落。
- [ ] **4. 字体与声调实机审查**：
  - 针对越南语（`vi`）：检查带声调字符（ơ, ư, ă, ê, ô）是否与相邻字母平滑对齐。
  - 针对俄语（`ru`）：检查西里尔字母是否与数字粗细一致。
- [ ] **5. SEO 与状态码审查**：
  - 检查 `<html lang="[locale]">` 是否正确设置。
  - 检查 canonical 与 hreflang 是否输出该语言的绝对 URL。
  - 检查未完成的语言访问时是否返回 404，且未被收录进 `sitemap.ts`。
