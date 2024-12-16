"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Brands } from "@/app/lib/data";


export function Logos() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Automatically move to the next slide
    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(Brands.length / 4));
        }, 3000); // Change slide every 3 seconds
    
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <div className="py-10">
            <h2 className="text-center text-lg font-semibold leading-7">
                Trusted by more than 100,000 of the world’s leading organizations
            </h2>

            <div className="relative w-full overflow-hidden">
                <div
                    className="flex transition-transform ease-in-out duration-500"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {
                        Brands.map((brand, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-1/4 flex justify-center items-center mt-8 gap-x-2"
                            >
                                <Image
                                    src={brand.brandLogo}
                                    alt={`Brand logo ${index + 1}`}
                                    width={150}
                                    height={50}
                                    className="col-span-2 max-h-8 w-full object-contain dark:invert lg:col-span-1"
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
};
