"use client";

import { useEffect, useState } from "react";
import { Calendar } from "./Calendar";
import { today, getLocalTimeZone, DateValue, parseDate, CalendarDate } from "@internationalized/date";
import { useRouter, useSearchParams } from "next/navigation";

interface iAppProps {
    availability: {
        day: string;
        isActive: boolean;
    }[];
}

export function RenderCalendar({ availability }: iAppProps) {

    const searchParams = useSearchParams();
    const router = useRouter();

    // Select present date
    const [date, setDate] = useState(() => {
        const dateParam = searchParams.get("date");

        return dateParam ? parseDate(dateParam) : today(getLocalTimeZone());
    });

    // this keeps the date state in sync with the date query parameter in the URL
    useEffect(() => {
        const dateParam = searchParams.get("date");

        if(dateParam) {
            setDate(parseDate(dateParam));
        }
    }, [searchParams])

    // Get selected date and add to state
    const handleDateChange = (date: DateValue) => {
        setDate(date as CalendarDate);

        const url = new URL(window.location.href);
        url.searchParams.set("date", date.toString());

        // update URL
        router.push(url.toString());
    }

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
            value={date}
            onChange={handleDateChange}
        />
    )
}