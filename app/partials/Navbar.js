"use client";
import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import swal from "sweetalert";
import { showSuccessMsg, showErrorMsg } from "../methods/alertMsgs";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  Hidden,
  useMediaQuery,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";

const Navbar = ({ auth, setAuth }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navbarStyle = {
    backgroundColor: "black",
    position: "fixed",
    top: 0,
    height: "65px",
    zIndex: 1000,
  };

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const menuItemStyle = {
    marginLeft: "1rem",
    fontFamily: "Roboto", // Example font: Roboto
    fontSize: "1rem", // Example font size: 1rem
  };

  const logOut = async () => {
    try {
      const confirmedLogOut = await swal({
        title: "Confirm to log out",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });

      if (confirmedLogOut) {
        const auth = getAuth();
        try {
          await signOut(auth);

          setAuth(null);
          //   navigate(window.location.pathname);
          window.location.href = "/";

          showSuccessMsg("Logged Out");
        } catch (error) {
          showErrorMsg(error.message);
        }
      }
    } catch (error) {
      showErrorMsg(error.message);
    }
  };

  const theme = createTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" style={navbarStyle}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Image
              className="mr-4 pr-2 logo-swing"
              width={60}
              height={50}
              src={"/logo"}
              alt="logo"
            />
            Young Blogger
          </Typography>
          {isMobileScreen ? (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ marginLeft: "auto" }}
            >
              {/* Replace the default menu icon with a custom icon */}
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              <Hidden smDown>
                <div style={menuItemStyle}>
                  <Typography variant="h6" component="div">
                    <Link className="text-white link" href={"/"}>
                      Home
                    </Link>
                  </Typography>
                </div>
                <div style={menuItemStyle}>
                  <Typography variant="h6" component="div">
                    <Link className="text-white link" href={"/blog/resources"}>
                      Resources
                    </Link>
                  </Typography>
                </div>
              </Hidden>
              {auth?.userId ? (
                <>
                  <div style={menuItemStyle}>
                    <Typography variant="h6" component="div">
                      <Link className="text-white link" href={"/blog/add-blog"}>
                        New Blog
                      </Link>
                    </Typography>
                  </div>
                  <div style={menuItemStyle}>
                    <Typography variant="h6" component="div">
                      <Link
                        className="text-white link"
                        href={`/user/${auth.username}`}
                      >
                        {auth.username}
                      </Link>
                    </Typography>
                  </div>
                  {auth.is_superuser && (
                    <div style={menuItemStyle}>
                      <Typography variant="h6" component="div">
                        <Link
                          className="text-white link"
                          href={"/blog/settings"}
                        >
                          settings
                        </Link>
                      </Typography>
                    </div>
                  )}

                  <div style={menuItemStyle}>
                    <Typography variant="h6" component="div">
                      <Link className="text-white link" onClick={logOut}>
                        Logout
                      </Link>
                    </Typography>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div style={menuItemStyle}>
                    <Typography variant="h6" component="div">
                      <Link className="text-white link" href={"/blog/login"}>
                        Login
                      </Link>
                    </Typography>
                  </div>
                  <div style={menuItemStyle}>
                    <Typography variant="h6" component="div">
                      <Link className="text-white link" href={"/blog/signup"}>
                        SignUp
                      </Link>
                    </Typography>
                  </div>
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Hidden mdUp>
        <Drawer anchor="bottom" open={openDrawer} onClose={toggleDrawer}>
          <List>
            <ListItemButton onClick={toggleDrawer}>
              <Typography variant="h6" component="div">
                <Link className="text-dark link" href={"/"}>
                  Home
                </Link>
              </Typography>
            </ListItemButton>
            <ListItemButton onClick={toggleDrawer}>
              <Typography variant="h6" component="div">
                <Link className="text-dark link" href={"/blog/resources"}>
                  Resources
                </Link>
              </Typography>
            </ListItemButton>
            {auth ? (
              <>
                <ListItemButton onClick={toggleDrawer}>
                  <Typography variant="h6" component="div">
                    <Link className="text-dark link" href={"/blog/add-blog"}>
                      New Blog
                    </Link>
                  </Typography>
                </ListItemButton>
                <ListItemButton onClick={toggleDrawer}>
                  <Typography variant="h6" component="div">
                    <Link className="text-dark link" href={"/blog/user/:id"}>
                      {auth.username}
                    </Link>
                  </Typography>
                </ListItemButton>
                {auth.is_superuser && (
                  <ListItemButton onClick={toggleDrawer}>
                    <Typography variant="h6" component="div">
                      <Link className="text-dark link" href={"/blog/settings"}>
                        Settings
                      </Link>
                    </Typography>
                  </ListItemButton>
                )}
                <ListItemButton onClick={toggleDrawer}>
                  <Typography variant="h6" component="div">
                    <Link className="text-dark link" onClick={logOut}>
                      Logout
                    </Link>
                  </Typography>
                </ListItemButton>
              </>
            ) : (
              <>
                <ListItemButton onClick={toggleDrawer}>
                  <Typography variant="h6" component="div">
                    <Link className="text-dark link" href={"/blog/login"}>
                      Login
                    </Link>
                  </Typography>
                </ListItemButton>
                <ListItemButton onClick={toggleDrawer}>
                  <Typography variant="h6" component="div">
                    <Link className="text-dark link" href={"/blog/signup"}>
                      SignUp
                    </Link>
                  </Typography>
                </ListItemButton>
              </>
            )}
          </List>
        </Drawer>
      </Hidden>
      {/* <Outlet />
      <Footer /> */}
    </ThemeProvider>
  );
};

export default Navbar;
