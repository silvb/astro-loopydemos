export const getDisplayText = (
  isPlaying = false,
  isDisabled = false,
  isLoading = true,
  isPedalOn = false,
  hasErrors = false
) => {
  let text = ``

  if (isLoading) {
    text = `Loading sounds. Gimme a sec...`
  }

  if (!isPlaying) {
    text = `Hit play and use headphones d[-_-]b`
  }

  if (isDisabled) {
    text = `Sorry, your browser sucks ¯\\_(ツ)_/¯`
  }

  if (isPlaying && !isLoading && !isPedalOn) {
    text = `Here's my clean tone. Turn the pedal on.`
  }

  if (hasErrors) {
    text = `Error loading sounds. Try reloading the page.`
  }

  return text
}
