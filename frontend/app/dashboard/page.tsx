"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
//import { mockBookings, mockFields } from "@/lib/mock-data";
import { useAuth } from "@/hooks/use-auth";
import { Field } from "@/types/field";
import { Booking } from "@/types/booking";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { format, parseISO } from "date-fns";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [upcomingBookings, setUpcomingBookings] = useState<(Booking & { field: Field })[]>([]);
  const [pastBookings, setPastBookings] = useState<(Booking & { field: Field })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/bookings", {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        // data should be an array of bookings, each with a field property
        const today = new Date();
        const userBookings = data
          .filter((booking: any) => booking.idKhachHang === user.id)
          .map((booking: any) => ({
            ...booking,
            field: booking.field, // assuming backend populates field info
          }));

        const upcoming = userBookings.filter(
          (booking: any) => new Date(booking.thoigianBatDau) >= today
        );
        const past = userBookings.filter(
          (booking: any) => new Date(booking.thoigianBatDau) < today
        );

        setUpcomingBookings(upcoming);
        setPastBookings(past);
      } catch (error) {
        // handle error
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đã xác nhận":
        return "text-green-600 bg-green-100";
      case "Chưa xác nhận":
        return "text-amber-600 bg-amber-100";
      case "Đã hủy":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const renderBookingCard = (booking: Booking & { field: Field }) => (
    <Card key={booking.id} className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{booking.field.name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              {booking.field.location}
            </CardDescription>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center text-sm">
              <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
              {booking.date}
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              {booking.startTime} - {booking.endTime}
            </div>
          </div>
          <div className="mt-4 sm:mt-0">
            <div className="text-sm text-muted-foreground">Tổng giá</div>
            <div className="text-lg font-semibold">{booking.totalPrice.toLocaleString("vi-VN")}₫</div>
          </div>
        </div>
        
        {booking.status !== "Đã hủy" && new Date(booking.date) > new Date() && (
          <div className="mt-4 flex justify-end">
            <Button variant="outline" className="mr-2">Đặt lịch lại</Button>
            <Button variant="destructive">Hủy</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 w-1/4 bg-slate-200 rounded mb-6"></div>
            <div className="h-10 w-1/3 bg-slate-200 rounded mb-8"></div>
            <div className="h-40 bg-slate-200 rounded mb-4"></div>
            <div className="h-40 bg-slate-200 rounded mb-4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Lịch sử đặt sân của bạn</h1>
        <p className="text-muted-foreground mb-8">
          Quản lý thông tin đặt sân và tài khoản của bạn
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tổng số lượt đặt sân</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {upcomingBookings.length + pastBookings.length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lịch đặt sân sắp tới</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{upcomingBookings.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hoạt động gần đây</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {pastBookings.length > 0
                  ? `Last booking on ${pastBookings[0]?.date}`
                  : "Không có hoạt động gần đây"}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">Lịch đặt sân sắp tới</TabsTrigger>
            <TabsTrigger value="past">Lịch sử đặt sân</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {upcomingBookings.length > 0 ? (
              <div>{upcomingBookings.map(renderBookingCard)}</div>
            ) : (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Không có lịch đặt sân sắp tới</h3>
                <p className="text-muted-foreground mb-6">
                  Bạn không có lịch đặt sân sắp tới nàonào.
                </p>
                <Button asChild>
                  <a href="/fields">Đặt một sân</a>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            {pastBookings.length > 0 ? (
              <div>{pastBookings.map(renderBookingCard)}</div>
            ) : (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <h3 className="text-lg font-medium">Không có lịch sử đặt sân</h3>
                <p className="text-muted-foreground">
                  Lịch sử đặt sân của bạn sẽ hiện ở đây.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}