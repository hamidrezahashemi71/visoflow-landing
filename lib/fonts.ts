import localFont from "next/font/local";

export const iranSans = localFont({
  src: [
    {
      path: "../app/assets/fonts/IRANSans-UltraLight-web.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../app/assets/fonts/IRANSans-Light-web.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../app/assets/fonts/IRANSans-web.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/assets/fonts/IRANSans-Medium-web.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../app/assets/fonts/IRANSans-Bold-web.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-iran-sans",
  display: "swap",
});
