import { EditSleepSessionDialog } from './components/edit-sleep-session-dialog/edit-sleep-session-dialog';
import { SessionRecords, SleepSessionRecord } from './components/session-records/session-records';
import { useState } from 'react';

export function Home() {
    let [activeRecord, setActiveRecord] = useState<SleepSessionRecord | null>(null);
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
                <SessionRecords records={sleepSessionRecords} onRecordEdit={handleRecordEdit} onRecordRemove={handleRecordRemove} currentMonth />
                <SessionRecords records={sleepSessionRecords} onRecordEdit={handleRecordEdit} onRecordRemove={handleRecordRemove} currentMonth={false} />
            </div>

            <button className="flex self-center gap-2 px-4 py-2  items-center justify-center font-semibold border-2 border-blue-500 text-gray-900 dark:text-gray-100 rounded-full my-12">
                Show more
            </button>

            <EditSleepSessionDialog 
                record={activeRecord}
                isOpen={activeRecord !== null}
                onClose={handleEditSleepSessionDialogClose}
            />
        </div>
    )
}