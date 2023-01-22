/* eslint-disable prettier/prettier */

const getYears = function () {
  const startYear = 1983;
  var currentYear = new Date().getFullYear();
  var years = []
  for (var i = startYear; i <= currentYear; i++) {
    years.push(i);
  }
  return years;
}

const months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12"
];
const days = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31"
];

export default { years: getYears().reverse(), months, days };
