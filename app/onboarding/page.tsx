"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import { OnboadingAction } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "../lib/zodSchemas";
import { SubmitButton } from "../components/SubmitButtons";

export default function OnboardingRoute() {

    const [lastResult, action] = useFormState(OnboadingAction, undefined);

    const [form, fields] = useForm({

        // sync results of last submission
        lastResult,

        onValidate({formData}) {
            return parseWithZod(formData, {
                schema: onboardingSchema,
            });
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    return (
        <div className="min-h-screen w-screen flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome to Calen<span className="text-primary">dly</span></CardTitle>
                    <CardDescription>Let's help you get started. <br />We just need a few details to get you up and running</CardDescription>
                </CardHeader>

                <form 
                    id={form.id}
                    onSubmit={form.onSubmit} action={action}
                    noValidate
                >
                    <CardContent className="flex flex-col gap-y-5">
                        <div className="grid gap-y-2">
                            <Label>Full Name</Label>
                            <Input placeholder="Enter your name"
                                name={fields.fullName.name}
                                defaultValue={fields.fullName.initialValue}
                                key={fields.fullName.key}
                            />
                            {/* show error message */}
                            <p className="text-red-500 text-xs">{fields.fullName.errors}</p>
                        </div>
                        <div className="grid gap-y-2">
                            <Label>Username</Label>
                            <div className="flex rounded-md">
                                <span 
                                    className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground"
                                >
                                    Calendly.com/
                                </span>
                                <Input placeholder="username"
                                    className="rounded-l-none"
                                    name={fields.userName.name}
                                    key={fields.userName.key}
                                    defaultValue={fields.userName.initialValue}
                                />
                            </div>
                            {/* show error message */}
                            <p className="text-red-500 text-xs">{fields.userName.errors}</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <SubmitButton text="Submit" className="w-full"/>
                    </CardFooter>                    
                </form>
            </Card>
        </div>
    )
};
