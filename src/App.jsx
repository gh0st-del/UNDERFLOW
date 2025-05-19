import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          {/* 
            ...
            here another pages that belong to Applayout
            ...
          */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;