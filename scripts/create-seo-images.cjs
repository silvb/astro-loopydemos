const fs = require("fs")
const path = require("path")
// const matter = require("gray-matter")
const { execSync } = require("child_process")

const imageSourcePath = "src/images"
const targetDirectoryPath = "src/images/seo-preview"
const imageExtensions = [".png", ".webp"]
const fillColor = "#9580ff"

const convertImage = (imagePath, outputPath) => {
  const identifyOutput = execSync(
    `identify -format "%w %h" ${imagePath}`
  ).toString()
  const imageName = imagePath.split("/").pop().split(".")[0]
  const [width, height] = identifyOutput.split(" ").map(Number)
  const longestSide = Math.max(width, height)
  const extendLength = longestSide + 60

  const convertCmd = `convert -size ${extendLength}x${extendLength} xc:${fillColor} "${imagePath}" -gravity center -composite -resize 400x400 "${outputPath}"`

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
      `${imageWithoutExtension}.jpeg`
    )

    try {
      convertImage(imagePath, outputPath)
    } catch (error) {
      console.error(`Error processing ${image}: ${error}`)
    }
  })

// TODO: refactor this and make it work with new file structure
// const postSourcePath = "src/content/posts"

// fs.readdirSync(postSourcePath).forEach(post => {
//   const mdxPath = path.join(postSourcePath, post, "index.mdx")
//   const mdxFile = fs.readFileSync(mdxPath, "utf8")
//   const parsedMdx = matter(mdxFile)

//   if (!parsedMdx.data.coverImage && parsedMdx.data.pedalImages.length > 0) {
//     const pedalsSeoImages = parsedMdx.data.pedalImages
//       .map(pedalImagePath => {
//         return pedalImagePath.split("/").pop().split(".")[0]
//       })
//       .map(pedalImageName => {
//         return path.join(targetDirectoryPath, `${pedalImageName}.jpeg`)
//       })

//     const gridSize = Math.ceil(Math.sqrt(pedalsSeoImages.length))
//     const outputPathRaw = path.join(targetDirectoryPath, `${post}_raw.png`)
//     const outputPath = path.join(targetDirectoryPath, `${post}.jpeg`)

//     const montageCmd = `montage ${pedalsSeoImages.join(
//       " "
//     )} -tile ${gridSize}x${gridSize} -geometry +0+0 -background '${fillColor}' "${outputPathRaw}"`

//     execSync(montageCmd)
//     convertImage(outputPathRaw, outputPath)
//     execSync(`rm ${outputPathRaw}`)
//   }
// })
