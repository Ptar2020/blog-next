import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Navbar from "./partials/Navbar";
import Footer from "./partials/Footer";
import { UserProvider } from "./utils/authProvider";
import Main from "./main";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Young Blogger",
  description: "The home of upcoming and existing writers",
};

const RootLayout = ({ children }) => {
  return (
    <UserProvider>
      <html lang="en">
        <body className={inter.className}>
          <header style={{ marginBottom: "85px" }}>
            <Navbar />
          </header>
          <div style={{ minHeight: "100vh" }} className="container ">
            {children}
          </div>
          <footer>
            <Footer />
          </footer>
          <Main /> {/* Render the Main component here */}
        </body>
      </html>
    </UserProvider>
  );
};
export default RootLayout;

// import { Inter } from "next/font/google";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./globals.css";
// import Navbar from "./partials/Navbar";
// import Footer from "./partials/Footer";
// import { UserProvider } from "./authProvider";
// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Young Blogger",
//   description: "The home of upcoming and existing writers",
// };

// const RootLayout = ({ children }) => {
//   return (
//     <UserProvider>
//       <html lang="en">
//         <body className={inter.className}>
//           <header style={{ marginBottom: "85px" }}>
//             <Navbar />
//           </header>
//           <div style={{ minHeight: "100vh" }} className="container ">
//             {children}
//           </div>
//           <footer>
//             <Footer />
//           </footer>
//         </body>
//       </html>
//     </UserProvider>
//   );
// };
// export default RootLayout;
