import { CancelMeetingAction } from "@/app/actions";
import { EmptyState } from "@/app/components/EmptyState";
import { SubmitButton } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db"
import { requireUser } from "@/app/lib/hooks";
import { nylas } from "@/app/lib/nylas";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format, fromUnixTime } from "date-fns";
import { Presentation } from "lucide-react";

async function getData(userId: string) {
    const userData = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            grantId: true,
            grantEmail: true,
        },
    });

    if(!userData) {
        throw new Error("User not found");
    }

    const data = await nylas.events.list({
        identifier: userData.grantId as string,
        queryParams: {
            calendarId: userData.grantEmail as string,
        },
    });

    return data;
}

export default async function MeetingsRoute() {

    const session = await requireUser();
    const data = await getData(session.user?.id as string);

    // console.log(data.data[0].when);
    

    return (
        <>
            {
                data.data.length < 1 ? (
                    <EmptyState 
                        title="No Meetings At the Moment"
                        buttonText="Create New Event"
                        href="/dashboard/new"
                        description="Create a new meeting session in your dashboard to get started"
                    />
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>See Meetings Below</CardTitle>
                            <CardDescription>See upcoming events booked with you</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {
                                data.data.map((item) => (
                                    <form
                                        action={CancelMeetingAction}
                                        key={item.id}
                                    >
                                        <input type="hidden"
                                            name="eventId"
                                            value={item.id}
                                        />
                                        <div 
                                            className="grid grid-cols-3 justify-between items-center"
                                            key={item.id}
                                        >
                                            <div className="fle">
                                                <p className="text-muted-foreground text-sm">
                                                    {format(fromUnixTime(item.when.startTime), "EEE, dd MMM")}
                                                </p>

                                                <p className="text-muted-foreground text-xs pt-1">
                                                    {format(fromUnixTime(item.when.startTime), "hh:mm a")} -{" "}
                                                    {format(fromUnixTime(item.when.endTime), "hh:mm a")}
                                                </p>

                                                <div className="flex items-center mt-1">
                                                    <Presentation className="size-4 mr-2 text-primary"/>

                                                    <a 
                                                        href={item.conferencing.details.url} 
                                                        className="text-xs text-primary underline underline-offset-4"
                                                        target="_blank"
                                                    >
                                                        Join Meeting
                                                    </a>
                                                </div>
                                            </div>

                                            {/* Meeting Title n Participants*/}
                                            <div className="flex flex-col items-start">
                                                <h2 className="text-sm font-medium">{item.title}</h2>
                                                <p className="text-sm to-muted-foreground">You and {item.participants[0].name}</p>
                                            </div>

                                            {/* Cancel Button */}
                                            <SubmitButton text="Cancel Event" variant="destructive" className="ml-auto"/>
                                        </div>

                                        <Separator className="my-3"/>
                                    </form>
                                ))
                            }
                        </CardContent>
                    </Card>
                )
            }
        </>
    )
};
