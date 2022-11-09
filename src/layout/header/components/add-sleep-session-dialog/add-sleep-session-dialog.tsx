import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { Dialog } from "../../../../components/dialog/dialog";
import { auth, db } from "../../../../firebase/firebase.config";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore"; 


interface AddSleepSessionDialogProps {
    isOpen: boolean
    onClose: () => void
}

interface AddSleepingForm {
    inBedAt: string | null,
    wokeUpAt: string | null,
    napping: boolean
}

export function AddSleepSessionDialog(props: AddSleepSessionDialogProps) {
    const { t } = useTranslation();
    const [user] = useAuthState(auth);

    const initialState: AddSleepingForm = {
        inBedAt: null,
        wokeUpAt: null,
        napping: false
    };

    const [formState, setFormState] = useState<AddSleepingForm>(initialState);

    function onInBedTimeChange(event: React.ChangeEvent<HTMLInputElement>) {
        const inBedAt = event.target.value;

        setFormState(prevState => ({ ...prevState, inBedAt }));
    }

    function onWokeUpTimeChange(event: React.ChangeEvent<HTMLInputElement>) {
        const wokeUpAt = event.target.value;

        setFormState(prevState => ({ ...prevState, wokeUpAt }));
    }

    function onNappingChange(event: React.ChangeEvent<HTMLInputElement>) {
        const isNapping = event.target.checked;

        setFormState(prevState => ({ ...prevState, napping: isNapping }));
    }

    async function handleSubmit() {
        if (user && formState.inBedAt !== null && formState.wokeUpAt !== null) {

            let newDocRef = collection(db, "sleepSessions")

            await addDoc(newDocRef, {
                inBedAd: Timestamp.fromDate(new Date(formState.inBedAt)) ,
                napping: formState.napping,
                wokeUpAt: Timestamp.fromDate(new Date(formState.wokeUpAt)) ,
                userId: user.uid
            });

            props.onClose();

            setFormState(initialState);
        }
    }

    return (
        <Dialog isOpen={props.isOpen}>
            <div>
                <h1 className="text-xl font-semibold dark:text-gray-100">{t('home.create_sleep_session_dialog.title')}</h1>

                <div className="flex flex-col gap-4 mt-8">
                    <div className="flex gap-4">
                        <div className="flex grow flex-col gap-2">
                            <label htmlFor="in-bed-at" className="dark:text-gray-100">{t('home.create_sleep_session_dialog.in_bed_at')}</label>
                            <input onChange={onInBedTimeChange} id="in-bed-at" type="datetime-local" className="px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-500 bg-transparent dark:text-gray-100" />
                        </div>

                        <div className="flex grow flex-col gap-2">
                            <label htmlFor="woke-up-at" className="dark:text-gray-100">{t('home.create_sleep_session_dialog.woke_up_at')}</label>
                            <input onChange={onWokeUpTimeChange} id="woke-up-at" type="datetime-local" className="px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-500 bg-transparent dark:text-gray-100" />
                        </div>
                    </div>

                    <div className="flex gap-2 items-center">
                        <label htmlFor="nap" className="dark:text-gray-100">{t('home.create_sleep_session_dialog.nap')}?</label>
                        <input onChange={onNappingChange} id="nap" type="checkbox" />
                    </div>
                </div>


                <div className="flex items-center gap-2 justify-end mt-8">
                    <button className="px-4 py-2 rounded-full dark:text-gray-100" onClick={props.onClose}>
                        {t('home.create_sleep_session_dialog.close')}
                    </button>

                    <button className="px-4 py-2 rounded-full border-2 border-blue-500 dark:text-gray-100" onClick={handleSubmit}>
                        {t('home.create_sleep_session_dialog.create')}
                    </button>
                </div>
            </div>
        </Dialog>
    )
}