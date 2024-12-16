import { deleteEventAction } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function DeleteEvent({params}: { params: { eventTypeId: string}}) {
    return (
        <div className="flex flex-1 items-center justify-center">
            <Card className="max-w-[450px] w-full">
                <CardHeader>
                    <CardTitle>Delete Event</CardTitle>
                    <CardDescription>Are you sure? This activity cannot be undone</CardDescription>
                </CardHeader>

                <CardFooter className="flex w-full justify-between">
                    <Button
                        variant="secondary"
                        asChild
                    >
                        <Link href="/dashboard">Cancel</Link>
                    </Button>
                    <form
                        // @ts-ignore
                        action={deleteEventAction}
                    >
                        <input type="hidden"
                            name="id" value={params.eventTypeId}
                        />
                        <SubmitButton
                            text="Delete Event"
                            variant="destructive"
                        />
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
};