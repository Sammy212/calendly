import { RenderCalendar } from "@/app/components/bookingForm/RenderCalenar";
import { TimeTable } from "@/app/components/bookingForm/TimeTable";
import prisma from "@/app/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarX2, Clock, Presentation } from "lucide-react";
import { notFound } from "next/navigation";

async function getData(eventUrl: string, userName: string) {
    const data = await prisma.eventType.findFirst({
        where: {
            url: eventUrl,
            user: {
                userName: userName,
            },
            active: true,
        },
        select: {
            id: true,
            description: true,
            title: true,
            duration: true,
            videoCallSoftware: true,
            
            user: {
                select: {
                    image: true,
                    name: true,
                    
                    availability: {
                        select: {
                            day: true,
                            isActive: true,
                        },
                    },
                },
            },
        },
    });

    if(!data) {
        return notFound();
    }

    return data;
}

export default async function BookingFormRoute({
    params,
    searchParams,
}: {
    params: { username: string; eventUrl: string }
    searchParams: {date?: string; time?: string}
}) {

    const data = await getData(params.eventUrl, params.username);
    const selectedDate = searchParams.date 
        ? new Date(searchParams.date)
        : new Date();
        // formate date
        const formattedDate = new Intl.DateTimeFormat("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(selectedDate);


    // check for date and time data
    const showForm = !!searchParams.date && !!searchParams.time;

    return (
        <div className="min-h-screen w-screen flex items-center justify-center">

            {/* render form */}
            {
                showForm ? (
                    <Card className="max-w-[600px]">
                        <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr] gap-4">
                            <div>
                                <img 
                                    src={data.user?.image as string} alt="User Profile Image"
                                    className="size-10 rounded-full"
                                />
                                <p className="text-sm font-medium text-muted-foreground mt-1">
                                    {data.user?.name}
                                </p>
                                <h1 className="text-xl font-semibold mt-2">
                                    {data.title}
                                </h1>
                                <p className="text-sm font-medium text-muted-foreground">
                                    {data.description}
                                </p>

                                <div className="mt-5 flex flex-col gap-y-3">
                                    {/* Date of event */}
                                    <p className="flex items-center">
                                        <CalendarX2 className="size-4 mr-2 text-primary"/>

                                        <span className="text-sm font-medium text-muted-foreground">
                                            {formattedDate}
                                        </span>
                                    </p>

                                    {/* Duration of event */}
                                    <p className="flex items-center">
                                        <Clock className="size-4 mr-2 text-primary"/>

                                        <span className="text-sm font-medium text-muted-foreground">
                                            {data.duration} Minutes
                                        </span>
                                    </p>

                                    {/* Platform of event */}
                                    <p className="flex items-center">
                                        <Presentation className="size-4 mr-2 text-primary"/>

                                        <span className="text-sm font-medium text-muted-foreground">
                                            {data.videoCallSoftware} 
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Seperator */}
                            <Separator
                                orientation="vertical" 
                                className="hidden md:block h-full w-[1px]"
                            />

                            <form>
                                <p>Show Form</p>
                            </form>
                        </CardContent>
                    </Card>
                ): (
                    <Card className="max-w-[1000px] w-full mx-auto">
                        <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr] gap-4">
                            <div>
                                <img 
                                    src={data.user?.image as string} alt="User Profile Image"
                                    className="size-10 rounded-full"
                                />
                                <p className="text-sm font-medium text-muted-foreground mt-1">
                                    {data.user?.name}
                                </p>
                                <h1 className="text-xl font-semibold mt-2">
                                    {data.title}
                                </h1>
                                <p className="text-sm font-medium text-muted-foreground">
                                    {data.description}
                                </p>

                                <div className="mt-5 flex flex-col gap-y-3">
                                    {/* Date of event */}
                                    <p className="flex items-center">
                                        <CalendarX2 className="size-4 mr-2 text-primary"/>

                                        <span className="text-sm font-medium text-muted-foreground">
                                            {formattedDate}
                                        </span>
                                    </p>

                                    {/* Duration of event */}
                                    <p className="flex items-center">
                                        <Clock className="size-4 mr-2 text-primary"/>

                                        <span className="text-sm font-medium text-muted-foreground">
                                            {data.duration} Minutes
                                        </span>
                                    </p>

                                    {/* Platform of event */}
                                    <p className="flex items-center">
                                        <Presentation className="size-4 mr-2 text-primary"/>

                                        <span className="text-sm font-medium text-muted-foreground">
                                            {data.videoCallSoftware} 
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Seperator */}
                            <Separator
                                orientation="vertical" 
                                className="hidden md:block h-full w-[1px]"
                            />

                            <RenderCalendar
                                availability={data.user.availability as any}
                            />

                            <Separator
                                orientation="vertical" 
                                className="hidden md:block h-full w-[1px]"
                            />

                            <TimeTable
                                selectedDate={selectedDate}
                                userName={params.username}
                                duration={data.duration}
                            />
                        </CardContent>
                    </Card>
                )
            }
        </div>
    )
};
