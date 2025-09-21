import { Box, Button, Paper, Tab, Tabs, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { server } from "../constants/config";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExist, userNotExist } from "../redux/reducers/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/api/v1/users/login`,
        { email, password },
        { withCredentials: true }
      );
      if (data) {
        toast.success(data?.msg);
        dispatch(userExist(data?.user));
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.response?.data?.msg);
      dispatch(userNotExist());
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/api/v1/users/register`,
        { name, email, password },
        { withCredentials: true }
      );
      if (data) {
        toast.success(data?.msg);
        dispatch(userExist(data?.user));
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.response?.data?.msg);
      dispatch(userNotExist());
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
        p: 2,
      }}
    >
      <Paper
        sx={{ width: 400, p: 4, backgroundColor: "#1c1c1c", color: "#fff" }}
        elevation={10}
      >
        <Tabs
          value={tab}
          onChange={handleTabChange}
          textColor="inherit"
          indicatorColor="secondary"
          sx={{ mb: 3 }}
        >
          <Tab label="Login" sx={{ color: "#fff" }} />
          <Tab label="Signup" sx={{ color: "#fff" }} />
        </Tabs>

        {tab === 0 && (
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Email"
              variant="filled"
              size="small"
              required
              type="email"
              sx={{
                input: { color: "#fff" },
                label: { color: "#fff" },
                backgroundColor: "#2c2c2c",
                borderRadius: 1,
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="filled"
              required
              size="small"
              sx={{
                input: { color: "#fff" },
                label: { color: "#fff" },
                backgroundColor: "#2c2c2c",
                borderRadius: 1,
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ff3d00",
                "&:hover": { backgroundColor: "#e63900" },
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        )}

        {tab === 1 && (
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Name"
              variant="filled"
              required
              size="small"
              sx={{
                input: { color: "#fff" },
                label: { color: "#fff" },
                backgroundColor: "#2c2c2c",
                borderRadius: 1,
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email"
              variant="filled"
              size="small"
              sx={{
                input: { color: "#fff" },
                label: { color: "#fff" },
                backgroundColor: "#2c2c2c",
                borderRadius: 1,
              }}
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="filled"
              size="small"
              sx={{
                input: { color: "#fff" },
                label: { color: "#fff" },
                backgroundColor: "#2c2c2c",
                borderRadius: 1,
              }}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ff3d00",
                "&:hover": { backgroundColor: "#e63900" },
              }}
              onClick={handleSignup}
            >
              Signup
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Login;
