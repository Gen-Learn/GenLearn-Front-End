import img from "../../assets/images/login.png";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
function SignUp() {
  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      await login(form);
      navigate("/"); // redirect after successful login
    } catch {
      console.error("Login failed - check error state for details");
    }
  };
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
          <form onSubmit={handleSubmit}>
            <Input
              type="normal"
              value={form.email}
              placeholder="example@gmail.com"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              title="Email Address"
              required
            />
            <Input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="*****************"
              title="Password"
              required
            />
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
                  to="/forgot-Password"
                  className=" text-[#a082c4] hover:underline underline-offset-2 text-[15px] sm:text-[16px]"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <Button
              type="submit"
              Content="Log In"
              className="my-4 w-full"
              disabled={isLoading}
              onClick={undefined}
            />
            <div>
              {error && (
                <p className="text-red-500 text-center mt-2">{error}</p>
              )}
            </div>
          </form>

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
