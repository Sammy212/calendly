"use client";

import { SubmitButton } from "@/app/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useState } from "react";


type CallProvider = "Zoom Meeting" | "Google Meet" | "Microsoft Teams";

export default function NewEventRoue() {
    
    const [activePlatform, setActivePlatform] = useState<CallProvider>("Google Meet");

    return (
        <div className="w-full h-full flex flex-1 items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Add new Appointment Type</CardTitle>
                    <CardDescription>Create new Appointment type that facilitates booking with ease</CardDescription>
                </CardHeader>

                <form action={""}>
                    <CardContent className="grid gap-y-5">
                        <div className="flex flex-col gap-y-2">
                            <Label>Title</Label>
                            <Input placeholder="Meeting Name"/>
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
                                    placeholder="meeting-name-short-description"
                                    className="rounded-l-none"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-y-2">
                            <Label>Description</Label>
                            <Textarea placeholder="Meeting session description"/>
                        </div>

                        {/* Duration */}
                        <div className="flex flex-col gap-y-2">
                            <Label>Duration</Label>
                            <Select>
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
                        </div>

                        {/* Call Provider */}
                        <div className="grid gap-y-2">
                            <Label>Call Provider</Label>
                            <ButtonGroup>
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
                                    onClick={() => setActivePlatform("Google Meet")}
                                    variant={
                                        activePlatform === "Google Meet" ? "default" : "outline"
                                    }
                                >
                                    Google Meet
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
