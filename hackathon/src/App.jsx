import { Routes, Route } from "react-router-dom";
import LandingPage from "./Components/landingPage.jsx";
import ResultPage from "./Components/ResultPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/results" element={<ResultPage />} />
    </Routes>
  );
}