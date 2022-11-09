import { useCallback, useEffect, useState } from "react";
import { ReactPortal } from "../portal/portal";

interface MenuProps {
    isOpen: boolean,
    onClose: () => void,
    anchorEl: HTMLElement | null,
    children: JSX.Element
}

export function Menu(props: MenuProps) {
    let [menuEl, setMenuEl]  = useState<HTMLElement | null>(null);
    let [menuWidth, setMenuWidth] = useState(0);
    let [position, setPosition] = useState({ x: 0, y: 0 });

    function updateMenuPosition() {
        if (props.anchorEl) {
            let targetRect = props.anchorEl.getBoundingClientRect();

            setPosition({ 
                x: targetRect.x - (menuWidth - targetRect.width) / 2, 
                y: targetRect.y + window.scrollY + targetRect.height 
            });
        }
    }

    const handleResize = useCallback(updateMenuPosition, [props.anchorEl, menuWidth]);

    useEffect(() => {
        if (props.isOpen) {
            window.addEventListener('resize', handleResize)   
        } else {
            setMenuEl(null);
            window.removeEventListener('resize', handleResize);
        }
    }, [props.isOpen, menuWidth])

    useEffect(updateMenuPosition, [props.anchorEl, menuWidth])

    const measuredRef = useCallback((el: HTMLDivElement | null) => {
        if (el !== null) {
            setMenuEl(el);
            setMenuWidth(el.getBoundingClientRect().width);
        }
    }, []);

    useEffect(() => {
        function handleClickOutside(event: Event) {
          if (menuEl && !menuEl.contains(event.target as Node)) {
            props.onClose();
          }
        }

        document.addEventListener("mousedown", handleClickOutside, true);

        return () => {
          document.removeEventListener("mousedown", handleClickOutside, true);
        };
      }, [menuEl]);

    if (props.isOpen === false) {
        return null;
    }

    return (
        <ReactPortal id="menu">
            <div ref={measuredRef} className="absolute" style={{ top: position.y, left: position.x }}>
                {props.children}
            </div>
        </ReactPortal>
    )
}