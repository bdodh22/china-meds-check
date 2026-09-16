---
name: i18n-audit
description: >-
  Automatically audit and diagnose multi-language internationalization (i18n) quality for Next.js independent websites without Babel dependencies.
  Checks dictionary key parity across all languages, detects raw/unwrapped hardcoded English text in localized routes, verifies props passthrough of locale to interactive components, validates TanStack Query/SWR cache key locale isolation, asserts post-build rendered HTML language purity, and guards against empty SSR shells.
  Activate when auditing multi-language pages, debugging "nav changed but content stays English" defects, or validating production release readiness.
---

# 多语言国际化质量与产物纯度审计技能 (i18n-audit)

本技能为 Antigravity 提供完全原生、零 Babel 侵入的自动化 i18n 质量与产物纯度审计引擎。
**专治“导航栏变了但内容没变”、“部分卡片漏翻显示纯英文”、“源码看似全绿但页面生成出整段英文”、“客户端缓存污染导致切语言不刷新”等出海独立站恶疾。**

---

## 1. 核心审计六维度 (6 Audit Dimensions)

1. **[PARITY] 字典键值 100% 对齐审查**：
   * 以 `en.json` 为基准，自动递归扫描所有兄弟语言（`ja.json`, `ko.json`, `ru.json`, `vi.json` 等）。
   * 严格排查是否有缺失的 key、空字符串或者格式解析错误。
2. **[PASSTHROUGH] 核心组件 `locale` 透传审查**：
   * 自动扫描 `app/[locale]/` 路由树下的页面。
   * 检查所有支持国际化的核心组件是否显式传入了 `locale={locale}`，杜绝由于漏传参数导致的子组件默认回退（Fallback）到英文。
3. **[CLEANLINESS] 模板裸露硬编码英文审查**：
   * 自动扫描 TSX 模板，检测是否有未用字典变量包裹的裸露英文长句子。
4. **[CACHE] 客户端缓存隔离审查**：
   * 扫描 `useQuery` / `useSWR` 调用，确保 queryKey 中必须挂载当前 `locale`，杜绝客户端内存缓存污染。
5. **[BLOCKED] 占位符与黑名单标记审查**：
   * 扫描数据层中是否存在 `undefined`, `[object Object]`, `NaN`, `TODO:`, `Lorem ipsum` 等未处理占位符。
6. **[PURITY & SSR_SIZE] 编译产物 HTML 语言纯净度与载荷检查（终极照妖镜）**：
   * 在构建后直接读取 `.next/server/app/[locale]/...` 下的所有生成的真实 HTML 文件。
   * 纯文本扫描：在小语种页面中检测是否包含连续出现的大段纯英文句子（彻底打碎源码假绿标）。
   * 载荷检查：HTML 文件大小必须 > 5KB，杜绝客户端空壳页面上线。

---

## 2. 自动化执行方式 (Execution Command)

在项目终端运行：
```bash
npm run i18n:audit
# 或
node .agents/skills/i18n-audit/scripts/audit.mjs
```

### 退出码规则 (Exit Codes)
* **`0`**：全部检查通过，字典完全对齐，组件透传完整，无缓存污染，产物纯度合规，允许上线。
* **`1`**：存在致命阻断项（字典缺失 key、组件漏传 locale 导致回退、缓存隔离失效、产物空壳），强制中断上线流程并报告具体文件与行号。

---

## 3. “切语言内容没变”四大元凶速查 SOP

当用户或测试反馈“切换语言后内容不刷新”时，Agent 应直接执行以下排查：

1. **查 Props 截断**：
   * 父组件 `params.locale` 获取正确，但传给子组件时写成了 `<ChildWidget />`（漏了 `locale={locale}`）。
2. **查 Query 缓存键**：
   * 客户端请求写成了 `useQuery(['data'], ...)`，切语言时命中旧语言内存缓存。必须改为 `useQuery(['data', locale], ...)`。
3. **查数据模型多语言化**：
   * 业务数据（`data/*.json` 或 CMS）是否根本没有提供小语种翻译，导致变量直接吐出了英文。
4. **查字典未翻译**：
   * 非英语字典中的某个 key 直接复制了英文原文，导致虽然读取了字典，但显示出来的依然是英文。
