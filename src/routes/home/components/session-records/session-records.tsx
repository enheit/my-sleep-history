import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { useState } from "react";
import { Menu } from "../../../../components/menu/menu";
import { MoreVertMenu } from "../more-vert-menu/more-vert-menu";

export interface SleepSessionRecord {
    date: Date,
    inBedAt: Date,
    wokeUpAt: Date,
}

interface SessionRecordsProps {
    currentMonth: boolean,
    records: SleepSessionRecord[]
    onRecordEdit: (record: SleepSessionRecord) => void
    onRecordRemove: (record: SleepSessionRecord) => void
}

export function SessionRecords(props: SessionRecordsProps) {
    let [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    let [expanded, setExpanded] = useState(false);
    let [activeRecord, setActiveRecord] = useState<SleepSessionRecord | null>(null);
    let records = expanded ? props.records : props.records.slice(0, 3);

    function handleMoreClick (event: React.MouseEvent<HTMLButtonElement>, record: SleepSessionRecord) {
        setActiveRecord(record);
        setAnchorEl(event.currentTarget);
    }

    function handleMoreClose () {
        setAnchorEl(null);
        setActiveRecord(null);
    }

    function deleteRecord () {
        if (activeRecord) {
            props.onRecordRemove(activeRecord);
            handleMoreClose();
        }
    }

    function editRecord () {
        if (activeRecord) {
            props.onRecordEdit(activeRecord);
            handleMoreClose();
        }
    }

    return (
        <div className="flex flex-col rounded-lg">
            <h1 className="text-2xl text-gray-900 dark:text-gray-100 mb-4">
                November 2022
            </h1>

            {props.currentMonth === false && (
                <div className="flex flex-col gap-4 mt-4 mb-8">
                    <h1 className="font-bold text-gray-900 dark:text-gray-100">Short summary</h1>
        
                    <div className="flex gap-12">
                        <div className="flex flex-col">
                            <p className="text-gray-900 dark:text-gray-100">Average awake duration</p>
                            <p className="text-gray-900 dark:text-gray-100">14 h. 30 min.</p>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-gray-900 dark:text-gray-100">In bed</p>
                            <p className="text-gray-900 dark:text-gray-100">Mostly In Time</p>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-gray-900 dark:text-gray-100">Woke up</p>
                            <p className="text-gray-900 dark:text-gray-100">Mostly Almost In Time</p>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-gray-900 dark:text-gray-100">Average sleep duration</p>
                            <p className="text-gray-900 dark:text-gray-100">6 h. 30 min.</p>
                        </div>
                    </div>
                </div>
            )}


            <table className="w-full table-auto">
                <thead>
                    <tr className="text-left">
                        <th className="py-4 text-gray-900 dark:text-gray-100">Awake duration</th>
                        <th className="p-4">
                            <div className="flex items-center gap-2">
                                <p className="text-gray-900 dark:text-gray-100">In bed at</p>
                                <span title="Mostly In Time" className="w-2 h-2 bg-green-500 rounded-full"></span>
                            </div>
                        </th>
                        <th className="p-4">
                            <div className="flex items-center gap-2">
                                <p className="text-gray-900 dark:text-gray-100">Woke up at</p>
                                <span title="Mostly Almost In Time" className="w-2 h-2 bg-orange-500 rounded-full"></span>
                            </div>
                        </th>
                        <th className="py-4 text-gray-900 dark:text-gray-100">
                        <div className="flex items-center gap-2">
                                <p className="text-gray-900 dark:text-gray-100">Sleep duration</p>
                                <span title="Mostly Almost In Time" className="w-2 h-2 bg-red-500 rounded-full"></span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record, index) => {
                        return (
                            <tr className="border-b last:border-none border-gray-200 dark:border-zinc-900" key={index}>
                                <td className="py-4 text-gray-900 dark:text-gray-100">17 h. 30 min.</td>
                                <td className="p-4">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <p className="text-gray-900 dark:text-gray-100">22:30</p>
                                            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                        </div>

                                        <span className="text-sm text-gray-400">Sunday, 14 Nov</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <p className="text-gray-900 dark:text-gray-100">08:30</p>
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        </div>
                                        
                                        <span className="text-sm text-gray-400">Monday, 14 Nov</span>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <div className="flex items-center gap-2">
                                        <p className="text-gray-900 dark:text-gray-100">6 h. 30 min.</p>
                                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                    </div>
                                </td>
                                <td style={{ maxWidth: 60 }}>
                                    <div className="flex items-center justify-end">
                                        <button className="flex items-center justify-center p-2 dark:text-gray-100 rounded-full" onClick={(event) => handleMoreClick(event, record)}>
                                            <span className="material-symbols-outlined">
                                                more_horiz
                                            </span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    
                    {expanded === false && (
                        <tr>
                            <td className="text-gray-100 py-4">
                                <div className="flex items-center">
                                    <button className="flex items-center text-blue-500" onClick={() => setExpanded(folded => !folded)}>
                                        {props.records.length - records.length} more...
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <MoreVertMenu
                isOpen={Boolean(anchorEl)} 
                onClose={handleMoreClose} 
                anchorEl={anchorEl}
                onEdit={editRecord}
                onDelete={deleteRecord}
            />
        </div>
    )
}