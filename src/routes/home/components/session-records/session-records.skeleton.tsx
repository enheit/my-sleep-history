import { useTranslation } from "react-i18next";

export function SessionRecordsSkeleton() {
    const { t } = useTranslation();
    let records = [1, 2, 3];

    return (
        <div className="flex flex-col gap-4">
            <div style={{ width: 120 }} className="h-4 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />

            <table className="w-full table-auto">
                <thead>
                    <tr className="text-left bg-zinc-200/20 dark:bg-zinc-900/20">
                        <th className="p-4 text-gray-900 dark:text-gray-100">{t('home.table.awake_duration')}</th>
                        <th className="p-4">
                            <div className="flex items-center gap-2">
                                <p className="text-gray-900 dark:text-gray-100">{t('home.table.in_bed_at')}</p>
                            </div>
                        </th>
                        <th className="p-4">
                            <div className="flex items-center gap-2">
                                <p className="text-gray-900 dark:text-gray-100">{t('home.table.woke_up_at')}</p>
                            </div>
                        </th>
                        <th className="p-4 text-gray-900 dark:text-gray-100">
                            <div className="flex items-center gap-2">
                                <p className="text-gray-900 dark:text-gray-100">{t('home.table.sleep_duration')}</p>
                            </div>
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record) => (
                        <tr key={record} className="border-t border-zinc-100 dark:border-zinc-900">
                            <td className="p-4">
                                <div style={{ width: 60 }} className="h-4 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>
                            </td>
                            <td className="p-4">
                                <div style={{ width: 120 }} className="h-4 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>
                            </td>
                            <td className="p-4">
                                <div style={{ width: 120 }} className="h-4 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>
                            </td>
                            <td className="p-4">
                                <div style={{ width: 60 }} className="h-4 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}