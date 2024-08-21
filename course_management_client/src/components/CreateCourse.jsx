// src/components/CreateCourse.jsx

import React, { useState } from "react";
import { createCourse } from "../services/api";

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
    <div>
      <h2>Create New Course</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Course Code:</label>
          <input
            type="text"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default CreateCourse;
