import React, { useState, useEffect } from "react";
import {
  fetchCourses,
  createCourse,
  createInstance,
  fetchInstances,
  deleteInstance,
} from "../services/api";
import CoursesList from "../components/CoursesList";
import CreateCourse from "../components/CreateCourse";
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const App2 = () => {
  const [courses, setCourses] = useState([]);
  const [years, setYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [instances, setInstances] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [newYear, setNewYear] = useState("");
  const [newSemester, setNewSemester] = useState("");
  const [selectedCourse, setSelectedCourse] = useState({
    title: "",
    course_code: "",
  });

  useEffect(() => {
    const loadData = async () => {
      const coursesData = await fetchCourses();
      setCourses(coursesData);

   
      const allInstances = await fetchInstances();
      const uniqueYears = [...new Set(allInstances.map((inst) => inst.year))];
      const uniqueSemesters = [
        ...new Set(allInstances.map((inst) => inst.semester)),
      ];

      setYears(uniqueYears);
      setSemesters(uniqueSemesters);
    };

    loadData();
  }, []);

  const handleCourseCreated = (newCourse) => {
    setCourses([...courses, newCourse]);
  };

  const handleSearchInstances = async () => {
    try {
      const searchResults = await fetchInstances(
        selectedYear,
        selectedSemester
      );
      console.log("Search Results:", searchResults); 
      setInstances(searchResults);
    } catch (error) {
      console.error("Error searching instances:", error);
    }
  };

  const handleCreateInstance = async () => {
    const instanceData = {
      year: newYear,
      semester: newSemester,
      title: selectedCourse.title, 
      course_id: selectedCourse.course_code, 
    };

    try {
      const newInstance = await createInstance(instanceData);
      setInstances([...instances, newInstance]);
    } catch (error) {
      console.error("Error creating instance:", error);
    }
  };

  const handleDelete = async (instanceId) => {
    try {
      await deleteInstance(instanceId);
      setInstances(instances.filter((instance) => instance._id !== instanceId));
    } catch (error) {
      console.error("Error deleting instance:", error);
    }
  };

  return (
    <main className="w-full p-6">
      <div className="w-full flex justify-center gap-x-[6rem] items-start text-blue-950">
        <CreateCourse onCourseCreated={handleCourseCreated} />
        <div className="flex justify-center items-start flex-col">
          <Typography variant="h4" gutterBottom>
            Add Instance
          </Typography>
          <TextField
            select
            label="Select Course Title"
            value={selectedCourse.title}
            onChange={(e) => {
              const selected = courses.find(
                (course) => course.title === e.target.value
              );
              setSelectedCourse({
                title: selected.title,
                course_code: selected.course_code, 
              });
            }}
            fullWidth
            style={{ marginBottom: "16px" }}
          >
            {courses.map((course) => (
              <MenuItem key={course._id} value={course.title}>
                {course.title}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Year"
            value={newYear}
            onChange={(e) => setNewYear(e.target.value)}
            fullWidth
            style={{ marginBottom: "16px" }}
          />
          <TextField
            label="Semester"
            value={newSemester}
            onChange={(e) => setNewSemester(e.target.value)}
            fullWidth
            style={{ marginBottom: "16px" }}
          />
          <Button
            onClick={handleCreateInstance}
            variant="contained"
            color="primary"
          >
            Add Instance
          </Button>
        </div>
      </div>
      <div className="text-blue-950">
        <Typography variant="h4" gutterBottom>
          Courses
        </Typography>
        <CoursesList />
        <div>
          <Typography variant="h4" gutterBottom>
            Search Instances
          </Typography>
          <div className=" flex justify-start items-center w-full">
            <TextField
              label="Year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              fullWidth
              style={{
                marginBottom: "16px",
                width: "15rem",
                marginRight: "3rem",
              }}
            />
            <TextField
              select
              label="Select Semester"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              fullWidth
              style={{
                marginBottom: "16px",
                width: "15rem",
                marginRight: "3rem",
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((semester) => (
                <MenuItem key={semester} value={semester}>
                  {semester}
                </MenuItem>
              ))}
            </TextField>
            <Button
              onClick={handleSearchInstances}
              variant="contained"
              color="primary"
              style={{ marginBottom: "1rem" }}
            >
              Search
            </Button>
          </div>
        </div>

        <Typography variant="h4" gutterBottom>
          Instances
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course Title</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Semester</TableCell>
                <TableCell>Course Code</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {instances.map((instance) => (
                <TableRow key={instance._id}>
                  <TableCell>{instance.course_title}</TableCell>
                  <TableCell>{instance.year}</TableCell>
                  <TableCell>{instance.semester}</TableCell>
                  <TableCell>{instance.course_id}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDelete(instance._id)}
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
      </div>
    </main>
  );
};

export default App2;
