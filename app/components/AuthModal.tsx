import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { signIn } from "../lib/auth";

export function AuthModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Try for Free</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[360px]">
                <DialogHeader className="flex flex-row gap-2 justify-center items-center">
                    <Image 
                        src={Logo} alt="Logo"
                        className="size-10"
                    />
                    <h4 className="text-3xl font-semibold">Calen<span className="text-blue-500">dly</span></h4>
                </DialogHeader>

                <div className="flex flex-col mt-5 gap-3">
                    <form action={async () => {
                            "use server";
                            await signIn("google");
                    }}>
                        <Button className="w-full">Sign In with Google</Button>
                    </form>
                    <Button>Sign In with GitHub</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}