/**
 * Central place for campaign configuration.
 * Swap QUIZ_URL for your Porsline / Formaloo / custom quiz link.
 * Append UTM params per acquisition channel when sharing the page.
 */
export const QUIZ_URL = "#quiz"; // TODO: replace with the real quiz URL

export const SITE = {
  name: "ویزو",
  tagline: "سامانه یادآوری نوبت برای کلینیک‌ها و سالن‌های زیبایی",
  year: "۱۴۰۵",
} as const;

/**
 * Parent (mother) company. Viso is a product of Architech Group.
 * TODO: fill REGISTER_NO with Architech's real شماره ثبت.
 */
export const ARCHITECH = {
  name: "گروه آرکیتک",
  nameEn: "Architech Group",
  url: "https://www.architechgroup.ir",
  registerNo: "673489", // TODO: شماره ثبت شرکت آرکیتک
  productLine: "ویزو محصولی از گروه آرکیتک است.",
} as const;

/** Contact details surfaced in the footer. Update with real values. */
export const CONTACT: {
  email: string;
  phone: string;
  address: string;
} = {
  email: "info@architechgroup.ir",
  phone: "تهران - ایران", // optional, e.g. "۰۲۱-۱۲۳۴۵۶۷۸"
  address: "02138920998", // optional
};

/** Footer quick links — anchors map to section ids on the landing page. */
export const FOOTER_LINKS = [
  { label: "ابعاد ضرر", href: "#calculator" },
  { label: "داخل گزارش", href: "#report" },
  { label: "مراحل کار", href: "#how" },
  { label: "سؤال‌های متداول", href: "#faq" },
] as const;
