import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Landing from "./pages/Landing.jsx";
import Questionnaire from "./pages/Questionnaire.jsx";
import Results from "./pages/Results.jsx";
import ShareView from "./pages/ShareView.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Landing />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/results/:sessionId" element={<Results />} />
        <Route path="/share/:shareId" element={<ShareView />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}

