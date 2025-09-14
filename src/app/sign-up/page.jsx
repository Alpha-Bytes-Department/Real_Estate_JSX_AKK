import Image from "next/image";
import Link from "next/link";

export default function SignUp() {
    return (
        <div className="w-full h-screen flex">
            <div className="w-full lg:w-1/2 h-screen flex items-center justify-center">
                <form action="">
                    <h1 className="text-[#000000] font-poppins font-medium text-3xl">
                        Get Started Now</h1>

                    <p className={`text-[#000000] pt-4 font-poppins`}>Name</p>
                    <input type="text" placeholder="Enter your name" className={`text-[black] 
                    font-poppins outline-none min-w-[300px] h-[35px] pl-6 mt-3 ring-2 ring-[#D9D9D9] 
                    rounded-md`} />

                    <p className={`text-[#000000] pt-4 font-poppins`}>Email address</p>
                    <input type="text" placeholder="Enter your email" className={`text-[black] 
                    font-poppins outline-none min-w-[300px] h-[35px] pl-6 mt-3 ring-2 ring-[#D9D9D9] 
                    rounded-md`} />

                    <p className={`text-[#000000] pt-4 font-poppins`}>Password</p>
                    <input type="password" placeholder="Enter your password" className={`text-[black] 
                    font-poppins outline-none min-w-[300px] h-[35px] pl-6 mt-3 ring-2 ring-[#D9D9D9] 
                    rounded-md`} />

                    <p className={`text-[#000000] pt-4 font-poppins`}>Confirm Password</p>
                    <input type="text" placeholder="Confirm password" className={`text-[black] 
                    font-poppins outline-none min-w-[300px] h-[35px] pl-6 mt-3 ring-2 ring-[#D9D9D9] 
                    rounded-md`} />

                    <div className="flex gap-3 pt-4">
                        <input type="checkbox" />
                        <p className="text-[#000000] text-sm font-poppins">I agree to the &nbsp;
                            <a href="" className="text-blue-700">terms & policy</a></p>
                    </div>

                    <Link href="/sign-in">
                        <button className="text-[#FFFFFF] font-poppins bg-[#000000] min-w-[300px] h-[40px] 
                        rounded-md mt-4">Sign Up</button>
                    </Link>

                    <div className="flex gap-2 pt-8">
                        <div className="min-w-[130px] h-[1px] bg-gray-300" />
                        <p className="text-[#000000] font-poppins -translate-y-1/2">Or</p>
                        <div className="w-[130px] h-[1px] bg-gray-300" />
                    </div>

                    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 pt-6">
                        <button className={`text-[#000000] ring-2 ring-[#D9D9D9] w-[180px] h-[40px] 
                                        rounded-md font-poppins`}>
                            <div className="flex gap-3">
                                <Image src="/Google_Icon.svg" alt="google_icon" height={10} width={15}
                                    className="ml-4" />
                                <p className={`text-[#000000] text-xs font-poppins`}>Sign in with
                                    Google</p>
                            </div>
                        </button>

                        <button className={`text-[#000000] ring-2 ring-[#D9D9D9] w-[180px] h-[40px] 
                                        rounded-md font-poppins`}>
                            <div className="flex gap-3">
                                <Image src="/Apple_Icon.svg" alt="apple_icon" height={10} width={15}
                                    className="ml-4" />
                                <p className={`text-[#000000] text-xs font-poppins`}>Sign in with
                                    Apple</p>
                            </div>
                        </button>
                    </div>

                    <div className="flex items-center justify-center gap-2 pt-6">
                        <p className="text-[#000000] font-poppins">Already have an account?</p>
                        <a href="/sign-in" className="text-blue-700 font-poppins">Sign In</a>
                    </div>
                </form>
            </div>

            <div className="lg:w-1/2 h-screen bg-[url(/sign-up-side-photo.jpg)] bg-cover 
            rounded-tl-[30px] rounded-bl-[30px] hidden lg:block"/>
        </div>
    );
}
