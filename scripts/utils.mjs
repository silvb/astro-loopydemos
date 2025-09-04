import { execSync } from "node:child_process"

export const imageSourcePath = "src/images"
export const fillColor = "#252253"

export const convertImage = (imagePath, outputPath) => {
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