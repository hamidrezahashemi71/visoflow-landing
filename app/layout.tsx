import type { Metadata } from "next";
import "./globals.css";
import { iranSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "ویزو — چقدر از درآمد سالن شما قربانی نوبت‌های نیامده می‌شود؟",
  description:
    "در ۳ دقیقه ارزیابی رایگان، برآورد درآمد ازدست‌رفته از نوبت‌های نیامده، مقایسه با کسب‌وکارهای مشابه و سه راهکار عملی دریافت کنید. ویژه مدیران کلینیک‌ها و سالن‌های زیبایی.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={iranSans.variable}>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
