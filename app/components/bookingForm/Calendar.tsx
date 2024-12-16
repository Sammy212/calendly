
"use client";

import {useCalendar, useLocale} from "react-aria";
import {useCalendarState} from 'react-stately';
import {createCalendar} from '@internationalized/date';
import { CalendarProps, DateValue } from "@react-types/calendar";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";


export function Calendar(props: CalendarProps<DateValue> & {
    // determine available date cells
    isDateUnavailable?: (date: DateValue) => boolean
}) {

    const {locale} = useLocale();
    let state = useCalendarState({
        ...props,
        visibleDuration: {
            months: 1,
        },
        locale,
        createCalendar,
    });

    let { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(
        props,
        state,
    );

    return (
        <div 
            className="inline-block"
            {...calendarProps}
        >
            <CalendarHeader
                state={state}
                calendarProps={calendarProps}
                prevButtonProps={prevButtonProps}
                nextButtonProps={nextButtonProps}
            />

            <div className="flex gap-8">
                <CalendarGrid
                    state={state}
                    isDateUnavailable={props.isDateUnavailable}
                />
            </div>
        </div>
    )
}