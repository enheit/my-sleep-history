import { SessionRecords, SleepSessionRecord } from './components/session-records/session-records';

export function Home() {
    let sleepSessionRecords: SleepSessionRecord[] = [
        {
            date: new Date(),
            inBedAt: new Date(),
            wokeUpAt: new Date()
        },

        {
            date: new Date(),
            inBedAt: new Date(),
            wokeUpAt: new Date()
        },

        {
            date: new Date(),
            inBedAt: new Date(),
            wokeUpAt: new Date()
        },
        {
            date: new Date(),
            inBedAt: new Date(),
            wokeUpAt: new Date()
        },

        {
            date: new Date(),
            inBedAt: new Date(),
            wokeUpAt: new Date()
        },

        {
            date: new Date(),
            inBedAt: new Date(),
            wokeUpAt: new Date()
        },
        {
            date: new Date(),
            inBedAt: new Date(),
            wokeUpAt: new Date()
        },

        {
            date: new Date(),
            inBedAt: new Date(),
            wokeUpAt: new Date()
        },

        {
            date: new Date(),
            inBedAt: new Date(),
            wokeUpAt: new Date()
        },
        {
            date: new Date(),
            inBedAt: new Date(),
            wokeUpAt: new Date()
        },
        {
            date: new Date(),
            inBedAt: new Date(),
            wokeUpAt: new Date()
        },

        {
            date: new Date(),
            inBedAt: new Date(),
            wokeUpAt: new Date()
        },

        {
            date: new Date(),
            inBedAt: new Date(),
            wokeUpAt: new Date()
        },
        {
            date: new Date(),
            inBedAt: new Date(),
            wokeUpAt: new Date()
        },

        {
            date: new Date(),
            inBedAt: new Date(),
            wokeUpAt: new Date()
        },

        {
            date: new Date(),
            inBedAt: new Date(),
            wokeUpAt: new Date()
        },
        {
            date: new Date(),
            inBedAt: new Date(),
            wokeUpAt: new Date()
        },

        {
            date: new Date(),
            inBedAt: new Date(),
            wokeUpAt: new Date()
        },

        {
            date: new Date(),
            inBedAt: new Date(),
            wokeUpAt: new Date()
        },
        {
            date: new Date(),
            inBedAt: new Date(),
            wokeUpAt: new Date()
        },
        {
            date: new Date(),
            inBedAt: new Date(),
            wokeUpAt: new Date()
        },

        {
            date: new Date(),
            inBedAt: new Date(),
            wokeUpAt: new Date()
        },

        {
            date: new Date(),
            inBedAt: new Date(),
            wokeUpAt: new Date()
        },
        {
            date: new Date(),
            inBedAt: new Date(),
            wokeUpAt: new Date()
        },

        {
            date: new Date(),
            inBedAt: new Date(),
            wokeUpAt: new Date()
        },

        {
            date: new Date(),
            inBedAt: new Date(),
            wokeUpAt: new Date()
        },
        {
            date: new Date(),
            inBedAt: new Date(),
            wokeUpAt: new Date()
        },

        {
            date: new Date(),
            inBedAt: new Date(),
            wokeUpAt: new Date()
        },

        {
            date: new Date(),
            inBedAt: new Date(),
            wokeUpAt: new Date()
        },
        {
            date: new Date(),
            inBedAt: new Date(),
            wokeUpAt: new Date()
        },
    ]

    return (
        <div className="flex flex-col px-4">
            <div className="flex flex-col gap-16 mt-4">
                <SessionRecords records={sleepSessionRecords} currentMonth />
                <SessionRecords records={sleepSessionRecords} currentMonth={false} />
            </div>

            <button className="flex self-center gap-2 px-4 py-2  items-center justify-center font-semibold border-2 border-blue-500 text-gray-900 dark:text-gray-100 rounded-full my-4">
                More
            </button>
        </div>
    )
}