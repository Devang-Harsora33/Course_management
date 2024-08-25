import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App2 from "./pages/Main";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App2 />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
