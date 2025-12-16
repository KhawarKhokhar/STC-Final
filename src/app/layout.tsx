import "./globals.css";
import type { Metadata } from "next";
import LayoutWrapper from "@/components/ui/LayoutWrapper"; // Import the new wrapper
import { AuthProvider } from "@/context/AuthContext";
import ScrollToTop from "@/components/ui/ScrollToTop";
import StyledComponentsRegistry from "@/lib/styled-components";

export const metadata: Metadata = {
  title: "Sales Tax Corp",
  description: "STC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>{/* ... (Your font links) ... */}</head>
      <body>
        {/* Pass all children (pages) to the client-side wrapper */}
        <StyledComponentsRegistry>
          <AuthProvider>
            <LayoutWrapper>
              {children}
              <ScrollToTop />
            </LayoutWrapper>
          </AuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
