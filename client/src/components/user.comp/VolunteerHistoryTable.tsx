import {
    flexRender,
    createColumnHelper,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'

import React from "react";

type Volunteer = {
    eventName: string
    eventDescription: string
    location: string
    urgency: 'Low' | 'Medium' | 'High'
    eventDate: string
    status: 'Participated' | 'Canceled' | 'No show'
}

export default function VolunteerHistoryTable() {
    const defaultData: Volunteer[] = [
        {
            eventName: 'Houston Food Bank',
            eventDescription: 'this is random text for testing purposes',
            location: '555 Random St., Houston, TX 55430',
            urgency: 'Low',
            eventDate: '4/25/2024',
            status: 'Participated',
        },
        {
            eventName: 'Homeless Shelter',
            eventDescription: 'this is random text for testing purposes',
            location: '555 Random St., Houston, TX 55430',
            urgency: 'Medium',
            eventDate: '2/17/2024',
            status: 'Canceled',
        },
        {
            eventName: 'Blood Drive',
            eventDescription: 'this is random text for testing purposes',
            location: '555 Random St., Houston, TX 55430',
            urgency: 'High',
            eventDate: '8/30/2024',
            status: 'No show',
        },
    ]

    const columnHelper = createColumnHelper<Volunteer>()

    const columns = [
        columnHelper.accessor('eventName', {
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor(row => row.eventDescription, {
            id: 'eventDescription',
            cell: info => <i>{info.getValue()}</i>,
            header: () => <span>Event Description</span>,
            footer: info => info.column.id,
        }),
        columnHelper.accessor('location', {
            header: () => 'Location',
            cell: info => info.renderValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('urgency', {
            header: () => <span>Urgency</span>,
            footer: info => info.column.id,
        }),
        columnHelper.accessor('eventDate', {
            header: 'Event Date',
            footer: info => info.column.id,
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            footer: info => info.column.id,
        }),
    ]

    const [data] = React.useState(() => [...defaultData])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (

        <div className="p-2">
            <table>
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="h-4" />
        </div>
    )
}

