import { Box, Card, CardContent, Typography } from "@mui/material";
import { useGetMoviesQuery } from "../redux/api/api";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const { data, isLoading, isError, error } = useGetMoviesQuery();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); // get logged-in user

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Something went wrong!");
    }
  }, [error, isError]);

  if (isLoading) {
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
        <Typography sx={{ color: "#fff" }}>Loading...</Typography>
      </Box>
    );
  }

  if (!data?.movies?.length) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#121212",
          color: "#fff",
          fontSize: 24,
        }}
      >
        No movies yet
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        p: 3,
        justifyContent: "center",
        backgroundColor: "#121212",
        minHeight: "100vh",
      }}
    >
      {data.movies.map((movie) => (
        <Card
          key={movie._id}
          sx={{
            width: 300,
            backgroundColor: "#1c1c1c",
            color: "#fff",
            borderRadius: 3,
            transition: "transform 0.3s, box-shadow 0.3s",
            cursor: user ? "pointer" : "not-allowed",
            opacity: user ? 1 : 0.6,
            "&:hover": {
              transform: user ? "scale(1.05)" : "none",
              boxShadow: user ? "0 8px 24px rgba(255,255,255,0.2)" : "none",
            },
          }}
          onClick={() => {
            if (user) navigate(`/${movie._id}`);
            else toast.error("You must be logged in to view details!");
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              {movie.title}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: "#ccc" }}>
              {movie.description}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#aaa",
                fontStyle: "italic",
                letterSpacing: 0.5,
                textTransform: "capitalize",
              }}
            >
              Added by: {movie.added_by?.name || "Unknown"}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Home;
