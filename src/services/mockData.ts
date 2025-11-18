import type { 
  MealType, MenuItem, ExtraItem, Hostel, Order, User, Wallet, 
  Transaction, Address, Notification, Favorite, DeliveryRequest,
  UserProfile, StudentProfile, MessWorkerProfile, DeliveryPartnerProfile,
  MenuAnalytics, OrderAnalytics, DeliveryAnalytics, Feedback, AdminStats
} from './interfaces';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 1,
    username: 'student1',
    email: 'student1@example.com',
    first_name: 'Rahul',
    last_name: 'Sharma',
    user_type: 'student',
    phone: '+91 9876543210',
    is_verified: true
  },
  {
    id: 2,
    username: 'messworker1',
    email: 'mess1@example.com',
    first_name: 'Priya',
    last_name: 'Singh',
    user_type: 'mess_worker',
    phone: '+91 9876543211',
    is_verified: true
  },
  {
    id: 3,
    username: 'delivery1',
    email: 'delivery1@example.com',
    first_name: 'Amit',
    last_name: 'Kumar',
    user_type: 'delivery_partner',
    phone: '+91 9876543212',
    is_verified: true
  }
];

// Mock Hostels
export const mockHostels: Hostel[] = [
  {
    id: 1,
    name: 'Himalaya Hostel',
    code: 'HIM',
    address: 'Block A, University Campus',
    is_active: true
  },
  {
    id: 2,
    name: 'Ganga Hostel',
    code: 'GAN',
    address: 'Block B, University Campus',
    is_active: true
  },
  {
    id: 3,
    name: 'Yamuna Hostel',
    code: 'YAM',
    address: 'Block C, University Campus',
    is_active: true
  }
];

// Mock Meal Types
export const mockMealTypes: MealType[] = [
  {
    id: 1,
    name: 'Breakfast',
    icon: '🌅',
    start_time: '07:00:00',
    end_time: '10:00:00'
  },
  {
    id: 2,
    name: 'Lunch',
    icon: '🍽️',
    start_time: '12:00:00',
    end_time: '15:00:00'
  },
  {
    id: 3,
    name: 'Snacks',
    icon: '🍪',
    start_time: '16:00:00',
    end_time: '18:00:00'
  },
  {
    id: 4,
    name: 'Dinner',
    icon: '🌙',
    start_time: '19:00:00',
    end_time: '22:00:00'
  }
];

// Mock Menu Items
export const mockMenuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Aloo Paratha with Curd',
    meal_type: mockMealTypes[0],
    hostel: mockHostels[0],
    is_available: true,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Poha with Chutney',
    meal_type: mockMealTypes[0],
    hostel: mockHostels[0],
    is_available: true,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'Dal Rice with Sabji',
    meal_type: mockMealTypes[1],
    hostel: mockHostels[0],
    is_available: true,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    name: 'Rajma Chawal',
    meal_type: mockMealTypes[1],
    hostel: mockHostels[0],
    is_available: true,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    name: 'Samosa (2 pcs)',
    meal_type: mockMealTypes[2],
    hostel: mockHostels[0],
    is_available: true,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    name: 'Tea with Biscuits',
    meal_type: mockMealTypes[2],
    hostel: mockHostels[0],
    is_available: true,
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop'
  },
  {
    id: 7,
    name: 'Roti Sabji Dal',
    meal_type: mockMealTypes[3],
    hostel: mockHostels[0],
    is_available: true,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop'
  },
  {
    id: 8,
    name: 'Biryani with Raita',
    meal_type: mockMealTypes[3],
    hostel: mockHostels[0],
    is_available: true,
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400&h=300&fit=crop'
  }
];

// Mock Extra Items
export const mockExtraItems: ExtraItem[] = [
  {
    id: 1,
    name: 'Extra Roti',
    price: '5.00',
    is_available: true
  },
  {
    id: 2,
    name: 'Extra Rice',
    price: '10.00',
    is_available: true
  },
  {
    id: 3,
    name: 'Pickle',
    price: '3.00',
    is_available: true
  },
  {
    id: 4,
    name: 'Papad',
    price: '2.00',
    is_available: true
  },
  {
    id: 5,
    name: 'Lassi',
    price: '15.00',
    is_available: true
  }
];

// Mock Addresses
export const mockAddresses: Address[] = [
  {
    id: 1,
    name: 'Room 101, Himalaya Hostel',
    full_address: 'Room 101, Himalaya Hostel, Block A, University Campus',
    hub_supported: true,
    is_default: true
  },
  {
    id: 2,
    name: 'Library Study Room',
    full_address: 'Central Library, 2nd Floor, Study Room 5',
    hub_supported: false,
    is_default: false
  },
  {
    id: 3,
    name: 'Academic Block',
    full_address: 'Academic Block, Room 205, Computer Science Department',
    hub_supported: true,
    is_default: false
  }
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 1,
    order_id: 'ORD001',
    student: mockUsers[0],
    user: mockUsers[0],
    meal_type: mockMealTypes[1],
    delivery_address: mockAddresses[0],
    delivery_type: 'hub',
    delivery_fee: '10.00',
    total_amount: '85.00',
    status: 'delivered',
    estimated_delivery_time: '2024-01-15T13:30:00Z',
    created_at: '2024-01-15T12:00:00Z',
    items: [
      { menu_item: mockMenuItems[2], quantity: 1 },
      { menu_item: mockMenuItems[3], quantity: 1 }
    ],
    extras: [
      { extra_item: mockExtraItems[0], quantity: 2 }
    ],
    hostel: 'Himalaya Hostel'
  },
  {
    id: 2,
    order_id: 'ORD002',
    student: mockUsers[0],
    user: mockUsers[0],
    meal_type: mockMealTypes[3],
    delivery_address: mockAddresses[0],
    delivery_type: 'hand',
    delivery_fee: '15.00',
    total_amount: '95.00',
    status: 'preparing',
    estimated_delivery_time: '2024-01-15T20:30:00Z',
    created_at: '2024-01-15T19:00:00Z',
    items: [
      { menu_item: mockMenuItems[6], quantity: 1 },
      { menu_item: mockMenuItems[7], quantity: 1 }
    ],
    extras: [
      { extra_item: mockExtraItems[4], quantity: 1 }
    ],
    hostel: 'Himalaya Hostel'
  }
];

// Mock Wallet
export const mockWallet: Wallet = {
  balance: '250.00',
  tiffin_deposit: '100.00',
  refundable_amount: '50.00',
  updated_at: '2024-01-15T10:00:00Z'
};

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: 1,
    transaction_type: 'debit',
    amount: '85.00',
    description: 'Order payment - ORD001',
    status: 'completed',
    created_at: '2024-01-15T12:00:00Z'
  },
  {
    id: 2,
    transaction_type: 'credit',
    amount: '200.00',
    description: 'Wallet recharge',
    status: 'completed',
    created_at: '2024-01-14T15:30:00Z'
  },
  {
    id: 3,
    transaction_type: 'debit',
    amount: '100.00',
    description: 'Tiffin deposit',
    status: 'completed',
    created_at: '2024-01-10T09:00:00Z'
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 1,
    notification_type: 'order',
    title: 'Order Delivered',
    message: 'Your order ORD001 has been delivered successfully!',
    is_read: false,
    created_at: '2024-01-15T13:30:00Z'
  },
  {
    id: 2,
    notification_type: 'payment',
    title: 'Payment Successful',
    message: 'Your wallet has been recharged with ₹200',
    is_read: true,
    created_at: '2024-01-14T15:30:00Z'
  },
  {
    id: 3,
    notification_type: 'delivery',
    title: 'Order Out for Delivery',
    message: 'Your order ORD002 is out for delivery',
    is_read: false,
    created_at: '2024-01-15T19:45:00Z'
  }
];

// Mock Favorites
export const mockFavorites: Favorite[] = [
  {
    id: 1,
    menu_item: mockMenuItems[2],
    created_at: '2024-01-10T10:00:00Z'
  },
  {
    id: 2,
    menu_item: mockMenuItems[7],
    created_at: '2024-01-12T18:00:00Z'
  }
];

// Mock Delivery Requests
export const mockDeliveryRequests: DeliveryRequest[] = [
  {
    id: 1,
    order: mockOrders[1],
    delivery_partner: mockUsers[2],
    pickup_location: 'Himalaya Hostel Mess',
    delivery_location: 'Room 101, Himalaya Hostel',
    delivery_fee: '15.00',
    status: 'accepted',
    accepted_at: '2024-01-15T19:15:00Z',
    pickup_at: null,
    delivered_at: null,
    created_at: '2024-01-15T19:00:00Z'
  }
];

// Mock User Profiles
export const mockUserProfile: UserProfile = {
  id: 1,
  username: 'student1',
  email: 'student1@example.com',
  first_name: 'Rahul',
  last_name: 'Sharma',
  phone_number: '+91 9876543210',
  user_type: 'student',
  hostel: 'Himalaya Hostel',
  roll_number: '2021CS001',
  room_number: '101'
};

export const mockStudentProfile: StudentProfile = {
  roll_number: '2021CS001',
  hostel: mockHostels[0],
  room_number: '101'
};

export const mockMessWorkerProfile: MessWorkerProfile = {
  employee_id: 'EMP001',
  hostel: mockHostels[0],
  shift_start: '06:00:00',
  shift_end: '14:00:00'
};

export const mockDeliveryPartnerProfile: DeliveryPartnerProfile = {
  partner_id: 'DEL001',
  vehicle_type: 'Bicycle',
  vehicle_number: 'BK1234',
  is_available: true,
  current_location: 'Near Himalaya Hostel'
};

// Mock Analytics
export const mockMenuAnalytics: MenuAnalytics[] = [
  {
    menu_item: mockMenuItems[2],
    date: '2024-01-15',
    orders_count: 25,
    estimated_wastage_percent: '5.2'
  },
  {
    menu_item: mockMenuItems[7],
    date: '2024-01-15',
    orders_count: 18,
    estimated_wastage_percent: '3.1'
  }
];

export const mockOrderAnalytics: OrderAnalytics = {
  total_orders: 150,
  pending_orders: 8,
  completed_orders: 135,
  cancelled_orders: 7,
  total_revenue: '12750.00',
  average_order_value: '85.00'
};

export const mockDeliveryAnalytics: DeliveryAnalytics = {
  total_deliveries: 142,
  pending_deliveries: 5,
  completed_deliveries: 135,
  average_delivery_time: 25
};

// Mock Feedback
export const mockFeedback: Feedback[] = [
  {
    id: 1,
    order: mockOrders[0],
    rating: 4,
    comment: 'Food was delicious and delivered on time!',
    feedback_type: 'food',
    created_at: '2024-01-15T14:00:00Z'
  },
  {
    id: 2,
    order: mockOrders[0],
    rating: 5,
    comment: 'Excellent delivery service, very professional',
    feedback_type: 'delivery',
    created_at: '2024-01-15T14:05:00Z'
  }
];

// Mock Admin Stats
export const mockAdminStats: AdminStats = {
  total_users: 1250,
  total_orders: 3420,
  total_revenue: '289700.00',
  pending_orders: 15
};