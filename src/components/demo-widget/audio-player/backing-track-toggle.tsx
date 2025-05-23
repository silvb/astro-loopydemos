import type { Component } from "solid-js"
import { useDemoState } from "../demo-state-store"

export const BackingTrackToggle: Component = () => {
  const { isBackingTrackMuted, setIsBackingTrackMuted } = useDemoState()
  const uniqueToggleId = `backing-track-toggle-${Math.random().toString(36).slice(2)}`
  return (
    <div class="flex items-center gap-4 text-loopydemos-text-themed">
      <span class="text-sm sm:text-base">Mute backing track</span>
      <input
        id={uniqueToggleId}
        type="checkbox"
        class="peer hidden"
        checked={isBackingTrackMuted()}
        onChange={e => setIsBackingTrackMuted(e.currentTarget.checked)}
      />
      <label
        for={uniqueToggleId}
        class="peer-checked:[&>div]:-translate-x-6 relative block h-6 w-12 cursor-pointer rounded-full bg-loopydemos-highlight-secondary-themed transition-colors peer-checked:bg-loopydemos-subdued-themed"
      >
        <div class="-translate-y-1/2 absolute top-1/2 right-[0.125rem] size-5 rounded-full bg-loopydemos-secondary-themed transition-transform" />
      </label>
    </div>
  )
}
