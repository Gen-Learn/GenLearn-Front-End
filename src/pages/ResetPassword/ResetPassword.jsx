import img from "../../assets/images/amico.jpg";
import { IoIosArrowBack } from "react-icons/io";

import { Link } from "react-router";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
function ResetPassword() {
  return (
    <div className="max-w-4/5 m-auto h-screen flex justify-center items-center">
      <div className="flex justify-evenly items-center py-10">
        <div className="w-1/2 lg:block hidden">
          <img src={img} alt="SignUp" className="w-full h-full" />
        </div>
        <div className="lg:w-5/12 flex flex-col  p-8">
          {/* title */}
          <h1 className="text-[35px] font-bold mb-4  ">Reset Your Password?</h1>
          {/* description */}
          <h2 className="text-3xl font-bold text-[#8864b5]">
            Enter new password
          </h2>
          <p className="text-[16px]  text-[#505b61] mb-3">
            Turn every book into an interactive experience
          </p>
          {/* form */}
          <form action="">
            <Input
              type="password"
              placeholder="*****************"
              title="New Password"
            />
            <Input
              type="password"
              placeholder="*****************"
              title="Confirm New Password"
            />
          </form>

          <Button Content="Reset Password" className="my-4" />

          {/* login */}
          <p className="text-center">
            <Link
              to="/login"
              className="hover:underline underline-offset-2 text-[#505b61]"
            >
              <IoIosArrowBack className="inline-block mr-2" />
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
