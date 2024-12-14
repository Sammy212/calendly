import { EditEventForm } from "@/app/components/EditEventForm";
import prisma from "@/app/lib/db"
import { notFound } from "next/navigation";


async function getData(eventTypeId: string) {
    const data = await prisma.eventType.findUnique({
        where: {
            id: eventTypeId,
        },
        select: {
            title: true,
            description: true,
            duration: true,
            url: true,
            id: true,
            videoCallSoftware: true,
        },
    });

    if (!data) {
        return notFound();
    }

    return data;
}

export default async function EditRoute({
    params,
} : {
    params: { eventTypeId: string };
}
) {

    const data = await getData(params.eventTypeId);

    return (
        <div className="fle">
            <EditEventForm 
                id={data.id}
                url={data.url}
                title={data.title}
                duration={data.duration}
                description={data.description}
                callProvider={data.videoCallSoftware}
            />
        </div>
    )
};
