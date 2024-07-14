import ToastProvider from "@/providers/ToastProvider";
import "./globals.css";
import { Poppins } from 'next/font/google'
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})



export const metadata = {
  title: "Learning Nextjs",
  description: "by Ashish Patel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body >
        <ToastProvider>
          {children}
        </ToastProvider></body>
    </html>
  );
}
