const isToday = (someDate) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

const isYesterday = (someDate) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() - 1 &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

export const getFormattedDate = (rawDate) => {
  const date = new Date(rawDate);

  if (isToday(date)) {
    return 'Today';
  } else if (isYesterday(date)) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }
};

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export const getFormattedCurrency = (amount) =>
  currencyFormatter.format(makePositive(amount));

const colorMap = {
  salary: 'green',
  cash: 'yellow',
  bank: 'blue',
  interest: 'red',
  gift: 'pink',
  dividends: 'orange',
  other: 'violet',
  bills: 'red',
  grocery: 'orange',
  food: 'yellow',
  home: 'amber',
  transport: 'lime',
  personal: 'green',
  insurance: 'emerald',
  shopping: 'teal',
  banking: 'cyan',
  occasion: 'sky',
  vacation: 'blue',
  healthcare: 'indigo',
  childcare: 'violet',
  petcare: 'purple',
  recreational: 'fuchsia',
  taxes: 'pink',
};

export const colorPicker = (category) => {
  return colorMap[category];
};

export const makePositive = (num) => (num >= 0 ? num : -num);

export const toTitleCase = (sentence) =>
  sentence.charAt(0).toUpperCase() + sentence.substr(1).toLowerCase();
