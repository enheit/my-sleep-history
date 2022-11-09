import { differenceInSeconds } from 'date-fns';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, Timestamp, where } from 'firebase/firestore';
import { useRef, useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { auth, db } from '../../firebase/firebase.config';
import { AddSleepSessionDialog } from './components/add-sleep-session-dialog/add-sleep-session-dialog';
import { UserProfile } from './components/user-profile/user-profile';
import { UserProfileSkeleton } from './components/user-profile/user-profile.skeleton';

export function Header() {
    const { t } = useTranslation();
    const [isAddSleepSessionDialogOpen, setIsAddSleepSessionDialogOpen] = useState(false);
    const [user, userError] = useAuthState(auth);

    let [isSlipping, setIsSleeping] = useState(false);
    let [ellapsedSeconds, setEllapsedSeconds] = useState(0);

    const increment = useRef<NodeJS.Timer | null>(null);

    useEffect(() => {
        if (user) {
            console.log("FETCH");
            const q = query(collection(db, "activeSleepSessions"), where("userId", "==", user.uid));

            const querySnapshot = getDocs(q).then((querySnapshot) => {
                if (querySnapshot.size > 0) {
                    setIsSleeping(true);

                    querySnapshot.docs.map((document) => {
                        let data = document.data() as { userId: string, startedAt: Timestamp };

                        let seconds = differenceInSeconds(new Date(), data.startedAt.toDate());

                        setEllapsedSeconds(seconds);
                    });
                    
                    startTimer();
                }
            });
        }
    }, [user])

    async function startSleeping() {
        if (user) {
            setIsSleeping(true)

            let newDocRef = collection(db, "activeSleepSessions")

            await addDoc(newDocRef, {
                startedAt: Timestamp.fromDate(new Date()),
                userId: user.uid
            });

            startTimer()
        }
    }

    function startTimer() {
        increment.current = setInterval(() => {
            setEllapsedSeconds((timer) => timer + 1)
        }, 1000)
    }

    async function stopSleeping() {
        if (user) {
            const q = query(collection(db, "activeSleepSessions"), where("userId", "==", user.uid));

            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((document) => {
                let data = document.data() as { userId: string, startedAt: Timestamp };

                let newDocRef = collection(db, "sleepSessions")

                addDoc(newDocRef, {
                    inBedAd: data.startedAt,
                    napping: false,
                    wokeUpAt: Timestamp.fromDate(new Date()),
                    userId: user.uid
                });

                deleteDoc(doc(db, "activeSleepSessions", document.id));
            });

            setIsSleeping(false)
            setEllapsedSeconds(0);
            clearInterval(increment.current as NodeJS.Timer);
        }

    }

    function formatAsTimer(ellaspedSeconds: number) {
        return new Date(ellapsedSeconds * 1000).toISOString().substring(11, 19)
    }

    function toggleSleepSessionDialog() {
        setIsAddSleepSessionDialogOpen(isOpen => !isOpen);
    }

    return (
        <div className="flex items-center justify-between p-4">
            {user
                ? <UserProfile
                    displayName={user.displayName}
                    email={user.email}
                    photoUrl={user.photoURL} />
                : <UserProfileSkeleton />
            }

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    {isSlipping === false && (
                        <button className="px-4 py-2 rounded-full text-gray-900 dark:text-gray-100 border-2 border-green-500 font-semibold" onClick={startSleeping}>
                            {t('header.start_sleeping')}
                        </button>
                    )}

                    {isSlipping === true && (
                        <div className="flex items-center gap-4">
                            <p className="text-gray-100">{formatAsTimer(ellapsedSeconds)}</p>
                            <button className="px-4 py-2 rounded-full text-gray-900 dark:text-gray-100 border-2 border-red-500 font-semibold" onClick={stopSleeping}>
                                {t('header.stop_sleeping')}
                            </button>
                        </div>
                    )}
                </div>

                <p className="text-gray-500">{t('header.or')}</p>

                <button className="flex items-center justify-center p-2 border-2 border-blue-500 rounded-full dark:text-gray-100" onClick={toggleSleepSessionDialog}>
                    <span className="material-symbols-outlined">
                        add
                    </span>
                </button>
            </div>

            <AddSleepSessionDialog
                isOpen={isAddSleepSessionDialogOpen}
                onClose={toggleSleepSessionDialog}
            />
        </div>
    )
}