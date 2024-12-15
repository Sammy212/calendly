"use client";

import { Switch } from "@/components/ui/switch";
import { useFormState } from "react-dom";
import { eventStatusAction } from "../actions";
import { useEffect, useTransition } from "react";
import { toast } from "sonner";

export function EventActiveSwitcher({ initialChecked, eventTypeId }: {
    initialChecked: boolean;
    eventTypeId: string;
}) {
    // to ensure user doesn't enage the component in the middle of a server mutation/action | would do more research on why it must be run first
    const [isPending, startTransition] = useTransition();

    const [state, action] = useFormState(eventStatusAction, undefined);

    useEffect(() => {

        if(state?.status === "success") {
            toast.success(state.message);
        } else if (state?.status === "error") {
            toast.error(state.message);
        }

    }, [state])

    return (
        <Switch 
            disabled={isPending}
            defaultChecked={initialChecked}
            onCheckedChange={(isChecked) => {
                startTransition(() => {
                    action({
                        eventTypeId: eventTypeId,
                        isChecked: isChecked,
                    });
                });
            }}
        />
    )
};
