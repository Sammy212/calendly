import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import { AuthModal } from "./AuthModal";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-background w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex py-5 items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src={Logo} alt="Main Logo"
                        className="size-10"
                    />
                    <h4 className="text-3xl font-semibold">Calen<span className="text-blue-500">dly</span></h4>
                </Link>

                <div className="hidden md:flex md:justify-end md:space-x-4">
                    <ThemeToggle/>
                    <AuthModal/>
                </div>
            </div>
        </nav>
    )
}