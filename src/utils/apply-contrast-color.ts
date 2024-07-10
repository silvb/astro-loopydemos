export const applyContrastColor = (elementId: string) => {
  const element = document.getElementById(elementId)
  if (typeof window === "undefined" || !element) return

  const backgroundColor = window.getComputedStyle(element).backgroundColor
  // Extract RGB values from the input string
  const rgbValues = backgroundColor.match(/\d+/g)
  if (!rgbValues || rgbValues.length !== 3) {
    // Invalid input, return
    return
  }

  const [red, green, blue] = rgbValues.map(Number)

  // Calculate relative luminance
  const luminance = 0.299 * red + 0.587 * green + 0.114 * blue

  // Choose text color based on luminance
  const textColor =
    luminance > 128 ? "text-loopydemos-black" : "text-loopydemos-text"

  element.style.color = textColor
}
