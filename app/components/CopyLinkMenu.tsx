"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { CopyCheck } from "lucide-react";
import { toast } from "sonner";

export function CopyLinkMenu({meetingUrl}: {meetingUrl: string }) {

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(meetingUrl);
            toast.success("URL Copied");
        } catch (err) {
            // console.log("error");
            toast.error("Could not copy URL");
        }
    }
    return (
        <DropdownMenuItem
            onSelect={handleCopy}
        >
            <CopyCheck className="mr-2 size-4"/>
            Copy Link
        </DropdownMenuItem>
    )
};
