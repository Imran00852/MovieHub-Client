import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetSingleMovieQuery,
  useUpdateCommentMutation,
  useVoteMovieMutation,
} from "../redux/api/api";

const MovieDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError, refetch } = useGetSingleMovieQuery(id);
  const movie = data?.movie;
  const comments = data?.comments || [];
  const upvotes = data?.upvotes || 0;
  const downvotes = data?.downvotes || 0;
  const userVote = data?.userVote || 0;

  const [voteMovie] = useVoteMovieMutation();
  const [createComment] = useCreateCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const [comment, setComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const { user } = useSelector((state) => state.auth);
  const currentUserId = user?._id;

  // Voting
  const handleVote = async (type) => {
    try {
      await voteMovie({ movieId: id, vote_type: type }).unwrap();
      refetch();
    } catch (err) {
      toast.error("Error voting");
      console.error(err);
    }
  };

  // Comments
  const handleAddComment = async () => {
    if (!comment.trim()) return;
    try {
      await createComment({ movieId: id, data: { body: comment } }).unwrap();
      setComment("");
      refetch();
      toast.success("Comment added!");
    } catch (err) {
      toast.error("Failed to add comment");
      console.error(err);
    }
  };

  const handleEditStart = (c) => {
    setEditingId(c._id);
    setEditValue(c.body);
  };

  const handleEditSave = async () => {
    if (!editValue.trim()) return;
    try {
      await updateComment({
        commentId: editingId,
        data: { body: editValue },
      }).unwrap();
      setEditingId(null);
      setEditValue("");
      refetch();
      toast.success("Comment updated!");
    } catch (err) {
      toast.error("Failed to update comment");
      console.error(err);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment({ commentId }).unwrap();
      refetch();
      toast.success("Comment deleted!");
    } catch (err) {
      toast.error("Failed to delete comment");
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
        }}
      >
        Loading...
      </Box>
    );
  }

  if (isError || !movie) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
        }}
      >
        Movie not found
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 4,
        backgroundColor: "#121212",
        color: "#fff",
      }}
    >
      <Typography variant="h4" gutterBottom>
        {movie.title}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {movie.description}
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 2, color: "#bbb" }}>
        Added by: {movie.added_by?.name || "Unknown"}
      </Typography>

      {/* Voting */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <IconButton
          onClick={() => handleVote(1)}
          sx={{ color: userVote === 1 ? "#4caf50" : "#888" }}
        >
          <ThumbUpIcon />
        </IconButton>
        <Typography>{upvotes}</Typography>
        <IconButton
          onClick={() => handleVote(-1)}
          sx={{ color: userVote === -1 ? "#f44336" : "#888" }}
        >
          <ThumbDownIcon />
        </IconButton>
        <Typography>{downvotes}</Typography>
      </Box>

      {/* Add Comment */}
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{
            backgroundColor: "#1c1c1c",
            input: { color: "#fff" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#555" },
          }}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddComment}
        >
          Comment
        </Button>
      </Box>

      {/* Comments list */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {comments.length === 0 && <Typography>No comments yet.</Typography>}
        {comments.map((c) => {
          const isOwner = c.user_id?._id === currentUserId;
          return (
            <Card
              key={c._id}
              sx={{ backgroundColor: "#1c1c1c", color: "#fff" }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  {editingId === c._id ? (
                    <>
                      <TextField
                        fullWidth
                        size="small"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        sx={{
                          backgroundColor: "#2c2c2c",
                          input: { color: "#fff" },
                        }}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 1 }}
                        onClick={handleEditSave}
                      >
                        Save
                      </Button>
                    </>
                  ) : (
                    <>
                      <Typography>{c.body}</Typography>
                      <Typography variant="caption" sx={{ color: "#bbb" }}>
                        — {c.user_id?.name || "Anonymous"}
                      </Typography>
                    </>
                  )}
                </Box>
                {isOwner && (
                  <Box>
                    <IconButton
                      color="primary"
                      onClick={() =>
                        editingId === c._id
                          ? setEditingId(null)
                          : handleEditStart(c)
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(c._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default MovieDetails;
