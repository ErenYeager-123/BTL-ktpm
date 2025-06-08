"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Calendar, Clock, MapPin, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Field } from "@/types/field";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function FieldDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [field, setField] = useState<Field | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchField = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/fields/public/${id}`);
        if (!response.ok) throw new Error("Failed to fetch field");

        const data = await response.json() as Field; // Ép kiểu dữ liệu
        setField(data);
      } catch (error) {
        console.error("Error fetching field:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchField();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-6 w-48 bg-slate-200 rounded mb-4"></div>
            <div className="h-80 bg-slate-200 rounded mb-6"></div>
            <div className="h-4 w-full bg-slate-200 rounded mb-2"></div>
            <div className="h-4 w-3/4 bg-slate-200 rounded mb-6"></div>
            <div className="h-10 w-full md:w-1/3 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!field) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy sân</h1>
          <p className="mb-6">Sân bạn đang tìm không tồn tại</p>
          <Button asChild>
            <Link href="/fields">Xem tất cả sân</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleBookNow = () => {
    if (!field.isAvailable) {
      toast({
        title: "Field unavailable",
        description: "This field is currently booked. Please select another field or time.",
        variant: "destructive",
      });
      return;
    }
    router.push(`/booking?fieldId=${field.id}`);
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Button variant="ghost" className="pl-0 mb-2" asChild>
            <Link href="/fields" className="flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" /> Quay lại
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{field.name}</h1>
          <div className="flex items-center text-muted-foreground mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{field.location}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div
              className="h-[400px] w-full rounded-lg bg-cover bg-center mb-6"
              style={{ backgroundImage: `url(${field.imageUrl})` }}
            />

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Mô tả</h2>
              <p className="text-muted-foreground">{field.description}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Tiện nghi</h2>
              <div className="flex flex-wrap gap-2">
                {field.amenities.map((amenity) => (
                  <Badge key={amenity} variant="outline">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-card rounded-lg p-6 shadow-sm sticky top-24">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-2xl font-bold">{field.pricePerHour.toLocaleString("vi-VN")}₫</span>
                  <span className="text-muted-foreground">/ giờ</span>
                </div>
                
                <Badge 
                  className={field.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                  variant="outline"
                >
                  {field.isAvailable ? "Trống" : "Đã đặt"}
                </Badge>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3 mb-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Có sẵn sân 7 ngày trong tuần</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>9:00 AM - 10:00 PM</span>
                </div>
              </div>

              <Button
                className="w-full hover:bg-gray-500"
                size="lg"
                onClick={handleBookNow}
                disabled={!field.isAvailable}
              >
                Đặt sân ngay
              </Button>
              
              <p className="text-xs text-center text-muted-foreground mt-4">
                Thanh toán tiền mặt tại sân bóng hoặc qua Internet Banking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}