import prisma from "@/app/lib/db";
import { nylas } from "@/app/lib/nylas";
import { Prisma } from "@prisma/client";
import { addMinutes, format, fromUnixTime, isBefore, parse } from "date-fns"
import { GetFreeBusyRequest, NylasResponse } from "nylas";

async function getData(userName: string, selectedDate: Date) {

    const currentDay = format(selectedDate, "EEEE");

    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    const data = await prisma.availability.findFirst({
        where: {
            day: currentDay as Prisma.EnumDayFilter,
            User: {
                userName: userName,
            },
        },
        select: {
            fromTime: true,
            tillTime: true,
            id: true,
            User: {
                select: {
                    grantEmail: true,
                    grantId: true,
                },
            },
        },
    });

    // confirm availability from Nylas API
    const nylasCalendarData = await nylas.calendars.getFreeBusy({
        identifier: data?.User?.grantId as string,
        requestBody: {
            startTime: Math.floor(startOfDay.getTime() / 1000),
            endTime: Math.floor(endOfDay.getTime() / 1000),
            emails: [data?.User.grantEmail as string],
        },
    });

    return {
        data,
        nylasCalendarData,
    };
}

interface iAppProps {
    selectedDate: Date;
    userName: string;
}

// convert time format from nylas
function calculateAvailableTimeSlots(date: string, dbAvailability: {
        fromTime: string | undefined;
        tillTime: string | undefined;
    },
    nylasData: NylasResponse<GetFreeBusyRequest[]>,
    duration: number,
) {
    const now = new Date();

    // convert avability data to js object
    const availableFrom = parse(
        `${date} ${dbAvailability.fromTime}`,
        "yyyy-MM-dd HH:mm",
        new Date()
    );

    const availableTill = parse(
        `${date} ${dbAvailability.tillTime}`,
        "yyyy-MM-dd HH:mm",
        new Date()
    );

    // Render Busy timeSlots from Nylas
    const busySlots = nylasData.data[0].timeSlots.map((slot) => (
        {
            start: fromUnixTime(slot.startTime),
            end: fromUnixTime(slot.endTime),
        }
    ));

    const allSlots = [];
    let currentSlot = availableFrom;

    while (isBefore(currentSlot, availableTill)) {
        allSlots.push(currentSlot)
        currentSlot = addMinutes(currentSlot, duration);
    }
}

export async function TimeTable({ selectedDate, userName }: iAppProps) {

    const { data, nylasCalendarData } = await getData(userName, selectedDate);

    // console.log(nylasCalendarData.data[0].timeSlots);
    // console.log(data);    

    return (
        <div className="fle">
            <p className="text-base font-semibold">
                {format(selectedDate, "EEE")} {" "}
                <span className="text-sm text-muted-foreground">
                    {format(selectedDate, "MMM . d")}
                </span>
            </p>
        </div>
    )
};
