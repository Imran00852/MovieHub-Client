import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { server } from "../constants/config";
import toast from "react-hot-toast";
import { userNotExist } from "../redux/reducers/auth";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/users/logout`, {
        withCredentials: true,
      });
      if (data) {
        toast.success(data?.msg);
        dispatch(userNotExist());
      }
    } catch (err) {
      toast.error(err?.response?.data?.msg);
    }
  };

  const navItems = [
    { label: "Home", path: "/" },
    user
      ? { label: "Add Movie", path: "/add-movie" }
      : { label: "Movies", path: "/" },

    ...(user?.role === "admin" ? [{ label: "Dashboard", path: "/admin" }] : []),
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        boxShadow: "none",
        py: 1,
        px: { xs: 2, sm: 4 },
        backdropFilter: "blur(10px)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <MovieIcon sx={{ color: "#ff3d00", mr: 1, fontSize: 32 }} />
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              fontWeight: "bold",
              color: "#fff",
              letterSpacing: 2,
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Movie Hub
          </Typography>
        </Box>

        {/* Navigation */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {navItems.map((item) => (
            <Button
              key={item.label}
              component={Link}
              to={item.path}
              sx={{
                color: "#fff",
                fontWeight: 500,
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: "0%",
                  height: "2px",
                  left: 0,
                  bottom: -2,
                  bgcolor: "#ff3d00",
                  transition: "0.3s",
                },
                "&:hover::after": { width: "100%" },
                backgroundColor: "transparent",
                textTransform: "none",
                textDecoration: "none",
              }}
            >
              {item.label}
            </Button>
          ))}

          {/* Login/Logout Button */}
          {user ? (
            <Button
              component={Link}
              to="/login"
              sx={{
                color: "#ff3d00",
                fontWeight: "bold",
                border: "1px solid #ff3d00",
                borderRadius: "5px",
                px: 2,
                "&:hover": { backgroundColor: "#ff3d00", color: "#000" },
                textTransform: "none",
                textDecoration: "none",
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button
              component={Link}
              to="/login"
              sx={{
                color: "#ff3d00",
                fontWeight: "bold",
                border: "1px solid #ff3d00",
                borderRadius: "5px",
                px: 2,
                "&:hover": { backgroundColor: "#ff3d00", color: "#000" },
                textTransform: "none",
                textDecoration: "none",
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
