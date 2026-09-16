---
name: auth-workflow
description: >-
  Implement secure, scalable user authentication, protected routes, social login (Google/GitHub/MagicLink), and session management for Next.js independent websites.
  Covers Clerk and Supabase Auth implementations, middleware route guards, Server Component session retrieval, and user lifecycle webhooks.
  Activate when adding login/register features, protecting private dashboard routes, configuring auth middleware, or syncing user data.
---

# 独立站用户鉴权与会员体系技能 (auth-workflow)

本技能为各类出海独立站、SaaS 与会员工具站提供极速、安全的用户身份验证（Authentication）与路由鉴权架构。

---

## 1. 方案选型标准 (Tech Stack Decision)

针对不同类型的独立站，优先选择匹配的现代出海鉴权方案：

| 独立站类型 | 推荐方案 | 核心优势 |
| :--- | :--- | :--- |
| **出海 Micro-SaaS / 垂直工具** | **Clerk (`@clerk/nextjs`)** | **首选**。开箱即用、颜值极高、自带 Google 一键登录、内置个人中心组件 (`<UserButton />`)，10 分钟上线。 |
| **重数据库交互 / Web3 / 深度应用** | **Supabase Auth (`@supabase/ssr`)** | 与 PostgreSQL 数据库行级安全策略（RLS）天然融合，免费额度巨大，支持自托管。 |
| **纯自研免外部依赖** | **Auth.js / NextAuth v5** | 轻量，但需要自己维护登录页、Session Cookie 和数据库适配器。 |

---

## 2. 路由安全边界与中间件守卫 (Route Protection)

必须在 `middleware.ts` 中明确划分**公开路由 (Public Routes)** 与 **私有受保护路由 (Protected Routes)**：

1. **白名单原则 (Public Routes)**：
   * 必须无阻碍向访客和 Google 爬虫开放：
     * 首页 `/`、价格页 `/pricing`、功能页、博客/指南 `/guide/*`、帮助中心、法律协议 `/privacy`。
     * Webhook 回调接口 `/api/webhooks/*`（必须放行供 Stripe / Lemon Squeezy 验签）。
2. **受保护路由 (Protected Routes)**：
   * 自动拦截未登录用户并重定向至登录页：
     * 用户控制台 `/dashboard/*`、账户设置 `/account/*`、API 密钥管理 `/settings/keys`。

---

## 3. 服务端与客户端会话获取 (Session Access Pattern)

### React Server Component (RSC) 获取当前用户（推荐）
在服务端组件中安全读取，无需客户端多次请求，天然防止闪烁：
```tsx
import { auth, currentUser } from '@clerk/nextjs/server';

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();

  return <div>Welcome back, {user?.firstName}!</div>;
}
```

### 客户端状态获取
仅在交互按钮或下拉头像中使用：
```tsx
'use client';
import { useUser, UserButton } from '@clerk/nextjs';

export function UserNav() {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isSignedIn) return <a href="/sign-in">Sign In</a>;
  return <UserButton />;
}
```

---

## 4. 用户生命周期事件与商业闭环 (Webhooks)

当用户完成注册（`user.created`）或删除（`user.deleted`）时：
1. **自动发信**：触发 Resend API 发送一封高转化的欢迎信（包含上手指南与新手福利）。
2. **数据同步**：同步存入数据库会员表，分配默认的免费层级配额。
