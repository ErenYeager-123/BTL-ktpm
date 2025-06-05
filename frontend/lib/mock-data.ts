import { User } from "@/types/user";
import { Field } from "@/types/field";
import { Booking } from "@/types/booking";

// Mock users
export const mockUsers: User[] = [
  {
    id: "user1",
    name: "John Smith",
    email: "john@example.com",
    password: "password456", // In a real app, this would be hashed
    isAdmin: false,
  },
  {
    id: "user2",
    name: "Jane Doe",
    email: "jane@example.com",
    password: "password123",
    isAdmin: false,
  },
  {
    id: "admin1",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    isAdmin: true,
  },
];

// Mock fields
  export const mockFields: Field[] = [
    {
      id: "field1",
      name: "Champions Arena",
      description: "Sân bóng đá chuyên nghiệp với cỏ nhân tạo cao cấp và đèn pha cho các trận đấu ban đêm.",
      location: "Downtown Sports Complex",
      imageUrl: "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      pricePerHour: 600000,
      size: "Sân 11 người",
      amenities: ["Phòng thay đồ", "Đèn chiếu sáng", "Gửi xe"],
      isAvailable: true,
    },
  {
    id: "field2",
    name: "Victory Field",
    description: "Sân có kích thước trung bình, lý tưởng cho các trận đấu 7 người với cỏ nhân tạo để chơi trong mọi thời tiết.",
    location: "Westside Recreation Center",
    imageUrl: "https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    pricePerHour: 350000,
    size: "Sân 7 người",
    amenities: ["Cỏ nhân tạo", "Đèn chiếu sáng", "Gửi xe"],
    isAvailable: true,
  },
  {
    id: "field3",
    name: "Eastside Soccer Park",
    description: "Sân cộng đồng với cỏ tự nhiên, lý tưởng cho các trận đấu giao hữu vào cuối tuần.",
    location: "Eastside Park",
    imageUrl: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    pricePerHour: 250000,
    size: "Sân 5 người",
    amenities: ["Cỏ tự nhiên", "Đèn chiếu sáng"],
    isAvailable: false,
  },
  {
    id: "field4",
    name: "Riverside Grounds",
    description: "Sân bóng đá đẹp nằm cạnh bờ sông với các tiện nghi tuyệt vời.",
    location: "Riverside Sports Center",
    imageUrl: "https://images.pexels.com/photos/274523/pexels-photo-274523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    pricePerHour: 700000,
    size: "Sân 11 người",
    amenities: ["Phòng thay đồ", "Phòng tắm", "Quán cà phê", "Đèn chiếu sáng"],
    isAvailable: true,
  },
  {
    id: "field5",
    name: "Metro Indoor Arena",
    description: "Sân trong nhà có thể chơi quanh năm bất kể điều kiện thời tiết.",
    location: "Metro Sports Hall",
    imageUrl: "https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    pricePerHour: 200000,
    size: "Sân 5 người",
    amenities: ["Trong nhà", "Điều hòa không khí", "Bảng điểm", "Đèn chiếu sáng"],
    isAvailable: true,
  },
  {
    id: "field6",
    name: "Sunset Fields",
    description: "Sân ngoài trời tuyệt đẹp với cảnh hoàng hôn tuyệt đẹp, lý tưởng cho các trò chơi buổi tối.",
    location: "Hillside Recreation Area",
    imageUrl: "https://images.pexels.com/photos/3041811/pexels-photo-3041811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    pricePerHour: 400000,
    size: "Sân 7 người",
    amenities: ["Đèn chiếu sáng", "Gửi xe", "Khu vực dã ngoại"],
    isAvailable: false,
  },
];

// Mock bookings
export const mockBookings: Booking[] = [
  {
    id: "booking1",
    userId: "user1",
    fieldId: "field1",
    date: "2025-07-15",
    startTime: "18:00",
    endTime: "20:00",
    totalPrice: 600000,
    status: "Đã xác nhận",
    createdAt: "2025-07-10T10:30:00Z",
    paymentMethod: "cash",
  },
  {
    id: "booking2",
    userId: "user1",
    fieldId: "field3",
    date: "2025-07-20",
    startTime: "14:00",
    endTime: "16:00",
    totalPrice: 250000,
    status: "Đã xác nhận",
    createdAt: "2025-07-11T15:45:00Z",
    paymentMethod: "bank",
  },
  {
    id: "booking3",
    userId: "user2",
    fieldId: "field2",
    date: "2025-07-18",
    startTime: "10:00",
    endTime: "12:00",
    totalPrice: 450000,
    status: "Chưa xác nhận",
    createdAt: "2025-07-12T09:15:00Z",
    paymentMethod: "bank",
  },
];

// Time slots
export const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", 
  "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"
];

// Payment methods
export const paymentMethods = [
  {
    id: "cash",
    name: "Cash",
    description: "Pay at venue",
    icon: "wallet",
  },
  {
    id: "bank",
    name: "Internet Banking",
    description: "Pay via bank transfer",
    icon: "credit-card",
    bankDetails: {
      bankName: "MB Bank",
      accountName: "FieldBooking Ltd",
      accountNumber: "1234-5678-9012-3456",
      reference: "FF-BOOKING-",
    },
  },
];

// Function to check if a field is available at a specific time
export function isFieldAvailable(fieldId: string, date: string, startTime: string, endTime: string): boolean {
  // In a real app, this would query a database
  const conflictingBookings = mockBookings.filter(
    booking => 
      booking.fieldId === fieldId && 
      booking.date === date && 
      booking.status !== "Đã hủy" &&
      ((booking.startTime <= startTime && booking.endTime > startTime) ||
       (booking.startTime < endTime && booking.endTime >= endTime) ||
       (booking.startTime >= startTime && booking.endTime <= endTime))
  );
  
  return conflictingBookings.length === 0;
}