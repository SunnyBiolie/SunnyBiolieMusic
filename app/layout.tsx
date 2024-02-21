import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import SupabaseSessionProvider from "@/providers/SupabaseSessionProvider";
import { UserContextProvider } from "@/hooks/use-user";
import "react-tooltip/dist/react-tooltip.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "SBmusic",
    template: "%s | SBmusic",
  },
  description: "Listen to music, upload your own audio, and more ...",
  icons: [
    {
      type: "image/png",
      url: "/logo.png",
      href: "/logo.png",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <SupabaseSessionProvider>
          <UserContextProvider>
            <Toaster richColors closeButton expand />
            {children}
          </UserContextProvider>
        </SupabaseSessionProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
