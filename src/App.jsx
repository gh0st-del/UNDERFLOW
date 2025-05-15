import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavLink from "./components/NavLink";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="home"></Route>
      </Routes>

      <NavLink to={"home"} label={"HOME"} horizontalPadding={2} fontSize={2}></NavLink>
    </BrowserRouter>
  );
}

export default App;