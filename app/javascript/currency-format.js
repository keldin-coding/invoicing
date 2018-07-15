const currencyFormat = num => {
  const stringified = num.toLocaleString(undefined, { currency: "USD" });

  const [integerPart, fractionalPart] = stringified.split(".");

  if (!fractionalPart) {
    return `$${integerPart}.00`;
  } else if (fractionalPart.length === 2) {
    return `$${integerPart}.${fractionalPart}`;
  } else if (fractionalPart.length > 2) {
    return `$${integerPart}.${fractionalPart.substr(0, 2)}`;
  } else if (fractionalPart.length < 2) {
    return `${integerPart}.${fractionalPart.padEnd("0")}`;
  }
}

export default currencyFormat;