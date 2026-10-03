import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { DemoProvider } from "@/components/providers/demo-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const font = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://investinnova.skirypt.xyz"),
  title: {
    default: "Investinnova",
    template: "%s - Investinnova",
  },
  description:
    "Investinnova provides profitable investment plans, multiple payment options, and daily profits through a secure investment platform.",
  applicationName: "Investinnova",
  icons: {
    icon: "/investinnova-icon.png",
  },
  openGraph: {
    title: "Investinnova",
    description:
      "The Future of Investing. You Dream It, We Make It Happen.",
    type: "website",
    images: ["/investinnova-logo.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#181818" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${font.variable} h-full antialiased`}
    >
      <body
        id="app"
        className="min-h-full w-full bg-background text-foreground"
      >
        <ThemeProvider>
          <DemoProvider>{children}</DemoProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
