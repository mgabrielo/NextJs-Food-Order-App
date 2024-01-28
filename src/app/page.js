'use client'
import { useSession } from "next-auth/react";
import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeader from "../components/layout/SectionHeader";
import { redirect } from "next/navigation";

export default function Home() {
  const session = useSession()
  if (session?.status == "unauthenticated") {
    return redirect("/login");
  }
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="my-10">
        <SectionHeader subHeader={'Our Story'} mainHeader={'About Us'} />
        <div className="text-gray-600 max-w-2xl mx-auto flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </section>
      <section className="text-center mt-8 mb-4">
        <SectionHeader subHeader={"Don't Hesitate"} mainHeader={"Contact Us"} />
        <div className="mt-5">
          <a
            href="tel:+463739227315"
            className="text-2xl "
          >
            +46 373 922 7315
          </a>
        </div>
      </section>
    </>
  );
}
