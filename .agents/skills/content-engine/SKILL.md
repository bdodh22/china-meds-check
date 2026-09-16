---
name: content-engine
description: >-
  Generate high-ranking, high-converting SEO content, blog guides, comparison articles, and FAQ hubs for independent and foreign trade websites following Google E-E-A-T guidelines.
  Enforces search intent matching, structured data (Article/FAQPage JSON-LD), anti-AI-fluff tone, comparison tables, and internal linking strategies.
  Activate when writing new blog posts, drafting product comparison pages, creating guides, or expanding programmatic SEO content.
---

# 独立站 SEO 深度内容生产引擎 (content-engine)

本技能指导 Agent 为各类独立站（SaaS、外贸出海、垂直工具、联盟内容站）撰写符合 Google 顶尖排名标准的深度内容，直接瞄准搜索意图并最大化自然搜索转化。

---

## 1. 核心撰写铁律 (Google E-E-A-T & Anti-Fluff)

1. **坚决剔除“AI 废话废词”**：
   * 严禁陈词滥调的开头（如：“In today's fast-paced digital era...”、“Whether you are a beginner or an expert...”）。
   * 开门见山：第一段 3 句话内必须直接给出搜索意图的**核心答案 / 结论 (Direct Answer)**。
2. **Featured Snippet（精选摘要）收割位**：
   * 在正文前部放置精炼的 **Key Takeaways (核心要点速查盒)** 或 **Quick Verdict (快速结论卡片)**。Google 抓取算法极度偏好此结构，极易获得 SERP 第 0 位推荐。
3. **数据表格与对比矩阵 (Data Tables & Comparison)**：
   * 纯文字长文跳出率高。必须使用结构化 Markdown/HTML 表格呈现规格参数、法律门槛、价格方案或对比差异。
4. **权威引用与可溯源信源**：
   * 必须明确提及官方公报、监管机构（如海关总署 GACC、FDA、IATA）、行业标准协议，提升页面的 E-E-A-T 权重。

---

## 2. 搜索意图分类与内容模版 (Search Intent Architecture)

针对不同搜索意图，Agent 必须采用对应的页面架构：

| 搜索意图 | 典型关键词示例 | 推荐架构模板 | 核心 CTA 转化点 |
| :--- | :--- | :--- | :--- |
| **调研对比型 (Commercial)** | `Tool A vs Tool B`, `Best Alternatives to X` | **对比测评榜单**：功能评分表、优缺点 Pros/Cons、适用人群、最终选型建议 | 引导试用产品 A / 注册使用我方工具 |
| **问题解决型 (Informational)** | `Can I bring X to Y?`, `How to calculate Z` | **权威终极指南**：直接回答、法律界限、分步图文流程、常见误区避坑 | 免费下载 Checklist PDF / 使用在线计算器 |
| **交易意向型 (Transactional)** | `Buy X wholesale`, `Custom manufacturer` | **落地转化页**：核心卖点、规格参数、认证证书、真实客户案例 (Case Studies) | RFQ 立即询盘 / 预约演示 (Book Demo) |

---

## 3. 结构化数据标准 (JSON-LD Schemas)

每篇产出的文章或指南必须配齐 Schema.org 结构化数据：
* **`Article` 或 `MedicalWebPage`**：包含 `headline`, `author`, `datePublished`, `dateModified`。
* **`FAQPage`**：提取文末 3~5 个真实用户最关心的痛点问题与权威解答。
* **`BreadcrumbList`**：面包屑导航层级。

---

## 4. 内部链接与转化锚点 (Internal Linking & Contextual CTA)

* **情境锚点 (Contextual Links)**：正文中自然穿插指向站内其他核心工具（如计算器、申报卡、分类目录）的内链。
* **中场介入卡片 (Mid-Article Callout)**：长文浏览到 50% 处，插入一个视觉反差卡片（如“需要一键生成合规申报单吗？点击进入免费生成器”）。

---

## 5. 出海多语言内容生产闭环契约 (Universal i18n Content Protocol)

当为多语言独立站撰写或扩充内容时，必须无条件服从**独立站通用多语言工程落地总纲**：

1. **L4 内容资产物理隔离 (Physical Isolation)**：
   * 各语言长文与深度指南按目录物理隔离存储（如 `content/{locale}/*.md` 或 `content/{locale}/{slug}.json`），严禁跨语言字段拼接。
2. **§0.1 一语言一完整块 (100% Target Language Purity)**：
   * 在非英语内容（如 `/vi/`, `/ja/`, `/ko/`, `/ru/`）中，小标题、正文、Key Takeaways、FAQ、对比表格，必须整篇为 100% 目标语言原生表述。
   * **绝对禁止夹杂大段未翻译的英文句子**（国际监管标准专有名词除外，如 GACC、FDA、IATA）。
3. **就绪发布门禁 (Publishing Gate)**：
   * 严禁将只有 50% 翻译度或包含草稿占位符的内容推上线。
   * 只有完整翻译并校验通过的内容，才允许通过 `getEntryUrl` 生成 URL 并纳入 `sitemap.ts`。未就绪内容直接返回 HTTP 404。
4. **内链路由绝对闭环 (Internal Link Encapsulation)**：
   * 文章正文中的所有情境锚点、推荐阅读、工具链接，必须携带当前 `[locale]` 前缀或通过统一的 `getEntryUrl(entity, locale)` 动态获取，**严禁点击后跳回英文根目录**。
5. **结构化数据语言一致性 (Schema Language Parity)**：
   * `Article`、`FAQPage`、`MedicalWebPage` 中的 `inLanguage`、`headline`、`description` 及 FAQ 问答内容，必须与页面所属语言完全一致，绝不可页面是越南语而 Schema 还是英文。

