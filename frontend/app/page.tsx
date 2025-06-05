import Link from 'next/link';
import { FieldGrid } from '@/components/field-grid';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" 
          }}
        />
        <div className="container relative z-20 mx-auto px-4 py-32 text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-2xl">
            Hệ thống đặt sân bóng đá trực tuyến tiện lợi
          </h1>
          <p className="text-xl mb-8 max-w-xl">
            Tìm và đặt chỗ những sân bóng đá tốt nhất trong khu vực của bạn. 
            Đặt chỗ dễ dàng, xác nhận ngay lập tức.
          </p>
          <Button size="lg" asChild className="text-lg px-8 py-6 bg-gray-900 hover:bg-gray-500 transition-all duration-300 active:scale-90">
            <Link href="/fields">Đặt sân ngay</Link>
          </Button>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Tại sao chọn FieldBooking?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Cập nhật sân trống liên tục</h3>
              <p className="text-muted-foreground">
                Kiểm tra tình trạng sân trống theo thời gian thực và đặt chỗ ngay lập tức.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Vị trí thuận tiện</h3>
              <p className="text-muted-foreground">
                Tiếp cận những sân chất lượng cao ở những vị trí thuận tiện.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-7"/><polyline points="14 2 14 8 20 8"/><circle cx="6" cy="14" r="3"/><path d="M9.4 17H9a2 2 0 0 0-2 2v1"/><path d="M4.56 19a2 2 0 0 1 .33-1.97l.05-.06a2 2 0 0 1 2.83-.12l.6.06"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quản lý dễ dàng</h3>
              <p className="text-muted-foreground">
                Quản lý đặt chỗ của bạn bằng bảng quản lý đơn giản của chúng tôi.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Fields Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Các Sân Bóng</h2>
            <Button variant="outline" asChild>
              <Link href="/fields" className="flex items-center">
                Xem tất cả sân <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <FieldGrid limit={6} />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Sẵn sàng để chơi?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Tham gia cùng hàng ngàn người chơi đặt sân bóng đá thông qua FieldBooking mỗi ngày.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/fields">Xem Sân</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">Tạo Tài khoản</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}