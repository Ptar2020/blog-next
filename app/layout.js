import { Inter } from "next/font/google";

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Navbar from "./partials/Navbar";
import Footer from "./partials/Footer";
const inter = Inter({ subsets: ["latin"] });
import { AppBar, Toolbar } from "@mui/material";

export const metadata = {
  title: "Young Blogger",
  description: "The home of upcoming and existing writers",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <header style={{ marginBottom: "85px" }}>
          <Navbar />
        </header>
        <div style={{ minHeight: "100vh" }} className="container ">
          {children}
        </div>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
};
export default RootLayout;
