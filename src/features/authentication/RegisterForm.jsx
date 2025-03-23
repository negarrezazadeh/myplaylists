import { useForm } from "react-hook-form";

import { Input } from "@/ui/input";
import { useRegister } from "./useRegister";
import { Button } from "@/ui/button";

import logo from "./../../assets/img/myplaylist-intro.svg";
import { Link, useNavigate } from "react-router-dom";
import { useOTP } from "./useOTP";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
function RegisterForm() {
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { register: registerUser, isPending } = useRegister();

  const { otp, optIsPending } = useOTP();

  const [form, setForm] = useState("step_1");

  useEffect(() => {
    if (isAuthenticated) navigate("/explore");
  }, [isAuthenticated, navigate]);

  function onSubmit(data) {
    if (form === "step_1") {
      otp(data.email, {
        onSuccess: (data) => {
          data.success && setForm("step_2");
        },
      });
    }

    if (form === "step_2") {
      registerUser({
        email: data.email,
        password: data.password,
        name: data.name,
        code: data.code,
      });
    }
  }

  return (
    <div className="mt-6 px-3">
      <img
        className="mx-auto mb-10 mt-14 h-56 w-full rounded-lg"
        src={logo}
        alt="myplaylists logo "
      />
      <form
        className="m-auto flex w-full flex-col gap-y-3 rounded-lg bg-dark px-4 py-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        {form === "step_1" && (
          <>
            <Input
              {...register("name", { required: "Name is required" })}
              placeholder="Name"
              type="text"
              autoComplete="off"
              error={errors.name?.message}
            />
            <Input
              {...register("email", { required: "Email is required" })}
              placeholder="Email"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
            />
            <Input
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
              type="password"
              autoComplete="password"
              error={errors.password?.message}
            />
          </>
        )}

        {form === "step_2" && (
          <Input
            {...register("code", {
              required: form === "step_2",
            })}
            placeholder="Code"
            error={errors.code?.message}
          />
        )}

        <Button disabled={isPending || optIsPending}>
          {isPending ? "Loading..." : "Register"}
        </Button>
        {form === "step_2" && (
          <small
            className="mt-2 text-start text-blue-500 underline"
            onClick={() => setForm("step_1")}
          >
            Back
          </small>
        )}
        <Link to="/login" className="mt-2 text-start text-blue-500">
          You already have an account? Login
        </Link>
      </form>
    </div>
  );
}

export default RegisterForm;
