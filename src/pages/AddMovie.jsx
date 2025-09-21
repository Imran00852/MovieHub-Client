import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import toast from "react-hot-toast";
import { useCreateMovieMutation } from "../redux/api/api";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const [createMovie] = useCreateMovieMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error("Please fill all fields!");
      return;
    }
    setFormData({ title: "", description: "" });
    try {
      const res = await createMovie(formData);
      if (res.data) {
        toast.success(res.data?.msg);
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.response?.data?.msg);
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
        <Typography
          variant="h5"
          sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
        >
          Add New Movie
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          onSubmit={handleSubmit}
        >
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            variant="filled"
            size="small"
            sx={{
              input: { color: "#fff" },
              label: { color: "#fff" },
              backgroundColor: "#2c2c2c",
              borderRadius: 1,
            }}
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            variant="filled"
            multiline
            rows={4}
            sx={{
              input: { color: "#fff" },
              label: { color: "#fff" },
              backgroundColor: "#2c2c2c",
              borderRadius: 1,
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#ff3d00",
              "&:hover": { backgroundColor: "#e63900" },
            }}
          >
            Add Movie
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddMovie;
