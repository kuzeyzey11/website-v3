#!/usr/bin/env bash

set -e

echo "1/3 Creating directory structure..."
mkdir -p src/layouts src/components/layout src/styles

echo "2/3 Writing Astro layout components..."

# BaseLayout.astro
cat << 'LAYOUT_EOF' > src/layouts/BaseLayout.astro
---
import Header from '../components/layout/Header.astro';
import Footer from '../components/layout/Footer.astro';
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
}

const { 
  title = "kuzyy — digital home", 
  description = "student, linux enthusiast, builder." 
} = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />

    <!-- Primary Meta -->
    <title>{title.toLowerCase()}</title>
    <meta name="title" content={title.toLowerCase()} />
    <meta name="description" content={description.toLowerCase()} />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={Astro.url} />
    <meta property="og:title" content={title.toLowerCase()} />
    <meta property="og:description" content={description.toLowerCase()} />
  </head>
  <body class="min-h-screen flex flex-col justify-between bg-[var(--color-bg)] text-[var(--color-text-main)] font-mono selection:bg-[var(--color-accent)] selection:text-black">
    <Header />
    <main class="w-full max-w-4xl mx-auto px-4 py-10 flex-1">
      <slot />
    </main>
    <Footer />
  </body>
</html>
LAYOUT_EOF

# Header.astro
cat << 'HEADER_EOF' > src/components/layout/Header.astro
---
const navItems = [
  { path: '/', label: 'kuzyy' },
  { path: '/blog', label: 'blog' },
  { path: '/projects', label: 'projects' },
  { path: '/terminal', label: 'terminal' },
];

const currentPath = Astro.url.pathname;
---

<header class="w-full border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-md sticky top-0 z-50">
  <div class="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between text-sm">
    <a href="/" class="font-bold text-[var(--color-prompt)] hover:opacity-80 transition-opacity">
      ~$ kuzyy<span class="animate-pulse">_</span>
    </a>

    <nav class="flex items-center gap-6">
      {navItems.slice(1).map((item) => {
        const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
        return (
          <a
            href={item.path}
            class={`transition-colors hover:text-[var(--color-text-main)] ${
              isActive ? 'text-[var(--color-accent)] font-semibold' : 'text-[var(--color-text-muted)]'
            }`}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  </div>
</header>
HEADER_EOF

# Footer.astro
cat << 'FOOTER_EOF' > src/components/layout/Footer.astro
---
const year = new Date().getFullYear();
---

<footer class="w-full border-t border-[var(--color-border)] mt-20 py-8 text-xs text-[var(--color-text-muted)]">
  <div class="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
    <div>
      <span>© {year} kuzyy. built with astro & tailwind.</span>
    </div>
    <div class="flex items-center gap-4">
      <a href="https://github.com/kuzeyzey11" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--color-text-main)] transition-colors">github</a>
      <a href="/terminal" class="hover:text-[var(--color-prompt)] transition-colors">shell</a>
    </div>
  </div>
</footer>
FOOTER_EOF

# global.css
cat << 'CSS_EOF' > src/styles/global.css
@import "tailwindcss";

@theme {
  --color-bg: #0d0e11;
  --color-surface: #14161b;
  --color-border: #232730;
  --color-text-main: #e2e8f0;
  --color-text-muted: #717d93;
  --color-accent: #38bdf8;
  --color-prompt: #4ade80;
}

:root {
  --color-bg: #0d0e11;
  --color-surface: #14161b;
  --color-border: #232730;
  --color-text-main: #e2e8f0;
  --color-text-muted: #717d93;
  --color-accent: #38bdf8;
  --color-prompt: #4ade80;
}

html {
  background-color: var(--color-bg);
  color: var(--color-text-main);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  text-transform: lowercase;
}

* {
  text-transform: lowercase;
}
CSS_EOF

echo "3/3 Updating astro.config.mjs with Tailwind v4 Vite plugin..."
cat << 'CONFIG_EOF' > astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
CONFIG_EOF

echo "All layout, styling, and Astro configurations updated successfully!"