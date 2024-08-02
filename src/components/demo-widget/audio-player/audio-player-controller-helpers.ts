import { CLEAN_TONE, MEDIA_ROOT_URL, BACKING_TRACK } from "./constants"

export const getMediaUrl = (id: string, slug: string) => {
  switch (id) {
    case CLEAN_TONE:
      return `${MEDIA_ROOT_URL}/${slug}/clean.mp3`
    case BACKING_TRACK:
      return `${MEDIA_ROOT_URL}/${slug}/backing_track.mp3`
    default:
      return `${MEDIA_ROOT_URL}/${slug}/${id}.mp3`
  }
}

export const fetchAudioBuffer = async (
  id: string,
  slug: string,
  audioContext: AudioContext
) => {
  const url = getMediaUrl(id, slug)
  const response = await fetch(url)
  const buffer = await response.arrayBuffer()
  return audioContext.decodeAudioData(buffer)
}
