import { ReactPortal } from "../portal/portal";

interface DialogProps {
    isOpen: boolean,
    children: JSX.Element
}

export function Dialog(props: DialogProps) {
    if (props.isOpen === false) {
        return null
    }

    return (
        <ReactPortal id="dialog">
            <div style={{ backdropFilter: 'blur(1px)' }} className="flex justify-center items-center bg-zinc-900/20 fixed top-0 left-0 right-0 bottom-0">
                <div className="bg-black drop-shadow-lg max-w-screen-sm w-full rounded-2xl p-4 m-4">
                    {props.children}
                </div>
            </div>
        </ReactPortal>
    )
}