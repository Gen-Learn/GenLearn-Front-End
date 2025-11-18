import { useState } from "react";
import { LuEyeClosed } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
// type: normal , password
// placeholder: "string"
// title: "string" also id
function Input({ type, placeholder, title }) {
  const [HidePassword, setHidePassword] = useState(true);
  return (
    <>
      {type == "normal" ? (
        <div className="flex flex-col mb-4">
          <label htmlFor={title} className="text-[#8964B5] text-[18px] ">
            {title}
          </label>
          <input
            type={type}
            placeholder={placeholder}
            id={title}
            className="px-4 py-2 rounded-xl border-2 border-[##9192ab]"
          />
        </div>
      ) : (
        <div className="flex flex-col  mb-4">
          <label htmlFor={title} className="text-[#8964B5] text-[18px] ">
            {title}
          </label>
          <div className="relative">
            <input
              type={HidePassword ? "password" : "text"}
              placeholder={placeholder}
              id={title}
              className="px-4 py-2 rounded-xl border-2 border-[##9192ab] w-full"
            />
            <span
              className="absolute right-3 top-[40%] cursor-pointer text-black"
              onClick={() => setHidePassword(!HidePassword)}
            >
              {HidePassword ? <LuEyeClosed /> : <LuEye />}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default Input;
