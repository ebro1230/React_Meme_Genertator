import "./App.css";
import { Routes, Route } from "react-router-dom";
import MemePage from "./components/MemePage";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<MemePage />} />
        <Route path="meme/:memeId" element={<MemePage />} />
      </Route>
    </Routes>
  );
}

export default App;
