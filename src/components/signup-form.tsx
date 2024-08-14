import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link } from "react-router-dom";
import { z } from "zod";

const SignUpSchema = z
  .object({
    username: z.string().min(6, "Enter atleast 6 digits username"),
    email: z.string().email("Enter the valid email address"),
    password: z.string().min(8, "Enter atleast 8 digits password"),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords does not match!",
      path: ["confirmPassword"],
    }
  );

type FieldTypes = z.infer<typeof SignUpSchema>;
export const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldTypes>({
    resolver: zodResolver(SignUpSchema),
    mode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: FieldTypes) => {
    // inset the user data into the database
    console.log(data);
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
      <FormInput
        id="email"
        type="email"
        label="Email"
        placeholder="Enter email Address"
        {...register("email", { required: true })}
        errors={errors.email}
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
      </div>
      <div className="relative flex h-[60px] w-full flex-col gap-1">
        <FormInput
          type="password"
          label="Confirm Password"
          placeholder="Enter Confirm password"
          id="confirmPassword"
          {...register("confirmPassword", { required: true })}
          errors={errors.confirmPassword}
          className="h-9"
        />
      </div>

      <Button
        disabled={Object.keys(errors).length !== 0}
        type="submit"
        className="mt-3 w-full text-slate-50"
      >
        Submit
      </Button>

      <div className=" w-full text-center">
        <span>Already have an account?</span>
        <Link
          to="/signin"
          className="text-blue-600
            w-full
            text-end
            font-semibold
            leading-5
            space-x-1 ml-2"
        >
          Login your account?
        </Link>
      </div>
    </form>
  );
};
