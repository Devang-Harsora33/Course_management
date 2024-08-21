// src/components/CoursesList.jsx

import React, { useEffect, useState } from "react";
import { fetchCourses, deleteCourse } from "../services/api";
import CreateCourse from "./CreateCourse";

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (err) {
        setError("Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };

    getCourses();
  }, []);

  const handleDelete = async (courseId) => {
    try {
      await deleteCourse(courseId);
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (err) {
      setError("Failed to delete course");
    }
  };

  const handleCourseCreated = (newCourse) => {
    setCourses([...courses, newCourse]);
  };

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <CreateCourse onCourseCreated={handleCourseCreated} />
      <h2>Courses List</h2>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            <strong>{course.title}</strong> - {course.course_code}
            <br></br>
            {course.description}
            <button onClick={() => handleDelete(course._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoursesList;
