export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  phoneNumber?: string | null;
  isActive: boolean;
  createdAt: Date;
}

export interface JwtPayload {
  sub: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  correlationId?: string;
  timestamp: string;
}

export interface ProductType {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  isActive: boolean;
}

export interface CartItemType {
  id: number;
  productId: number;
  quantity: number;
  priceAtAdd: number;
  product: ProductType;
}

export interface OrderType {
  id: number;
  orderNumber: string;
  status: string;
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: string;
  createdAt: Date;
  items: OrderItemType[];
}

export interface OrderItemType {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}