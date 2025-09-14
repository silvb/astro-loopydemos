// Base64 encoded silent MP3 file (1 second of silence)
const SILENT_AUDIO_BASE64 =
  "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhpcXVlLm9yZwBURU5DAAAAHQAAAC9Bc3RyaWFsIFJlY29yZGluZyBMaWJyYXJ5AFRJU1QAAAAPAAADMTI6NDA6MjMgQU0AUFBBAAAAAAAA"

let isAudioUnmuted = false
let unmutePromise: Promise<void> | null = null

/**
 * Unmutes Web Audio API on iOS devices when silent mode is engaged.
 * This function should be called on user interaction (click, touch, etc.)
 * to enable Web Audio playback even when the iOS device is muted.
 */
export const unmuteIOSAudio = (): Promise<void> => {
  // Return existing promise if already unmuting
  if (unmutePromise) {
    return unmutePromise
  }

  // Return resolved promise if already unmuted
  if (isAudioUnmuted) {
    return Promise.resolve()
  }

  unmutePromise = new Promise<void>((resolve, reject) => {
    try {
      // Create a silent audio element
      const audio = document.createElement("audio")
      audio.setAttribute("x-webkit-airplay", "deny")
      audio.preload = "auto"
      audio.loop = false
      audio.src = SILENT_AUDIO_BASE64

      // Set volume to 0 to ensure silence
      audio.volume = 0

      const playPromise = audio.play()

      if (playPromise) {
        playPromise
          .then(() => {
            isAudioUnmuted = true
            unmutePromise = null
            // Stop the audio immediately after it starts
            audio.pause()
            audio.currentTime = 0
            resolve()
          })
          .catch(error => {
            unmutePromise = null
            reject(error)
          })
      } else {
        // For browsers that don't return a promise from play()
        isAudioUnmuted = true
        unmutePromise = null
        audio.pause()
        audio.currentTime = 0
        resolve()
      }
    } catch (error) {
      unmutePromise = null
      reject(error)
    }
  })

  return unmutePromise
}

/**
 * Check if we're likely on an iOS device
 */
export const isIOSDevice = (): boolean => {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  )
}

/**
 * Reset the unmute state (useful for testing or if needed)
 */
export const resetIOSAudioUnmute = (): void => {
  isAudioUnmuted = false
  unmutePromise = null
}
