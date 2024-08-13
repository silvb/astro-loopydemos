import { PlayButton } from "./play-button"
import { AudioPlayerDisplay } from "./audio-player-display"
import { AudioPlayerController } from "./audio-player-controller"
import { BackingTrackToggle } from "./backing-track-toggle"
import type { Component } from "solid-js"

interface AudioPlayerProps {
  slug: string
  volume?: number
  hasBackingTrack?: boolean
}

export const AudioPlayer: Component<AudioPlayerProps> = props => (
  <>
    <div>
      <div class="flex h-16 w-full gap-2 rounded-xl bg-loopydemos-primary-themed p-1">
        <PlayButton />
        {/* <Icon name="ph:play-fill" slot="play-icon" />
          <Icon name="ph:pause-fill" slot="pause-icon" />
          <Icon
            name="ph:spinner-bold"
            slot="loading-icon"
            class="animate-spin-slow"
          /> */}
        <div class="h-full flex-grow rounded-xl bg-loopydemos-secondary-themed">
          <AudioPlayerDisplay />
        </div>
      </div>
      <div class="mt-3 flex justify-end">
        {props.hasBackingTrack && <BackingTrackToggle />}
      </div>
    </div>
    <AudioPlayerController {...props} />
  </>
)
