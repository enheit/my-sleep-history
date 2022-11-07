
interface UserProfileProps {
    photoUrl: string,
    displayName: string
    email: string
}

export function UserProfile(props: UserProfileProps) {
    return (
        <div className="flex items-center gap-4">
        <img className="w-9 h-9 rounded-lg" src={props.photoUrl} alt="User avatar" />

        <div className="flex flex-col">
            <p className="leading-none text-gray-900 dark:text-white  font-semibold">{props.displayName}</p>
            <p className="text-gray-400">{props.email}</p>
        </div>
    </div>
    )
}