import React, { useState } from "react";
import { createCourse } from "../services/api";
import { TextField, Button, Typography } from "@mui/material";

const CreateCourse = ({ onCourseCreated }) => {
  const [title, setTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCourse = {
        title,
        course_code: courseCode,
        description,
      };
      const createdCourse = await createCourse(newCourse);
      onCourseCreated(createdCourse);
      setTitle("");
      setCourseCode("");
      setDescription("");
    } catch (err) {
      setError("Failed to create course");
    }
  };

  return (
    <div className="flex justify-center items-start flex-col">
      <Typography variant="h4" gutterBottom>
        Create New Course
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "16px" }}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <TextField
            label="Course Code"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            required
            fullWidth
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            fullWidth
            multiline
            rows={4}
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Create Course
        </Button>
      </form>
    </div>
  );
};

export default CreateCourse;
