import { Dialog } from "../../../../components/dialog/dialog";
import { SleepSessionRecord } from "../session-records/session-records";

interface EditSleepSessionDialogProps {
    isOpen: boolean
    onClose: () => void,
    record: SleepSessionRecord | null
}

export function EditSleepSessionDialog(props: EditSleepSessionDialogProps) {
    return (
        <Dialog isOpen={props.isOpen}>
            <div>
                <h1 className="text-xl font-semibold dark:text-gray-100">Sleep session</h1>

                <div className="flex flex-col gap-4 mt-8">
                    <div className="flex gap-4">
                        <div className="flex grow flex-col gap-2">
                            <label htmlFor="in-bed-at" className="dark:text-gray-100">In bed at</label>
                            <input id="in-bed-at" type="datetime-local" className="px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-500 bg-transparent dark:text-gray-100" />
                        </div>

                        <div className="flex grow flex-col gap-2">
                            <label htmlFor="woke-up-at" className="dark:text-gray-100">Woke up at</label>
                            <input id="woke-up-at" type="datetime-local" className="px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-500 bg-transparent dark:text-gray-100" />
                        </div>
                    </div>

                    <div className="flex gap-2 items-center">
                        <label htmlFor="nap" className="dark:text-gray-100">Nap?</label>
                        <input id="nap" type="checkbox" />
                    </div>
                </div>


                <div className="flex items-center gap-2 justify-end mt-8">
                    <button className="px-4 py-2 rounded-full dark:text-gray-100" onClick={props.onClose}>
                        Close
                    </button>

                    <button className="px-4 py-2 rounded-full border-2 border-blue-500 dark:text-gray-100" onClick={props.onClose}>
                        Create
                    </button>
                </div>
            </div>
        </Dialog>
    )
}