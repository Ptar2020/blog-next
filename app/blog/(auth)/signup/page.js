"use client";
import styles from "../../../page.module.css";
import Link from "next/link";
import { useAuth } from "@/app/utils/authProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Signup = () => {
  const router = useRouter();
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (user) router.push("/");
  }, [router, user]);

  return (
    <main>
      <div>
        <p>Signup Page</p>
        <Link href={"/"}>Home</Link>
      </div>
    </main>
  );
};
export default Signup;
