---
name: i18n-workflow
description: >-
  Implement and manage internationalization (i18n), multi-language routing, hreflang SEO tags, localized sitemaps, and translation workflows for Next.js independent websites.
  Covers the Universal Indie Site i18n Protocol: Complete block per locale, zero cross-language fallback, getEntryUrl readiness gate, SSR content integrity, anti-tearing CJK fallbacks, and flexbox container elasticity.
  Activate when architecting multi-language support, managing translation dictionaries, configuring hreflang alternate tags, localizing entities, or implementing project /doc/开发规范.md.
---

# 独立站多语言工程化统一工作流 (Universal i18n Workflow)

本技能为 Antigravity 提供经过实战千锤百炼的**出海独立站通用多语言工程闭环协议（Universal Indie Site i18n Protocol）**。
**面向未来任何独立站项目（SaaS、工具、电商、展厅、聚合站），彻底根除“UI 壳子多语言、业务数据纯英文”的开发者自嗨！**

---

## 🚨 §0 项目铁律（违反任一条 = 打回返工）

1. **一语言一完整块**：页面内容按语言整块存在。`lang="vi"` 页禁止出现英文句子，`lang="en"` 页禁止出现其它语言术语。宁缺毋滥——没有该语言的完整内容就不发布该语言版本，绝不降级显示另一种语言。
2. **禁止跨语言 Fallback**：任何字段禁止 `xx ?? en ?? zh` 式兜底。取不到就整块不渲染、不生成 URL、不进 Sitemap。
3. **禁止半成品上线**：数据不完整的内容不得出现在 sitemap、内链、页面。内容生产与发布彻底分离。
4. **正文必须 SSR**：给搜索引擎看的内容（正文/列表/表格/释义/FAQ）禁止放进 `"use client"` 组件。客户端组件只放交互控件。**自查标准：`curl 页面URL` 必须能看到完整正文（字节数 > 8KB）**。
5. **文案不许硬编码**：界面文案走集中字典（`messages/{locale}.ts` 或 JSON），组件禁止裸写字符串。
6. **未启用语言路径与不存在路径返回真 404**：禁止 catch-all 返回首页 200（Soft 404），未启用语言由中间件直接响应 HTTP 404。

---

## 📦 §1 全栈信息架构四象限契约 (4-Layer IA Architecture)

任何独立站页面的文字，必须严格归入对应层级并执行专门管理：

| 层次 | 覆盖范围 | 存储载体 | 工程铁律 |
| :--- | :--- | :--- | :--- |
| **L1: 界面框架文案层 (UI Shell)** | 导航、页脚、按钮、弹窗标题、通用提示 | `messages/{locale}/*.json` 分层字典 | 键值 100% 对齐，禁止在 JSX 中写死文字。 |
| **L2: 业务实体模型层 (Domain Entities)** | 产品列表、工具规则、配置参数、卡片数据 | `data/{entity}.ts` (支持多语言的 Schema) | **严禁单语种数据硬塞进多语言系统！** 实体必须将语言作为完整维度。 |
| **L3: 交互控制维度元数据 (Control Facets)** | 分类下拉、排序选项、状态 Badge | 集中字典或配置映射 | 严禁在代码中写死包含自然语言的常量数组，全部由字典动态驱动。 |
| **L4: 长文与 SEO 内容层 (Content Assets)** | 行业长文、合规指南、深度 FAQ | `content/{locale}/*.md` 独立文件 | 按语言完全物理隔离，绝不搞跨语言字段拼接。 |

### 数据模型标准范式
```typescript
type LocalizedEntry<T> = {
  id: string;              // 稳定的跨语言标识（slug/base_id，勿用文章 id）
  en: T;                   // 主语言内容：必填
  [locale: string]: T | undefined; // 其他语言：整块可选，缺 = 该语言无此条目
};
```

---

## 🚪 §2 就绪发布门禁 (The getEntryUrl Gate)

```typescript
function isBlockComplete(c: ContentBlock): boolean {
  return Boolean(
    c.title && c.body &&
    !containsBlockedTokens(JSON.stringify(c))
  );
}

function getEntryUrl(entry: LocalizedEntry<any>, locale: string): string | null {
  const block = entry[locale];
  if (!block || !isBlockComplete(block)) return null; // 缺一块直接不给 URL
  return `/${locale}/${entry.id}`;
}
```
* **铁律**：Sitemap、站内内链、推荐卡片、`<Link>` **全站统一只调用 `getEntryUrl`**。未就绪的半成品实体自动进不了任何公开入口。

---

## 🛡️ §3 UI 排版物理防线与字体抗撕裂规范

1. **字体防撕裂 (Anti-Tearing)**：
   * 针对越南语等复杂声调语言（ế, ặ, ở, ứ）优先声明 Latin Extended 字体（如 `Be Vietnam Pro`, `Inter`）。
   * **全局 CSS 字体栈中，西文/拉丁扩展字体之后，严禁紧接着声明 CJK 中日文字体（如 SimSun / 宋体）**，防止带调西文字母被当成全角汉字渲染导致“字缝巨大撕裂”。
   * 页面根节点必须动态同步 `<html lang="...">`。
2. **容器防暴流护身符**：
   * 德语、俄语、越南语词汇长度是英语的 1.5 ~ 2.5 倍。
   * **所有 Flex 容器中的 Badge/Pill/Tag 必须加 `shrink-0 whitespace-nowrap`**，左右对齐容器必须加 `gap-2`。
   * 按钮与卡片严禁硬编码固定宽度（如 `w-32`），必须使用自适应内边距（`px-4`）或 `min-w-[...]`。
3. **文案精炼度铁律 (Brevity)**：
   * 导航栏控制在 1~2 个单词，Badge / Pill 严格限制在 8 个字符以内，杜绝整句直译塞进小控件。

---

## 📋 §4 AI 协作交付与验收清单 (Checklist)

每次完成开发或修改后，AI 必须严格对照以下清单逐条核对：
- [ ] **SSR 检查**：`curl 页面URL` 能看到完整正文（非客户端 JS 空壳，HTML > 8KB）
- [ ] **Fallback 检查**：没写任何跨语言 fallback（无 `xx ?? en`）
- [ ] **纯净度检查**：目标语言内容 100% 通过黑名单 + 纯净度测试（无连续大段英文残留）
- [ ] **SEO 元标签**：每页 `<html lang>` / title / canonical 自指 / hreflang 双向配对 / JSON-LD 语言全对
- [ ] **发布门禁**：sitemap 只含 `getEntryUrl` 就绪 URL；未启用语言路径真 404
- [ ] **文案集中**：界面文案全走集中字典，零裸写字符串
- [ ] **防暴流检查**：所有 Badge 均配有 `shrink-0 whitespace-nowrap`，375px 小屏无挤压变形
- [ ] **测试门禁**：`npm run i18n:audit` 与 `npm run build` 全部跑绿才算完成

---

## 📁 关联参考与通用模板
* [通用项目开发规范模板 (给 AI 看)](references/universal-project-spec-template.md)
* [多语言防暴流踩坑实战手册](references/i18n-anti-slop-rules.md)
* [路由与中间件范式](references/routing-and-dict.md)
