
interface UserProfileProps {
    photoUrl: string | null,
    displayName: string | null
    email: string | null
}

export function UserProfile(props: UserProfileProps) {
    return (
        <div className="flex items-center gap-4">
            {props.photoUrl
                ? <img className="w-9 h-9 rounded-lg" src={props.photoUrl} alt="User avatar" />
                : (
                    <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-400 w-9 h-9 rounded-lg">
                        <span className="material-symbols-outlined">
                            person
                        </span>
                    </div>
                )
            }


            <div className="flex flex-col">
                <p className="leading-none text-gray-900 dark:text-white  font-semibold">{props.displayName ?? "Unknown"}</p>
                {props.email !== null && <p className="text-gray-400">{props.email}</p>}
            </div>
        </div>
    )
}