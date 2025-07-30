# Custom Commands

## /blogpost - Create comprehensive guitar pedal blog post

**Usage:** `/blogpost [genre/topic]`

**Examples:**

- `/blogpost stoner rock`
- `/blogpost jazz guitar pedals`
- `/blogpost ambient pedals under $200`
- `/blogpost best fuzz pedals for metal`

**Description:**
This command creates comprehensive guitar pedal blog posts in the style of the bedroom pop and post-rock guides. The command will:

1. **Research the genre/topic** using web search to understand:

   - Key sonic characteristics and playing techniques
   - Influential artists and albums
   - Essential effects and gear commonly used

2. **Filter available pedal demos** by:

   - Relevance to the specified genre/topic
   - Availability of affiliate monetization (Sweetwater/Thomann links)
   - Excluding discontinued pedals (currently: Walrus Audio M1)
   - Prioritizing pedals with strong monetization potential

3. **Generate comprehensive blog post** including:

   - Genre overview and sonic characteristics
   - Essential pedal categories and recommendations
   - Detailed pedal reviews with technical insights
   - Multiple pedalboard setups (starter/pro/dream)
   - Playing technique tips and amp settings
   - Proper SEO-friendly frontmatter

4. **Follow established writing style:**

   - Conversational and personal tone using "I" statements
   - Technically informed but accessible language
   - Honest, balanced reviews with both positives and limitations
   - 3-4 paragraphs maximum per pedal section
   - Structure: Hook + technical details + practical usage + assessment

5. **Include proper components:**
   - `<DemoWidget presetSlug="..." />` for each featured pedal (MUST verify preset slugs exist)
   - `<PartnerLinks slug="..." />` for affiliate monetization
   - Responsive markdown formatting with bold emphasis
   - Related slugs for internal linking

## CRITICAL: DemoWidget Preset Slug Requirements

**BEFORE using any `<DemoWidget presetSlug="..." />` components:**

1. **Verify preset files exist** in `/src/content/presets/`
2. **Check exact slug naming** - presetSlug must match existing `.presets.json` filename (without extension)
3. **Use kebab-case format** - all lowercase with hyphens (e.g., "walrus-audio-slo")
4. **Do NOT make up preset slugs** - only reference actual existing preset files

**Common valid preset slugs:**
- Single pedals: `walrus-audio-slo`, `ehx-big-muff-nyc`, `catalinbread-sft`, `zvex-effects-fuzz-factory`
- Shootouts: `big-muff-shootout`, `overdrive-shootout`, `velcro-fuzz-shootout`
- Guides: `how-to-set-up-a-shoegaze-pedalboard`

**Always search for existing preset files first** before including DemoWidget components in blog posts.

**Output:** The command generates a complete `.mdx` file ready for publication in `/src/content/posts/` with proper frontmatter, content structure, and monetization integration.

**Requirements:**

- Web search access for genre research
- Access to current pedal demo inventory (209+ available demos)
- Understanding of existing affiliate link structure
