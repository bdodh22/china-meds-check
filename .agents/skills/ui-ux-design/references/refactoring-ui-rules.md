# 《Refactoring UI》与反 AI 味设计工程法则 (Refactoring UI & Anti-AI Rules)

本文件汇编了来自 Tailwind 团队与顶级出海独立站的“反 AI 味”设计工程实战法则。

---

## 一、反 AI 味负面清单 (Negative Constraints)

1. **绝对禁止全幅深黑/大色块拼接**：
   * 严禁在浅色页面中突兀插入一个全黑（如 `bg-slate-900`）的大底板，制造浓重的“运维控制台/初级程序员”气息。
   * 界面应基于统一的明度基底（如纯白 `bg-white` 配合细腻的微暖灰 `bg-slate-50/70`），通过微弱明度差与发丝描边区分层级。
2. **绝对禁止平铺未经编辑的数据库字段**：
   * 严禁把 CAS 号、海关文件代号、全套药理学参数等次要信息与主结论等权展示。
   * 遵循 **“ glanceable first, details on-demand（先扫视、按需点开）”** 原则。
3. **绝对禁止生硬深色黑边框**：
   * 杜绝使用 `border-2 border-slate-400` 或高对比度边线。现代边框采用极度克制的浅透灰：`border border-slate-250/70 dark:border-white/10`。
4. **绝对禁止居中 3 个完全雷同的大方块**：
   * 采用 **Bento Grid（便签网格）**：让不同权重的卡片拥有不同宽高、不同内部排版（一大三小、横纵对比）。

---

## 二、《Refactoring UI》核心视觉设计法则

### 1. 排印即界面 (Typography as Interface)
* **80% 的高级感来自字阶与字重的反差**：
  * **主指标**：必须大而果断（`text-3xl sm:text-4xl font-black tracking-tight text-slate-900`）。
  * **辅助说明**：必须小而克制（`text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono`）。
* **字间距微调**：大字号标题必须使用紧凑字间距 `tracking-tight`，避免松散；英文字符在小标签上必须适当大写加宽 `tracking-wider`。

### 2. 层次感来自光影，而非纯线条 (Depth without Harsh Lines)
* **多层环境柔和阴影**：
  ```css
  /* 现代卡片微阴影配方 */
  shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.03)]
  ```
* **微半透明毛玻璃**：
  ```css
  bg-white/80 backdrop-blur-md border border-slate-200/70
  ```

### 3. 颜色克制律 (Accent Color Restraint)
* 整个视口只允许有**一个核心强调色**。
* 状态颜色（红、黄、绿）必须经过降噪处理（采用 Soft Tint 配方：淡色微底 + 鲜明文字）：
  * **禁止**：刺眼大红底白字 `bg-red-600 text-white`
  * **推荐**：通透微胶囊 `bg-rose-50 text-rose-700 border border-rose-200/80`
