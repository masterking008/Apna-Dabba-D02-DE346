# API Services Documentation

## Available Services

### 1. Authentication Service (`authService`)
- `login(data)` - User login
- `register(data)` - User registration
- `logout()` - User logout
- `getToken()` - Get auth token
- `getUser()` - Get current user
- `isAuthenticated()` - Check auth status

### 2. Menu Service (`menuService`)
- `getMealTypes()` - Get all meal types
- `getMenuItems(mealType?, hostel?)` - Get menu items
- `getExtraItems(hostel?)` - Get extra items
- `getHostels()` - Get all hostels

### 3. Order Service (`orderService`)
- `getOrders()` - Get user orders
- `createOrder(data)` - Create new order
- `updateOrderStatus(orderId, status)` - Update order status

### 4. Wallet Service (`walletService`)
- `getWallet()` - Get wallet balance
- `addMoney(amount)` - Add money to wallet
- `getTransactions()` - Get transaction history

### 5. Address Service (`addressService`)
- `getAddresses()` - Get user addresses
- `createAddress(data)` - Create new address

### 6. Notification Service (`notificationService`)
- `getNotifications()` - Get notifications
- `markAsRead(id)` - Mark notification as read

### 7. Favorite Service (`favoriteService`)
- `getFavorites()` - Get favorite items
- `addFavorite(menuItemId)` - Add to favorites
- `removeFavorite(favoriteId)` - Remove from favorites

### 8. Delivery Service (`deliveryService`)
- `getDeliveryRequests()` - Get delivery requests
- `updateDeliveryStatus(id, status)` - Update delivery status
- `acceptDelivery(id)` - Accept delivery
- `markPickup(id)` - Mark as picked up
- `markDelivered(id)` - Mark as delivered

### 9. Profile Service (`profileService`)
- `getProfile()` - Get user profile
- `updateProfile(data)` - Update profile
- `updateAvailability(isAvailable)` - Update delivery partner availability

### 10. Analytics Service (`analyticsService`)
- `getMenuAnalytics(startDate?, endDate?)` - Get menu analytics
- `getOrderAnalytics(startDate?, endDate?)` - Get order analytics
- `getDeliveryAnalytics(startDate?, endDate?)` - Get delivery analytics

### 11. Search Service (`searchService`)
- `searchMenuItems(query, mealType?, hostel?)` - Search menu items
- `searchOrders(query, status?)` - Search orders
- `globalSearch(query)` - Global search

### 12. Feedback Service (`feedbackService`)
- `getFeedbacks()` - Get user feedbacks
- `createFeedback(data)` - Create feedback
- `getFeedbackByOrder(orderId)` - Get feedback for specific order

## Usage Example

```typescript
import { authService, menuService, orderService } from './services';

// Login
const loginData = {
  username: 'student123',
  password: 'password',
  user_type: 'Student'
};
const response = await authService.login(loginData);

// Get menu items
const menuItems = await menuService.getMenuItems('breakfast', 1);

// Create order
const orderData = {
  meal_type_id: 1,
  delivery_address_id: 1,
  delivery_type: 'hub',
  items: [{ menu_item_id: 1, quantity: 2 }],
  extras: [{ extra_item_id: 1, quantity: 1 }]
};
const order = await orderService.createOrder(orderData);
```