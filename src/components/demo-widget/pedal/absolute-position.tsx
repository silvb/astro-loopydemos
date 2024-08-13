import type { ParentComponent } from "solid-js"

interface AbsolutePositionProps {
  id: string
  top: number
  left: number
}

export const AbsolutePosition: ParentComponent<AbsolutePositionProps> = props => (
  <div
    id={props.id}
    class="absolute left-[calc(var(--left)*0.75)] top-[calc(var(--top)*0.75)] origin-top-left scale-75 transform sm:left-[var(--left)] sm:top-[var(--top)] sm:scale-100"
    style={{
      "--left": `${props.left}px`,
      "--top": `${props.top}px`,
    }}
  >
    {props.children}
  </div>
)
