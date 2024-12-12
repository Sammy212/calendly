"use client";

import { Calendar } from "./Calendar";
import { today, getLocalTimeZone, DateValue } from "@internationalized/date";

interface iAppProps {
    availability: {
        day: string;
        isActive: boolean;
    }[];
}

export function RenderCalendar({ availability }: iAppProps) {

    // console.log(availability);
    const isDateUnavailable = (date: DateValue) => {
        const dayOfWeek = date.toDate(getLocalTimeZone()).getDay();

        // adjust day of week index
        const adjustedIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

        return !availability[adjustedIndex].isActive;
    }
    
    return (
        <Calendar 
            minValue={today(getLocalTimeZone())}
            isDateUnavailable={isDateUnavailable}
        />
    )
}