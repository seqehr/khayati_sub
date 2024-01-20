export default function toPersianNumber(englishNumber) {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return String(englishNumber).replace(
    /\d/g,
    (match) => persianNumbers[parseInt(match)]
  );
}
