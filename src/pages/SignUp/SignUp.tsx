import img from "../../assets/images/signup.png";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
function SignUp() {
  const { register, isLoading, error, clearError } = useAuth();
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sending to backend:", form); 
    clearError();
    try {
      if (form.password !== confirmPassword) {
        return;
      }
      await register(form);
      navigate("/");
    } catch {
      // error is already set in context
    }
  };
  return (
    <div className="max-w-4/5 m-auto h-screen flex justify-center items-center">
      <div className="flex justify-evenly items-center py-10">
        <div className="w-1/2 lg:block hidden">
          <img src={img} alt="SignUp" className="w-full h-full" />
        </div>
        <div className="lg:w-2/5 flex flex-col  p-8">
          {/* title */}
          <h1 className="sm:text-4xl text-3xl font-bold  text-center mb-4">
            Start Your Journey
          </h1>
          {/* description */}
          <p className="sm:text-[20px] text-[16px] text-center  m-auto text-[#505b61] mb-7">
            Turn every book into an interactive experience
          </p>
          {/* form */}
          <form onSubmit={handleSubmit}>
            <Input
              type="normal"
              placeholder="Mohamed Mahmoud"
              title="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              type="normal"
              placeholder="example@gmail.com"
              title="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input
              type="password"
              placeholder="*****************"
              title="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Input
              type="password"
              placeholder="*****************"
              title="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {/* checkbox */}
            <div className="flex items-center">
              <input type="checkbox" />
              <p className="ml-2.5 text-[14px] sm:text-[16px]">
                I agree to the
                <span className="text-blue-500 text-[14px] sm:text-[16px]">
                  Terms{" "}
                </span>
                and
                <span className="text-blue-500 text-[14px] sm:text-[16px]">
                  {" "}
                  Privacy Policy
                </span>
              </p>
            </div>

            <Button
              type="submit"
              Content={isLoading ? "Signing Up..." : "Sign Up"}
              className="my-4 w-full"
              onClick={undefined}
            />
            <p className="text-center text-red-500">{error}</p>
          </form>

          {/* login */}
          <p className="text-center">
            Already have account?{" "}
            <span className="bg-linear-to-r from-[#22B5E5] to-[#E522B5] bg-clip-text text-transparent font-bold underline underline-offset-2 decoration-[#E522B5]">
              <Link to="/login">Sign In</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
