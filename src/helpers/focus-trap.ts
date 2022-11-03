import { createFocusTrap } from "focus-trap"

export default function focusTrap(node: HTMLElement) {
    const trap = createFocusTrap(node, { escapeDeactivates: false })

    trap.activate()

    return {
        destroy() {
            trap.deactivate()
        }
    }
}