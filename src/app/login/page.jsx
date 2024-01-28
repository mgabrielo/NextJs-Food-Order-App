"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function page() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const session = useSession();
  const [loginInProgress, setLoginInProgress] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoginInProgress(true);
    await signIn("credentials", {
      username: formData.email,
      password: formData.password,
    });
    setLoginInProgress(false);
  };

  if (session?.status == "authenticated") {
    return redirect("/");
  }
  return (
    <section className="mt-8">
      <h1 className="text-primary text-center text-2xl font-semibold mb-4">
        Login
      </h1>
      <form className="block max-w-sm mx-auto" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="email"
          value={formData.email}
          disabled={loginInProgress}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          value={formData.password}
          disabled={loginInProgress}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button type={"submit"} disabled={loginInProgress}>
          Login
        </button>

        <div className="text-center text-gray-600 my-2">
          Need An Account ? ...{" "}
          <Link href={"/register"} className="underline">
            Register Here
          </Link>
        </div>
      </form>
    </section>
  );
}
