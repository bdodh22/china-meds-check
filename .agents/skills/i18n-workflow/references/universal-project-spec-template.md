# 多语言独立站开发规范（通用模板 · 给 AI 看）

> 用法：复制到项目根目录 `/doc/开发规范.md`，替换「项目配置区」变量后启用。每次给 AI 派活，需求里带「先读 /doc/开发规范.md，改完按验收清单逐条打勾」。

## 项目配置区（每个项目只改这里）

```ts
SITE_DOMAIN      = 'yourdomain.com'
ENABLED_LOCALES  = ['en', 'vi']        // 未启用语言一律 404
PRIMARY_LOCALE   = 'en'                // 主语言：数据天然完整的那门
LOCALE_PATHS     = { en: '/', vi: '/vi', es: '/es' }
CONTENT_DIR      = 'data/'             // 结构化内容数据所在
PAGE_ROUTES      = ['/', '/blog', '/tools/*', ...]   // 全站路由清单（测试用）
SITEMAP_INDEX    = '/sitemap-index.xml'
```

技术栈说明：示例为 TS/Next.js 语法，但原则与语言无关——WordPress 自研、Astro、纯静态多目录都能平移，把「数据层 / 路由层 / 渲染层」对应到你的实现即可。

## 0. 项目铁律（违反任一条 = 返工）

1. **一语言一完整块**：页面内容按语言整块存在。`lang="vi"` 页禁止出现英文句子，`lang="en"` 页禁止出现其它语言术语。宁缺毋滥——没有该语言的完整内容就不发布该语言版本，绝不降级显示另一种语言。
2. **禁止跨语言 fallback**：任何字段禁止 `xx ?? en ?? zh` 式兜底。取不到就整块不渲染/不生成 URL。
3. **禁止半成品上线**：数据不完整的内容不得出现在 sitemap、内链、页面。内容生产与发布分离。
4. **正文必须 SSR**：给搜索引擎看的内容（正文/列表/表格/释义/FAQ）禁止放进 `"use client"` 组件。客户端组件只放交互控件。
5. **文案不许硬编码**：界面文案走集中字典（`messages/{locale}.ts`），组件禁止裸写字符串。
6. **未启用语言路径与不存在路径返回真 404**：禁止 catch-all 返回首页 200（soft 404）。

## 1. 数据模型：语言是完整维度

错误模型：字段主语言必填、其它语言可空 → 空了 fallback 主语言 → 出现整句主语言内容。

正确模型：

```ts
// 内容条目 = 全局核心字段一份 + 每种语言一份完整内容块
type LocalizedEntry<T> = {
  id: string              // 稳定的跨语言标识（slug/base_id，勿用文章 id）
  en: T                   // 主语言内容：必填
  [locale: string]: T | undefined // 其他语言：整块可选，缺 = 该语言无此条
}
type ContentBlock = {     // 一种语言内所有字段一起存在或一起不存在
  title: string
  gloss: string           // 释义/描述
  body: string
  examples: Example[]     // ≥1 条，理想 3 条
  assets: string[]        // 图/SVG 等，逐项真实、互不相同
}
// 例句/列表项必须是对象数组（自带各语言字段），禁止平行数组按下标拼接
type Example = { zh: string; pinyin?: string; en: string; vi?: string }
```

多语言文章不要改变内容 id：跨语言用 slug/base_id 关联。

## 2. 就绪门禁：缺一块就不生成 URL

```ts
function isBlockComplete(c: ContentBlock): boolean {
  return Boolean(
    c.title && c.gloss && c.body &&
    c.examples.length >= 1 && c.assets.length > 0 &&
    !containsBlockedTokens(JSON.stringify(c))   // 黑名单见 §3
  )
}
function getEntryUrl(entry, locale): string | null {
  const block = entry[locale]
  if (!block || !isBlockComplete(block)) return null
  return `${LOCALE_PATHS[locale]}${entry.id}`
}
```

sitemap / 内链 / 页面卡片 / `<Link>` 全部只调用 `getEntryUrl`——半成品自动进不了任何入口。

## 3. 占位符黑名单 + 语言纯净度（写进测试）

```ts
// ① 占位符/键名/模板句黑名单：出现在任何页面内容即失败
const BLOCKED_TOKENS = [
  'Hán Tự', '部首', 'trong hệ thống từ vựng',   // 键名当值输出的历史泄漏
  'Chinese high-frequency character', '例: ',    // 垃圾模板 / 源语言残留
  // 每个项目按自己踩过的坑追加
]
// ② 语言纯净度：正文中其它语言整句占比过高 = 没真正翻译
// 例：vi 页允许拉丁转写，不允许整句英文 "My hobby is..."
```

对全量数据跑测试。新增语言前先把字段补到全绿，才允许加进 `ENABLED_LOCALES`。

## 4. 路由：未启用语言与未知路径一律真 404

```text
middleware 逻辑：
  路径首段 ∈ ENABLED_LOCALES        → 放行
  路径首段是规划中但未启用的语言    → 404
  其它未知路径                       → 404（绝不 fallback 首页）
```

每个页面必须有：独立 title、canonical 自指、hreflang 双向配对（en↔vi↔x-default）、`<html lang>` 正确、JSON-LD `inLanguage` 正确。

## 5. SSR 铁律 + 构建期集成测试

自查：**`curl 页面URL` 能看到正文吗？** 看不到 = 没做 SSR。

CI/构建后逐路由断言渲染 HTML：
1. 字节数 > 阈值（8KB——空壳页通常只有 3~4KB 的面包屑+H1）
2. 不含黑名单 token
3. 非主语言页通过纯净度测试
4. 含 H1 / canonical / hreflang 双向 / `<html lang="正确语言">`

## 6. i18n 文案集中 + 唯一模板

- 界面文案全部进 `messages/{locale}.ts`，配 eslint 禁硬编码规则。
- **title/description 生成器全站只保留一个函数**。
- H1 里出现其它语言括注——确认是有意的术语标注（需配转写）还是残留；残留一律清掉。

## 7. 每次改完的验收清单（回复逐条打勾）

- [ ] 新增/修改页面 `curl` 能看到完整正文（非空壳）
- [ ] 没写任何跨语言 fallback
- [ ] 新增语言内容 100% 通过黑名单 + 纯净度测试
- [ ] 每页 lang / title / canonical / hreflang 双向 / JSON-LD 语言字段全对
- [ ] 例句/列表是对象数组，无按下标拼接
- [ ] sitemap 只含已就绪 URL；未启用语言路径 404
- [ ] 界面文案全走集中字典
- [ ] 资源文件（图/SVG）真实且互不相同，无复制模板
- [ ] 全部测试跑绿才算完成

## 8. 历史踩坑记录（防复发；新坑追加表尾）

| 曾发生 | 根因 | 防止手段 |
|---|---|---|
| 次要语言页例句/释义显示主语言 | 字段可空 + fallback | §1 完整块 + §3 纯净度测试 |
| 语音学术语只有中文一种值 | 字段建库没按语言建格 | §3 黑名单 + §6 集中字典 |
| 页面出现键名/占位符当内容 | 无数据时输出枚举键名 | §3 黑名单测试 |
| 例句中文与翻译错位 | 平行数组按下标拼接 | §1 对象数组 |
| `/de/` `/fr/` 及垃圾 URL 软 200 | 路由无语言白名单 | §4 middleware 404 |
| blog/工具页 SSR 空壳 | 正文写进 client 组件 | §5 SSR + 字节数断言 |
| title 多格式/双转义/垃圾文本 | 文案散落各组件 | §6 唯一生成器 + lint |
| 未精修内容全量进 sitemap | 无发布门禁 | §2 getEntryUrl 门禁 |
| 多语言重复页判低质量、大量已发现未索引 | 一键机翻批量铺语言 | §9 一个语言一个语言精修 |

## 9. 多语言内容策略（产品层，开发也要遵守）

- 每种语言从该语言用户**真实搜索的词**出发写内容（用关键词工具按语言查证），禁止先写主语言再一键机翻批量铺。
- 新语言上线 = 一页页精修，修好一批放一批；sitemap 只收录已就绪页，lastmod 写实际更新日期。
- 已收录但质量差的页：**不要 noindex**（丢已累积信号），快速补齐数据 → 更新 lastmod → 请求重抓。
- 语义相同的词合并到一个页面，别为每个词面都铺页。

## 10. AI 协作流程（让 AI 照章执行）

1. **需求引用条款号**：`请按开发规范 §X 执行`——需求带 `/doc/开发规范.md#章节`，改完自动对清单打勾。
2. **先写会失败的测试，再写功能**：用验收标准倒逼交付。
3. **别赌 AI「想周全」——把周全写进类型、门禁和测试里。**
