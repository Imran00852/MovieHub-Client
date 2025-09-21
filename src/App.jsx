import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Login from "./pages/Login";
import AddMovie from "./pages/AddMovie";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import { server } from "./constants/config";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./redux/reducers/auth";
import { Box, CircularProgress } from "@mui/material";
import MovieDetails from "./pages/MovieDetails";
import Protectedroute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";

const App = () => {
  const { loading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${server}/api/v1/users/me`, { withCredentials: true })
      .then(({ data }) => dispatch(userExist(data?.user)))
      .catch(() => dispatch(userNotExist()));
  }, [dispatch]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#121212",
        }}
      >
        <CircularProgress sx={{ color: "#ff3d00" }} />
      </Box>
    );
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="" element={<Protectedroute user={user} redirect="/" />}>
          <Route path="/add-movie" element={<AddMovie />} />
          <Route path="/:id" element={<MovieDetails />} />
        </Route>

        <Route
          path="/login"
          element={
            <Protectedroute user={!user} redirect="/">
              <Login />
            </Protectedroute>
          }
        />
        <Route
          path="/admin"
          element={
            <Protectedroute user={user?.role === "admin"} redirect="/">
              <AdminDashboard />
            </Protectedroute>
          }
        />
      </Routes>
      <Toaster position="bottom-center" />
    </Router>
  );
};

export default App;
