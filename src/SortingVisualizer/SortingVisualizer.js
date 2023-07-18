import React, { Component } from "react";
import "./SortingVisualizer.css";
import { mergeSort, heapSort, bubbleSort, quickSort } from "./SortingAlgo";

export default class SortingVisualizer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      isSorted: false,
      speed: 8,
      timeOut: 0,
      arrayLength: 100,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push(getRandom(5, 400));
    }
    this.setState({
      array,
      isSorted: false,
    });

    const sec_text = document.getElementsByClassName("second");
    const tenth_of_sec_text =
      document.getElementsByClassName("tenth_of_second");
    const centisec_text = document.getElementsByClassName("centisecond");

    sec_text[0].innerHTML = 0;
    tenth_of_sec_text[0].innerHTML = 0;
    centisec_text[0].innerHTML = 0;
  }

  mergeSort() {
    if (!this.state.isSorted) {
      const timeinterval = this.countUpTimer();
      const { animations } = mergeSort(this.state.array);
      // this.setState({ array: sortedArray });

      const swapArray1 = animations.map((animation) => animation.swap);
      const bars = document.getElementsByClassName("bar");

      // const swapArray2 = animations.map((animation) => animation.swap);
      // const compareArray = animations.map((animation) => animation.compare);
      // console.log(swapArray1);
      // console.log(compareArray);

      for (let i = 0; i < swapArray1.length; i++) {
        setTimeout(() => {
          const [barIdx, newHeight] = swapArray1[i];
          bars[barIdx].style.height = `${newHeight}px`;
          // this.setState({ array: newArray });
        }, i * this.state.speed);
      }

      this.setButtonTimeout(swapArray1, timeinterval);
    }
  }

  heapSort() {
    if (!this.state.isSorted) {
      const timeinterval = this.countUpTimer();

      const animations = heapSort(this.state.array);
      const swapArray = animations.map((animation) => animation.swap);
      const bars = document.getElementsByClassName("bar");

      for (let i = 0; i < swapArray.length; i++) {
        setTimeout(() => {
          const barIdx1 = swapArray[i][0];
          const barIdx2 = swapArray[i][1];

          const height1 = bars[barIdx1].style.height;
          const height2 = bars[barIdx2].style.height;

          bars[barIdx1].style.height = height2;
          bars[barIdx2].style.height = height1;
        }, i * this.state.speed);
      }

      this.setButtonTimeout(swapArray, timeinterval);
    }
  }

  bubbleSort() {
    if (!this.state.isSorted) {
      const timeinterval = this.countUpTimer();

      const { animations } = bubbleSort(this.state.array);
      const swapArray = [];

      for (let i = 0; i < animations.length; i++) {
        const swap = animations[i].swap;
        if (swap) {
          swapArray.push(swap);
        }
      }
      const bars = document.getElementsByClassName("bar");

      for (let i = 0; i < swapArray.length; i++) {
        setTimeout(() => {
          const barIdx1 = swapArray[i][0];
          const barIdx2 = swapArray[i][1];

          const height1 = bars[barIdx1].style.height;
          const height2 = bars[barIdx2].style.height;

          bars[barIdx1].style.height = height2;
          bars[barIdx2].style.height = height1;
        }, i * this.state.speed);
      }
      this.setButtonTimeout(swapArray, timeinterval);
    }
  }
  quickSort() {
    if (!this.state.isSorted) {
      const timeinterval = this.countUpTimer();

      const { animations } = quickSort(this.state.array);
      const swapArray = [];
      const bars = document.getElementsByClassName("bar");

      for (let i = 0; i < animations.length; i++) {
        if (animations[i].swap) swapArray.push(animations[i].swap);
      }

      for (let i = 0; i < swapArray.length; i++) {
        setTimeout(() => {
          const barIdx1 = swapArray[i][0];
          const barIdx2 = swapArray[i][1];

          const height1 = bars[barIdx1].style.height;
          const height2 = bars[barIdx2].style.height;

          bars[barIdx1].style.height = height2;
          bars[barIdx2].style.height = height1;
        }, i * this.state.speed);
      }
      this.setButtonTimeout(swapArray, timeinterval);
    }
  }

  setButtonTimeout(swapArray, timeinterval) {
    const buttons = document.getElementsByClassName("button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].className = buttons[i].className + " unusable";
    }
    setTimeout(() => {
      // this.setState({ array: sortedArray });
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].className = buttons[i].className.replace(" unusable", "");
      }
      this.setState({ isSorted: true });
      clearInterval(timeinterval);
    }, (swapArray.length - 1) * this.state.speed);
  }

  countUpTimer() {
    let sec = 1;
    let tenth_sec = 1;
    let centisec = 1;
    const sec_text = document.getElementsByClassName("second");
    const tenth_of_sec_text =
      document.getElementsByClassName("tenth_of_second");
    const centisec_text = document.getElementsByClassName("centisecond");

    const timeinterval = setInterval(() => {
      if (centisec < 9) {
        centisec_text[0].innerHTML = centisec++;
      } else if (tenth_sec < 9) {
        centisec = 0;
        centisec_text[0].innerHTML = centisec;
        tenth_of_sec_text[0].innerHTML = tenth_sec++;
      } else {
        centisec = 0;
        centisec_text[0].innerHTML = centisec;
        tenth_sec = 0;
        tenth_of_sec_text[0].innerHTML = tenth_sec;
        sec_text[0].innerHTML = sec++;
      }
    }, 10);

    return timeinterval;
  }

  render() {
    const { array } = this.state;

    return (
      <>
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
        <div className="border">
          {array.map((value, idx) => (
            <div className="bar" key={idx} style={{ height: `${value}px` }}>
              {/* {value} */}
            </div>
          ))}
          {/* <button onClick={() => this.resetArray()}>Refresh array</button>
        <button onClick={() => this.mergeSort()}>Merge sort</button>
        <button onClick={() => this.heapSort()}>Heap sort</button>
        <button onClick={() => this.quickSort()}>Quick sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble sort</button> */}
        </div>
        <div className="timer">
          <div className="second">0</div>
          <div>&nbsp;:&nbsp;</div>
          <div className="tenth_of_second">0</div>
          <div className="centisecond">0</div>
        </div>
      </>
    );
  }
}

function getRandom(min, max) {
  // inclusive
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// function arraysAreEqual(arr1, arr2) {
//   if (arr1.length !== arr2.length) return false;

//   for (let i = 0; i < arr1.length; i++) {
//     if (arr1[i] !== arr2[i]) return false;
//   }
//   return true;
// }
