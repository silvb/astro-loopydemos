import type { CBASwitchSate } from "@types"
import { For, mergeProps, type Component } from "solid-js"

interface CBADipSwitchesProps {
  state: CBASwitchSate
}

const dipRowClass =
  "flex h-full shrink-0 grow basis-auto items-center justify-between px-[3px] py-0"

const lineArray = (num: number) => Array.from(Array(num).keys())

const DIMENSIONS = {
  width: 131,
  height: 30,
}

export const CBADipSwitches: Component<CBADipSwitchesProps> = props => {
  const mergedProps = mergeProps(
    {
      state: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
    },
    props
  )

  const dipInlineStyle = {
    "--width": 6 + "px",
    "--height": 12 + "px",
    "--nippleWidth": 5 + "px",
    "--nippleHeight": 6 + "px",
  }
  return (
    <div
      class="box-border flex bg-[#aa232f] px-0.5 py-0"
      style={{
        width: DIMENSIONS.width + "px",
        height: DIMENSIONS.height + "px",
      }}
    >
      <div class={dipRowClass}>
        <For each={lineArray(8)}>
          {i => (
            <div
              class={
                mergedProps.state[i]
                  ? "cba-dip-switch flipped"
                  : "cba-dip-switch"
              }
              style={{
                ...dipInlineStyle,
              }}
            />
          )}
        </For>
      </div>
      <div class="h-full w-[1px] bg-black" />
      <div class={dipRowClass}>
        <For each={lineArray(8)}>
          {i => (
            <div
              class={
                mergedProps.state[i + 8]
                  ? "cba-dip-switch flipped"
                  : "cba-dip-switch"
              }
              style={{
                ...dipInlineStyle,
              }}
            />
          )}
        </For>
      </div>
    </div>
  )
}
