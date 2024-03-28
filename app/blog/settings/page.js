import Link from "next/link";
import styles from "../../page.module.css";
import SettingsPage from "./settings";

export const metadata = {
  title: "Settings",
  description: "Young Blogger settings here.",
};

export default function Settings() {
  return <SettingsPage />;
}
