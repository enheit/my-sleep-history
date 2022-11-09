
export function UserProfileSkeleton() {
    return (
        <div className="flex items-center gap-4 animate-pulse">
            <div className="w-9 h-9 rounded-lg bg-gray-200 dark:bg-gray-800"></div>

            <div className="flex flex-col gap-2">
                <div className="w-20 h-3 rounded-full bg-gray-200 dark:bg-gray-800"></div>
                <div className="w-40 h-3 rounded-full bg-gray-200 dark:bg-gray-800"></div>
            </div>
        </div>
    )
}