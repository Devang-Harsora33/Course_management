// src/components/CreateInstance.jsx

import React, { useState } from "react";
import { createInstance } from "../services/api";

const CreateInstance = ({ onInstanceCreated }) => {
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [courseId, setCourseId] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newInstance = {
        year: parseInt(year),
        semester: parseInt(semester),
        course_id: parseInt(courseId),
      };
      const createdInstance = await createInstance(newInstance);
      onInstanceCreated(createdInstance);
      setYear("");
      setSemester("");
      setCourseId("");
    } catch (err) {
      setError("Failed to create instance");
    }
  };

  return (
    <div>
      <h2>Create New Instance</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Year:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Semester:</label>
          <input
            type="number"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Course ID:</label>
          <input
            type="number"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Instance</button>
      </form>
    </div>
  );
};

export default CreateInstance;
