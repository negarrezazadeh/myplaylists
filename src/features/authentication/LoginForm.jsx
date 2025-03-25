import { useForm } from "react-hook-form";

import { Input } from "@/ui/input";
import { useLogin } from "./useLogin";
import { Button } from "@/ui/button";

import logo from "./../../assets/img/myplaylist-intro.svg";
import { Link, useNavigate } from "react-router-dom";
import TelegramAuthButton from "./TelegramAuthButton";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
function LoginForm() {
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, isPending } = useLogin();

  // check if user logged in via form redirect to latest page
  const [isLoggedInFromForm, setIsLoggedInFromForm] = useState(false);

  // redirect to home if already logged in and try to back to login page
  useEffect(() => {
    if (isAuthenticated && !isLoggedInFromForm) navigate("/explore");
  }, [isAuthenticated, isLoggedInFromForm, navigate]);

  function onSubmit(data) {
    setIsLoggedInFromForm(true);
    login(
      { email: data.email, password: data.password },
      {
        onSuccess: () => {
          navigate(-1, { replace: true });
        },
        onError: (err) => {
          setIsLoggedInFromForm(false);
        },
      },
    );
  }

  return (
    <div className="mt-6 px-3">
      <img
        className="mx-auto mb-10 mt-14 h-56 w-full rounded-lg"
        src={logo}
        alt="myplaylists logo "
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-auto flex w-full flex-col gap-y-3 rounded-lg bg-dark px-4 py-10"
      >
        <TelegramAuthButton />

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
        <Button disabled={isPending}>
          {isPending ? "Loading..." : "Login"}
        </Button>

        <Link to="/register" className="mt-2 text-start text-blue-500">
          Don't have an account? Register
        </Link>
      </form>
    </div>
  );
}

export default LoginForm;
