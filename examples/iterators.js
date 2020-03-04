/*
 * Examples of .forEach()
 *
 */
const artists = ['Picasso', 'Kahlo', 'Matisse', 'Utamaro'];

artists.forEach(artist => {
  console.log(artist + ' is one of my favorite artists.');
});

const numbers = [1, 2, 3, 4, 5];

const squareNumbers = numbers.map(number => {
  return number * number;
});

console.log(squareNumbers);

const fruits = ['mango', 'papaya', 'pineapple', 'apple'];
// Iterate over fruits below
// The callback function is an arrow function has a single parameter, fruit.
fruits.forEach(fruit => console.log('I want to eat a '+ fruit));


/*
 * Examples of .map()
 */
const animals = ['Hen', 'elephant', 'llama', 'leopard', 'ostrich', 'Whale', 'octopus', 'koala', 'rabbit', 'lion', 'dog'];

// Create the secretMessage array below
const secretMessage = animals.map(animal => animal[0])

console.log(secretMessage.join(''));

const bigNumbers = [100, 200, 300, 400, 500];

// Create the smallNumbers array below
const tinyNumbers = bigNumbers.map(number => number/100)
console.log(tinyNumbers);


/*
 * Examples of .filter()
 */
const things = ['desk', 'chair', 5, 'backpack', 3.14, 100];

const onlyNumbers = things.filter(thing => {
  return typeof thing === 'number';
});

console.log(onlyNumbers);


const randomNumbers = [375, 200, 3.14, 7, 13, 852];
// Call .filter() on randomNumbers below
const smallNumbers = randomNumbers.filter(number => number < 250)
console.log(smallNumbers);

const favoriteWords = ['nostalgia', 'hyperbole', 'fervent', 'esoteric', 'serene'];

// Call .filter() on favoriteWords below
const longFavoriteWords = favoriteWords.filter(word => word.length > 7)
console.log(longFavoriteWords);

/*
 * Examples of .findIndex()
 */
const foundAnimal = animals.findIndex(animal => animal == 'koala')
console.log(animals[foundAnimal]);

const startsWithS = animals.findIndex(animal => animal.startsWith('r'))
console.log(startsWithS);


/*
 * Examples of .reduce()
 */
const newNumbers = [1, 3, 5, 7];

const newSum = newNumbers.reduce((accumulator, currentValue) => {
  console.log('The value of accumulator: ',accumulator);
  console.log('The value of currentValue: ', currentValue);
  return accumulator + currentValue;
}, 10); // The starting accumulator value is set to 10 here.
console.log(newSum);


/*
 * Random use of .some(), .every(), and .filter()
 */
const words = ['unique', 'uncanny', 'pique', 'oxymoron', 'guise'];
console.log(words.some((word) => {
  return word.length < 6;
}));

// Use filter to create a new array
const interestingWords = words.filter(word => word.length > 5);

console.log(interestingWords.every((word) => { return word.length > 5 } ));

/* 
 * Random examples.
 */
const cities = ['Orlando', 'Houston', 'Naples', 'Boston', 'Roanoke', 'Oceanside', 'Waco', 'Nashville'];

const nums = [1, 50, 75, 200, 350, 525, 1000];

//  a method that will return undefined
cities.forEach(city => console.log('Have you visited ' + city + '?'));

// a method that will return a new array
const longCities = cities.filter(city => city.length > 7);

// a method that will return a single value
const word = cities.reduce((acc, currVal) => {
  return acc + currVal[0]
}, "J");

console.log(word)

// a method that will return a new array
const smallerNums = nums.map(num => num - 5);

// a method that will return a boolean value
nums.some(num => num < 0);
