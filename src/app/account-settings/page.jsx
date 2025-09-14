import Image from "next/image";

export default function AccountSettings() {
    return (
        <div className="w-full h-screen flex gap-12 bg-[#F9FAFB]">
            <div className="w-1/4 h-screen flex flex-col justify-between">
                <div className="flex flex-col gap-4 pt-[152px]">
                    <h1 className="text-[#000000] font-poppins font-semibold text-3xl text-center">
                        Account Settings</h1>
                    <button>
                        <div className="w-full h-[40px] flex items-center justify-between bg-[#D9D9D9] 
                                        mt-3 rounded-sm cursor-pointer">
                            <p className="text-[#000000] font-poppins pl-3">Profile Settings</p>
                            <Image src="user-logo.svg" alt="user-logo" width={20} height={20}
                                className="" />
                        </div>
                    </button>

                    <button>
                        <div className="w-full h-[40px] flex items-center justify-between 
                                            bg-[#D9D9D9] rounded-sm cursor-pointer">
                            <p className="text-[#000000] font-poppins pl-3">Saved Properties</p>
                            <Image src="bookmark.svg" alt="bookmark-logo" width={20} height={20}
                                className="" />
                        </div>
                    </button>

                    <button>
                        <div className="w-full h-[40px] flex items-center justify-between 
                                            bg-[#D9D9D9] rounded-sm cursor-pointer">
                            <p className="text-[#000000] font-poppins pl-3">Listings</p>
                            <Image src="list.svg" alt="list-logo" width={20} height={20}
                                className="" />
                        </div>
                    </button>
                </div>

                <div className="flex flex-col gap-4 pb-[152px]">
                    <button>
                        <div className="w-full h-[40px] bg-[#D9D9D9] rounded-sm cursor-pointer">
                            <p className="text-[#000000] font-poppins pt-2 pl-3">Privacy Policy</p>
                        </div>
                    </button>

                    <button>
                        <div className="w-full h-[40px] bg-[#D9D9D9] rounded-sm cursor-pointer">
                            <p className="text-[#000000] font-poppins pt-2 pl-3">Terms of Services</p>
                        </div>
                    </button>
                </div>
            </div>


            <div className="w-3/4 h-screen">
                <div className="w-full h-1/3 bg-[#FFFFFF] p-7">
                    <form action="">
                        <h1 className="text-[#000000] font-poppins font-semibold text-2xl">
                            Personal Information</h1>
                        <div className="w-full h-[1.5px] bg-[#000000] mt-3" />

                        <div className="flex gap-12">
                            <div className="flex flex-col gap-4">
                                <p className="font-poppins text-[#000000] pt-8">Name</p>
                                <input type="text" placeholder="Enter your name" className="lg:w-[400px] 
                            h-[36px] font-poppins pl-4 outline-none ring ring-[#D9D9D9] rounded-md"/>
                            </div>

                            <div className="flex flex-col gap-4">
                                <p className="font-poppins text-[#000000] pt-8">Email address</p>
                                <input type="text" placeholder="Enter your email" className="w-[400px] 
                            h-[36px] font-poppins pl-4 outline-none ring ring-[#D9D9D9] rounded-md"/>
                            </div>
                        </div>

                        <button className="bg-[#000000] text-[#FFFFFF] px-8 py-2 ml-170 mt-10 
                        rounded-md font-poppins">Update Profile</button>
                    </form>
                </div>

                <div className="w-full h-2/3 bg-[#FFFFFF] p-7 pt-20">
                    <form action="">
                        <h1 className="text-[#000000] font-poppins font-semibold text-2xl">
                            Security</h1>
                        <div className="w-full h-[1.5px] bg-[#000000] mt-3" />

                        <div className="flex flex-col">
                            <div className="flex flex-col gap-4">
                                <p className="font-poppins text-[#000000] pt-8">Current Password</p>
                                <input type="password" placeholder="Enter your password"
                                    className="w-[400px] h-[36px] font-poppins pl-4 outline-none ring 
                                ring-[#D9D9D9] rounded-md"/>
                            </div>

                            <div className="flex gap-12">
                                <div className="flex flex-col gap-4">
                                    <p className="font-poppins text-[#000000] pt-8">New Password</p>
                                    <input type="password" placeholder="Enter your password"
                                        className="w-[400px] h-[36px] font-poppins pl-4 outline-none ring 
                                    ring-[#D9D9D9] rounded-md"/>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <p className="font-poppins text-[#000000] pt-8">Confirm New
                                        Password</p>
                                    <input type="password" placeholder="Confirm your password"
                                        className="w-[400px] h-[36px] font-poppins pl-4 outline-none ring 
                                    ring-[#D9D9D9] rounded-md"/>
                                </div>
                            </div>
                        </div>

                        <button className="bg-[#000000] text-[#FFFFFF] px-8 py-2 ml-160 mt-10 
                        rounded-md font-poppins">Change Password</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
