---
updateTime: '2025-09-17 21:34'
tags: Ni0duann-Blog
---
# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a personal blog built with VitePress, featuring a custom Chinese theme and automated content management. The blog is written primarily in Chinese and focuses on frontend development experiences, interview notes, learning materials, and personal thoughts.

## Development Commands

### Core Development
```bash
# Start development server (默认运行在 http://localhost:5173)
npm run docs:dev

# Build for production (输出到 docs/.vitepress/dist)
npm run docs:build

# Preview production build
npm run docs:preview
```

### Content & Formatting
```bash
# Format all code files with Prettier (includes Tailwind CSS plugin)
npm run format

# Update modification timestamps for all markdown files
npm run time

# Interactive commit with conventional commit format (Chinese prompts)
npm run commit

# Husky setup (already configured)
npm run prepare
```

### Testing & Linting
```bash
# Check TypeScript compilation
npx tsc --noEmit

# Run Prettier check
npx prettier --check .

# Format check for staged files (automatically runs in pre-commit)
npx lint-staged
```

### Debug & Development Tips
```bash
# 手动运行时间戳更新脚本（传入特定文件）
node scripts/time.js docs/src/Notes/Learning/新文章.md

# 检查 VitePress 配置
npx vitepress --help

# 清理 VitePress 缓存
rm -rf docs/.vitepress/cache

# 查看项目依赖分析
npm list --depth=0

# 安装依赖（推荐使用 pnpm）
pnpm install
```

### Deployment & Production
```bash
# Vercel 部署（已配置自动部署）
# vercel.json 配置了构建命令和输出目录

# 本地预览生产构建
npm run docs:build && npm run docs:preview

# 检查构建产物大小
du -sh docs/.vitepress/dist
```

## Architecture Overview

### VitePress Configuration
- **Main config**: `docs/.vitepress/config.mjs` - Central VitePress configuration
- **Theme**: `docs/.vitepress/theme/index.ts` - Custom theme extending default VitePress theme
- **Content root**: `docs/src/` - All markdown content lives here
- **Assets**: `docs/.vitepress/assets/` and `docs/src/public/` - Static assets

### Key Components & Utilities
- **Sidebar Generation**: `docs/.vitepress/utils/getSidebar.ts` - Automatically generates navigation from file structure
- **Date Formatting**: `docs/.vitepress/utils/formatDate.ts` - Handles Chinese date display
- **Custom Components**: `docs/.vitepress/components/` - Vue components for enhanced markdown content
  - `Timeline.vue` - For chronological content
  - `LinkCard.vue` - Enhanced link previews
  - `UpdateTime.vue` - Custom footer with update timestamps

### Content Structure
- **Blog posts**: `docs/src/Notes/` with subdirectories:
  - `Interviews/` - Interview experiences and job hunting notes
  - `Learning/` - Frontend learning notes
  - `Reading/` - Book reviews and reading notes
  - `Thoughts/` - Personal reflections
  - `work/` - Work-related content
- **Static pages**: `AboutMe.md`, `Projects.md`, `Friends.md`

### Automated Workflows
- **Git hooks** (via Husky):
  - Pre-commit: Updates file timestamps and runs linting
  - Commit-msg: Validates commit message format
- **Time stamping**: `scripts/time.js` automatically updates `updateTime` frontmatter in markdown files
- **Lint-staged**: Formats code and updates timestamps for staged files

## Content Management

### Adding New Blog Posts
1. Create markdown file in appropriate `docs/src/Notes/` subdirectory
2. Include frontmatter with `title` (optional, falls back to filename)
3. File modification time is automatically managed by git hooks
4. Sidebar navigation updates automatically based on file structure

### Frontmatter Structure
```yaml
---
title: "Optional custom title"
updateTime: "2024-12-22 13:20"  # Auto-managed by scripts
tags: "folder-name"  # Auto-managed based on parent directory
# Additional custom fields supported
---
```

### File Organization
- Files are sorted by `updateTime` in sidebar (newest first)
- Directory names can be mapped to custom display names in `docs/.vitepress/userConfig/translations.ts`
- Maximum sidebar depth is 4 levels to prevent deep nesting

## Development Notes

### Styling & Theming
- **Tailwind CSS**: Configured with custom plugin for VitePress integration
- **Custom CSS**: `docs/.vitepress/theme/` contains theme-specific styles
- **Responsive**: Built with mobile-first approach
- **Image zoom**: Medium-zoom integration for article images

### TypeScript Configuration
- Strict mode enabled
- Includes Vue SFC support
- Targets Node.js environment for build scripts
- Output directory: `docs/.vitepress/dist`

### Deployment
- **Platform**: Vercel (configured via `vercel.json`)
- **Cache headers**: Assets cached for 1 year
- **Build command**: `npm run docs:build`
- **Output directory**: `docs/.vitepress/dist`

### Git Workflow
- **Commit format**: Conventional commits with Chinese descriptions
- **Branch strategy**: Main branch for production
- **Automated formatting**: Prettier runs on staged files
- **Time tracking**: All content modifications are timestamped

### Chinese Content Considerations
- File and directory names may contain Chinese characters (escaped in file paths)
- Content is primarily in Chinese with English technical terms
- Date formatting uses Chinese locale where appropriate
- Custom translations mapping for directory names to display names
