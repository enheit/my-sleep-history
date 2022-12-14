import { addSeconds, differenceInHours, differenceInMinutes, differenceInSeconds, format, intervalToDuration, isThisYear, min } from "date-fns";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MoreVertMenu } from "../more-vert-menu/more-vert-menu";
import { uk, enGB } from 'date-fns/locale';
import { SupportedLocale } from "../../../../i18n/i18n.config";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase.config";

export interface SleepSessionRecord {
    id: string
    date: Date,
    inBedAt: Date,
    wokeUpAt: Date,
    napping: boolean
}

interface SessionRecordsProps {
    currentMonth: boolean,
    records: SleepSessionRecord[]
    onRecordEdit: (record: SleepSessionRecord) => void
    onRecordRemove: (record: SleepSessionRecord) => void
}


export function SessionRecords(props: SessionRecordsProps) {
    const { t, i18n } = useTranslation();
    let locale = i18n.language === SupportedLocale.English ? enGB : uk;
    const cuttedRecordsNumber = 3;

    let [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    let [expanded, setExpanded] = useState(false);
    let [activeRecord, setActiveRecord] = useState<SleepSessionRecord | null>(null);
    
    let sortedRecords = props.records.sort((a, b) => b.inBedAt.getTime() - a.inBedAt.getTime())
    let records = expanded ? sortedRecords : sortedRecords.slice(0, cuttedRecordsNumber);

    const totalSleepDuration = sortedRecords
        .filter(record => record.napping === false)
        .map((record) => differenceInSeconds(record.wokeUpAt, record.inBedAt))
        .reduce((acc, seconds) => acc + seconds, 0);

    const averageSleepDuration = sortedRecords.length === 0 ? 0 : Math.floor(totalSleepDuration / sortedRecords.length);

    const totalAwakeDuration = sortedRecords
        .filter(record => record.napping === false)
        .map((record, index, arr) => {
            if (arr[index + 1] !== undefined) {
                return differenceInSeconds(arr[index + 1].wokeUpAt, record.inBedAt)
            }
            
            return 0
        })
        .reduce((acc, seconds) => acc + seconds, 0);

    const averageAwakeDuration = sortedRecords.length === 0 ? 0 : Math.floor(totalAwakeDuration / sortedRecords.length - 1);

    function handleMoreClick (event: React.MouseEvent<HTMLButtonElement>, record: SleepSessionRecord) {
        setActiveRecord(record);
        setAnchorEl(event.currentTarget);
    }

    function handleMoreClose () {
        setAnchorEl(null);
        setActiveRecord(null);
    }

    function deleteRecord  (record: SleepSessionRecord) {
        props.onRecordRemove(record);
    }

    function editRecord (record: SleepSessionRecord) {
        props.onRecordEdit(record);
    }

    function getSleepDurationIndicator(durationInHours: number) {
        if (durationInHours >= 7) {
            return <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        } else if (durationInHours >= 6) {
            return <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
        } else {
            return <span className="w-2 h-2 bg-red-500 rounded-full"></span>
        }
    }

    function formatDuration(start: Date, end: Date) {
        let duration = intervalToDuration({ start: start, end: end });

        let hours = (duration.hours ?? 0) + ((duration.days ?? 0) * 24);
        let minutes = duration.minutes ?? 0;
        let seconds = duration.seconds ?? 0;

        if (hours > 0 && minutes > 0) {
            return `${hours} ${t('time.h')}. ${minutes} ${t('time.min')}.`;
        } else if (hours > 0 && minutes === 0) {
            return `${hours} ${t('time.h')}.`;
        } else if (hours === 0 && minutes > 0) {
            return `${minutes} ${t('time.min')}.`
        } else if (hours === 0 && minutes === 0 && seconds >= 0) {
            return `${seconds} ${t('time.sec')}.`
        } 
    }

    let titleDate = props.records[0]?.inBedAt ?? new Date();

    return (
        <div className="flex flex-col rounded-lg">
            <h1 className="text-2xl text-gray-900 dark:text-gray-100 mb-4">
                {t('home.table.your_sleep_history')}
            </h1>

            {props.records.length > 0 && (
                <div className="flex flex-col gap-4 mt-4 mb-8">
                    <h1 className="font-bold text-gray-900 dark:text-gray-100">{t('home.short_summary.title')}</h1>
        
                    <div className="flex flex-col md:flex-row gap-4 md:gap-12">
                        <div className="flex flex-col">
                            <p className="text-gray-900 dark:text-gray-100">{t('home.short_summary.average_awake_duration')}</p>
                            <p className="text-gray-900 dark:text-gray-100">{formatDuration(new Date(), addSeconds(new Date(), averageAwakeDuration))}</p>
                        </div>

                        {/* <div className="flex flex-col">
                            <p className="text-gray-900 dark:text-gray-100">{t('home.short_summary.in_bed.title')}</p>
                            <p className="text-gray-900 dark:text-gray-100">{t('home.short_summary.in_bed.mostly_in_time')}</p>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-gray-900 dark:text-gray-100">{t('home.short_summary.woke_up.title')}</p>
                            <p className="text-gray-900 dark:text-gray-100">{t('home.short_summary.woke_up.mostly_almost_in_time')}</p>
                        </div> */}

                        <div className="flex flex-col">
                            <p className="text-gray-900 dark:text-gray-100">{t('home.short_summary.average_sleep_duration')}</p>

                            <div className="flex items-center gap-2">
                                {getSleepDurationIndicator(differenceInHours(addSeconds(new Date(), averageSleepDuration), new Date()))}
                                <p className="text-gray-900 dark:text-gray-100">{formatDuration(new Date(), addSeconds(new Date(), averageSleepDuration))}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table style={{ minWidth: 800 }} className="w-full table-auto rounded-xl">
                    <thead>
                        <tr className="text-left bg-zinc-200/20 dark:bg-zinc-900/20">
                            <th className="p-4 md:p-4 text-gray-900 dark:text-gray-100">{t('home.table.awake_duration')}</th>
                            <th className="p-4 md:p-4">
                                <div className="flex items-center gap-2">
                                    <p className="text-gray-900 dark:text-gray-100">{t('home.table.in_bed_at')}</p>
                                    {/* <span title="Mostly In Time" className="w-2 h-2 bg-green-500 rounded-full"></span> */}
                                </div>
                            </th>
                            <th className="p-4 md:p-4">
                                <div className="flex items-center gap-2">
                                    <p className="text-gray-900 dark:text-gray-100">{t('home.table.woke_up_at')}</p>
                                    {/* <span title="Mostly Almost In Time" className="w-2 h-2 bg-orange-500 rounded-full"></span> */}
                                </div>
                            </th>
                            <th className="p-4 md:p-4 text-gray-900 dark:text-gray-100">
                            <div className="flex items-center gap-2">
                                    <p className="text-gray-900 dark:text-gray-100">{t('home.table.sleep_duration')}</p>
                                    {/* <span title="Mostly Almost In Time" className="w-2 h-2 bg-red-500 rounded-full"></span> */}
                                </div>
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record, index) => {
                            let isRecordExist = props.records[index + 1];

                            return (
                                <tr className="border-b border-zinc-100 dark:border-zinc-900" key={index}>
                                    <td className="p-4 md:p-4 text-gray-900 dark:text-gray-100">{isRecordExist ? formatDuration(props.records[index + 1].wokeUpAt, record.inBedAt) : t("home.table.unknown")}</td>
                                    <td className="p-4 md:p-4">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                <p className="text-gray-900 dark:text-gray-100">{format(record.inBedAt, "HH:mm")}</p>
                                                {/* <span className="w-2 h-2 bg-orange-500 rounded-full"></span> */}
                                            </div>

                                            <span className="text-sm text-gray-400 capitalize">{format(record.inBedAt, "EEEE, d MMM", { locale })}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 md:p-4">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                <p className="text-gray-900 dark:text-gray-100">{format(record.wokeUpAt, "HH:mm")}</p>
                                                {/* <span className="w-2 h-2 bg-green-500 rounded-full"></span> */}
                                            </div>
                                            
                                            <span className="text-sm text-gray-400 capitalize">{format(record.wokeUpAt, "EEEE, d MMM", { locale })}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 md:p-4">
                                        <div className="flex items-center gap-2">
                                            <p className="text-gray-900 dark:text-gray-100">{formatDuration(record.inBedAt, record.wokeUpAt)}</p>
                                            {/* <span className="w-2 h-2 bg-red-500 rounded-full"></span> */}
                                            {record.napping === false && getSleepDurationIndicator(differenceInHours(record.wokeUpAt, record.inBedAt))}
                                            {record.napping && (
                                                <span title={t("home.table.napping")} className="material-symbols-outlined text-zinc-300 dark:text-zinc-500">
                                                    bolt
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td style={{ maxWidth: 60 }}>
                                        <div className="flex items-center justify-end">
                                            {/* <button className="flex items-center justify-center p-2 dark:text-gray-100 rounded-full" onClick={(event) => handleMoreClick(event, record)}>
                                                <span className="material-symbols-outlined">
                                                    more_horiz
                                                </span>
                                            </button> */}

                                            <button className="flex items-center justify-center p-2 text-blue-500 dark:text-zinc-800 rounded-full" onClick={() => editRecord(record)}>
                                                <span className="material-symbols-outlined">
                                                    edit
                                                </span>
                                            </button>

                                            <button className="flex items-center justify-center p-2 text-red-500 dark:text-red-900 rounded-full" onClick={() => deleteRecord(record)}>
                                                <span className="material-symbols-outlined">
                                                    delete
                                                </span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}

                        {props.records.length === 0 && (
                            <tr className="border-t border-zinc-100 dark:border-zinc-900">
                                <td colSpan={4} className="dark:text-zinc-100 p-8">
                                    <div className="flex flex-col items-center gap-2 leading-none">
                                        <p>{t('home.table.no_records')}</p>
                                        <p className="dark:text-zinc-600">{t('home.table.tip')}</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                        
                        
                    </tbody>
                </table>
            </div>

            {props.records.length > cuttedRecordsNumber && expanded === false && (
                <div className="p-4">
                    <button className="flex items-center text-blue-500" onClick={() => setExpanded(folded => !folded)}>
                        {props.records.length - records.length} {t('home.table.more')}...
                    </button>
                </div>
                
            )}


            {/* <MoreVertMenu
                isOpen={Boolean(anchorEl)} 
                onClose={handleMoreClose} 
                anchorEl={anchorEl}
                onEdit={editRecord}
                onDelete={deleteRecord}
            /> */}
        </div>
    )
}