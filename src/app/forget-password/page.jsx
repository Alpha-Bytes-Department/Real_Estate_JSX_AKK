export default function ForgetPassword() {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-6">
            <h1 className="font-semibold font-poppins text-[#000000] text-4xl">Forget Your
                Password?</h1>
            <p className="text-[#8F8C8C] text-xl font-poppins">No worries! Enter your email below and
                we’ll send you a link to reset it.</p>

            <input placeholder="Enter your registered email address" className="w-[350px] h-[45px] 
            ring-2 ring-[#D9D9D9] pl-4 rounded-md text-[#877E7E] outline-none font-poppins 
            font-medium"/>
            <button className="w-[350px] h-[45px] bg-[#000000] rounded-md text-[#FFFFFF]
            font-poppins">Send Reset Link</button>

            <div className="flex flex-col items-center justify-center">
                <p className="text-[#8F8C8C] font-poppins">A password reset link will be sent to your
                    email address if it’s</p>
                <p className="text-[#8F8C8C] font-poppins">associated with an account</p>
            </div>
            <a href="" className="text-[#1E1E1E] font-poppins">Back to Login</a>
        </div>
    );
}