"use client";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function page() {
  const { loading, data } = useProfile();
  const path = usePathname();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch(() => {
        toast.error("Could Not Get Non-Admin Users");
      });
  }, []);
  return (
    <section className="max-w-xl mx-auto mt-8">
      {data ? (
        <UserTabs isAdmin={data} />
      ) : (
        <p className="mt-8">Not An Admin</p>
      )}
      {loading && path.includes("users") && <p className="mt-8">Loading...</p>}
      <div className="mt-8">
        {users &&
          users.length > 0 &&
          users.map((user, index) => (
            <div
              className="flex bg-gray-200 rounded-lg mb-2 px-4 py-2 items-center gap-2"
              key={index}
            >
              <div className="grid grid-cols-2 gap-3 grow">
                {user?.name ? (
                  <span className="text-gray-800">{user?.name}</span>
                ) : (
                  <span className="italic text-gray-800">No Name</span>
                )}
                <span className="text-gray-500">{user?.email}</span>
              </div>
              <div>
                <Link className="button" href={`/users/${user?._id}`}>
                  Edit
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
