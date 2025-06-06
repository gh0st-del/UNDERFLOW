import DotBG from "./component/DotBG";

function App()
{
  return (
    <div className="w-dvw h-dvh flex justify-center items-center">
      <div className="w-1/2 h-1/2 border-2 border-[#0E0E0E]">
        <DotBG
          width="100%"
          height="100%"
          gridSize={20}
          radius={0.3}
          animSpeed={0.7}
        ></DotBG>
      </div>
    </div>
  );
}

export default App;