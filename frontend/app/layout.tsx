import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/components/auth-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FieldFinder - Book Football Fields',
  description: 'Find and book football fields in your area',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <footer className="border-t py-12 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                      <h3 className="text-lg font-bold mb-4">FieldBooking</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Điểm đến hàng đầu của bạn để đặt sân bóng đá cao cấp.
                        Trải nghiệm những tiện nghi tốt nhất cho trận đấu của bạn.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4">Liên kết nhanh</h4>
                      <ul className="space-y-2">
                        <li><a href="/fields" className="text-sm hover:text-primary">Xem sân</a></li>
                        <li><a href="/booking" className="text-sm hover:text-primary">Đặt sân</a></li>
                        <li><a href="/dashboard" className="text-sm hover:text-primary">Sân đã đặt</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4">Hỗ trợ</h4>
                      <ul className="space-y-2">
                        <li><a href="/faq" className="text-sm hover:text-primary">Câu hỏi thường gặp</a></li>
                        <li><a href="/contact" className="text-sm hover:text-primary">Liên hệ chúng tôi</a></li>
                        <li><a href="/help" className="text-sm hover:text-primary">Trung tâm hỗ trợ</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4">Địa chỉ</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Số 1 Đại Cồ Việt, phường Bách Khoa<br />
                        quận Hai Bà Trưng, Hà Nội<br />
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Phone: (123) 456-7890<br />
                        Email: info@fieldbooking.com
                      </p>
                    </div>
                  </div>
                  <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground mb-4 md:mb-0">
                      &copy; {new Date().getFullYear()} FieldBooking. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                      <a href="/terms" className="text-sm text-muted-foreground hover:text-primary">Điều khoản</a>
                      <a href="/privacy" className="text-sm text-muted-foreground hover:text-primary">Bảo mật</a>
                      <a href="/cookies" className="text-sm text-muted-foreground hover:text-primary">Cookies</a>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}