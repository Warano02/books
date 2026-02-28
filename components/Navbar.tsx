"use client";
import { cn } from "@/lib/utils";
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
const navItems = [
    { label: "Library", href: "/" },
    { label: "Add New", href: "/books/new" },
]

function Navbar() {
    const pathname = usePathname()
    const { user } = useUser()
    return (
        <header className="w-full fixed z-50 bg-('--bg-primary')">
            <div className="wrapper navbar-height py-4 flex justify-between items-center">
                <Link href={"/"} className="flex gap-0.5 items-center">
                    <Image src={"/assets/logo.png"} alt="Logo " width={42} height={26} />
                    <span className="logo-text">Bookified</span>
                </Link>
                <nav className="w-fit flex gap-7.5 items-center">
                    {
                        navItems.map(({ label, href }) => {
                            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href))
                            return (<Link href={href} key={label} className={cn("nav-link-base", isActive ? "nav-link-active" : "text-black hover:opacity-20")}>
                                {label}
                            </Link>
                            )
                        })
                    }
                </nav>
                <div className="flex items-center gap-7.5">
                    <SignedOut>
                        <SignInButton mode="modal">Sign in</SignInButton>
                        <SignUpButton mode="modal">Sign up</SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <div className="nav-user-link">
                            <UserButton />
                            {user?.firstName && <Link href={"/subscription"} className="nav-user-name" >
                                {user.firstName}
                            </Link>}
                        </div>
                    </SignedIn>
                </div>
            </div>
        </header>
    )
}

export default Navbar