import type { Metadata, Viewport } from "next";
import { Cinzel, Great_Vibes, Poppins } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aagman2k26.gmit.ac.in"),
  title: "AAGMAN 2K26 | Freshers Party | G Madegowda Institute of Technology",
  description:
    "A Grand Welcome to New Beginnings... Join us at AAGMAN 2K26 organized by the Department of Computer Science and Engineering and Computer Science and Design at G Madegowda Institute of Technology. Tuesday, 17 November 2026, 11:00 AM IST at Kuvempu Sabhangana.",
  keywords: [
    "AAGMAN 2K26",
    "GMIT Freshers Party",
    "G Madegowda Institute of Technology",
    "CSE CSD Freshers",
    "Kuvempu Sabhangana",
    "College Freshers 2026",
  ],
  authors: [{ name: "Department of CSE & CSD, GMIT" }],
  openGraph: {
    title: "AAGMAN 2K26 | Freshers Party - GMIT",
    description:
      "A Grand Welcome to New Beginnings... Celebrate new dreams, new friendships, and a new chapter of college life. Tuesday, 17 November 2026 at Kuvempu Sabhangana.",
    url: "https://aagman2k26.gmit.ac.in",
    siteName: "AAGMAN 2K26",
    images: [
      {
        url: "/poster.png",
        width: 1080,
        height: 1920,
        alt: "AAGMAN 2K26 Official Freshers Party Invitation Poster",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AAGMAN 2K26 | Freshers Party - GMIT",
    description: "Tuesday, 17 November 2026 at Kuvempu Sabhangana.",
    images: ["/poster.png"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1B3F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cinzel.variable} ${greatVibes.variable} ${poppins.variable} font-sans antialiased bg-[#060E22] text-[#FFF8E7] selection:bg-[#D4AF37] selection:text-[#060E22] min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
