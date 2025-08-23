const fs = require("node:fs")
const path = require("node:path")
const { execSync } = require("node:child_process")

const imageSourcePath = "src/images"
const targetDirectoryPath = "src/images/seo-preview"
const imageExtensions = [".png", ".webp"]
const fillColor = "#252253"
const postSourcePath = "src/content/posts"
const presetSource = "src/content/presets"

const convertImage = (imagePath, outputPath) => {
  const identifyOutput = execSync(
    `identify -format "%w %h" ${imagePath}`,
  ).toString()
  const imageName = imagePath.split("/").pop().split(".")[0]
  const [width, height] = identifyOutput.split(" ").map(Number)
  const longestSide = Math.max(width, height)
  const extendLength = longestSide + 60

  const convertCmd = `magick -size ${extendLength}x${extendLength} xc:${fillColor} "${imagePath}" -gravity center -composite -resize 800x800 "${outputPath}"`

  execSync(convertCmd)

  console.log(`Processed ${imageName}`)
}

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
