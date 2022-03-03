import { FormEvent, useRef } from "react";
import { useRouter } from "next/router";

import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import { adminLogin } from "../../../services/school";

const AdminLogin = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const loginHandler = async (event: FormEvent) => {
    event.preventDefault();

    const user = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };

    const data = await adminLogin(user);

    if (typeof window !== undefined) {
      // Persisting the user in localStorage
      if (localStorage) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    }

    router.push("/admin");
  };

  return (
    <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>

        <form className="space-y-6" onSubmit={loginHandler}>
          <Input
            htmlFor="login"
            label="Sign In"
            placeHolder="Sign In"
            type="email"
            required={true}
            inputRef={emailRef}
          />
          <div className="py-2" />
          <Input
            htmlFor="password"
            label="password"
            placeHolder="Password"
            type="password"
            required={true}
            inputRef={passwordRef}
          />

          <Button type="success">Sign In</Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
