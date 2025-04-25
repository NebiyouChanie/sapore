import '../globals.css';  
import { Toaster } from "sonner";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='flex items-center justify-center h-[100svh]'>
        <Toaster position="top-right" richColors />
        {children}
      </body>
    </html>
  );
}