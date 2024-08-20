import type { ParentComponent } from "solid-js"

interface AbsolutePositionProps {
  id: string
  top: number
  left: number
}

export const AbsolutePosition: ParentComponent<
  AbsolutePositionProps
> = props => (
  <div
    id={props.id}
    class="absolute"
    style={{
      left: `${props.left}px`,
      top: `${props.top}px`,
    }}
  >
    {props.children}
  </div>
)
