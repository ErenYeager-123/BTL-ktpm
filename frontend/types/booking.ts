export type BookingStatus = "Chưa xác nhận" | "Đã xác nhận" | "Đã hủy";
export type PaymentMethod = "cash" | "bank";

export interface Booking {
  id: string;
  userId: string;
  fieldId: string;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
  paymentMethod: PaymentMethod;
}