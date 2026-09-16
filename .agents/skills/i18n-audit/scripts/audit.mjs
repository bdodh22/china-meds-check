#!/usr/bin/env node

/**
 * Antigravity Indie Site Suite - Universal i18n Quality & Purity Gatekeeper
 * 
 * Enforces the Universal Indie Site i18n Protocol:
 * 1. [PARITY] Dictionary key parity across all enabled locales.
 * 2. [PASSTHROUGH] Component locale props passthrough integrity.
 * 3. [CLEANLINESS] Zero hardcoded English/raw text in templates.
 * 4. [CACHE] TanStack Query / SWR dynamic locale cache isolation.
 * 5. [BLOCKED] Blocked tokens, leaked key names, and draft placeholders.
 * 6. [PURITY] Rendered HTML language purity (destroys false positives by detecting raw English sentences in localized HTML output).
 * 7. [SSR_SIZE] Rendered HTML payload size check (guards against empty client shells).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function findProjectRoot(startDir) {
  let cur = startDir;
  while (cur && path.dirname(cur) !== cur) {
    if (fs.existsSync(path.join(cur, 'package.json')) && (fs.existsSync(path.join(cur, 'messages')) || fs.existsSync(path.join(cur, 'app')))) {
      return cur;
    }
    cur = path.dirname(cur);
  }
  return process.cwd();
}

const PROJECT_ROOT = findProjectRoot(__dirname);
const MESSAGES_DIR = path.join(PROJECT_ROOT, 'messages');
const APP_DIR = path.join(PROJECT_ROOT, 'app');
const COMPONENTS_DIR = path.join(PROJECT_ROOT, 'components');
const NEXT_SERVER_DIR = path.join(PROJECT_ROOT, '.next', 'server', 'app');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

// Flatten nested object keys
function getFlatKeys(obj, prefix = '') {
  let keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      keys = keys.concat(getFlatKeys(v, fullKey));
    } else {
      keys.push({ key: fullKey, value: v });
    }
  }
  return keys;
}

// 1. Audit Dictionary Key Parity
function auditDictionaries() {
  const results = { valid: true, locales: [], baseKeyCount: 0, mismatches: [] };
  if (!fs.existsSync(MESSAGES_DIR)) return results;

  const files = fs.readdirSync(MESSAGES_DIR).filter((f) => f.endsWith('.json'));
  if (!files.includes('en.json')) {
    results.mismatches.push('Missing baseline en.json dictionary in messages/');
    results.valid = false;
    return results;
  }

  const enRaw = fs.readFileSync(path.join(MESSAGES_DIR, 'en.json'), 'utf-8');
  let enObj = {};
  try {
    enObj = JSON.parse(enRaw);
  } catch (e) {
    results.mismatches.push(`Failed to parse en.json: ${e.message}`);
    results.valid = false;
    return results;
  }

  const enFlat = getFlatKeys(enObj);
  const enKeySet = new Set(enFlat.map((item) => item.key));
  results.baseKeyCount = enKeySet.size;

  for (const file of files) {
    const locale = path.basename(file, '.json');
    results.locales.push(locale);
    if (locale === 'en') continue;

    try {
      const raw = fs.readFileSync(path.join(MESSAGES_DIR, file), 'utf-8');
      const obj = JSON.parse(raw);
      const flat = getFlatKeys(obj);
      const locKeySet = new Set(flat.map((item) => item.key));

      const missing = [];
      for (const k of enKeySet) {
        if (!locKeySet.has(k)) missing.push(k);
      }

      const empty = flat.filter((item) => typeof item.value === 'string' && item.value.trim() === '').map((item) => item.key);

      if (missing.length > 0) {
        results.mismatches.push({ locale, type: 'MISSING_KEYS', count: missing.length, samples: missing.slice(0, 5) });
        results.valid = false;
      }
      if (empty.length > 0) {
        results.mismatches.push({ locale, type: 'EMPTY_VALUES', count: empty.length, samples: empty.slice(0, 5) });
        results.valid = false;
      }
    } catch (e) {
      results.mismatches.push({ locale, type: 'PARSE_ERROR', error: e.message });
      results.valid = false;
    }
  }

  return results;
}

// Recursively find files
function getFiles(dir, filterFn, list = []) {
  if (!fs.existsSync(dir)) return list;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && !entry.name.startsWith('.')) {
        getFiles(full, filterFn, list);
      }
    } else if (filterFn(entry.name)) {
      list.push(full);
    }
  }
  return list;
}

// 2. Check Locale Props Passthrough
function auditPropsPassthrough() {
  const localizedAppDir = path.join(APP_DIR, '[locale]');
  const issues = [];
  if (!fs.existsSync(localizedAppDir)) return issues;

  const files = getFiles(localizedAppDir, f => f.endsWith('.tsx') || f.endsWith('.jsx'));
  const targetComponents = [
    'AllowanceCalculatorWidget', 'DrugSpecSheet', 'DrugInlineCalculator',
    'TravelInsuranceCTA', 'ExpatClinicDirectoryCTA', 'DrugStatusBadge'
  ];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const relPath = path.relative(PROJECT_ROOT, file);

    for (const comp of targetComponents) {
      const tagRegex = new RegExp(`<${comp}\\s+([^>]*?)(\\/?>)`, 'gs');
      let match;
      while ((match = tagRegex.exec(content)) !== null) {
        const attrs = match[1];
        if (!attrs.includes('locale=') && !attrs.includes('locale:')) {
          const linesBefore = content.substring(0, match.index).split('\n').length;
          issues.push({
            file: relPath,
            line: linesBefore,
            component: comp,
            message: `<${comp}> invoked in localized route without explicit 'locale={locale}' prop!`,
          });
        }
      }
    }
  }
  return issues;
}

// 3. Check Hardcoded English Literals in TSX
function auditHardcodedLiterals() {
  const localizedAppDir = path.join(APP_DIR, '[locale]');
  const issues = [];
  if (!fs.existsSync(localizedAppDir)) return issues;

  const files = getFiles(localizedAppDir, f => f.endsWith('.tsx') || f.endsWith('.jsx'));
  const allowedTokens = new Set([
    'CAS', 'GACC', 'PRC', 'FDA', 'OTC', 'ADHD', 'SSRI', 'GLP-1', 'PVG', 'PEK', 'CAN', 'PKX',
    'SHA', 'N/A', 'ISO', 'JSON', 'CSS', 'HTML', 'URL', 'CTA', 'VIP', 'USD', 'CNY', 'RMB'
  ]);

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const relPath = path.relative(PROJECT_ROOT, file);
    const lines = content.split('\n');

    lines.forEach((line, idx) => {
      const jsxTextRegex = />\s*([A-Za-z][A-Za-z0-9 ,.:'()!?-]{15,})\s*</g;
      let match;
      while ((match = jsxTextRegex.exec(line)) !== null) {
        const text = match[1].trim();
        if (text.includes('{') || text.includes('}') || text.startsWith('/*')) continue;
        const words = text.split(/\s+/);
        if (words.length >= 3) {
          const isAllAllowed = words.every(w => allowedTokens.has(w.toUpperCase()));
          if (!isAllAllowed) {
            issues.push({ file: relPath, line: idx + 1, text });
          }
        }
      }
    });
  }
  return issues;
}

// 4. Check Query Cache Key Binding
function auditQueryKeys() {
  const issues = [];
  const allFiles = getFiles(PROJECT_ROOT, f => (f.endsWith('.tsx') || f.endsWith('.ts')) && !f.includes('node_modules') && !f.includes('.next'));

  for (const file of allFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const relPath = path.relative(PROJECT_ROOT, file);
    const queryRegex = /useQuery\(\s*\[([^\]]+)\]/g;
    let match;
    while ((match = queryRegex.exec(content)) !== null) {
      const keys = match[1];
      if (!keys.includes('locale') && !keys.includes('lang')) {
        const linesBefore = content.substring(0, match.index).split('\n').length;
        issues.push({
          file: relPath,
          line: linesBefore,
          pattern: `useQuery([${keys.trim()}])`,
          message: 'Client queryKey misses dynamic locale binding. May cause stale English cache on language switch.',
        });
      }
    }
  }
  return issues;
}

// 5. Check Blocked Tokens in Rendered Outputs or Code
function auditBlockedTokens() {
  const issues = [];
  const BLOCKED = [
    'undefined', '[object Object]', 'NaN', 'TODO:', 'FIXME:',
    'Lorem ipsum', 'Translation missing'
  ];

  const files = getFiles(path.join(PROJECT_ROOT, 'data'), f => f.endsWith('.json') || f.endsWith('.ts'));

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const relPath = path.relative(PROJECT_ROOT, file);
    for (const token of BLOCKED) {
      if (content.includes(token)) {
        issues.push({ file: relPath, token, message: `Found blocked/placeholder token: "${token}"` });
      }
    }
  }
  return issues;
}

// 6. Post-Build Rendered HTML Language Purity & SSR Size Check (The Ultimate Truth Tester)
function auditRenderedHtml() {
  const results = { checked: false, purityIssues: [], emptyShells: [] };
  if (!fs.existsSync(NEXT_SERVER_DIR)) return results;

  results.checked = true;
  const htmlFiles = getFiles(NEXT_SERVER_DIR, f => f.endsWith('.html'));

  const allowedTechnicalWords = new Set([
    'ADHD', 'ADDERALL', 'CONCERTA', 'RITALIN', 'VYVANSE', 'XANAX', 'VALIUM', 'AMBIEN',
    'OZEMPIC', 'WEGOVY', 'MOUNJARO', 'METFORMIN', 'INSULIN', 'LIPITOR', 'CAS', 'GACC',
    'PRC', 'FDA', 'CAN', 'PVG', 'PEK', 'PKX', 'CAN', 'TERMINAL', 'COVID-19', 'INN', 'OTC'
  ]);

  for (const htmlFile of htmlFiles) {
    const relPath = path.relative(PROJECT_ROOT, htmlFile);
    // Only test non-English locale routes, e.g., .next/server/app/[locale]/... or /ja/, /vi/, /ko/, /ru/
    const isSubLocale = ['/ja/', '/ko/', '/ru/', '/vi/', '\\ja\\', '\\ko\\', '\\ru\\', '\\vi\\'].some(loc => htmlFile.includes(loc));
    if (!isSubLocale) continue;

    const stats = fs.statSync(htmlFile);
    if (stats.size < 5000) {
      results.emptyShells.push({ file: relPath, size: stats.size, message: `HTML size is only ${stats.size} bytes (possible SSR empty shell)` });
    }

    const rawHtml = fs.readFileSync(htmlFile, 'utf-8');
    // Strip scripts, styles, SVGs
    const cleanText = rawHtml
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
      .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&[a-z]+;/gi, ' ');

    // Match continuous long English sentences (more than 10 consecutive ASCII words)
    const longEnglishRegex = /\b([A-Za-z]{3,}(?:\s+[A-Za-z]{2,}){9,})\b/g;
    let match;
    while ((match = longEnglishRegex.exec(cleanText)) !== null) {
      const sentence = match[1].trim();
      const words = sentence.split(/\s+/);
      const isMostlyAllowed = words.filter(w => allowedTechnicalWords.has(w.toUpperCase())).length > words.length * 0.5;
      if (!isMostlyAllowed && sentence.length > 50) {
        results.purityIssues.push({
          file: relPath,
          snippet: sentence.substring(0, 80) + '...',
          message: 'Rendered localized HTML contains raw English sentence block!'
        });
        break; // Only report once per page to avoid flooding
      }
    }
  }

  return results;
}

// Main Runner
function run() {
  console.log(`\n${colors.cyan}${colors.bright}🌐 [Antigravity Universal i18n Suite] 独立站通用多语言工程闭环审计${colors.reset}\n`);

  let hasFatal = false;

  // 1. Dictionaries
  const dictResults = auditDictionaries();
  if (dictResults.valid) {
    console.log(`${colors.green}✔ [§0.5 & §1 PARITY] 字典键值 100% 对齐${colors.reset} (基准 en: ${dictResults.baseKeyCount} 键值, 覆盖: ${dictResults.locales.join(', ')})`);
  } else {
    hasFatal = true;
    console.log(`${colors.red}✖ [§0.5 & §1 PARITY] 字典存在缺失或格式错误:${colors.reset}`);
    for (const m of dictResults.mismatches) {
      console.log(`  ├─ ${typeof m === 'string' ? m : `[${m.locale}] ${m.type}: ${m.count} 处问题 (如: ${m.samples.join(', ')})`}`);
    }
  }

  // 2. Props Passthrough
  const passthroughIssues = auditPropsPassthrough();
  if (passthroughIssues.length === 0) {
    console.log(`${colors.green}✔ [§0.1 PASSTHROUGH] 核心组件 locale 参数透传闭环${colors.reset}`);
  } else {
    hasFatal = true;
    console.log(`${colors.red}✖ [§0.1 PASSTHROUGH] 发现 ${passthroughIssues.length} 处子组件漏传 locale 参数:${colors.reset}`);
    for (const issue of passthroughIssues) {
      console.log(`  ├─ ${colors.yellow}${issue.file}:${issue.line}${colors.reset} -> ${issue.message}`);
    }
  }

  // 3. Hardcoded Literals
  const literalIssues = auditHardcodedLiterals();
  if (literalIssues.length === 0) {
    console.log(`${colors.green}✔ [§0.5 CLEANLINESS] JSX 模板零裸露硬编码英文${colors.reset}`);
  } else {
    console.log(`${colors.yellow}⚠ [§0.5 CLEANLINESS] 发现 ${literalIssues.length} 处疑似未包裹字典的裸露英文文本:${colors.reset}`);
    for (const issue of literalIssues.slice(0, 5)) {
      console.log(`  ├─ ${colors.gray}${issue.file}:${issue.line}${colors.reset} -> "${colors.bright}${issue.text}${colors.reset}"`);
    }
  }

  // 4. Query Cache Keys
  const queryIssues = auditQueryKeys();
  if (queryIssues.length === 0) {
    console.log(`${colors.green}✔ [CACHE] 客户端数据缓存键动态隔离正常${colors.reset}`);
  } else {
    hasFatal = true;
    console.log(`${colors.red}✖ [CACHE] 发现 ${queryIssues.length} 处客户端缓存隔离隐患:${colors.reset}`);
    for (const issue of queryIssues) {
      console.log(`  ├─ ${colors.yellow}${issue.file}:${issue.line}${colors.reset} -> ${issue.message}`);
    }
  }

  // 5. Blocked Tokens
  const tokenIssues = auditBlockedTokens();
  if (tokenIssues.length === 0) {
    console.log(`${colors.green}✔ [§3 BLOCKED] 数据层无占位符或键名泄露${colors.reset}`);
  } else {
    hasFatal = true;
    console.log(`${colors.red}✖ [§3 BLOCKED] 发现 ${tokenIssues.length} 处占位符或未翻译标记:${colors.reset}`);
    for (const issue of tokenIssues) {
      console.log(`  ├─ ${colors.yellow}${issue.file}${colors.reset} -> ${issue.message}`);
    }
  }

  // 6. Post-Build Rendered HTML Purity & Payload
  const htmlResults = auditRenderedHtml();
  if (htmlResults.checked) {
    if (htmlResults.purityIssues.length === 0 && htmlResults.emptyShells.length === 0) {
      console.log(`${colors.green}✔ [§0.1 & §5 PURITY] 编译产物 HTML 语言纯净度与 SSR 载荷 100% 达标${colors.reset}`);
      console.log(`  └─ 已完成 .next/ 真实产物扫描：未发现大段未翻译英文正文，无空壳页面`);
    } else {
      if (htmlResults.purityIssues.length > 0) {
        console.log(`${colors.yellow}⚠ [§0.1 PURITY] 产物 HTML 中检测到 ${htmlResults.purityIssues.length} 个页面包含未翻译英文长句 (数据层需进一步多语言化):${colors.reset}`);
        for (const issue of htmlResults.purityIssues.slice(0, 5)) {
          console.log(`  ├─ ${colors.gray}${issue.file}${colors.reset} -> "${issue.snippet}"`);
        }
      }
      if (htmlResults.emptyShells.length > 0) {
        hasFatal = true;
        console.log(`${colors.red}✖ [§5 SSR_SIZE] 检测到 ${htmlResults.emptyShells.length} 个空壳页面 (HTML < 5KB):${colors.reset}`);
        for (const shell of htmlResults.emptyShells) {
          console.log(`  ├─ ${shell.file} (${shell.size} bytes)`);
        }
      }
    }
  } else {
    console.log(`${colors.dim}ℹ [PURITY] 未检测到 .next 编译产物，跳过产物级纯度照妖镜 (运行 npm run build 后可执行全量断言)${colors.reset}`);
  }

  console.log(`\n${colors.bright}=================== i18n 质量审计统计 ===================${colors.reset}`);
  console.log(`字典对齐状态: ${dictResults.valid ? colors.green + '通过 (100%)' : colors.red + '未通过'}${colors.reset}`);
  console.log(`组件参数透传: ${passthroughIssues.length === 0 ? colors.green + '全部闭环' : colors.red + `${passthroughIssues.length} 处断流`}${colors.reset}`);
  console.log(`模板裸露检查: ${literalIssues.length === 0 ? colors.green + '0 残留' : colors.yellow + `${literalIssues.length} 处提示`}${colors.reset}`);
  console.log(`客户端缓存键: ${queryIssues.length === 0 ? colors.green + '无污染' : colors.red + `${queryIssues.length} 处隐患`}${colors.reset}`);
  console.log(`数据占位检测: ${tokenIssues.length === 0 ? colors.green + '无泄露' : colors.red + `${tokenIssues.length} 处违规`}${colors.reset}`);
  console.log(`综合体检判定: ${!hasFatal ? colors.green + colors.bright + 'HEALTHY (可以上线)' : colors.red + colors.bright + 'FAILED (阻断上线)'}${colors.reset}`);
  console.log(`${colors.bright}========================================================${colors.reset}\n`);

  if (hasFatal) process.exit(1);
  else process.exit(0);
}

run();
