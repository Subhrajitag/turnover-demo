import { deleteCookie } from "cookies-next";
import { JwtPayload } from "jsonwebtoken";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import getLoggedInUser from "~/utils/getLoggedInUser";

interface User {
    name: string;
    email: string;
    password: string;
}
const navContents = ["Categories", "Sale", "Clearance", "New stock", "Trending"];

const Topbar = () => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const userData = getLoggedInUser() as User;
        const fetchUserData = () => {
            setUser(userData);
        };
        fetchUserData();
    }, [router.isReady]);

    const handleLogout = async () => {
        deleteCookie("authorization");
        await router.push("/login");
    }

    return (
        <>
            <div className="flex flex-col w-full ">
                <div className="self-stretch flex flex-row items-start justify-end py-3 gap-5 px-[2%]">
                    <div className="">Help</div>
                    <div className="whitespace-nowrap">Orders & Returns</div>
                    <div>

                        {
                            user &&
                            <div className="flex gap-3">
                                <div >  Hi, {user?.name} </div>
                                <button onClick={handleLogout} > Logout </button>
                            </div>
                        }
                    </div>
                </div>
                <header className="w-full flex justify-between items-center text-black font-bold px-[2%]  ">
                    <h1 className="text-3xl">ECOMMERCE</h1>
                    <div className="w-3/5">
                        <div className="w-full flex justify-center text-center gap-5 font-semibold">
                            {
                                navContents.map((navContent, index) => {
                                    return (
                                        <div key={index}>
                                            {navContent}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="w-1/5 flex flex-row justify-end gap-5 text-[#333]">
                        <Image
                            src="/search.svg"
                            alt="Search"
                            loading="lazy"
                            width={24}
                            height={24} />
                        <Image
                            src="/cart.svg"
                            alt="cart"
                            loading="lazy"
                            width={20}
                            height={20} />

                    </div>
                </header>
                <div className="h-8 flex justify-center items-center w-full bg-[#F4F4F4]">
                    <div className="flex gap-3">
                        <Image
                            height={16}
                            width={16}
                            alt="left-arrow"
                            src="/left-arrow.svg"
                        />

                        <div className="text-sm font-medium ">
                            Get 10% off on business sign up
                        </div>
                        <Image
                            height={16}
                            width={16}
                            alt="right-arrow"
                            src="/right-arrow.svg"
                        />

                    </div>
                </div>
            </div>
        </>
    )
}
export default Topbar;