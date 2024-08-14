import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { authContext } from "@/context/auth-context";

const SignInSchema = z.object({
  username: z.string().min(6, "Invalid Username"),
  password: z.string().min(8, "Invalid Password"),
});

type FieldTypes = z.infer<typeof SignInSchema>;

export const SignInForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { Login } = useContext(authContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldTypes>({
    resolver: zodResolver(SignInSchema),
    mode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: FieldTypes) => {
    Login(data);
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/"); 
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 w-full"
    >
      <FormInput
        type="text"
        id="username"
        label="Username"
        placeholder="Username"
        {...register("username", { required: true })}
        errors={errors.username}
        className="h-9"
      />
      <div className="relative flex h-[60px] w-full flex-col gap-1">
        <FormInput
          type={`${showPassword ? "text" : "password"}`}
          label="Password"
          placeholder="Enter password"
          id="password"
          {...register("password", { required: true })}
          errors={errors.password}
          className="h-9"
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute bottom-[1rem] right-4 cursor-pointer outline-none"
        >
          {showPassword ? (
            <IoEye className="w-5 text-slate-600" />
          ) : (
            <IoEyeOff className="w-5 text-slate-600" />
          )}
        </button>
        <Link
          to=""
          className="text-blue-600 w-full text-end font-semibold leading-5 space-x-1"
        >
          Forgot your password?
        </Link>
      </div>

      <Button
        disabled={Object.keys(errors).length !== 0}
        type="submit"
        className="mt-8 w-full text-slate-50"
      >
        Submit
      </Button>

      <div className=" w-full text-center">
        <span>Don't have an account?</span>
        <Link
          to="/signup"
          className="text-blue-600
            w-full
            text-end
            font-semibold
            leading-5
            space-x-1 ml-2"
        >
          Create your account?
        </Link>
      </div>
    </form>
  );
};
