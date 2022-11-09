import { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { auth } from '../../firebase/firebase.config';
import { AddSleepSessionDialog } from './components/add-sleep-session-dialog/add-sleep-session-dialog';
import { UserProfile } from './components/user-profile/user-profile';
import { UserProfileSkeleton } from './components/user-profile/user-profile.skeleton';

export function Header() {
    const { t } = useTranslation();
    const [isAddSleepSessionDialogOpen, setIsAddSleepSessionDialogOpen] = useState(false);
    const [ user, userError ] = useAuthState(auth);

    let [isSlipping, setIsSleeping] = useState(false);
    let [ellapsedSeconds, setEllapsedSeconds] = useState(0);

    const increment = useRef<NodeJS.Timer | null>(null);

    function startSleeping() {
        setIsSleeping(true)

        increment.current = setInterval(() => {
            setEllapsedSeconds((timer) => timer + 1)
        }, 1000)
    }

    function stopSleeping() {
        setIsSleeping(false)
        setEllapsedSeconds(0);
        clearInterval(increment.current as NodeJS.Timer);
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