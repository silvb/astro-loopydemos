import fs from "node:fs"
import path from "node:path"
import { execSync } from "node:child_process"
import { convertImage, imageSourcePath, fillColor } from "./utils.mjs"

const targetDirectoryPath = "src/images/seo-preview"
const imageExtensions = [".png", ".webp"]
const postSourcePath = "src/content/posts"
const presetSource = "src/content/presets"

fs.readdirSync(imageSourcePath)
  .filter(file => imageExtensions.includes(path.extname(file).toLowerCase()))
  .forEach(image => {
    const imagePath = path.join(imageSourcePath, image)
    const imageWithoutExtension = image.split(".")[0]
    const outputPath = path.join(
      targetDirectoryPath,
      `${imageWithoutExtension}.jpeg`,
    )

    try {
      convertImage(imagePath, outputPath)
    } catch (error) {
      console.error(`Error processing ${image}: ${error}`)
    }
  })

fs.readdirSync(postSourcePath).forEach(post => {
  const slug = post.split(".md")[0]
  console.log(slug)

  const possibleImagePath = path.join(imageSourcePath, `${slug}.png`)

  if (fs.existsSync(possibleImagePath)) return

  const presetPath = path.join(presetSource, `${slug}.presets.json`)
  if (!fs.existsSync(presetPath)) return
  const presetData = JSON.parse(fs.readFileSync(presetPath))

  const pedals =
    presetData.presets[0]?.comparison?.map(comp => comp.pedalSlug) ||
    presetData.presets[0]?.chain?.map(chainEl => chainEl.pedalSlug)

  const pedalImagePaths = pedals.map(pedal =>
    path.join(targetDirectoryPath, `${pedal}.jpeg`),
  )

  const gridSize = Math.ceil(Math.sqrt(pedalImagePaths.length))
  const outputPathRaw = path.join(targetDirectoryPath, `${slug}_raw.png`)
  const outputPath = path.join(targetDirectoryPath, `${slug}.jpeg`)
  const montageCmd = `montage ${pedalImagePaths.join(
    " ",
  )} -tile ${gridSize}x${gridSize} -geometry +0+0 -background '${fillColor}' "${outputPathRaw}"`

  execSync(montageCmd)
  convertImage(outputPathRaw, outputPath)
  execSync(`rm ${outputPathRaw}`)
})
