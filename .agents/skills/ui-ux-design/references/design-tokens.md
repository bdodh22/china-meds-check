# 现代独立站 UI 设计令牌与 Tailwind 配方速查 (Design Tokens)

本文件汇总了适用于高质感外贸站、SaaS 独立站与工具站的经典 Tailwind 组合配方。

---

## 1. 经典色彩体系 (Neutral + Accent)

```tsx
// 1. 冷灰色系（Slate）- 适合医药、合规、海关、B2B外贸
const themeSlate = {
  bgPage: 'bg-slate-50 text-slate-900',
  card: 'bg-white border border-slate-200 shadow-sm',
  textMuted: 'text-slate-500',
  textHeading: 'text-slate-900',
  accentPrimary: 'bg-blue-600 hover:bg-blue-500 text-white',
  accentSuccess: 'bg-emerald-600 hover:bg-emerald-500 text-white',
  accentWarning: 'bg-amber-500 text-white',
  accentDanger: 'bg-rose-600 text-white',
};

// 2. 极简黑白灰（Zinc）- 适合科技感、AI、SaaS
const themeZinc = {
  bgPage: 'bg-zinc-50 text-zinc-900',
  card: 'bg-white border border-zinc-200 shadow-sm',
  accentPrimary: 'bg-zinc-900 hover:bg-zinc-800 text-white',
};
```

---

## 2. 常用结构组件样式配方

### A. 权威通告栏 / 信任胶囊 (Trust Pill Badge)
```tsx
<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold shadow-xs">
  <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
  <span>Updated for 2025 China Customs & GACC Regulations</span>
</div>
```

### B. 高质感信息卡片 (Elevated Card)
```tsx
<div className="group bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200">
  <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
    {/* Lucide Icon */}
  </div>
  <h3 className="text-base font-bold text-slate-900 mb-1.5">Card Heading</h3>
  <p className="text-xs text-slate-600 leading-relaxed">
    Detailed concise explanation with comfortable line spacing.
  </p>
</div>
```

### C. 强转化主操作按钮 (Primary CTA)
```tsx
<button className="h-12 px-6 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2">
  <span>Check Legality Radar</span>
  <ArrowRight className="h-4 w-4" />
</button>
```

### D. 次操作幽灵按钮 (Secondary Ghost Button)
```tsx
<button className="h-12 px-6 rounded-xl font-bold text-sm bg-white hover:bg-slate-50 active:scale-[0.98] text-slate-700 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all duration-200 flex items-center justify-center gap-2">
  <span>Download Checklist</span>
</button>
```

### E. 移动端吸底操作栏 (Sticky Mobile Bottom Bar)
```tsx
<div className="fixed bottom-0 inset-x-0 bg-white/90 backdrop-blur-md border-t border-slate-200 p-3 sm:hidden z-50 flex items-center justify-between gap-3 shadow-lg">
  <div className="flex flex-col pl-1">
    <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Status Check</span>
    <span className="text-xs font-black text-slate-900">Adderall 30mg</span>
  </div>
  <button className="px-4 py-2.5 rounded-xl font-bold text-xs bg-blue-600 text-white shadow-sm flex items-center gap-1.5">
    <span>Generate Card</span>
    <ChevronRight className="h-3.5 w-3.5" />
  </button>
</div>
```
