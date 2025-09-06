import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { execSync } from "node:child_process"
import { imageSourcePath, fillColor } from "./utils.mjs"

const fontColor = "#8958ff"
const demoSourcePath = "src/content/demos"

const recentDemos = fs
  .readdirSync(demoSourcePath)
  .sort((a, b) => {
    const aDate = new Date(
      matter(fs.readFileSync(path.join(demoSourcePath, a))).data.date,
    )
    const bDate = new Date(
      matter(fs.readFileSync(path.join(demoSourcePath, b))).data.date,
    )
    return bDate - aDate
  })
  .filter(demoFile => {
    const type = matter(fs.readFileSync(path.join(demoSourcePath, demoFile)))
      .data.type

    return type === "demo"
  })
  .slice(0, 6)
  .map(demoFile => {
    let imageSrc = path.join(imageSourcePath, `${demoFile.split(".md")[0]}.png`)

    if (!fs.existsSync(imageSrc)) {
      imageSrc = path.join(imageSourcePath, `${demoFile.split(".md")[0]}.webp`)
    }

    return {
      slug: demoFile.split(".md")[0],
      imageSrc,
    }
  })

const pedalImagePaths = recentDemos.map(demo => demo.imageSrc).join(" ")

const montageCmd = `montage ${pedalImagePaths} \
  -geometry 300x300+30+30 \
  -tile 3x2 \
  -background '${fillColor}' \
  public/og-image.jpg`

const convertCmd = `magick public/og-image.jpg \
  -brightness-contrast -20 \
 -font Erica-One -pointsize 130 -fill "rgba(0, 0, 0, 0.7)" -gravity center -annotate +5-70 "LOOPY DEMOS" \
 -font Erica-One -pointsize 130 -fill "${fontColor}" -gravity center -annotate +0-75 "LOOPY DEMOS" \
 -font Anton-SC-Regular -pointsize 48 -fill "rgba(0, 0, 0, 0.7)" -gravity center -annotate +4+54 "Twist the knobs. Hear the difference." \
 -font Anton-SC-Regular -pointsize 48 -fill "${fontColor}" -gravity center -annotate +0+50 "Twist the knobs. Hear the difference." \
  public/og-image.jpg`

execSync(montageCmd)
execSync(convertCmd)

console.log("SEO image created at public/og-image.jpg")
