"use client";

import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import { FieldGrid } from "@/components/field-grid";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import type { Field } from "@/types/field";

export default function FieldsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sizeFilter, setSizeFilter] = useState("any");
  const [priceFilter, setPriceFilter] = useState("any");
  const [amenitiesFilter, setAmenitiesFilter] = useState("any");
  const [fields, setFields] = useState<Field[]>([]);
  const [filteredFields, setFilteredFields] = useState<Field[]>([]);

  // Gọi API để lấy danh sách sân bóng
  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/fields");
        if (!response.ok) throw new Error("Failed to fetch fields");

        const data = await response.json() as Field[]; // Ép kiểu dữ liệu
        setFields(data);
        setFilteredFields(data);
      } catch (error) {
        console.error("Error fetching fields:", error);
      }
    };
    fetchFields();
  }, []);

  const applyFilters = () => {
    let filtered = [...fields];

    if (sizeFilter !== "any") {
      filtered = filtered.filter(field => field.size === sizeFilter);
    }

    if (priceFilter !== "any") {
      switch (priceFilter) {
        case "under-300.000":
          filtered = filtered.filter(field => field.pricePerHour < 300000);
          break;
        case "300.000-500.000":
          filtered = filtered.filter(field => field.pricePerHour >= 300000 && field.pricePerHour <= 500000);
          break;
        case "over-500.000":
          filtered = filtered.filter(field => field.pricePerHour > 500000);
          break;
      }
    }

    if (amenitiesFilter !== "any") {
      filtered = filtered.filter(field => field.amenities.includes(amenitiesFilter));
    }

    setFilteredFields(filtered);
  };

  const resetFilters = () => {
    setSizeFilter("any");
    setPriceFilter("any");
    setAmenitiesFilter("any");
    setFilteredFields(fields);
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Các Sân bóng</h1>
          <p className="text-muted-foreground">
            Xem và đặt sân từ danh sách các sân bóng đá cao cấp của chúng tôi
          </p>
        </div>

        <div className="flex justify-end mb-8">
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:w-auto w-full"
          >
            <Filter className="h-4 w-4 mr-2" />
            Bộ lọc
          </Button>
        </div>

        {isFilterOpen && (
          <div className="bg-card p-4 rounded-lg shadow-sm mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Kích cỡ sân</label>
              <Select value={sizeFilter} onValueChange={setSizeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Bất kì" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Kích cỡ bất kì</SelectItem>
                  <SelectItem value="5-a-side">Sân 5 người</SelectItem>
                  <SelectItem value="7-a-side">Sân 7 người</SelectItem>
                  <SelectItem value="11-a-side">Sân 11 người</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Khoảng giá</label>
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Bất kì" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Giá bất kì</SelectItem>
                  <SelectItem value="under-300.000">Dưới 300.000₫</SelectItem>
                  <SelectItem value="300.000-500.000">300.000 - 500.000₫</SelectItem>
                  <SelectItem value="over-500.000">Trên 500.000₫</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Tiện nghi</label>
              <Select value={amenitiesFilter} onValueChange={setAmenitiesFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tiện nghi bất kì" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Tiện nghi bất kì</SelectItem>
                  <SelectItem value="Changing Rooms">Phòng thay đồ</SelectItem>
                  <SelectItem value="Floodlights">Đèn chiếu sáng</SelectItem>
                  <SelectItem value="Parking">Gửi xe</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-3 flex justify-end space-x-2 mt-2">
              <Button variant="outline" size="sm" onClick={resetFilters}>Đặt lại</Button>
              <Button size="sm" onClick={applyFilters}>Áp dụng bộ lọc</Button>
            </div>
          </div>
        )}

        <Separator className="mb-8" />

        <FieldGrid fields={filteredFields} />
      </div>
    </div>
  );
}