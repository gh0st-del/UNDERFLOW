import TextOutline from "./components/TextOutline";

function App()
{
  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <TextOutline
        text={"will this work\nAnother line\nHere is another one looooong line\n4th line????"}
        fontSize={5}
        fontWeight={"bold"}
        outlineColor={"#156780"} 
        outlineWidth={3}
      ></TextOutline>
    </div>
  );
}

export default App;