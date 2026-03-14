import img from "../../assets/images/forgotpassword.png";
import { IoIosArrowBack } from "react-icons/io";

import { Link } from "react-router";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Swal from "sweetalert2";
function ForgotPassword() {
  const { forgotPassword, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      await forgotPassword({ email, resetMethod: "email" });
      setSent(true);
    } catch {
      // error set in context
    }
  };
  if (sent) {
    Swal.fire({
      title: "Email Sent! Check your inbox",
      icon: "success",
    });
  }
  return (
    <div className="max-w-4/5 m-auto h-screen flex justify-center items-center">
      <div className="flex justify-evenly items-center py-10">
        <div className="w-1/2 lg:block hidden">
          <img src={img} alt="SignUp" className="w-full h-full" />
        </div>
        <div className="lg:w-5/12 flex flex-col  p-8">
          {/* title */}
          <h1 className="sm:text-[30px] text-[22px] font-bold mb-4  ">
            Forgot Your Password?
          </h1>
          {/* description */}
          <h2 className="sm:text-2xl text-[18px] font-bold text-[#8864b5]">
            Enter your Email
          </h2>
          <p className="sm:text-[18px] text-[16px]  text-[#505b61] mb-3">
            Enter your email to get the code.
          </p>
          {/* form */}
          <form onSubmit={handleSubmit}>
            <Input
              type="normal"
              placeholder="example@gmail.com"
              title="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              Content="Send Mail"
              className="my-4 w-full"
              onClick={undefined}
              disabled={isLoading}
              type="submit"
            />
            <div>
              {error && (
                <p className="text-red-500 text-center mt-2">{error}</p>
              )}
            </div>
          </form>

          <p className="text-center">
            Didn’t get any mail?{" "}
            <span className="bg-linear-to-r from-[#22B5E5] to-[#E522B5] bg-clip-text text-transparent font-bold underline underline-offset-2 decoration-[#E522B5]">
              Send again
            </span>
          </p>

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

export default ForgotPassword;
