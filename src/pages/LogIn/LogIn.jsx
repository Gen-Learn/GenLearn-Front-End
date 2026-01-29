import img from "../../assets/images/Frame2.jpg";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { Link } from "react-router";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
function SignUp() {
  return (
    <div className="max-w-4/5 m-auto h-screen flex justify-center items-center">
      <div className="flex justify-evenly items-center py-10">
        <div className="lg:w-2/5 flex flex-col  p-8">
          {/* title */}
          <h1 className="sm:text-[35px] text-[30px] font-bold  text-center mb-4">
            Welcome Back!
          </h1>
          {/* description */}
          <p className="text-[20px] text-center  m-auto text-[#505b61] mb-10">
            Continue your personalized learning plan
          </p>
          {/* form */}
          <form action="">
            <Input
              type="normal"
              placeholder="example@gmail.com"
              title="Email Address"
            />
            <Input
              type="password"
              placeholder="*****************"
              title="Password"
            />
          </form>
          {/* checkbox */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" />
              <p className="ml-2.5 text-[#a082c4] text-[15px] sm:text-[16px]">
                Remember me
              </p>
            </div>
            <div>
              <Link
                to="/forgotPassword"
                className=" text-[#a082c4] hover:underline underline-offset-2 text-[15px] sm:text-[16px]"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <Button Content="Log In" className="my-4" />
          {/* or */}
          <div className="relative  my-10">
            <hr className="bg-linear-to-r from-[#22B5E5] to-[#E522B5] bg-clip-text  font-bold underline underline-offset-2 decoration-[#E522B5] block w-full" />
            <p className="text-center text-[#505b61] p-4 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              Or Sign in with
            </p>
          </div>
          {/* google & facebook */}
          <div className="flex justify-center gap-4 my-4">
            <button className="p-0.5  bg-linear-to-r rounded-sm from-[#22B5E5] to-[#E522B5]">
              <div className="flex items-center gap-2 px-4 py-2 rounded-sm bg-white hover:bg-gray-100 h-full">
                <FcGoogle />
                <span className="text-[15px] text-[#505b61]">
                  Sign in with Google
                </span>
              </div>
            </button>
            <button className="p-0.5  bg-linear-to-r rounded-sm from-[#22B5E5] to-[#E522B5]">
              <div className="flex items-center gap-2 px-4 py-2 rounded-sm bg-white hover:bg-gray-100 h-full">
                <FaFacebook className="text-blue-700" />
                <span className="text-[15px] text-[#505b61]">
                  Sign in with Facebook
                </span>
              </div>
            </button>
          </div>

          {/* Sign up */}
          <p className="text-center">
            Don’t have account??{" "}
            <span className="bg-linear-to-r from-[#22B5E5] to-[#E522B5] bg-clip-text text-transparent font-bold underline underline-offset-2 decoration-[#E522B5]">
              <Link to="/signup">Sign Up</Link>
            </span>
          </p>
        </div>
        <div className="w-1/2 lg:block hidden">
          <img src={img} alt="SignUp" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
