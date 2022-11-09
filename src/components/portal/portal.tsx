import { useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ReactPortalProps {
    id: string,
    children: JSX.Element,
}

export function ReactPortal(props: ReactPortalProps) {
    let [container, setContainer] = useState<HTMLElement | null>(null);

    // useLayoutEffect(() => {
    //     let container = document.getElementById(props.id);

    //     console.log("LAYOUT")

    //     if (container === null) {
    //         const container = document.createElement('div');
    //         container.setAttribute("id", props.id);
    //         document.body.appendChild(container);

    //         console.log("CHILD ADDED", container);
    //     }

    //     setContainer(container);

    //     return () => {
    //         console.log("BEFORE REMOVED");
    //         if (container) {
    //             console.log("REMOVED");
    //             // container.remove();
    //             container.parentNode?.removeChild(container)
    //         }
    //     }
    // }, [props.id]);

    // console.log(container);

    // if (container === null) {
    //     return null;
    // }

    return createPortal(props.children, document.body);
}