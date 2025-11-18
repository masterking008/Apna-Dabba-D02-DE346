// Auth interfaces
export interface LoginData {
  username: string;
  password: string;
  user_type: 'student' | 'mess_worker' | 'delivery_partner';
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  user_type: 'student' | 'mess_worker' | 'delivery_partner';
  phone: string;
  roll_number?: string;
  hostel_id?: number;
  room_number?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  user_type: string;
  phone: string;
  is_verified: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Menu interfaces
export interface MealType {
  id: number;
  name: string;
  icon: string;
  start_time: string;
  end_time: string;
}

export interface MenuItem {
  id: number;
  name: string;
  meal_type: MealType;
  hostel: any;
  is_available: boolean;
  image?: string;
}

export interface ExtraItem {
  id: number;
  name: string;
  price: string;
  is_available: boolean;
}

export interface Hostel {
  id: number;
  name: string;
  code: string;
  address: string;
  is_active: boolean;
}

// Order interfaces
export interface Order {
  id: number;
  order_id: string;
  student: any;
  user?: User;
  meal_type: any;
  delivery_address: any;
  delivery_type: 'hub' | 'hand';
  delivery_fee: string;
  total_amount: string;
  status: string;
  estimated_delivery_time: string;
  created_at: string;
  items: any[];
  extras: any[];
  hostel?: string;
}

export interface CreateOrderData {
  meal_type_id: number;
  delivery_address_id: number;
  delivery_type: 'hub' | 'hand';
  items: { menu_item_id: number; quantity: number }[];
  extras?: { extra_item_id: number; quantity: number }[];
}

// Wallet interfaces
export interface Wallet {
  balance: string;
  tiffin_deposit: string;
  refundable_amount: string;
  updated_at: string;
}

export interface Transaction {
  id: number;
  transaction_type: 'credit' | 'debit';
  amount: string;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

// Address interfaces
export interface Address {
  id: number;
  name: string;
  full_address: string;
  hub_supported: boolean;
  is_default: boolean;
}

export interface CreateAddressData {
  name: string;
  full_address: string;
  hub_supported?: boolean;
  is_default?: boolean;
}

// Notification interfaces
export interface Notification {
  id: number;
  notification_type: 'order' | 'favorite' | 'payment' | 'delivery' | 'refund' | 'general';
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

// Favorite interfaces
export interface Favorite {
  id: number;
  menu_item: MenuItem;
  created_at: string;
}

export interface CreateFavoriteData {
  menu_item: number;
}

// Delivery interfaces
export interface DeliveryRequest {
  id: number;
  order: Order;
  delivery_partner: any;
  pickup_location: string;
  delivery_location: string;
  delivery_fee: string;
  status: 'pending' | 'accepted' | 'pickup' | 'delivered' | 'cancelled';
  accepted_at: string | null;
  pickup_at: string | null;
  delivered_at: string | null;
  created_at: string;
}

// Profile interfaces
export interface UserProfile {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  user_type: string;
  hostel?: string;
  roll_number?: string;
  room_number?: string;
}

export interface StudentProfile {
  roll_number: string;
  hostel: Hostel;
  room_number: string;
}

export interface MessWorkerProfile {
  employee_id: string;
  hostel: Hostel;
  shift_start: string;
  shift_end: string;
}

export interface DeliveryPartnerProfile {
  partner_id: string;
  vehicle_type: string;
  vehicle_number: string;
  is_available: boolean;
  current_location: string;
}

export interface UpdateProfileData {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  room_number?: string;
  vehicle_type?: string;
  vehicle_number?: string;
  current_location?: string;
  is_available?: boolean;
}

// Analytics interfaces
export interface MenuAnalytics {
  menu_item: any;
  date: string;
  orders_count: number;
  estimated_wastage_percent: string;
}

export interface OrderAnalytics {
  total_orders: number;
  pending_orders: number;
  completed_orders: number;
  cancelled_orders: number;
  total_revenue: string;
  average_order_value: string;
}

export interface DeliveryAnalytics {
  total_deliveries: number;
  pending_deliveries: number;
  completed_deliveries: number;
  average_delivery_time: number;
}

// Search interfaces
export interface SearchResults {
  menu_items: MenuItem[];
  orders: Order[];
}

// Feedback interfaces
export interface Feedback {
  id: number;
  order: any;
  rating: number;
  comment: string;
  feedback_type: 'food' | 'delivery' | 'service';
  created_at: string;
}

export interface CreateFeedbackData {
  order_id: string;
  rating: number;
  comment: string;
  feedback_type: 'food' | 'delivery' | 'service';
}

// Admin interfaces
export interface AdminStats {
  total_users: number;
  total_orders: number;
  total_revenue: string;
  pending_orders: number;
}

export interface AdminDashboard {
  stats: AdminStats;
  recent_orders: Order[];
}