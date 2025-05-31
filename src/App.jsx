import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavLink from "./components/NavLink";
import { useState } from "react";

function App()
{
  const [selected, SetSelected] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="home"></Route>
      </Routes>

      <div className="w-dvw h-dvh flex justify-center items-center">
        <NavLink to={"home"} label={"HOME"} fontSize="clamp(0.5rem, 0.357rem + 0.714vw, 1rem)" selected={selected} onClick={() => SetSelected(!selected)}></NavLink>
      </div>
    </BrowserRouter>
  );
}

export default App;