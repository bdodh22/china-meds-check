---
name: firecrawl
description: >-
  Firecrawl provides AI agents with fast, reliable web context through web search,
  deep scraping, JavaScript page rendering, document parsing, and competitor research.
  Activate this skill when scraping external competitor sites, extracting rich markdown,
  or conducting automated web research.
---

# Firecrawl 竞品与网页深度抓取技能

本技能利用 Firecrawl 强大的爬虫与内容清洗能力，帮助 Agent 获取高质量的竞品独立站结构、TDK 关键词、正文文案与 Schema 标记。

---

## 凭证与环境 (Authentication)

* **API Key**：已在全局 MCP 配置 (`~/.gemini/config/mcp_config.json`) 及环境内配置。
* **额度状态**：1,000 Credits / 月周期。
* **主要运行方式**：
  1. **MCP 工具调用**：通过已注册的 `firecrawl` MCP 服务器（直接调用 `firecrawl_scrape`, `firecrawl_search` 等工具）。
  2. **CLI 命令行**：
     ```powershell
     $env:FIRECRAWL_API_KEY="fc-7b9f6c24830d40518d73e561ed8a96fe"
     npx.cmd -y firecrawl-cli@latest scrape "https://example.com" -o .firecrawl/output.md
     ```

---

## 典型使用场景 (Use Cases)

### 1. 竞品落地页深度抓取与分析
当需要分析竞品独立站的产品页或文章页时：
* 抓取目标 URL，输出纯净的 Markdown 文档。
* 提取其 Head 区域的 `<title>`、`<meta name="description">`、`<meta property="og:*">`。
* 提取其全部 `<h1>`、`<h2>` 层级结构，剖析其内容大纲与 SEO 关键词词频。

### 2. 批量搜集与对比
* 使用 `firecrawl search "<query>"` 搜集与当前外贸业务相关的海外高排名落地页。
* 对比竞品与我方页面的内容完整度、FAQ 覆盖率及无障碍属性。

### 3. 本地文档解析 (Parse)
* 支持将本地的 PDF、DOCX、XLSX 药品监管规则文件或海关文件一键转为 Markdown，辅助生成页面内容。
