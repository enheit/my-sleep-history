import { collection, onSnapshot, orderBy, query, Timestamp, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { auth, db } from '../../firebase/firebase.config';
import { EditSleepSessionDialog } from './components/edit-sleep-session-dialog/edit-sleep-session-dialog';
import { SessionRecords, SleepSessionRecord } from './components/session-records/session-records';
import { SessionRecordsSkeleton } from './components/session-records/session-records.skeleton';

interface SleepSessionModel {
    inBedAd: Timestamp,
    napping: boolean,
    wokeUpAt: Timestamp,
    userId: string
}

export function Home() {
    const {t, i18n} = useTranslation();
    const [user] = useAuthState(auth);
    const [isDataLoading, setIsDataLoading] = useState(false);

    const [sleepSessionRecords, setSleepSessionRecords] = useState<SleepSessionRecord[]>([]);

    const isHistoryDataExist = false;
    let [activeRecord, setActiveRecord] = useState<SleepSessionRecord | null>(null);

    useEffect(() => {
        if (user) {
            setIsDataLoading(true);
            const q = query(collection(db, "sleepSessions"), where("userId", "==", user.uid), orderBy("inBedAd", "desc"));

            const unsubscribe = onSnapshot(q, (snapshot) => {
                
                snapshot.docChanges().forEach((change) => {
                  if (change.type === "added") {
                    let data = change.doc.data() as SleepSessionModel;

                    let record: SleepSessionRecord = {
                        date: new Date(),
                        inBedAt: data.inBedAd.toDate(),
                        wokeUpAt: data.wokeUpAt.toDate()
                    };

                    setSleepSessionRecords(sleepSessionRecords => [...sleepSessionRecords, record])
                  }
                  if (change.type === "modified") {
                      console.log("Modified city: ", change.doc.data());
                  }
                  if (change.type === "removed") {
                      console.log("Removed city: ", change.doc.data());
                  }
                });

                setIsDataLoading(false);
            });
        }
    }, [user])

    function handleRecordEdit (record: SleepSessionRecord) {
        setActiveRecord(record);
    }

    function handleRecordRemove (record: SleepSessionRecord) {
        let isConfirmed = window.confirm("Are you sure you want to delete");

        if (isConfirmed) {
            console.log("DELETE");
        }
    }

    function handleEditSleepSessionDialogClose() {
        setActiveRecord(null);
    }

    return (
        <div className="flex flex-col px-4">
            <div className="flex flex-col gap-16 mt-4">
                {isDataLoading && <SessionRecordsSkeleton />}
                {!isDataLoading && <SessionRecords records={sleepSessionRecords} onRecordEdit={handleRecordEdit} onRecordRemove={handleRecordRemove} currentMonth />}
                {/* <SessionRecords records={sleepSessionRecords} onRecordEdit={handleRecordEdit} onRecordRemove={handleRecordRemove} currentMonth={false} /> */}
            </div>

            {isHistoryDataExist && (
                <button className="flex self-center gap-2 px-4 py-2 items-center justify-center font-semibold border-2 border-blue-500 text-gray-900 dark:text-gray-100 rounded-full my-12">
                    {t('home.show_more')}
                </button>
            )}

            <EditSleepSessionDialog 
                record={activeRecord}
                isOpen={activeRecord !== null}
                onClose={handleEditSleepSessionDialogClose}
            />
        </div>
    )
}