const FA = "۰۱۲۳۴۵۶۷۸۹";

/** Convert Western digits in a string/number to Persian digits. */
export const faDigits = (v: string | number): string =>
  String(v).replace(/\d/g, (d) => FA[Number(d)]);

/** Format a number as Persian-grouped digits, e.g. ۱۲٬۴۰۰٬۰۰۰ */
export const faMoney = (n: number): string =>
  faDigits(Math.round(n).toLocaleString("en-US")).replace(/,/g, "٬");
