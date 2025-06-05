"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Check, Wallet, CreditCard } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { mockFields, timeSlots, isFieldAvailable, paymentMethods } from "@/lib/mock-data";
import { Field } from "@/types/field";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PaymentMethod } from "@/types/booking";

enum BookingStep {
  DATE_SELECTION = 0,
  TIME_SELECTION = 1,
  FIELD_SELECTION = 2,
  PAYMENT_SELECTION = 3,
  CONFIRMATION = 4,
}

export const dynamic = "force-dynamic";
export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fieldId = searchParams.get("fieldId");
  const { user } = useAuth();
  const { toast } = useToast();

  const [step, setStep] = useState(BookingStep.DATE_SELECTION);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [selectedField, setSelectedField] = useState<Field | null>(null);
  const [availableFields, setAvailableFields] = useState<Field[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");

  useEffect(() => {
    if (fieldId) {
      const field = mockFields.find((f) => f.id === fieldId);
      if (field) {
        setSelectedField(field);
      }
    }
  }, [fieldId]);

  useEffect(() => {
    if (!user && typeof window !== "undefined") {
      toast({
        title: "Yêu cầu đăng nhập",
        description: "Vui lòng đăng nhập để đặt sân.",
        variant: "destructive",
      });
      router.push("/login?redirect=booking");
    }
  }, [user, router, toast]);

  useEffect(() => {
    if (selectedField && startTime && endTime) {
      const startHour = parseInt(startTime.split(":")[0]);
      const endHour = parseInt(endTime.split(":")[0]);
      const hours = endHour - startHour;
      setTotalPrice(selectedField.pricePerHour * hours);
    }
  }, [selectedField, startTime, endTime]);

  useEffect(() => {
    if (date && startTime && endTime) {
      const formattedDate = format(date, "yyyy-MM-dd");
      const available = mockFields.filter((field) =>
        isFieldAvailable(field.id, formattedDate, startTime, endTime)
      );
      setAvailableFields(available);
    }
  }, [date, startTime, endTime]);

  const handleNextStep = () => {
    if (step < BookingStep.CONFIRMATION) {
      setStep(step + 1);
    } else {
      handleBookingConfirmation();
    }
  };

  const handlePreviousStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleBookingConfirmation = () => {
    toast({
      title: "Đặt lịch thành công!",
      description: `Lịch đặt sân của bạn cho ${selectedField?.name} vào ${date ? format(date, "PPP", { locale: vi }) : ""} đã được xác nhận.`,
    });
    router.push("/dashboard");
  };

  const handleTimeSelection = (time: string, isStart: boolean) => {
    if (isStart) {
      setStartTime(time);
      const startHour = parseInt(time.split(":")[0]);
      const endHour = startHour + 1;
      if (endHour <= 21) {
        setEndTime(`${endHour.toString().padStart(2, "0")}:00`);
      }
    } else {
      setEndTime(time);
    }
  };

  const handleFieldSelection = (field: Field) => {
    setSelectedField(field);
  };

  const renderStepContent = () => {
    switch (step) {
      case BookingStep.DATE_SELECTION:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Chọn ngày</h2>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 2))}
                className="rounded-lg border"
              />
            </div>
          </div>
        );
      case BookingStep.TIME_SELECTION:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Chọn giờ</h2>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Giờ bắt đầu</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {timeSlots.slice(0, -1).map((time) => (
                  <Button
                    key={`start-${time}`}
                    variant={startTime === time ? "default" : "outline"}
                    className={cn(
                      "h-10",
                      startTime === time && "bg-primary text-primary-foreground"
                    )}
                    onClick={() => handleTimeSelection(time, true)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>

            {startTime && (
              <div>
                <h3 className="text-sm font-medium mb-2">Giờ kết thúc</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots
                    .filter((time) => {
                      const startHour = parseInt(startTime.split(":")[0]);
                      const timeHour = parseInt(time.split(":")[0]);
                      return timeHour > startHour;
                    })
                    .map((time) => (
                      <Button
                        key={`end-${time}`}
                        variant={endTime === time ? "default" : "outline"}
                        className={cn(
                          "h-10",
                          endTime === time && "bg-primary text-primary-foreground"
                        )}
                        onClick={() => handleTimeSelection(time, false)}
                      >
                        {time}
                      </Button>
                    ))}
                </div>
              </div>
            )}
          </div>
        );
      case BookingStep.FIELD_SELECTION:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Chọn Sân</h2>
            
            {availableFields.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">
                  Không có sân nào trống cho thời gian đã chọn. Vui lòng thử ngày hoặc giờ khác.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={handlePreviousStep}
                >
                  Quay lại
                </Button>
              </div>
            ) : (
              <RadioGroup 
                value={selectedField?.id} 
                onValueChange={(value) => {
                  const field = availableFields.find(f => f.id === value);
                  if (field) setSelectedField(field);
                }}
              >
                {availableFields.map((field) => (
                  <div 
                    key={field.id}
                    className={cn(
                      "flex items-start space-x-4 p-4 rounded-lg cursor-pointer transition-all",
                      selectedField?.id === field.id 
                        ? "border-2 border-primary bg-primary/5" 
                        : "border border-border hover:border-primary/50"
                    )}
                    onClick={() => handleFieldSelection(field)}
                  >
                    <RadioGroupItem value={field.id} id={field.id} className="mt-1" />
                    <div className="flex flex-1 gap-4">
                      <div 
                        className="w-20 h-20 bg-cover bg-center rounded-md hidden sm:block"
                        style={{ backgroundImage: `url(${field.imageUrl})` }}
                      />
                      <div className="flex-1">
                        <Label 
                          htmlFor={field.id} 
                          className="text-base font-medium cursor-pointer"
                        >
                          {field.name}
                        </Label>
                        <p className="text-sm text-muted-foreground">{field.location}</p>
                        <p className="text-sm mt-1">{field.size}</p>
                        <p className="font-medium mt-1">{field.pricePerHour.toLocaleString("vi-VN")}₫/giờ</p>
                      </div>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            )}
          </div>
        );
      case BookingStep.PAYMENT_SELECTION:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Chọn phương thức thanh toán</h2>
            <RadioGroup value={paymentMethod} onValueChange={(value: PaymentMethod) => setPaymentMethod(value)}>
              <div className="space-y-4">
                <div
                  className={cn(
                    "flex items-center space-x-4 p-4 rounded-lg cursor-pointer transition-all",
                    paymentMethod === "cash"
                      ? "border-2 border-primary bg-primary/5"
                      : "border border-border hover:border-primary/50"
                  )}
                >
                  <RadioGroupItem value="cash" id="cash" />
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Wallet className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <Label htmlFor="cash" className="text-base font-medium">Tiền mặt</Label>
                      <p className="text-sm text-muted-foreground">Thanh toán tại sân trước trận đấu của bạn</p>
                    </div>
                  </div>
                </div>

                <div
                  className={cn(
                    "flex items-center space-x-4 p-4 rounded-lg cursor-pointer transition-all",
                    paymentMethod === "bank"
                      ? "border-2 border-primary bg-primary/5"
                      : "border border-border hover:border-primary/50"
                  )}
                >
                  <RadioGroupItem value="bank" id="bank" />
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <CreditCard className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <Label htmlFor="bank" className="text-base font-medium">Internet Banking</Label>
                      <p className="text-sm text-muted-foreground">Thanh toán qua chuyển khoản ngân hàng</p>
                    </div>
                  </div>
                </div>
              </div>
            </RadioGroup>

            {paymentMethod === "bank" && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium mb-2">Thông tin chuyển khoản ngân hàng</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Ngân hàng:</span> {paymentMethods[1]?.bankDetails?.bankName}</p>
                  <p><span className="font-medium">Tên tài khoản:</span> {paymentMethods[1]?.bankDetails?.accountName}</p>
                  <p><span className="font-medium">Số tài khoản:</span> {paymentMethods[1]?.bankDetails?.accountNumber}</p>
                  <p><span className="font-medium">Nội dung:</span> {paymentMethods[1]?.bankDetails?.reference}{Date.now()}</p>
                </div>
              </div>
            )}
          </div>
        );
      case BookingStep.CONFIRMATION:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Xác nhận đặt sân</h2>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <div 
                  className="w-16 h-16 bg-cover bg-center rounded-md"
                  style={{ backgroundImage: `url(${selectedField?.imageUrl})` }}
                />
                <div className="ml-4">
                  <h3 className="font-medium">{selectedField?.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedField?.location}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Ngày:</span>
                  <span className="font-medium">{date ? format(date, "PPP") : ""}</span>
                </div>
                <div className="flex justify-between">
                  <span>Giờ:</span>
                  <span className="font-medium">{startTime} - {endTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Khoảng thời gian:</span>
                  <span className="font-medium">
                    {startTime && endTime
                      ? `${parseInt(endTime.split(":")[0]) - parseInt(startTime.split(":")[0])} giờ`
                      : ""}
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-base font-medium">
                  <span>Tổng giá:</span>
                  <span>{totalPrice.toLocaleString("vi-VN")}₫</span>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Phương thức thanh toán</h3>
              <div className="flex items-center space-x-2">
                {paymentMethod === "cash" ? (
                  <>
                    <Wallet className="h-4 w-4 text-green-600" />
                    <span>Thanh toán tiền mặt tại sân bóng</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 text-blue-600" />
                    <span>Internet Banking</span>
                  </>
                )}
              </div>
              {paymentMethod === "bank" && (
                <p className="text-sm text-muted-foreground mt-2">
                  Vui lòng hoàn tất chuyển khoản ngân hàng theo thông tin đã được cung cấp.
                </p>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Đặt một Sân</h1>
          {step > 0 && (
            <Button variant="ghost" onClick={handlePreviousStep}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Quay lại
            </Button>
          )}
        </div>
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                step >= BookingStep.DATE_SELECTION 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              )}>
                {step > BookingStep.DATE_SELECTION ? <Check className="h-4 w-4" /> : "1"}
              </div>
              <div className={cn(
                "h-0.5 w-12",
                step > BookingStep.DATE_SELECTION ? "bg-primary" : "bg-muted"
              )} />
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                step >= BookingStep.TIME_SELECTION 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              )}>
                {step > BookingStep.TIME_SELECTION ? <Check className="h-4 w-4" /> : "2"}
              </div>
              <div className={cn(
                "h-0.5 w-12",
                step > BookingStep.TIME_SELECTION ? "bg-primary" : "bg-muted"
              )} />
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                step >= BookingStep.FIELD_SELECTION 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              )}>
                {step > BookingStep.FIELD_SELECTION ? <Check className="h-4 w-4" /> : "3"}
              </div>
              <div className={cn(
                "h-0.5 w-12",
                step > BookingStep.FIELD_SELECTION ? "bg-primary" : "bg-muted"
              )} />
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                step >= BookingStep.PAYMENT_SELECTION 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              )}>
                {step > BookingStep.PAYMENT_SELECTION ? <Check className="h-4 w-4" /> : "4"}
              </div>
              <div className={cn(
                "h-0.5 w-12",
                step > BookingStep.PAYMENT_SELECTION ? "bg-primary" : "bg-muted"
              )} />
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                step >= BookingStep.CONFIRMATION 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              )}>
                5
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-8 text-xs gap-3 text-left">
            <span className={step >= BookingStep.DATE_SELECTION ? "text-foreground font-medium" : "text-muted-foreground"}>
              Ngày
            </span>
            <span className={step >= BookingStep.TIME_SELECTION ? "text-foreground font-medium" : "text-muted-foreground"}>
              Giờ
            </span>
            <span className={step >= BookingStep.FIELD_SELECTION ? "text-foreground font-medium" : "text-muted-foreground"}>
              Sân
            </span>
            <span className={`col-span-1 -ml-5 ${step >= BookingStep.PAYMENT_SELECTION ? "text-foreground font-medium" : "text-muted-foreground"}`}>
              Thanh toán
            </span>
            <span className={`col-span-1 -ml-3 ${step >= BookingStep.CONFIRMATION ? "text-foreground font-medium" : "text-muted-foreground"}`}>
              Xác nhận
            </span>
          </div>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            {renderStepContent()}
          </CardContent>
        </Card>
        
        <div className="flex justify-end mt-6">
          <Button
            onClick={handleNextStep}
            disabled={
              (step === BookingStep.DATE_SELECTION && !date) ||
              (step === BookingStep.TIME_SELECTION && (!startTime || !endTime)) ||
              (step === BookingStep.FIELD_SELECTION && !selectedField) ||
              (step === BookingStep.FIELD_SELECTION && availableFields.length === 0) ||
              (step === BookingStep.PAYMENT_SELECTION && !paymentMethod)
            }
            className="min-w-[120px]"
          >
            {step === BookingStep.CONFIRMATION ? (
              "Xác nhận đặt sân"
            ) : (
              <>
                Tiếp <ChevronRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}