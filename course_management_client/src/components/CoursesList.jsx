import React, { useEffect, useState } from "react";
import { fetchCourses, deleteCourse } from "../services/api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Typography,
} from "@mui/material";

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

  if (loading) return <Typography>Loading courses...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" gutterBottom style={{ padding: "16px" }}>
        Courses List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Course Code</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course._id}>
              <TableCell>{course.title}</TableCell>
              <TableCell>{course.course_code}</TableCell>
              <TableCell>{course.description}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleDelete(course._id)}
                  variant="contained"
                  color="primary"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CoursesList;
