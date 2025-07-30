# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

| Command | Description |
| --- | --- |
| `pnpm run dev` | Start development server at localhost:4321 |
| `pnpm run build` | Build production site (includes type checking) |
| `pnpm run preview` | Preview production build locally |
| `pnpm run lint` | Run Biome linter and formatter with auto-fix |
| `pnpm run create-demo` | Create new demo (runs lint, SEO images, meta images) |
| `pnpm run create-seo-images` | Generate SEO images for content |
| `pnpm run create-meta-images` | Generate meta images for content |

## Architecture Overview

This is an Astro-based static site for guitar pedal demos and reviews. The site uses:

- **Astro** - Static site generator with component islands
- **SolidJS** - Reactive component framework for interactive elements
- **Tailwind CSS** - Utility-first styling
- **Biome** - Linting and formatting
- **Vercel** - Deployment with analytics

### Content Management

The site uses Astro's content collections with structured data:

- `src/content/demos/` - Individual pedal demo pages (.md files)
- `src/content/posts/` - Blog posts and articles (.mdx files)
- `src/content/pedals/` - Pedal configuration data (.pedal.json files)
- `src/content/presets/` - Preset configurations (.presets.json files)

### Key Data Structure

The pedal system is built around:

1. **Pedal definitions** (.pedal.json) - Physical pedal layout, controls, dimensions
2. **Demo content** (.md) - Written content for each pedal demo
3. **Preset configurations** (.presets.json) - Audio presets with settings
4. **Images** - Located in `src/images/` with WebP format preferred

### Interactive Components

- **Demo Widget** (`src/components/demo-widget/`) - Main interactive pedal interface
- **Embed System** - Standalone embeddable demos
- **State Management** - Uses SolidJS stores for demo state

### Content Schema

Pedal controls support:
- Knobs (various types: bakelit, knurled, offset, walrus, etc.)
- Switches (stomp, toggle, rocker, slide, etc.)
- LEDs (round, square, mood with blinking support)
- Labels and sliders

Settings can be numbers, strings, booleans, arrays, or objects with radius/angle properties.

### Scripts

- `scripts/create-demo.cjs` - Interactive demo creation tool
- `scripts/create-seo-images.cjs` - SEO image generation
- `scripts/create-meta-images.cjs` - Meta image generation

## Build Process

The build process includes:
1. Astro type checking (`astro check`)
2. Static site generation (`astro build`)
3. Automatic deployment to Vercel

## Development Notes

- All pedal images should be optimized WebP format
- Demo content uses frontmatter for metadata
- Preset configurations support both single settings and sweep animations
- External links automatically open in new tabs via rehype plugin
- Site generates sitemap automatically
- Pre-commit hook automatically runs `pnpm run lint` before every commit

## Content Writing Workflow

### /copy Command
When the `/copy` command is used with a pedal name (e.g., `/copy orange fur coat`), automatically:

1. **Research the pedal** - Use web search to understand features, specifications, and character
2. **Find the demo file** - Look for `src/content/demos/[maker-model-slug].md`
3. **Write engaging copy** - Replace placeholder text with 3-4 succinct paragraphs
4. **Execute immediately** - Do not ask for permission, directly edit the file

### Writing Style for Pedal Demos
- **Conversational and personal** - Use "I" statements and personal experiences
- **Honest and balanced** - Include both positives and limitations
- **Technically informed but accessible** - Explain technical details in relatable terms
- **4 paragraphs maximum** - Keep it concise and punchy
- **Structure**: Hook + technical details + practical usage + bottom line assessment

## Monetization Guidelines

### Discontinued Pedals
Do not feature or promote discontinued pedals in new content for monetization purposes. These pedals should be excluded from:
- New blog posts and guides
- Affiliate link recommendations  
- Featured product sections

**Currently discontinued pedals:**
- Walrus Audio M1 (discontinued 2024)