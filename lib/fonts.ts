import localFont from "next/font/local";

export const iranSans = localFont({
  src: [
    {
      path: "../app/assets/fonts/IranSans-thin-100.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "../app/assets/fonts/IranSans-ultraLight-200.woff",
      weight: "200",
      style: "normal",
    },
    {
      path: "../app/assets/fonts/IranSans-light-300.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../app/assets/fonts/IranSans-medium-400.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/assets/fonts/IranSans-regular-500.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../app/assets/fonts/IranSans-semibold-600.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../app/assets/fonts/IranSans-bold-700.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../app/assets/fonts/IranSans-extrabold-800.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "../app/assets/fonts/IranSans-black-900.woff",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-iran-sans",
  display: "swap",
});
