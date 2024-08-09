import type { Component } from "solid-js"
import { demoState } from "../demo-state-store"

interface BackingTrackToggleProps {}

export const BackingTrackToggle: Component<BackingTrackToggleProps> = () => {
  const { isBackingTrackMuted, setIsBackingTrackMuted } = demoState
  const uniqueToggleId = `backing-track-toggle-${Math.random().toString(36).slice(2)}`
  return (
    <div class="flex gap-4">
      <span>Mute backing track</span>
      <input
        id={uniqueToggleId}
        type="checkbox"
        class="peer hidden"
        checked={isBackingTrackMuted()}
        onChange={e => setIsBackingTrackMuted(e.currentTarget.checked)}
      />
      <label
        for={uniqueToggleId}
        class="relative block h-6 w-12 cursor-pointer rounded-full bg-loopydemos-highlight-secondary-themed transition-colors peer-checked:bg-loopydemos-subdued-themed peer-checked:[&>div]:-translate-x-5"
      >
        <div class="absolute right-1 top-1/2 size-5 -translate-y-1/2 rounded-full bg-loopydemos-secondary-themed transition-transform" />
      </label>
    </div>
  )
}
