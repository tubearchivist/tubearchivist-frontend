/**
 * Appends a letter depending on the size of the number
 * @param number A number or string number
 * @returns A number string with an appropriate letter appended
 */
export function formatNumbers(number: string): string {
  var numberUnformatted = parseFloat(number);
  if (numberUnformatted > 999999999) {
    var numberFormatted =
      (numberUnformatted / 1000000000).toFixed(1).toString() + "B";
  } else if (numberUnformatted > 999999) {
    var numberFormatted =
      (numberUnformatted / 1000000).toFixed(1).toString() + "M";
  } else if (numberUnformatted > 999) {
    var numberFormatted =
      (numberUnformatted / 1000).toFixed(1).toString() + "K";
  } else {
    var numberFormatted = numberUnformatted.toString();
  }
  return numberFormatted;
}
