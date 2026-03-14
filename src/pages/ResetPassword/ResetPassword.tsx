import img from "../../assets/images/resetpassword.png";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
function ResetPassword() {
  const { resetPassword, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password2, setPassword2] = useState("");
  const userId = searchParams.get("userId") || "";
  const [form, setForm] = useState({
    newPassword: "",
    userId: userId,
    resetPasswordToken: token,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      if (form.newPassword !== password2) return;
      await resetPassword(form );
      navigate("/login");
    } catch {
      // error set in context
    }
  };
  return (
    <div className="max-w-4/5 m-auto h-screen flex justify-center items-center">
      <div className="flex justify-evenly items-center py-10">
        <div className="w-1/2 lg:block hidden">
          <img src={img} alt="SignUp" className="w-full h-full" />
        </div>
        <div className="lg:w-5/12 flex flex-col  p-8">
          {/* title */}
          <h1 className="sm:text-[30px] text-[24px] font-bold mb-4  ">
            Reset Your Password?
          </h1>
          {/* description */}
          <h2 className="sm:text-2xl text-[18px] font-bold text-[#8864b5]">
            Enter new password
          </h2>
          <p className="sm:text-[18px] text-[12px]  text-[#505b61] mb-3">
            Turn every book into an interactive experience
          </p>
          {/* form */}
          <form onSubmit={handleSubmit}>
            <Input
              type="password"
              placeholder="*****************"
              value={form.newPassword}
              onChange={(e) =>
                setForm({ ...form, newPassword: e.target.value })
              }
              title="New Password"
              required
            />
            <Input
              type="password"
              placeholder="*****************"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              title="Confirm New Password"
              required
            />
            <Button
              Content="Reset Password"
              className="my-4 w-full"
              onClick={undefined}
              type="submit"
              disabled={isLoading}
            />
            <div>
              {error && (
                <p className="text-red-500 text-center mt-2">{error}</p>
              )}
            </div>
          </form>

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
