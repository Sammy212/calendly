export function FooterSection() {
    return (
        <footer className="mt-16 mb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
                <p className="text-xs leading-5 text-foreground">&copy; Calen<span className="text-blue-500">dly</span> 2024</p>
                <p className="text-sm leading-5 text-foreground flex gap-2">
                    Created by 
                    <a href="https://samuel-afo.vercel.app/" 
                        target="_blank" 
                        className="flex justify-center items-center gap-1 text-sm text-foreground font-bold hover:text-gray-400"
                    >
                        Samuel Afolabi
                    </a>
                </p>
            </div>

        </footer>
    )
};
