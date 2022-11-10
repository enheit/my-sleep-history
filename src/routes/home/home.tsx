import { startOfMonth } from 'date-fns';
import { collection, deleteDoc, doc, onSnapshot, query, Timestamp, where, writeBatch } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { auth, db } from '../../firebase/firebase.config';
import { EditSleepSessionDialog } from './components/edit-sleep-session-dialog/edit-sleep-session-dialog';
import { SessionRecords, SleepSessionRecord } from './components/session-records/session-records';
import { SessionRecordsSkeleton } from './components/session-records/session-records.skeleton';

interface SleepSessionModel {
    inBedAt: Timestamp,
    napping: boolean,
    wokeUpAt: Timestamp,
    userId: string
}

export function Home() {
    const { t, i18n } = useTranslation();
    const [user] = useAuthState(auth);
    const [isDataLoading, setIsDataLoading] = useState(false);

    const [sleepSessionRecords, setSleepSessionRecords] = useState<SleepSessionRecord[]>([]);

    const isHistoryDataExist = false;
    let [activeRecord, setActiveRecord] = useState<SleepSessionRecord | null>(null);

    useEffect(() => {
        if (user) {
            setIsDataLoading(true);
            const q = query(
                collection(db, "sleepSessions"), 
                where("userId", "==", user.uid), 
                // where("inBedAt", ">", Timestamp.fromDate(startOfMonth(new Date()))), 
                // where("inBedAt", "<", Timestamp.fromDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1))), 
            );

            const unsubscribe = onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        let data = change.doc.data() as SleepSessionModel;

                        let record: SleepSessionRecord = {
                            id: change.doc.id,
                            date: new Date(),
                            inBedAt: data.inBedAt.toDate(),
                            wokeUpAt: data.wokeUpAt.toDate(),
                            napping: data.napping
                        };

                        setSleepSessionRecords(sleepSessionRecords => [...sleepSessionRecords, record])
                    }
                    if (change.type === "modified") {
                        let data = change.doc.data() as SleepSessionModel;

                        setSleepSessionRecords(records => records.map(record => { 
                            if (record.id === change.doc.id) {
                                return {
                                    ...record, 
                                    napping: data.napping, 
                                    inBedAt: data.inBedAt.toDate(), 
                                    wokeUpAt:data.wokeUpAt.toDate() 
                                }
                            }

                            return record
                        }))
                    }

                    if (change.type === "removed") {
                        setSleepSessionRecords(records => records.filter(record => record.id !== change.doc.id))
                    }
                });

                setIsDataLoading(false);
            });
        }
    }, [user])

    function handleRecordEdit(record: SleepSessionRecord) {
        setActiveRecord(record);
    }

    async function handleRecordRemove(record: SleepSessionRecord) {
        let isConfirmed = window.confirm(t("home.record_delete_confirmation"));

        if (isConfirmed) {
            await deleteDoc(doc(db, "sleepSessions", record.id));
        }
    }

    function handleEditSleepSessionDialogClose() {
        setActiveRecord(null);
    }

    return (
        <div className="flex flex-col px-4">
            <div className="flex flex-col gap-16 mt-4">
                {isDataLoading && <SessionRecordsSkeleton />}
                {!isDataLoading && <SessionRecords records={sleepSessionRecords} onRecordEdit={handleRecordEdit} onRecordRemove={handleRecordRemove} currentMonth={false} />}
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