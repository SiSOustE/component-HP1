// https://stackoverflow.com/questions/5915096/get-a-random-aitem-from-array
export const getRandomElementOfArray = (array) =>
  array[Math.floor(Math.random() * array.length)];

// https://css-tricks.com/snippets/javascript/random-hex-color/
export const getRandomHexColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);
