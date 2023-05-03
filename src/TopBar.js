import React, { useEffect } from "react";
import SortingVisualizer from "./SortingVisualizer/SortingVisualizer";

export default function TopBar(props) {
  //   const [isSorting, setIsSorting] = React.useState(true);

  return (
    <div className="top-bar">
      <div
        className="button"
        onClick={() => {
          window.SortingVisualizer.resetArray();
        }}
      >
        Reset array
      </div>
      <div
        className="button"
        onClick={() => {
          window.SortingVisualizer.mergeSort();
        }}
      >
        Merge sort
      </div>
      <div
        className="button"
        onClick={() => {
          window.SortingVisualizer.heapSort();
        }}
      >
        Heap sort
      </div>
      <div
        className="button"
        onClick={() => {
          window.SortingVisualizer.quickSort();
        }}
      >
        Quick sort
      </div>
      <div
        className="button"
        onClick={() => {
          window.SortingVisualizer.bubbleSort();
        }}
      >
        bubble sort
      </div>
    </div>
  );
}
