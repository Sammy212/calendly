import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import Logo from "@/public/logo.png";
import { DashboardLinks } from "../components/DashboardLinks";

export default function DashboardLayout({children}: {children: ReactNode}) {
    return(
        <>
            <div className="min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <div className="hidden md:block border-r bg-muted/40">
                    <div className="flex h-full max-h-screen flex-col gap-2">
                        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                            <Link href="/" className="flex gap-2 items-center">
                                <Image
                                    src={Logo} alt="Logo"
                                    className="size-6"
                                />
                                <h4 className="text-xl font-bold">Calen<span className="text-blue-500">dly</span></h4>
                            </Link>
                        </div>

                        <div className="flex-1">
                            <nav className="grid items-start px-2 lg:px-4">
                                <DashboardLinks/>
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                        hello
                    </header>
                </div>
            </div>
        </>
    )
};
