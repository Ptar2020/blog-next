"use client";
import Link from "next/link";
import styles from "../../page.module.css";
import { useAuth } from "@/app/utils/authProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  if (!user?.is_superuser) {
    router.push("/blog/login");
    return null;
  } else {
    return (
      <div>
        <p>Settings [Superuser only]</p>
        <br />
        <Link href={"/"}>Home</Link>
      </div>
    );
  }
}
