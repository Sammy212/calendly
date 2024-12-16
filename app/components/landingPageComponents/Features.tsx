import { FeaturesInfo } from "@/app/lib/data";

export  function Features() {
    return (
        <div className="py-24">
            <div className="max-w-2xl mx-auto lg:text-center">
                <p className="font-semibold leading-7 text-primary">Calendly makes scheduling simple</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                    Calendly’s easy enough for individuals
                </h1>
                <p className="mt-6 text-base leading-snug text-muted-foreground">Calendly connects up to six calendars to automate scheduling with real-time availability.</p>
            </div>

            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                <div className="grid max-w-xl gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                    {FeaturesInfo.map((feature) => (
                        <div
                            key={feature.name}
                            className="relative pl-16"
                        >
                            <div className="text-base font-medium leading-7">
                                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                                    <feature.icon 
                                        className="text-white"
                                    />
                                </div>
                                {feature.name}
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};
