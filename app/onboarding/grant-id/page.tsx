import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck2 } from "lucide-react";
import Link from "next/link";

export default function OnboardingRouteTwo() {
    return (
        <div className="min-h-screen w-screen flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>You almost Done!</CardTitle>
                    <CardDescription>Let's sync your calendar to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild className="w-full">
                        <Link href="/api/auth">
                            <CalendarCheck2 className="size-4 mr-2"/>
                            Connect Calendar
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
};