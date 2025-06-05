"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Field } from "@/types/field";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface FieldCardProps {
  field: Field;
}

export function FieldCard({ field }: FieldCardProps) {
  const router = useRouter();

  const handleBookNow = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/booking?fieldId=${field.id}`);
  };

  return (
    <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-md">
      <div 
        className="h-48 bg-cover bg-center" 
        style={{ backgroundImage: `url(${field.imageUrl})` }}
      />
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{field.name}</h3>
          <Badge 
            className={cn(
              field.isAvailable ? "bg-green-200 text-green-800" : "bg-red-300 text-red-800",
              "font-medium"
            )}
            variant="outline"
          >
            {field.isAvailable ? "Trống" : "Đã đặt"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex items-center gap-4 text-sm">
          <div>
            <span className="font-medium">{field.pricePerHour.toLocaleString("vi-VN")}₫</span>/giờ
          </div>
          <div>
            <span className="font-medium">{field.size}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-green-600 hover:bg-green-900 transition-all duration-300 hover:shadow-lg hover:shadow-green-200/50 active:scale-90"
          disabled={!field.isAvailable}
          onClick={handleBookNow}
        >
          Đặt sân
        </Button>
      </CardFooter>
    </Card>
  );
}