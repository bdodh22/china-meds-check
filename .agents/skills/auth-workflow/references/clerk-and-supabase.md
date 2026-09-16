# 鉴权实战代码参考 (Clerk & Supabase)

本文件提供 Clerk 与 Supabase 在 Next.js App Router 中的极速集成配方。

---

## 方案一：Clerk 极速中间件 (`middleware.ts`)

```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/guide(.*)',
  '/pricing(.*)',
  '/api/webhooks(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
```

### 根布局配置 (`app/layout.tsx`)
```tsx
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

---

## 方案二：用户个人中心导航组件 (`components/UserNav.tsx`)

```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useUser, UserButton } from '@clerk/nextjs';
import { ArrowRight, User } from 'lucide-react';

export default function UserNav() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="h-8 w-8 rounded-full bg-slate-200 animate-pulse" />;
  }

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="text-xs font-semibold text-slate-700 hover:text-slate-900 transition"
        >
          Dashboard
        </Link>
        <UserButton afterSignOutUrl="/" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/sign-in"
        className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
      >
        Sign In
      </Link>
      <Link
        href="/sign-up"
        className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-xs transition flex items-center gap-1"
      >
        <span>Get Started</span>
        <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
```
