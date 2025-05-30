import TextOutline from "./components/TextOutline";

function App()
{
  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <TextOutline 
        text={"will this work\nAnother line\nHere is another one lol\n4th line????"}
        fontSize={"5rem"} 
        outlineColor={"#156780"} 
        outlineWidth={3}
      ></TextOutline>
    </div>
  );
}

export default App;