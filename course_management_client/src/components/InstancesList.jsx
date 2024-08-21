// src/components/InstancesList.jsx

import React, { useEffect, useState } from "react";
import { fetchInstances, deleteInstance } from "../services/api";
import CreateInstance from "./CreateInstance";

const InstancesList = ({ year, semester }) => {
  const [instances, setInstances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getInstances = async () => {
      try {
        const data = await fetchInstances(year, semester);
        setInstances(data);
      } catch (err) {
        setError("Failed to fetch instances");
      } finally {
        setLoading(false);
      }
    };

    getInstances();
  }, [year, semester]);

  const handleDelete = async (courseId) => {
    try {
      await deleteInstance(year, semester, courseId);
      setInstances(
        instances.filter((instance) => instance.course_id !== courseId)
      );
    } catch (err) {
      setError("Failed to delete instance");
    }
  };

  const handleInstanceCreated = (newInstance) => {
    setInstances([...instances, newInstance]);
  };

  if (loading) return <p>Loading instances...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <CreateInstance onInstanceCreated={handleInstanceCreated} />
      <h2>
        Instances for Year {year}, Semester {semester}
      </h2>
      <ul>
        {instances.map((instance) => (
          <li key={instance._id}>
            Course ID: {instance.course_id}
            <button onClick={() => handleDelete(instance.course_id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstancesList;
