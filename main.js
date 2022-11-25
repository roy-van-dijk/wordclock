const grid = document.getElementById('grid');
const letters = 'itlisasampmacquarterdctwentyfivexhalfstenftopasterunineonesixthreefourfivetwoeightelevenseventwelvetenseoclock'.split('');

letters.forEach(letter => {
  const letterElement = document.createElement('div');
  letterElement.classList.add('letter');
  letterElement.textContent = letter;
  grid.appendChild(letterElement);
});

const letterElements = document.querySelectorAll('.letter');
const wordIndices = {
  1: [55, 56, 57],
  2: [74, 75, 76],
  3: [61, 62, 63, 64, 65],
  4: [66, 67, 68, 69],
  5: [70, 71, 72, 73],
  6: [58, 59, 60],
  7: [61, 62, 63, 64, 65],
  8: [77, 78, 79, 80, 81],
  9: [51, 52, 53, 54],
  10: [99, 100, 101],
  11: [82, 83, 84, 85, 86, 87],
  12: [93, 94, 95, 96, 97, 98],
  it: [0, 1],
  is: [3, 4],
  a: [11],
  to: [42, 43],
  am: [7, 8],
  pm: [9, 10],
  oclock: [104, 105, 106, 107, 108, 109],
  past: [44, 45, 46, 47],
  prefixHalf: [33, 34, 35, 36],
  prefixFive: [28, 29, 30, 31],
  prefixTen: [38, 39, 40],
  prefixQuarter: [13, 14, 15, 16, 17, 18, 19],
  prefixTwenty: [22, 23, 24, 25, 26, 27],
};

const lightUp = (words) => {
  const indicesToLight = words.map(word => wordIndices[word]).flat();
  letterElements.forEach((letterElement, i) => {
    if (indicesToLight.includes(i)) {
      letterElement.classList.add('active');
    }
  });
}

const formatDate = (date) => {
    const hours = date.getHours();
    let minutes = date.getMinutes();

    const steps = {
        0:  ['oclock'],
        1:  ['prefixFive', 'past'],
        2:  ['prefixTen', 'past'],
        3:  ['prefixQuarter', 'a', 'past'],
        4:  ['prefixTwenty', 'past'],
        5:  ['prefixTwenty', 'prefixFive', 'past'],
        6:  ['half', 'past'],
        7:  ['prefixTwenty', 'prefixFive', 'to'],
        8:  ['prefixTwenty', 'to'],
        9:  ['prefixQuarter', 'a', 'to'],
        10: ['prefixTen', 'to'],
        11: ['prefixFive', 'to'],
        12: ['oclock'],
    }

    const step = Math.round(minutes / 5);
    const currentSteps = steps[step];

    const standardTime = currentSteps.includes('to') ? hours + 1 : hours;
    currentSteps.push((standardTime % 12).toString());
    currentSteps.push('it', 'is');
    // currentSteps.push(hours > 12 ? 'pm': 'am');

    return currentSteps;
}

const updateClock = () => {
  const date = new Date();
  lightUp(formatDate(date));
}

updateClock();
setInterval(updateClock, 150_000);
