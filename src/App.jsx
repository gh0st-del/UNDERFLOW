import DotBG from "./component/DotBG";

function App()
{
  return (
    <div className="w-dvw h-dvh flex justify-center items-center">
      <DotBG
        width="50%"
        height="50%"
        gridSize={80}
        radius={0.3}
        animSpeed={0.7}
      ></DotBG>
    </div>
  );
}

export default App;