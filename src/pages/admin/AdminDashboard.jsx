import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useGetTopMoviesQuery,
  useDeleteAdminCommentMutation,
  useDeleteAdminMovieMutation,
} from "../../redux/api/api";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const { data, isLoading, isError } = useGetTopMoviesQuery();
  const [deleteMovie] = useDeleteAdminMovieMutation();
  const [deleteComment] = useDeleteAdminCommentMutation();

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
        <CircularProgress sx={{ color: "#ff3d00" }} />
      </Box>
    );
  }

  if (isError || !data?.topMovies?.length) {
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
        No movies found
      </Box>
    );
  }

  const handleDeleteMovie = async (id) => {
    try {
      await deleteMovie(id).unwrap();
      toast.success("Movie deleted!");
    } catch (err) {
      toast.error("Failed to delete movie");
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId).unwrap();
      toast.success("Comment deleted!");
    } catch (err) {
      toast.error("Failed to delete comment");
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        minHeight: "100vh",
        backgroundColor: "#121212",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
        Admin Dashboard
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {data.topMovies.map((movie) => (
          <Card
            key={movie._id}
            sx={{
              backgroundColor: "#1e1e1e",
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#fff" }}
                  >
                    {movie.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, color: "#ccc", mt: 0.5 }}
                  >
                    {movie.description}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#aaa",
                      fontStyle: "italic",
                      textTransform: "capitalize",
                    }}
                  >
                    Added by: {movie.added_by?.name || "Unknown"}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      mt: 1,
                      fontWeight: 500,
                      color: "#4caf50",
                    }}
                  >
                    Votes: {movie.score}
                  </Typography>
                </Box>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteMovie(movie._id)}
                  sx={{ mt: 0 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>

              <Divider sx={{ my: 2, borderColor: "#444" }} />

              <Typography
                variant="subtitle1"
                sx={{ mb: 1, fontWeight: 500, color: "#fff" }}
              >
                Comments:
              </Typography>
              <List sx={{ pl: 0 }}>
                {(movie.comments || []).length ? (
                  (movie.comments || []).map((c) => (
                    <ListItem
                      key={c._id}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          color="error"
                          onClick={() => handleDeleteComment(c._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                      sx={{ px: 0 }}
                    >
                      <ListItemText
                        primary={
                          <Typography sx={{ color: "#ccc" }}>
                            {c.body}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="caption" sx={{ color: "#aaa" }}>
                            — {c.user_id?.name || "Anonymous"}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))
                ) : (
                  <Typography sx={{ color: "#888", ml: 1 }}>
                    No comments
                  </Typography>
                )}
              </List>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
