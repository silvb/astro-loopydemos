# Loopy Demos

Interactive guitar pedal demos and reviews built with Astro and SolidJS.

## Quick Start

```bash
pnpm install
pnpm run dev
```

Visit `http://localhost:4321` to see the site.

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

## Architecture

- **Astro** - Static site generator
- **SolidJS** - Interactive components
- **Tailwind CSS** - Styling
- **Biome** - Linting and formatting

## Content Structure

```
src/content/
├── demos/          # Individual pedal demo pages (.md)
├── posts/          # Blog posts and articles (.mdx)
├── pedals/         # Pedal configurations (.pedal.json)
└── presets/        # Audio presets (.presets.json)
```

## Creating Content

### New Demo
```bash
pnpm run create-demo
```

### Copy Writing
Use the `/copy` command with a pedal name to generate engaging copy:
```
/copy orange fur coat
```

## Key Components

- **Demo Widget** - Interactive pedal interface
- **Embed System** - Standalone embeddable demos
- **Content Collections** - Structured pedal and preset data

## Deployment

Automatically deploys to Vercel on push to main branch.