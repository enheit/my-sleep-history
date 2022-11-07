
interface SleepSessionRecord {
    date: Date,
    inBedAt: Date,
    wokeUpAt: Date,
}

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
    ]

    return (
        <div>
            <h1>November 2022</h1>
        
            <table className="w-full table-auto">
                <thead>
                    <tr className="text-left">
                        {/* <th className="p-4">Date</th> */}
                        <th className="p-4">Awake duration</th>
                        <th className="p-4">In bed at</th>
                        <th className="p-4">Woke up at</th>
                        <th className="p-4">Sleep duration</th>
                    </tr>
                </thead>
                <tbody>
                    {sleepSessionRecords.map((record, index) => {
                        return (
                            <tr className="border-b border-gray-200" key={index}>
                                {/* <td className="p-4">14 Nov 22 -&gt; 15 Nov 22</td> */}
                                <td className="p-4">17 h. 30 min.</td>
                                <td className="p-4">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <p>22:30</p>
                                            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                        </div>

                                        <span className="text-sm text-gray-500">Sunday, 14 Nov</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                <div className="flex flex-col">
                                        
                                        <div className="flex items-center gap-2">
                                            <p>08:30</p>
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        </div>
                                        
                                        <span className="text-sm text-gray-500">Monday, 14 Nov</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="bg-green-500 px-4 py-2 rounded-full text-white">
                                        6 h. 30 min.
                                    </span>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <div className="flex gap-4 p-4">
                <div className="flex flex-col">
                    <p>Longest sleep</p>
                    <p>6 h. 38 min</p>
                </div>

                <div className="flex flex-col">
                    <p>Shortest sleep</p>
                    <p>4 h. 38 min</p>
                </div>
            </div>
        </div>
    )
}