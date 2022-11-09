import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ReactPortalProps {
    id: string,
    children: JSX.Element,
}

export function ReactPortal(props: ReactPortalProps) {
    let [container, setContainer] = useState<HTMLElement | null>(null);

    useLayoutEffect(() => {
        let container = document.getElementById(props.id);

        if (container === null) {
            const container = document.createElement('div');
            container.setAttribute("id", props.id);
            document.body.appendChild(container);
        }

        setContainer(container);

        return () => {
            if (container) {
                container.remove();
            }
        }
    }, [props.id]);

    if (container === null) {
        return null;
    }

    return createPortal(props.children, container);
}