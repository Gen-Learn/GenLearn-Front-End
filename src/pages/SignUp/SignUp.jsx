import img from "../../assets/images/Frame 3.jpg";

import { Link } from "react-router";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
function SignUp() {
  return (
    <div className="max-w-4/5 m-auto h-screen flex justify-center items-center">
      <div className="flex justify-evenly items-center py-10">
        <div className="w-1/2 lg:block hidden">
          <img src={img} alt="SignUp" className="w-full h-full" />
        </div>
        <div className="lg:w-2/5 flex flex-col  p-8">
          {/* title */}
          <h1 className="text-4xl font-bold  text-center ">
            Start Your Journey
          </h1>
          {/* description */}
          <p className="text-2xl text-center  m-auto text-[#505b61]">
            Turn every book into an interactive experience
          </p>
          {/* form */}
          <form action="">
            <Input
              type="normal"
              placeholder="Mohamed Mahmoud"
              title="Username"
            />
            <Input
              type="normal"
              placeholder="*****************"
              title="Email Address"
            />
            <Input
              type="password"
              placeholder="*****************"
              title="Password"
            />
            <Input
              type="password"
              placeholder="*****************"
              title="Confirm Password"
            />
          </form>
          {/* checkbox */}
          <div className="flex items-center">
            <input type="checkbox" />
            <p className="ml-2.5">
              I agree to the
              <span className="text-blue-500">Terms </span>
              and
              <span className="text-blue-500"> Privacy Policy</span>
            </p>
          </div>

          <Button Content="Sign Up" className="my-4" />

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
