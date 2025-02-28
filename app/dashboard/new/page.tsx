"use client";

import { CreateEventTypeAction } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { eventTypeSchema } from "@/app/lib/zodSchemas";
import { Button } from "@/components/ui/button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import Link from "next/link";
import { useState } from "react";
// @ts-ignore
import { useFormState } from "react-dom";


type CallProvider = "Zoom Meeting" | "Google Meet" | "Microsoft Teams";

export default function NewEventRoue() {
    
    const [activePlatform, setActivePlatform] = useState<CallProvider>("Google Meet");

    const [lastResult, action] = useFormState(CreateEventTypeAction, undefined);
    const [form, fields] = useForm({
        lastResult,

        onValidate({formData}) {
            return parseWithZod(formData, {
                schema: eventTypeSchema,
            });
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    return (
        <div className="w-full h-full flex flex-1 items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Add new Appointment Type</CardTitle>
                    <CardDescription>Create new Appointment type that facilitates your session bookings with ease</CardDescription>
                </CardHeader>

                <form 
                    id={form.id} 
                    onSubmit={form.onSubmit}
                    action={action} 
                    noValidate 
                >
                    <CardContent className="grid gap-y-5">
                        <div className="flex flex-col gap-y-2">
                            <Label>Title</Label>
                            <Input 
                                placeholder="Meeting Name"
                                name={fields.title.name}
                                key={fields.title.key}
                                defaultValue={fields.title.initialValue}
                            />
                            {/* show error message */}
                            <p className="text-red-500 text-xs">{fields.title.errors}</p>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label>URL Slug</Label>
                            <div className="flex">
                                <span 
                                    className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground"
                                >
                                    calendly.com/
                                </span>
                                <Input 
                                    placeholder="short-description"
                                    className="rounded-l-none"
                                    name={fields.url.name}
                                    key={fields.url.key}
                                    defaultValue={fields.url.initialValue}
                                />
                            </div>
                            {/* show error message */}
                            <p className="text-red-500 text-xs">{fields.url.errors}</p>
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-y-2">
                            <Label>Description</Label>
                            <Textarea 
                                placeholder="Meeting session description"
                                name={fields.description.name}
                                key={fields.description.key}
                                defaultValue={fields.description.initialValue}
                            />
                            {/* show error message */}
                            <p className="text-red-500 text-xs">{fields.description.errors}</p>
                        </div>

                        {/* Duration */}
                        <div className="flex flex-col gap-y-2">
                            <Label>Duration</Label>
                            <Select
                                name={fields.duration.name}
                                key={fields.duration.key}
                                defaultValue={fields.duration.initialValue}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select duration"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Duration</SelectLabel>
                                        <SelectItem value="15">15 Minutes</SelectItem>
                                        <SelectItem value="30">30 Minutes</SelectItem>
                                        <SelectItem value="45">45 Minutes</SelectItem>
                                        <SelectItem value="60">1 Hour</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {/* show error message */}
                            <p className="text-red-500 text-xs">{fields.duration.errors}</p>
                        </div>

                        {/* Call Provider */}
                        <div className="grid gap-y-2">
                            <Label>Call Provider</Label>
                            <input type="hidden" 
                                name={fields.videoCallSoftware.name}
                                value={activePlatform}
                            />
                            <ButtonGroup>
                                <Button className="w-full"
                                    type="button"
                                    onClick={() => setActivePlatform("Google Meet")}
                                    variant={
                                        activePlatform === "Google Meet" ? "default" : "outline"
                                    }
                                >
                                    Google Meet
                                </Button>
                                <Button className="w-full"
                                    type="button"
                                    onClick={() => setActivePlatform("Zoom Meeting")}
                                    variant={
                                        activePlatform === "Zoom Meeting" ? "default" : "outline"
                                    }
                                >
                                    Zoom
                                </Button>
                                
                                <Button className="w-full"
                                    type="button"
                                    onClick={() => setActivePlatform("Microsoft Teams")}
                                    variant={
                                        activePlatform === "Microsoft Teams" ? "default" : "outline"
                                    }
                                >
                                    Microsoft Teams
                                </Button>
                            </ButtonGroup>
                            {/* show error message */}
                            <p className="text-red-500 text-xs">{fields.videoCallSoftware.errors}</p>
                        </div>
                    </CardContent>
                    <CardFooter className="w-full flex justify-between">
                        <Button variant="destructive" asChild>
                            <Link href="/dashboard">Cancel</Link>
                        </Button>
                        <SubmitButton text="Create new Event"/>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
};
