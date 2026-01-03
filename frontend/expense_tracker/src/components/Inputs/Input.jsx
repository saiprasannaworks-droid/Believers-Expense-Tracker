import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({
  value,
  label,
  onChange,
  placeholder,
  type = "text",
  autoComplete
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType =
    type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="mb-4">
      <label className="text-lg font-medium text-gray-900 dark:text-white  block mb-1">
        {label}
      </label>

      <div className="input-box shadow shadow-red-300 flex items-center gap-2">
        <input
          type={inputType}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value}
          onChange={onChange}
          autoComplete={
            autoComplete ||
            (type === "password" ? "current-password" : "off")
          }
        />

        {type === "password" && (
          showPassword ? (
            <FaRegEye
              size={22}
              className="text-primary cursor-pointer"
              onClick={toggleShowPassword}
            />
          ) : (
            <FaRegEyeSlash
              size={22}
              className="text-red-300 cursor-pointer"
              onClick={toggleShowPassword}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Input;
