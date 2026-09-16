#!/usr/bin/env node

/**
 * ChinaMedsCheck / Next.js Independent Site SEO Auditor
 * Scans all page.tsx files under app/ for TDK lengths, H1 uniqueness, OpenGraph, and sitemap registration.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function findProjectRoot(startDir) {
  let cur = startDir;
  while (cur && path.dirname(cur) !== cur) {
    if (fs.existsSync(path.join(cur, 'package.json')) && fs.existsSync(path.join(cur, 'app'))) {
      return cur;
    }
    cur = path.dirname(cur);
  }
  return process.cwd();
}

const PROJECT_ROOT = findProjectRoot(__dirname);
const APP_DIR = path.join(PROJECT_ROOT, 'app');
const SITEMAP_FILE = path.join(APP_DIR, 'sitemap.ts');

const SEO_RULES = {
  title: { min: 35, max: 65 },
  description: { min: 110, max: 165 },
};

// ANSI color helpers
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

function getAllPages(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      if (file.name !== 'api' && !file.name.startsWith('.')) {
        getAllPages(fullPath, fileList);
      }
    } else if (file.name === 'page.tsx' || file.name === 'page.jsx' || file.name === 'page.js') {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function parseSitemapRoutes() {
  if (!fs.existsSync(SITEMAP_FILE)) return new Set();
  const content = fs.readFileSync(SITEMAP_FILE, 'utf-8');
  const routes = new Set();

  // match url: baseUrl, BASE_URL, or `${BASE_URL}...`
  const baseMatches = content.match(/url:\s*(?:baseUrl|BASE_URL|`\${(?:baseUrl|BASE_URL)}([^`]*)`|['"]([^'"]+)['"])/g) || [];
  for (const m of baseMatches) {
    if (m.match(/url:\s*(?:baseUrl|BASE_URL)\b/)) {
      routes.add('/');
    }
    const pathMatch = m.match(/`\${(?:baseUrl|BASE_URL)}([^`]*)`/);
    if (pathMatch) {
      routes.add(pathMatch[1] || '/');
    }
  }

  // match path: '/...' in sitemap subpaths
  const pathMatches = content.matchAll(/path:\s*['"]([^'"]+)['"]/g);
  for (const m of pathMatches) {
    routes.add(m[1]);
  }

  return routes;
}

function findH1InFileAndComponents(filePath, content, checkedFiles = new Set()) {
  if (checkedFiles.has(filePath)) return 0;
  checkedFiles.add(filePath);

  const h1Matches = content.match(/<h1[\s>]/gi) || [];
  let count = h1Matches.length;

  if (count === 0) {
    // Check imported local components: @/components/... or ./...
    const importMatches = content.matchAll(/import\s+([A-Za-z0-9_{}\s,]+)\s+from\s+['"]([^'"]+)['"]/g);
    for (const match of importMatches) {
      const importPath = match[2];
      let resolvedPath = null;

      if (importPath.startsWith('@/')) {
        resolvedPath = path.join(PROJECT_ROOT, importPath.slice(2));
      } else if (importPath.startsWith('.')) {
        resolvedPath = path.resolve(path.dirname(filePath), importPath);
      }

      if (resolvedPath) {
        const candidates = [
          resolvedPath + '.tsx',
          resolvedPath + '.jsx',
          resolvedPath + '.js',
          path.join(resolvedPath, 'index.tsx'),
          path.join(resolvedPath, 'index.jsx'),
          path.join(resolvedPath, 'index.js'),
        ];
        for (const cand of candidates) {
          if (fs.existsSync(cand) && !cand.includes('node_modules')) {
            const childContent = fs.readFileSync(cand, 'utf-8');
            count += findH1InFileAndComponents(cand, childContent, checkedFiles);
            if (count > 0) break;
          }
        }
      }
      if (count > 0) break;
    }
  }

  return count;
}

function extractMetadata(content, filePath) {
  const meta = {
    title: null,
    description: null,
    isDynamic: false,
    hasOG: false,
    h1Count: 0,
  };

  if (content.includes('generateMetadata')) {
    meta.isDynamic = true;
  }

  // Check H1 occurrences with component lookahead
  meta.h1Count = findH1InFileAndComponents(filePath, content);

  // Extract static title if not dynamic
  if (!meta.isDynamic) {
    const titleMatch = content.match(/title:\s*(?:'([^'\\]*(?:\\.[^'\\]*)*)'|"([^"\\]*(?:\\.[^"\\]*)*)"|`([^`\\]*(?:\\.[^`\\]*)*)`|{\s*default:\s*['"]([^'"]+)['"])/);
    if (titleMatch) {
      meta.title = titleMatch[1] || titleMatch[2] || titleMatch[3] || titleMatch[4] || null;
    }

    const descMatch = content.match(/description:\s*(?:'([^'\\]*(?:\\.[^'\\]*)*)'|"([^"\\]*(?:\\.[^"\\]*)*)"|`([^`\\]*(?:\\.[^`\\]*)*)`)/);
    if (descMatch) {
      meta.description = (descMatch[1] || descMatch[2] || descMatch[3] || '').replace(/\s+/g, ' ').trim();
    }
  }

  // Check OpenGraph
  if (content.includes('openGraph:') || content.includes('openGraph :')) {
    meta.hasOG = true;
  }

  return meta;
}

function auditPage(filePath, sitemapRoutes) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relativePath = path.relative(APP_DIR, filePath).replace(/\\/g, '/');
  let route = '/' + relativePath.replace(/\/page\.tsx$/, '').replace(/^page\.tsx$/, '');
  if (route === '//') route = '/';

  const meta = extractMetadata(content, filePath);
  const issues = [];

  // Title Audit
  if (meta.isDynamic) {
    // Dynamic metadata (e.g. [slug])
  } else if (!meta.title) {
    issues.push({ type: 'error', message: 'Missing Title in metadata' });
  } else {
    const len = meta.title.length;
    if (len < SEO_RULES.title.min) {
      issues.push({ type: 'warning', message: `Title too short (${len} chars, min ${SEO_RULES.title.min})` });
    } else if (len > SEO_RULES.title.max) {
      issues.push({ type: 'warning', message: `Title too long (${len} chars, max ${SEO_RULES.title.max})` });
    }
  }

  // Description Audit
  if (!meta.isDynamic) {
    if (!meta.description) {
      issues.push({ type: 'error', message: 'Missing Description in metadata' });
    } else {
      const len = meta.description.length;
      if (len < SEO_RULES.description.min) {
        issues.push({ type: 'warning', message: `Description too short (${len} chars, min ${SEO_RULES.description.min})` });
      } else if (len > SEO_RULES.description.max) {
        issues.push({ type: 'warning', message: `Description too long (${len} chars, max ${SEO_RULES.description.max})` });
      }
    }
  }

  // H1 Audit
  if (meta.h1Count === 0) {
    issues.push({ type: 'warning', message: 'No <h1> tag detected in page' });
  } else if (meta.h1Count > 1) {
    issues.push({ type: 'warning', message: `Multiple (${meta.h1Count}) <h1> tags found` });
  }

  // Sitemap Audit
  const isDynamicRoute = route.includes('[');
  let inSitemap = false;
  if (isDynamicRoute) {
    inSitemap = true; // Dynamic routes handled via mapper in sitemap.ts
  } else {
    inSitemap = sitemapRoutes.has(route);
    if (!inSitemap) {
      issues.push({ type: 'warning', message: `Route not registered in app/sitemap.ts` });
    }
  }

  return {
    route,
    filePath: relativePath,
    meta,
    issues,
    passed: issues.length === 0,
  };
}

function run() {
  let siteName = 'Next.js 独立站';
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(PROJECT_ROOT, 'package.json'), 'utf-8'));
    if (pkg.name) siteName = pkg.name;
  } catch (e) {}
  console.log(`\n${colors.bright}${colors.cyan}🔍 [${siteName}] Next.js 独立站 SEO 自动化审计${colors.reset}\n`);

  const pages = getAllPages(APP_DIR);
  const sitemapRoutes = parseSitemapRoutes();

  let totalPages = pages.length;
  let perfectPages = 0;
  let totalWarnings = 0;
  let totalErrors = 0;

  for (const pagePath of pages) {
    const result = auditPage(pagePath, sitemapRoutes);
    const hasIssues = result.issues.length > 0;

    if (!hasIssues) {
      perfectPages++;
      console.log(`${colors.green}✔ [PERFECT]${colors.reset} ${colors.bright}${result.route}${colors.reset}`);
      if (result.meta.isDynamic) {
        console.log(`  ${colors.dim}├─ Dynamic Metadata: generateMetadata()${colors.reset}`);
      } else {
        console.log(`  ${colors.dim}├─ Title: "${result.meta.title}" (${result.meta.title?.length || 0} chars)${colors.reset}`);
        console.log(`  ${colors.dim}├─ Desc:  "${result.meta.description?.slice(0, 60)}..." (${result.meta.description?.length || 0} chars)${colors.reset}`);
      }
      console.log(`  ${colors.dim}└─ H1: ${result.meta.h1Count} | Sitemap: OK${colors.reset}\n`);
    } else {
      console.log(`${colors.yellow}▲ [ATTENTION]${colors.reset} ${colors.bright}${result.route}${colors.reset} ${colors.dim}(${result.filePath})${colors.reset}`);
      if (result.meta.title) {
        console.log(`  ${colors.dim}├─ Current Title: "${result.meta.title}" (${result.meta.title.length} chars)${colors.reset}`);
      }
      if (result.meta.description) {
        console.log(`  ${colors.dim}├─ Current Desc:  "${result.meta.description.slice(0, 70)}..." (${result.meta.description.length} chars)${colors.reset}`);
      }
      for (const issue of result.issues) {
        if (issue.type === 'error') {
          totalErrors++;
          console.log(`  ${colors.red}✖ [ERROR]   ${issue.message}${colors.reset}`);
        } else {
          totalWarnings++;
          console.log(`  ${colors.yellow}⚠ [WARNING] ${issue.message}${colors.reset}`);
        }
      }
      console.log('');
    }
  }

  // Summary Card
  const score = Math.max(0, Math.round(((perfectPages) / (totalPages || 1)) * 100));
  console.log(`${colors.cyan}=================== SEO 审计结果统计 ===================${colors.reset}`);
  console.log(`扫描页面总数: ${colors.bright}${totalPages}${colors.reset}`);
  console.log(`完全达标页面: ${colors.green}${perfectPages}${colors.reset}`);
  console.log(`发现警告数量: ${colors.yellow}${totalWarnings}${colors.reset}`);
  console.log(`严重错误数量: ${colors.red}${totalErrors}${colors.reset}`);
  console.log(`全站 SEO 健康度: ${score >= 90 ? colors.green : score >= 70 ? colors.yellow : colors.red}${colors.bright}${score}%${colors.reset}`);
  console.log(`${colors.cyan}========================================================${colors.reset}\n`);

  if (totalErrors > 0) {
    process.exit(1);
  }
}

run();
