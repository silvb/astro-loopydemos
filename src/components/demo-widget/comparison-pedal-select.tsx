import { cva } from "class-variance-authority"
import { type ParentComponent } from "solid-js"
import { demoState } from "./demo-state-store"

interface ComparisonPedalSelectProps {
  pedalSlug: string
}

const buttonClass = cva("h-full w-full flex items-center justify-center", {
  variants: {
    active: {
      true: "bg-loopydemos-secondary border-[1px] rounded-md border-loopydemos-highlight-primary",
      false: "bg-loopydemos-secondary opacity-30",
    },
  },
})

export const ComparisonPedalSelect: ParentComponent<
  ComparisonPedalSelectProps
> = props => {
  const { activePedals, setActivePedals } = demoState

  return (
    <button
      onClick={() => {
        setActivePedals([props.pedalSlug])
      }}
      class={buttonClass({ active: activePedals().includes(props.pedalSlug) })}
    >
      {props.children}
    </button>
  )
}
