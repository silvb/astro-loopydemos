import { type ParentComponent } from "solid-js"
import { demoState } from "../demo-state-store"

interface ComparisonPedalSelectProps {
  pedalSlug: string
}

export const ComparisonPedalSelect: ParentComponent<
  ComparisonPedalSelectProps
> = props => {
  const { activePedals, setActivePedals } = demoState

  return (
    <button
      onClick={() => {
        setActivePedals([props.pedalSlug])
      }}
      class="flex h-full w-full items-center justify-center"
      classList={{
        "bg-loopydemos-secondary border-[1px] rounded-md border-loopydemos-highlight-primary":
          activePedals().includes(props.pedalSlug),
        "bg-loopydemos-secondary opacity-30": !activePedals().includes(
          props.pedalSlug
        ),
      }}
    >
      {props.children}
    </button>
  )
}
