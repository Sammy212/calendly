import { SubmitButton } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import { times } from "@/app/lib/times";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { notFound } from "next/navigation";

async function getData(userId: string) {
    const data = await prisma.availability.findMany({
        where: {
            userId: userId,
        },
    });

    if(!data) {
        return notFound();
    }

    return data;
}


export default async function AvalabilityRoute() {

    // get user data
    const session = await requireUser();

    const data = await getData(session.user?.id as string);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Availability</CardTitle>
                <CardDescription>Manage your availability with ease</CardDescription>
            </CardHeader>

            <form>
                <CardContent className="flex flex-col gap-y-4">
                    {
                        data.map((item) => (
                            <div 
                                key={item.id}
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4" 
                            >
                                <input type="hidden"  name={`id-${item.id}`} value={item.id}/>
                                <div className="flex items-center gap-x-3">
                                    <Switch
                                        defaultChecked={item.isActive}
                                        name={`isActive-${item.isActive}`}
                                    />
                                    <p>{item.day}</p>
                                </div>

                                {/* From Time */}
                                <Select defaultValue={item.fromTime} name={`fromTime-${item.id}`} >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="From Time"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {times.map((time) => (
                                                <SelectItem key={time.id} value={time.time}>
                                                    {time.time}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                {/* To Time */}
                                <Select defaultValue={item.tillTime} name={`tillTime-${item.id}`}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Till Time"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {times.map((time) => (
                                                <SelectItem key={time.id} value={time.time}>
                                                    {time.time}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        ))
                    }
                </CardContent>
                <CardFooter>
                    <SubmitButton text="Save Changes"/>
                </CardFooter>
            </form>
        </Card>
    )
};
