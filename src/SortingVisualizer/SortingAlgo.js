export function mergeSort(array) {
  if (array.length === 1) return { animations: [], array };
  else {
    let cutPosition = Math.floor((array.length - 1) / 2);
    let animations = [];
    let sortedArray = array.slice();
    // console.log(array.slice());
    // let firstHalf = mergeSort(array.slice(0, cutPosition));
    // let secondHalf = mergeSort(array.slice(cutPosition, array.length));
    // let mergedArray = merge(firstHalf, secondHalf);
    mergeSortHelper(
      sortedArray,
      0,
      cutPosition,
      array.length - 1,
      array,
      animations
    );
    return { sortedArray, animations };
  }
}

const mergeSortHelper = (
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  helperArray,
  animations
) => {
  if (startIdx === endIdx) return;
  else {
    mergeSortHelper(
      mainArray,
      startIdx,
      Math.floor((middleIdx - startIdx) / 2) + startIdx,
      middleIdx,
      helperArray,
      animations
    );
    mergeSortHelper(
      mainArray,
      middleIdx + 1,
      Math.floor((endIdx - (middleIdx + 1)) / 2) + middleIdx + 1,
      endIdx,
      helperArray,
      animations
    );
    let mainArrayCopy = mainArray.slice();
    doMerge(mainArray, startIdx, middleIdx, endIdx, mainArrayCopy, animations);
  }
};

const doMerge = (
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  helperArray,
  animations
) => {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;

  while (i !== middleIdx + 1 && j !== endIdx + 1) {
    let animation = {};
    animation.compare = [i, j];
    // console.log(i, j);
    if (helperArray[i] < helperArray[j]) {
      animation.swap = [k, helperArray[i]];
      mainArray[k++] = helperArray[i++];
    } else {
      animation.swap = [k, helperArray[j]];
      //   console.log("helper", helperArray);
      mainArray[k++] = helperArray[j++];
      //   console.log("main", mainArray);
      //   mainArray[j++] = helperArray[k++];
    }
    animations.push(animation);
  }
  while (i !== middleIdx + 1) {
    let animation = {};
    animation.compare = [i, i];
    animation.swap = [k, helperArray[i]];
    mainArray[k++] = helperArray[i++];
    animations.push(animation);
  }
  while (j !== endIdx + 1) {
    let animation = {};
    animation.compare = [j, j];
    animation.swap = [k, helperArray[j]];
    mainArray[k++] = helperArray[j++];
    // mainArray[j++] = helperArray[k++];
    animations.push(animation);
  }
  //   console.log(mainArray.slice(startIdx, endIdx + 1));
};

// const merge = (array1, array2) => {
//   const newArray = [];
//   let pointer1 = 0;
//   let pointer2 = 0;
//   while (pointer1 !== array1.length && pointer2 !== array2.length) {
//     if (array1[pointer1] < array2[pointer2]) {
//       newArray.push(array1[pointer1]);
//       pointer1++;
//     } else {
//       newArray.push(array2[pointer2]);
//       pointer2++;
//     }
//   }
//   while (pointer1 !== array1.length) newArray.push(array1[pointer1++]);
//   while (pointer2 !== array2.length) newArray.push(array2[pointer2++]);
//   return newArray;
// };

export function heapSort(arr) {
  let n = arr.length;
  let animations = [];

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, animations);
  }

  // Heap sort
  for (let i = n - 1; i >= 0; i--) {
    let temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    animations.push({ swap: [0, i] });

    // Heapify root element
    heapify(arr, i, 0, animations);
  }

  return animations;
}

const heapify = (arr, n, i, animations) => {
  // Find largest among root, left child and right child
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;

  let animation = {};
  animation.compare = [];

  animation.compare.push = [l, largest];
  if (l < n && arr[l] > arr[largest]) largest = l;

  animation.compare.push = [r, largest];
  if (r < n && arr[r] > arr[largest]) largest = r;

  // Swap and continue heapifying if root is not largest
  if (largest !== i) {
    let swap = arr[i];
    animation.swap = [i, largest];

    arr[i] = arr[largest];
    arr[largest] = swap;

    animations.push(animation);
    heapify(arr, n, largest, animations);
  }
};

export function bubbleSort(arr) {
  const len = arr.length;
  const animations = [];

  for (let i = len - 1; i >= 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      let animation = {};
      // compare i and j
      animation.compare = [i, j];
      if (arr[i] < arr[j]) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        animation.swap = [i, j];
      }
      animations.push(animation);
    }
  }

  return { animations, arr };
}

export function quickSort(array) {
  const animations = [];
  partitionSortHelper(array, 0, array.length - 1, animations);
  return { array, animations };
}

const partitionSortHelper = (array, lowIdx, highIdx, animations) => {
  if (lowIdx >= highIdx) return;
  else {
    const partitionIdx = partition(array, lowIdx, highIdx, animations);

    partitionSortHelper(array, lowIdx, partitionIdx - 1, animations);
    partitionSortHelper(array, partitionIdx + 1, highIdx, animations);
  }
};

const partition = (array, lowIdx, highIdx, animations) => {
  if (lowIdx >= highIdx) return lowIdx;

  const pivot = array[highIdx];
  let leftmost = lowIdx - 1;

  for (let i = leftmost + 1; i < highIdx; i++) {
    const loopingVar = array[i];

    const animation = {};
    animation.compare = [i, highIdx];

    // if looping variable smaller than pivot, move it to left
    if (loopingVar < pivot) {
      leftmost++;
      const temp = array[leftmost];
      array[leftmost] = loopingVar;
      array[i] = temp;
      animation.swap = [leftmost, i];
    }

    animations.push(animation);
  }

  const animation = {};

  // swap pivot and array[leftmost]
  // array[leftmost] is the first variable larger than pivot
  leftmost++;
  const temp = array[leftmost];
  array[leftmost] = pivot;
  array[highIdx] = temp;

  animation.swap = [leftmost, highIdx];
  animations.push(animation);

  return leftmost;
};
