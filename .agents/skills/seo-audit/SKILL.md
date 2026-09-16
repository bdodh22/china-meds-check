---
name: seo-audit
description: Automatically audit Next.js App Router pages for SEO compliance, including TDK lengths, OpenGraph metadata, canonical URLs, H1 tags, schema markup (JSON-LD), and sitemap integrity. Use whenever auditing SEO, writing or updating pages, or validating production readiness.
---

# Next.js 独立站 SEO 专属审计技能 (seo-audit)

本技能专为 Next.js 14+ App Router 独立站定制，帮助 Agent 和开发者确保每一个上线页面都达到 Google 顶尖的 SEO 收录与排名标准。

---

## 触发时机 (Activation Triggers)
当满足以下任一情况时，应主动调用或运行此技能：
1. 用户要求“检查 SEO”、“做 SEO 审计”、“优化 TDK”或“检查标题和描述”。
2. 新建或重构了任意 `app/**/page.tsx` 页面。
3. 准备进行版本上线或构建部署前。

---

## 核心执行流程

### 第一步：运行自动化审计脚本
在项目根目录运行预置脚本：
```bash
node .agents/skills/seo-audit/scripts/audit.mjs
# 或
npm run seo:audit
```

### 第二步：根据体检结果进行针对性修复

1. **Title（标题）优化原则**：
   * 标准长度：**35 ~ 60 字符**。
   * 过短（< 35）：往往缺少修饰词或品牌词。补充核心长尾词，格式建议：`[核心关键词/意图] - [品牌或卖点]`。
   * 过长（> 65）：在 Google SERP 搜索结果页会被截断（出现省略号）。精简冗余介词，保留最核心的搜索词。

2. **Description（描述）优化原则**：
   * 标准长度：**110 ~ 160 字符**。
   * 过短（< 110）：无法充分展示页面价值，降低点击率（CTR）。补充 1~2 个关键痛点解决说明。
   * 过长（> 165）：超出移动端或桌面端显示限制。提炼核心卖点并以强有力行动号召（Call To Action）收尾。

3. **H1 标签唯一性**：
   * 每个页面必须且只能有 1 个 `<h1>`。
   * 如果扫描显示 0 个：在页面核心主视觉/Hero 区域添加语义化的 `<h1>`。
   * 如果扫描显示多个：将副标题或卡片标题降级为 `<h2>` 或 `<h3>`。

4. **Sitemap 自动补齐**：
   * 若提示 `Route not registered in app/sitemap.ts`，打开 `app/sitemap.ts`，在 `staticRoutes` 数组中添加对应条目，注明更新频率与优先级权重。

5. **JSON-LD 结构化数据校验**：
   * 详情页/指南页需包含合规的 Schema.org 标记（如 `MedicalWebPage`, `Article`, `FAQPage`, `BreadcrumbList`）。

---

## 输出报告规范
审计完成后，向用户提供清晰的整改建议对照表：
| 页面路由 | 问题类型 | 当前内容 | 优化建议 |
| :--- | :--- | :--- | :--- |
| `/guide/sample` | Title 过短 | `Guide` (5 chars) | `Complete Guide to China Customs Drug Rules | ChinaMedsCheck` (56 chars) |
