import { format, intervalToDuration, isThisYear, min } from "date-fns";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MoreVertMenu } from "../more-vert-menu/more-vert-menu";
import { uk, enGB } from 'date-fns/locale';
import { SupportedLocale } from "../../../../i18n/i18n.config";

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
    const { t, i18n } = useTranslation();
    let locale = i18n.language === SupportedLocale.English ? enGB : uk;

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

    function formatDuration(start: Date, end: Date) {
        let duration = intervalToDuration({ start: start, end: end });

        let hours = duration.hours ?? 0;
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

    return (
        <div className="flex flex-col rounded-lg">
            <h1 className="text-2xl text-gray-900 dark:text-gray-100 mb-4 capitalize">
                {format(props.records[0].inBedAt, isThisYear(props.records[0].inBedAt) ? "LLLL" : "LLLL yyyy", { locale })}
            </h1>

            {props.currentMonth === false && (
                <div className="flex flex-col gap-4 mt-4 mb-8">
                    <h1 className="font-bold text-gray-900 dark:text-gray-100">{t('home.short_summary.title')}</h1>
        
                    <div className="flex gap-12">
                        <div className="flex flex-col">
                            <p className="text-gray-900 dark:text-gray-100">{t('home.short_summary.average_sleep_duration')}</p>
                            <p className="text-gray-900 dark:text-gray-100">{formatDuration(new Date(), new Date())}</p>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-gray-900 dark:text-gray-100">{t('home.short_summary.in_bed.title')}</p>
                            <p className="text-gray-900 dark:text-gray-100">{t('home.short_summary.in_bed.mostly_in_time')}</p>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-gray-900 dark:text-gray-100">{t('home.short_summary.woke_up.title')}</p>
                            <p className="text-gray-900 dark:text-gray-100">{t('home.short_summary.woke_up.mostly_almost_in_time')}</p>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-gray-900 dark:text-gray-100">{t('home.short_summary.average_sleep_duration')}</p>
                            <p className="text-gray-900 dark:text-gray-100">{formatDuration(new Date(), new Date())}</p>
                        </div>
                    </div>
                </div>
            )}


            <table className="w-full table-auto">
                <thead>
                    <tr className="text-left">
                        <th className="py-4 text-gray-900 dark:text-gray-100">{t('home.table.awake_duration')}</th>
                        <th className="p-4">
                            <div className="flex items-center gap-2">
                                <p className="text-gray-900 dark:text-gray-100">{t('home.table.in_bed_at')}</p>
                                <span title="Mostly In Time" className="w-2 h-2 bg-green-500 rounded-full"></span>
                            </div>
                        </th>
                        <th className="p-4">
                            <div className="flex items-center gap-2">
                                <p className="text-gray-900 dark:text-gray-100">{t('home.table.woke_up_at')}</p>
                                <span title="Mostly Almost In Time" className="w-2 h-2 bg-orange-500 rounded-full"></span>
                            </div>
                        </th>
                        <th className="py-4 text-gray-900 dark:text-gray-100">
                        <div className="flex items-center gap-2">
                                <p className="text-gray-900 dark:text-gray-100">{t('home.table.sleep_duration')}</p>
                                <span title="Mostly Almost In Time" className="w-2 h-2 bg-red-500 rounded-full"></span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record, index) => {
                        let isRecordExist = props.records[index + 1];

                        return (
                            <tr className="border-b last:border-none border-gray-200 dark:border-zinc-900" key={index}>
                                <td className="py-4 text-gray-900 dark:text-gray-100">{isRecordExist ? formatDuration(props.records[index + 1].wokeUpAt, record.inBedAt) : t("home.table.unknown")}</td>
                                <td className="p-4">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <p className="text-gray-900 dark:text-gray-100">{format(record.inBedAt, "HH:mm")}</p>
                                            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                        </div>

                                        <span className="text-sm text-gray-400 capitalize">{format(record.inBedAt, "EEEE, d MMM", { locale })}</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <p className="text-gray-900 dark:text-gray-100">{format(record.wokeUpAt, "HH:mm")}</p>
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        </div>
                                        
                                        <span className="text-sm text-gray-400 capitalize">{format(record.wokeUpAt, "EEEE, d MMM", { locale })}</span>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <div className="flex items-center gap-2">
                                        <p className="text-gray-900 dark:text-gray-100">{formatDuration(record.inBedAt, record.wokeUpAt)}</p>
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
                    
                    {props.records.length > 3 && expanded === false && (
                        <tr>
                            <td className="text-gray-100 py-4">
                                <div className="flex items-center">
                                    <button className="flex items-center text-blue-500" onClick={() => setExpanded(folded => !folded)}>
                                        {props.records.length - records.length} {t('home.table.more')}...
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