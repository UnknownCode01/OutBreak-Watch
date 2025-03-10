import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useRef } from "react";
import Index from "./components/Index";
import AddDisease from "./components/AddDisease";
import RemoveDisease from "./components/RemoveDisease";

const App = () => {
  return (
    <div>
      {/* <Router> */}
      <Routes>
        <Route path="/" element={<Index key="Index" />} />
        <Route path="/add_disease" element={<AddDisease key="AddDisease" />} />
        <Route
          path="/remove_disease"
          element={<RemoveDisease key="RemoveDisease" />}
        />
      </Routes>
      {/* </Router> */}
    </div>
  );
};

export default App;
