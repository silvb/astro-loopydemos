import { PlayButton } from "./play-button"
import { AudioPlayerDisplay } from "./audio-player-display"
import { AudioPlayerController } from "./audio-player-controller"
import { BackingTrackToggle } from "./backing-track-toggle"
import { type Component } from "solid-js"

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
        <div class="h-full flex-grow rounded-xl bg-loopydemos-secondary-themed">
          <AudioPlayerDisplay />
        </div>
      </div>
      {props.hasBackingTrack && (
        <div class="mt-3 flex justify-end">
          <BackingTrackToggle />
        </div>
      )}
    </div>
    <AudioPlayerController {...props} />
  </>
)
