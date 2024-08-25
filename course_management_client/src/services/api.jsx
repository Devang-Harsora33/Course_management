import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchCourses = async () => {
  const response = await api.get("/courses");
  return response.data;
};

// Fetch a single course by ID
export const fetchCourseById = async (courseId) => {
  const response = await api.get(`/courses/${courseId}`);
  return response.data;
};

// Create a new course
export const createCourse = async (courseData) => {
  const response = await api.post("/courses", courseData);
  return response.data;
};

// Delete a course by ID
export const deleteCourse = async (courseId) => {
  const response = await api.delete(`/courses/${courseId}`);
  return response.status === 204;
};

// Create a new instance
export const createInstance = async (instanceData) => {
  const response = await api.post("/instances", instanceData);
  console.log("created", instanceData);
  return response.data;
};

export const fetchInstances = async (year, semester) => {
  const response = await api.get(`/instances/${year}/${semester}`);
  return response.data;
};

// Fetch a specific instance
export const fetchInstance = async (year, semester, courseId) => {
  const response = await api.get(`/instances/${year}/${semester}/${courseId}`);
  return response.data;
};

// Delete an instance
export const deleteInstance = async (year, semester, courseId) => {
  const response = await api.delete(
    `/instances/${year}/${semester}/${courseId}`
  );
  return response.status === 204;
};
