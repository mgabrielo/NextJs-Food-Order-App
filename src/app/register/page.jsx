"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function page() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [userCreated, setUserCreated] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserCreated(false);
    setCreatingUser(true);
    setError(false);
    await axios
      .post("/api/register", formData)
      .then((res) => {
        if (res.status == 200) {
          setUserCreated(true);
          setError(false);
        } else {
          setUserCreated(false);
          setError(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setUserCreated(false);
      });
    setCreatingUser(false);
  };
  return (
    <section className="mt-8">
      <h1 className="text-primary text-center text-2xl font-semibold mb-4">
        Register
      </h1>
      {userCreated && (
        <div className="my-4 text-center">
          User Created Now You Can &nbsp;
          <Link href={"/login"} className="underline text-primary text-lg">
            Login &raquo;
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center">
          <p>Error In Registration Try Again</p>
        </div>
      )}
      <form className="block max-w-sm mx-auto" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={formData.email}
          disabled={creatingUser}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          value={formData.password}
          disabled={creatingUser}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button type={"submit"} disabled={creatingUser}>
          Register
        </button>

        <div className="text-center text-gray-600 my-2">
          Existing Account ? ...{" "}
          <Link href={"/login"} className="underline">
            Login Here
          </Link>
        </div>
      </form>
    </section>
  );
}
