"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";


export default function HeroSection() {
    return (
        <section className="py-20">
            <div className="wrapper bg-(--bg-secondary) rounded-2xl p-10 flex flex-col lg:flex-row items-center gap-10 shadow-soft-lg">
                {/* Left column */}
                <div className="flex-1 text-center lg:text-left space-y-6">
                    <h1 className="text-5xl font-bold leading-tight">Your Library</h1>
                    <p className="text-lg text-(--text-secondary) max-w-md mx-auto lg:mx-0">
                        Convert your books into interactive AI conversations. Listen, learn, and
                        discuss your favorite reads.
                    </p>
                    <Button
                        size="lg"
                        className="bg-(--color-brand) hover:bg-(--color-brand-hover) text-white"
                    >
                        Add new book
                    </Button>
                </div>


                <div className="flex-1 mx-auto">
                    <Image
                        src="/assets/hero-illustration.png"
                        alt="Vintage books and globe"
                        width={491}
                        height={352}
                        className="w-full h-auto"
                    />
                </div>


                <div className="flex-1 max-w-xs">
                    <div className="bg-white p-6 rounded-xl shadow-soft-md">
                        <ol className="space-y-6">
                            <li className="flex items-start gap-3">
                                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-(--accent-warm) text-white font-semibold">
                                    1
                                </span>
                                <div>
                                    <h3 className="text-sm font-semibold">Upload PDF</h3>
                                    <p className="text-xs text-(--text-secondary)">Add your book file</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-(--accent-warm) text-white font-semibold">
                                    2
                                </span>
                                <div>
                                    <h3 className="text-sm font-semibold">AI Processing</h3>
                                    <p className="text-xs text-(--text-secondary)">
                                        We analyze the content
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-(--accent-warm) text-white font-semibold">
                                    3
                                </span>
                                <div>
                                    <h3 className="text-sm font-semibold">Voice Chat</h3>
                                    <p className="text-xs text-(--text-secondary)">
                                        Discuss with AI
                                    </p>
                                </div>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
}
