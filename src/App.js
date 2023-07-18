import "./App.css";
import React from "react";
import SortingVisualizer from "./SortingVisualizer/SortingVisualizer";
// import TopBar from "./TopBar";
// import RefreshArrayBtn from "./RefreshArrayBtn";

function App() {
  // function getRandom(min, max) {
  //   // inclusive
  //   return Math.floor(Math.random() * (max - min + 1) + min);
  // }

  // function resetArray() {
  //   const arr = [];
  //   for (let i = 0; i < 100; i++) {
  //     arr.push(getRandom(5, 400));
  //   }
  //   setArray(arr);
  //   window.SortingVisualizer1.setState({ array });
  //   window.SortingVisualizer2.setState({ array });
  // }

  // const newArray = [];
  // for (let i = 0; i < 100; i++) {
  //   newArray.push(getRandom(5, 400));
  // }

  // const [array, setArray] = React.useState(newArray);

  return (
    <div className="App">
      {/* <TopBar /> */}
      <SortingVisualizer
        ref={(sortingComponent) => {
          window.SortingVisualizer = sortingComponent;
        }}
        // array={array}
      />
      {/* <SortingVisualizer
        ref={(sortingComponent) => {
          window.SortingVisualizer2 = sortingComponent;
        }}
        array={array}
      /> */}
    </div>
  );
}

export default App;
