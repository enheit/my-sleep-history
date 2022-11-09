import { EditSleepSessionDialog } from './components/edit-sleep-session-dialog/edit-sleep-session-dialog';
import { SessionRecords, SleepSessionRecord } from './components/session-records/session-records';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { addHours, addMinutes, subDays } from 'date-fns';

export function Home() {
    const {t, i18n} = useTranslation();

    let [activeRecord, setActiveRecord] = useState<SleepSessionRecord | null>(null);
    let sleepSessionRecords: SleepSessionRecord[] = [
        {
            date: new Date(),
            inBedAt: subDays(new Date(), 1),
            wokeUpAt: subDays(addHours(new Date(), 8), 1)
        },
        {
            date: new Date(),
            inBedAt: subDays(new Date(), 2),
            wokeUpAt: subDays(addHours(new Date(), 9), 2)
        },
        {
            date: new Date(),
            inBedAt: subDays(new Date(), 3),
            wokeUpAt: subDays(addHours(new Date(), 7), 3)
        },
        {
            date: new Date(),
            inBedAt: subDays(new Date(), 4),
            wokeUpAt: subDays(addHours(new Date(), 7), 4)
        },
        // {
        //     date: new Date(),
        //     inBedAt: new Date(),
        //     wokeUpAt: addMinutes(new Date(), 30)
        // },

        // {
        //     date: new Date(),
        //     inBedAt: new Date(),
        //     wokeUpAt: addMinutes(new Date(), 30)
        // },

        // {
        //     date: new Date(),
        //     inBedAt: new Date(),
        //     wokeUpAt: addMinutes(new Date(), 30)
        // },
        // {
        //     date: new Date(),
        //     inBedAt: new Date(),
        //     wokeUpAt: addMinutes(new Date(), 30)
        // },

        // {
        //     date: new Date(),
        //     inBedAt: new Date(),
        //     wokeUpAt: addMinutes(new Date(), 30)
        // },

        // {
        //     date: new Date(),
        //     inBedAt: new Date(),
        //     wokeUpAt: addMinutes(new Date(), 30)
        // },
        // {
        //     date: new Date(),
        //     inBedAt: new Date(),
        //     wokeUpAt: addMinutes(new Date(), 30)
        // },
        // {
        //     date: new Date(),
        //     inBedAt: new Date(),
        //     wokeUpAt: addMinutes(new Date(), 30)
        // },

        // {
        //     date: new Date(),
        //     inBedAt: new Date(),
        //     wokeUpAt: addMinutes(new Date(), 30)
        // },

        // {
        //     date: new Date(),
        //     inBedAt: new Date(),
        //     wokeUpAt: addMinutes(new Date(), 30)
        // },
        // {
        //     date: new Date(),
        //     inBedAt: new Date(),
        //     wokeUpAt: addMinutes(new Date(), 30)
        // },

        // {
        //     date: new Date(),
        //     inBedAt: new Date(),
        //     wokeUpAt: addMinutes(new Date(), 30)
        // },

        // {
        //     date: new Date(),
        //     inBedAt: new Date(),
        //     wokeUpAt: addMinutes(new Date(), 30)
        // },
        // {
        //     date: new Date(),
        //     inBedAt: new Date(),
        //     wokeUpAt: addMinutes(new Date(), 30)
        // },

        // {
        //     date: new Date(),
        //     inBedAt: new Date(),
        //     wokeUpAt: addMinutes(new Date(), 30)
        // },

        // {
        //     date: new Date(),
        //     inBedAt: new Date(),
        //     wokeUpAt: addMinutes(new Date(), 30)
        // },
        // {
        //     date: new Date(),
        //     inBedAt: new Date(),
        //     wokeUpAt: addMinutes(new Date(), 30)
        // },
        // {
        //     date: new Date(),
        //     inBedAt: new Date(),
        //     wokeUpAt: addMinutes(new Date(), 30)
        // },

        // {
        //     date: new Date(),
        //     inBedAt: new Date(),
        //     wokeUpAt: addMinutes(new Date(), 30)
        // },

        // {
        //     date: new Date(),
        //     inBedAt: new Date(),
        //     wokeUpAt: addMinutes(new Date(), 30)
        // },
        // {
        //     date: new Date(),
        //     inBedAt: new Date(),
        //     wokeUpAt: addMinutes(new Date(), 30)
        // },

        // {
        //     date: new Date(),
        //     inBedAt: new Date(),
        //     wokeUpAt: addMinutes(new Date(), 30)
        // },

        // {
        //     date: new Date(),
        //     inBedAt: new Date(),
        //     wokeUpAt: addMinutes(new Date(), 30)
        // },
        // {
        //     date: new Date(),
        //     inBedAt: new Date(),
        //     wokeUpAt: addMinutes(new Date(), 30)
        // },

        // {
        //     date: new Date(),
        //     inBedAt: new Date(),
        //     wokeUpAt: addMinutes(new Date(), 30)
        // },

        // {
        //     date: new Date(),
        //     inBedAt: new Date(),
        //     wokeUpAt: addMinutes(new Date(), 30)
        // },
        // {
        //     date: new Date(),
        //     inBedAt: new Date(),
        //     wokeUpAt: addMinutes(new Date(), 30)
        // },
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
                {t('home.show_more')}
            </button>

            <EditSleepSessionDialog 
                record={activeRecord}
                isOpen={activeRecord !== null}
                onClose={handleEditSleepSessionDialogClose}
            />
        </div>
    )
}