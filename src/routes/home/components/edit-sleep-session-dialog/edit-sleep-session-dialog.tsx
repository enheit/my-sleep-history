import { collection, doc, Timestamp, updateDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { Dialog } from "../../../../components/dialog/dialog";
import { auth, db } from "../../../../firebase/firebase.config";
import { SleepSessionRecord } from "../session-records/session-records";

interface EditSleepSessionDialogProps {
    isOpen: boolean
    onClose: () => void,
    record: SleepSessionRecord | null
}

interface AddSleepingForm {
    inBedAt: Date,
    wokeUpAt: Date,
    napping: boolean
}

export function EditSleepSessionDialog(props: EditSleepSessionDialogProps) {
    const { t } = useTranslation();
    const [user] = useAuthState(auth);

    const initialState: AddSleepingForm = {
        inBedAt: new Date(),
        wokeUpAt: new Date(),
        napping: false
    };

    useEffect(() => {
        if (props.isOpen && props.record) {
            setFormState({
                inBedAt: props.record.inBedAt,
                wokeUpAt: props.record?.wokeUpAt,
                napping: props.record?.napping
            })
        }
    }, [props.isOpen, props.record])

    const [formState, setFormState] = useState<AddSleepingForm>(initialState);

    function onInBedTimeChange(event: React.ChangeEvent<HTMLInputElement>) {
        const inBedAt = new Date(event.target.value);

        setFormState(prevState => ({ ...prevState, inBedAt }));
    }

    function onWokeUpTimeChange(event: React.ChangeEvent<HTMLInputElement>) {
        const wokeUpAt = new Date(event.target.value);

        setFormState(prevState => ({ ...prevState, wokeUpAt }));
    }

    function onNappingChange(event: React.ChangeEvent<HTMLInputElement>) {
        const isNapping = event.target.checked;

        setFormState(prevState => ({ ...prevState, napping: isNapping }));
    }

    function handleClose() {
        props.onClose();
    }

    async function handleSubmit() {
        if (user && formState.inBedAt && formState.wokeUpAt && props.record) {
            let docToUpdate = doc(db, "sleepSessions", props.record.id)

            await updateDoc(docToUpdate, {
                inBedAd: Timestamp.fromDate(formState.inBedAt) ,
                napping: formState.napping,
                wokeUpAt: Timestamp.fromDate(formState.wokeUpAt) ,
                userId: user.uid
            });

            props.onClose();

            setFormState(initialState);
        }
    }

    return (
        <Dialog isOpen={props.isOpen}>
            <div>
                <h1 className="text-xl font-semibold dark:text-gray-100">{t("home.edit_sleep_session_dialog.title")}</h1>

                <div className="flex flex-col gap-4 mt-8">
                    <div className="flex gap-4">
                        <div className="flex grow flex-col gap-2">
                            <label htmlFor="in-bed-at" className="dark:text-gray-100">{t("home.edit_sleep_session_dialog.in_bed_at")}</label>
                            <input value={format(formState.inBedAt, "yyyy-MM-dd'T'HH:mm")} onChange={onInBedTimeChange} id="in-bed-at" type="datetime-local" className="px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-500 bg-transparent dark:text-gray-100" />
                        </div>

                        <div className="flex grow flex-col gap-2">
                            <label htmlFor="woke-up-at" className="dark:text-gray-100">{t("home.edit_sleep_session_dialog.woke_up_at")}</label>
                            <input value={format(formState.wokeUpAt, "yyyy-MM-dd'T'HH:mm")} onChange={onWokeUpTimeChange} id="woke-up-at" type="datetime-local" className="px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-500 bg-transparent dark:text-gray-100" />
                        </div>
                    </div>

                    <div className="flex gap-2 items-center">
                        <label htmlFor="nap" className="dark:text-gray-100">{t("home.edit_sleep_session_dialog.nap")}?</label>
                        <input checked={formState.napping} onChange={onNappingChange} id="nap" type="checkbox" />
                    </div>
                </div>


                <div className="flex items-center gap-2 justify-end mt-8">
                    <button className="px-4 py-2 rounded-full dark:text-gray-100" onClick={handleClose}>
                        {t("home.edit_sleep_session_dialog.close")}
                    </button>

                    <button className="px-4 py-2 rounded-full border-2 border-blue-500 dark:text-gray-100" onClick={handleSubmit}>
                        {t("home.edit_sleep_session_dialog.update")}
                    </button>
                </div>
            </div>
        </Dialog>
    )
}