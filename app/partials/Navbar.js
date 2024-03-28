"use client";
import React, { useState, useEffect, useCallback } from "react";
import { getAuth, signOut } from "firebase/auth";
import swal from "sweetalert";
import { showSuccessMsg, showErrorMsg } from "../utils/alertMsgs";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../utils/authProvider";

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { user, setUser } = useAuth();
  const router = useRouter();
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

  const fetchUserDetails = useCallback(async () => {
    try {
      const cookies = document.cookie
        .split(";")
        .map((cookie) => cookie.trim().split("="));
      const accessToken = cookies.find(
        ([cookieName]) => cookieName === "accessToken"
      )?.[1];

      if (!accessToken) {
        setUser(null);
        return;
      }

      const res = await fetch(baseURL + "/api/user", {
        headers: { Authorization: `Bearer ${accessToken}` },
        method: "GET",
      });

      const response = await res.json();
      console.log("Response ", response);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, [setUser]);

  const logOut = async () => {
    try {
      const confirmedLogOut = await swal({
        title: "Confirm to log out",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });

      if (confirmedLogOut) {
        try {
          setUser(null);
          router.push("/");
          document.cookie =
            "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie =
            "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

          showSuccessMsg("Logged Out");
        } catch (error) {
          showErrorMsg(error.message);
        }
      }
    } catch (error) {
      showErrorMsg(error.message);
    }
  };

  // useEffect(() => fetchUserDetails(), [fetchUserDetails]);

  const theme = createTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" style={navbarStyle}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* <Image
              className="mr-4 pr-2 logo-swing"
              width={60}
              height={50}
              src={"/logo"}
              alt="logo"
            /> */}
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
              {user ? (
                <>
                  <div style={menuItemStyle}>
                    <Typography variant="h6" component="div">
                      <Link className="text-white link" href={"/blog/new"}>
                        New Blog
                      </Link>
                    </Typography>
                  </div>
                  <div style={menuItemStyle}>
                    <Typography variant="h6" component="div">
                      <Link
                        className="text-white link"
                        href={`/blog/users/${user._id}`}
                      >
                        {user.username}
                      </Link>
                    </Typography>
                  </div>
                  {user.is_superuser && (
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
                      <Button onClick={logOut} className="text-white link">
                        Logout
                      </Button>
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
            {user ? (
              <>
                <ListItemButton onClick={toggleDrawer}>
                  <Typography variant="h6" component="div">
                    <Link className="text-dark link" href={"/blog/new"}>
                      New Blog
                    </Link>
                  </Typography>
                </ListItemButton>
                <ListItemButton onClick={toggleDrawer}>
                  <Typography variant="h6" component="div">
                    <Link
                      className="text-dark link"
                      href={`/blog/users/${user._id}`}
                    >
                      {user.username}
                    </Link>
                  </Typography>
                </ListItemButton>
                {user.is_superuser && (
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
                    <Button onClick={logOut} className="text-dark link">
                      Logout
                    </Button>
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
    </ThemeProvider>
  );
};

export default Navbar;
