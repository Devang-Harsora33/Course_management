import React, { useState, useEffect } from "react";
import {
  fetchCourses,
  createCourse,
  createInstance,
  fetchInstances,
} from "./services/api";
import CoursesList from "./components/CoursesList";

const App = () => {
  const [courses, setCourses] = useState([]);
  const [years, setYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [instances, setInstances] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [newCourseId, setNewCourseId] = useState("");
  const [newYear, setNewYear] = useState("");
  const [newSemester, setNewSemester] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const coursesData = await fetchCourses();
      setCourses(coursesData);

      // Fetch all instances to populate year and semester dropdowns
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

  const handleSearchInstances = async () => {
    const searchResults = await fetchInstances(selectedYear, selectedSemester);
    setInstances(searchResults);
  };

  const handleCreateInstance = async () => {
    const instanceData = {
      year: newYear,
      semester: newSemester,
      course_id: newCourseId,
    };

    const newInstance = await createInstance(instanceData);
    setInstances([...instances, newInstance]); // Update instances list
  };

  return (
    <div>
      <h1>Courses</h1>
      <CoursesList />
      <h1>Search Instances</h1>
      <select
        onChange={(e) => setSelectedYear(e.target.value)}
        value={selectedYear}
      >
        <option value="">Select Year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => setSelectedSemester(e.target.value)}
        value={selectedSemester}
      >
        <option value="">Select Semester</option>
        {semesters.map((semester) => (
          <option key={semester} value={semester}>
            {semester}
          </option>
        ))}
      </select>

      <button onClick={handleSearchInstances}>Search</button>

      <h1>Instances</h1>
      <ul>
        {instances.map((instance) => (
          <li key={instance._id}>
            Year: {instance.year}, Semester: {instance.semester}, Course ID:{" "}
            {instance.course_id}
          </li>
        ))}
      </ul>

      <h2>Add Instance</h2>
      <input
        type="text"
        placeholder="Course ID"
        value={newCourseId}
        onChange={(e) => setNewCourseId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Year"
        value={newYear}
        onChange={(e) => setNewYear(e.target.value)}
      />
      <input
        type="text"
        placeholder="Semester"
        value={newSemester}
        onChange={(e) => setNewSemester(e.target.value)}
      />
      <button onClick={handleCreateInstance}>Add Instance</button>
    </div>
  );
};

export default App;
