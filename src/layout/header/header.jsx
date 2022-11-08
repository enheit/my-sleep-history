import { addSeconds, differenceInMilliseconds, format } from 'date-fns';
import { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase.config';
import { UserProfile } from './components/user-profile/user-profile';
import { UserProfileSkeleton } from './components/user-profile/user-profile.skeleton';

export function Header() {
    const [ user, userError ] = useAuthState(auth);
    let [isSlipping, setIsSleeping] = useState(false);
    
    let [startTime, setStartTime] = useState(new Date());
    let [ellapsedSeconds, setEllapsedSeconds] = useState(0);

    const increment = useRef(null);

    function startSleeping() {
        setStartTime(new Date());
        setIsSleeping(true)

        increment.current = setInterval(() => {
            setEllapsedSeconds((timer) => timer + 1)
        }, 1000)
    }

    function stopSleeping() {
        setIsSleeping(false)
        setEllapsedSeconds(0);
        clearInterval(increment.current);
    }

    console.log(ellapsedSeconds, startTime);

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
                            Start sleeping
                        </button>
                    )}

                    {isSlipping === true && (
                        <div className="flex items-center gap-4">
                            <p className="text-gray-100">{format(new Date(differenceInMilliseconds(addSeconds(startTime, ellapsedSeconds)), startTime), "HH:mm:ss")}</p>
                            <button className="px-4 py-2 rounded-full text-gray-900 dark:text-gray-100 border-2 border-red-500 font-semibold" onClick={stopSleeping}>
                                Stop sleeping
                            </button>
                        </div>
                    )}
                </div>

                <p className="text-gray-500">or</p>

                <button className="flex items-center justify-center p-2 border-2 border-blue-500 rounded-full dark:text-gray-100">
                    <span className="material-symbols-outlined">
                        add
                    </span>
                </button>
            </div>

        </div>
    )
}