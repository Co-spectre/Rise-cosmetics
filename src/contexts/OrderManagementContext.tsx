import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Order Status Types
export type OrderStatus = 
  | 'pending'
  | 'confirmed' 
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'returned'
  | 'refunded';

// Payment Status Types
export type PaymentStatus = 
  | 'pending'
  | 'paid'
  | 'failed'
  | 'refunded'
  | 'partially_refunded';

// Order Item Interface
export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  imageUrl?: string;
  sku: string;
  attributes?: Record<string, string>;
}

// Shipping Information
export interface ShippingInfo {
  method: string;
  carrier: string;
  trackingNumber?: string;
  trackingUrl?: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  address: {
    firstName: string;
    lastName: string;
    company?: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone?: string;
  };
}

// Order Interface
export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerEmail: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  currency: string;
  shippingInfo: ShippingInfo;
  billingAddress: ShippingInfo['address'];
  paymentMethod: string;
  transactionId?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  cancelledAt?: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
  refundedAt?: Date;
  refundAmount?: number;
  refundReason?: string;
}

// Return/Refund Request
export interface ReturnRequest {
  id: string;
  orderId: string;
  items: {
    orderItemId: string;
    quantity: number;
    reason: string;
    condition: 'unopened' | 'opened' | 'damaged';
  }[];
  type: 'return' | 'exchange' | 'refund';
  reason: string;
  description?: string;
  status: 'pending' | 'approved' | 'rejected' | 'processing' | 'completed';
  requestedAmount: number;
  approvedAmount?: number;
  createdAt: Date;
  processedAt?: Date;
  completedAt?: Date;
  notes?: string;
}

// Order Analytics
export interface OrderAnalytics {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  topProducts: Array<{
    productId: string;
    name: string;
    quantity: number;
    revenue: number;
  }>;
  ordersByStatus: Record<OrderStatus, number>;
  monthlyTrends: Array<{
    month: string;
    orders: number;
    revenue: number;
  }>;
  customerMetrics: {
    newCustomers: number;
    returningCustomers: number;
    lifetimeValue: number;
  };
}

// Order Management Context
interface OrderManagementContextType {
  // Order State
  orders: Order[];
  currentOrder: Order | null;
  returnRequests: ReturnRequest[];
  isLoading: boolean;
  
  // Order Operations
  createOrder: (orderData: Partial<Order>) => Promise<Order>;
  getOrder: (orderId: string) => Promise<Order | null>;
  getUserOrders: (userId?: string) => Promise<Order[]>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  cancelOrder: (orderId: string, reason: string) => Promise<void>;
  
  // Tracking & Updates
  addTrackingInfo: (orderId: string, trackingNumber: string, carrier: string) => Promise<void>;
  getTrackingInfo: (orderId: string) => Promise<any>;
  updateShippingStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  
  // Returns & Refunds
  createReturnRequest: (orderId: string, items: ReturnRequest['items'], type: ReturnRequest['type'], reason: string) => Promise<ReturnRequest>;
  processReturnRequest: (returnId: string, action: 'approve' | 'reject', amount?: number) => Promise<void>;
  getReturnRequests: (orderId?: string) => Promise<ReturnRequest[]>;
  
  // Customer Service
  addOrderNote: (orderId: string, note: string) => Promise<void>;
  sendOrderUpdate: (orderId: string, message: string) => Promise<void>;
  generateInvoice: (orderId: string) => Promise<string>;
  resendConfirmationEmail: (orderId: string) => Promise<void>;
  
  // Analytics & Reporting
  getOrderAnalytics: (startDate?: Date, endDate?: Date) => Promise<OrderAnalytics>;
  exportOrders: (filters?: any) => Promise<string>;
  generateReport: (type: 'sales' | 'returns' | 'customers', period: string) => Promise<any>;
  
  // Admin Functions
  getAllOrders: (filters?: any, pagination?: { page: number; limit: number }) => Promise<{ orders: Order[]; total: number }>;
  bulkUpdateOrders: (orderIds: string[], updates: Partial<Order>) => Promise<void>;
  flagOrder: (orderId: string, reason: string) => Promise<void>;
}

const OrderManagementContext = createContext<OrderManagementContextType | undefined>(undefined);

// Sample Order Data
const SAMPLE_ORDERS: Order[] = [
  {
    id: '1',
    orderNumber: 'RC-2024-001',
    userId: 'user1',
    customerEmail: 'john.doe@email.com',
    status: 'delivered',
    paymentStatus: 'paid',
    items: [
      {
        id: '1',
        productId: 'serum-1',
        name: 'Radiance Renewal Serum',
        description: 'Brightening vitamin C serum',
        quantity: 2,
        unitPrice: 45.00,
        totalPrice: 90.00,
        sku: 'RRS-001',
      },
      {
        id: '2',
        productId: 'cream-1',
        name: 'Hydrating Night Cream',
        description: 'Intensive moisture repair',
        quantity: 1,
        unitPrice: 35.00,
        totalPrice: 35.00,
        sku: 'HNC-001',
      },
    ],
    subtotal: 125.00,
    shipping: 5.99,
    tax: 26.25,
    discount: 12.50,
    total: 144.74,
    currency: 'EUR',
    shippingInfo: {
      method: 'Standard Shipping',
      carrier: 'PostNL',
      trackingNumber: 'PN123456789NL',
      trackingUrl: 'https://postnl.nl/track/PN123456789NL',
      estimatedDelivery: '2024-02-15',
      actualDelivery: '2024-02-14',
      address: {
        firstName: 'John',
        lastName: 'Doe',
        addressLine1: '123 Main Street',
        city: 'Amsterdam',
        state: 'North Holland',
        zipCode: '1001AB',
        country: 'Netherlands',
        phone: '+31612345678',
      },
    },
    billingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      addressLine1: '123 Main Street',
      city: 'Amsterdam',
      state: 'North Holland',
      zipCode: '1001AB',
      country: 'Netherlands',
      phone: '+31612345678',
    },
    paymentMethod: 'Credit Card (****4242)',
    transactionId: 'txn_1234567890',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-14'),
    shippedAt: new Date('2024-02-12'),
    deliveredAt: new Date('2024-02-14'),
  },
  {
    id: '2',
    orderNumber: 'RC-2024-002',
    customerEmail: 'jane.smith@email.com',
    status: 'processing',
    paymentStatus: 'paid',
    items: [
      {
        id: '3',
        productId: 'cleanser-1',
        name: 'Gentle Foam Cleanser',
        description: 'Daily facial cleanser',
        quantity: 1,
        unitPrice: 25.00,
        totalPrice: 25.00,
        sku: 'GFC-001',
      },
    ],
    subtotal: 25.00,
    shipping: 0.00,
    tax: 5.25,
    discount: 0.00,
    total: 30.25,
    currency: 'EUR',
    shippingInfo: {
      method: 'Free Shipping',
      carrier: 'PostNL',
      estimatedDelivery: '2024-02-20',
      address: {
        firstName: 'Jane',
        lastName: 'Smith',
        addressLine1: '456 Oak Avenue',
        city: 'Rotterdam',
        state: 'South Holland',
        zipCode: '3000AA',
        country: 'Netherlands',
      },
    },
    billingAddress: {
      firstName: 'Jane',
      lastName: 'Smith',
      addressLine1: '456 Oak Avenue',
      city: 'Rotterdam',
      state: 'South Holland',
      zipCode: '3000AA',
      country: 'Netherlands',
    },
    paymentMethod: 'PayPal',
    transactionId: 'txn_0987654321',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
  },
];

const SAMPLE_RETURN_REQUESTS: ReturnRequest[] = [
  {
    id: '1',
    orderId: '1',
    items: [
      {
        orderItemId: '1',
        quantity: 1,
        reason: 'Not as expected',
        condition: 'unopened',
      },
    ],
    type: 'refund',
    reason: 'Product quality issues',
    description: 'The serum caused skin irritation',
    status: 'approved',
    requestedAmount: 45.00,
    approvedAmount: 45.00,
    createdAt: new Date('2024-02-16'),
    processedAt: new Date('2024-02-17'),
  },
];

export const OrderManagementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(SAMPLE_ORDERS);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [returnRequests, setReturnRequests] = useState<ReturnRequest[]>(SAMPLE_RETURN_REQUESTS);
  const [isLoading, setIsLoading] = useState(false);
  
  const { user } = useAuth();

  // Create Order
  const createOrder = async (orderData: Partial<Order>): Promise<Order> => {
    const order: Order = {
      id: `order_${Date.now()}`,
      orderNumber: `RC-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, '0')}`,
      status: 'pending',
      paymentStatus: 'pending',
      currency: 'EUR',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...orderData,
    } as Order;

    setOrders(prev => [...prev, order]);
    return order;
  };

  // Get Order
  const getOrder = async (orderId: string): Promise<Order | null> => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setCurrentOrder(order);
    }
    return order || null;
  };

  // Get User Orders
  const getUserOrders = async (userId?: string): Promise<Order[]> => {
    const targetUserId = userId || user?.id;
    return orders.filter(order => order.userId === targetUserId);
  };

  // Update Order Status
  const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<void> => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const updates: Partial<Order> = {
          status,
          updatedAt: new Date(),
        };

        if (status === 'shipped') {
          updates.shippedAt = new Date();
        } else if (status === 'delivered') {
          updates.deliveredAt = new Date();
        } else if (status === 'cancelled') {
          updates.cancelledAt = new Date();
        }

        return { ...order, ...updates };
      }
      return order;
    }));

    // Send notification
    await sendOrderUpdate(orderId, `Your order status has been updated to: ${status}`);
  };

  // Cancel Order
  const cancelOrder = async (orderId: string, reason: string): Promise<void> => {
    await updateOrderStatus(orderId, 'cancelled');
    await addOrderNote(orderId, `Order cancelled. Reason: ${reason}`);
  };

  // Add Tracking Information
  const addTrackingInfo = async (orderId: string, trackingNumber: string, carrier: string): Promise<void> => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          shippingInfo: {
            ...order.shippingInfo,
            trackingNumber,
            carrier,
            trackingUrl: `https://${carrier.toLowerCase()}.com/track/${trackingNumber}`,
          },
          updatedAt: new Date(),
        };
      }
      return order;
    }));

    await sendOrderUpdate(orderId, `Your order has been shipped! Tracking number: ${trackingNumber}`);
  };

  // Get Tracking Info
  const getTrackingInfo = async (orderId: string): Promise<any> => {
    const order = orders.find(o => o.id === orderId);
    if (!order?.shippingInfo.trackingNumber) {
      return null;
    }

    // Mock tracking data
    return {
      trackingNumber: order.shippingInfo.trackingNumber,
      carrier: order.shippingInfo.carrier,
      status: order.status,
      estimatedDelivery: order.shippingInfo.estimatedDelivery,
      trackingEvents: [
        { date: order.createdAt, location: 'Order Placed', description: 'Order confirmed and payment received' },
        { date: order.shippedAt || new Date(), location: 'Warehouse', description: 'Package shipped' },
        { date: new Date(), location: 'In Transit', description: 'Package is on the way' },
      ],
    };
  };

  // Create Return Request
  const createReturnRequest = async (
    orderId: string, 
    items: ReturnRequest['items'], 
    type: ReturnRequest['type'], 
    reason: string
  ): Promise<ReturnRequest> => {
    const order = orders.find(o => o.id === orderId);
    if (!order) throw new Error('Order not found');

    const requestedAmount = items.reduce((sum, item) => {
      const orderItem = order.items.find(oi => oi.id === item.orderItemId);
      return sum + (orderItem ? orderItem.unitPrice * item.quantity : 0);
    }, 0);

    const returnRequest: ReturnRequest = {
      id: `return_${Date.now()}`,
      orderId,
      items,
      type,
      reason,
      status: 'pending',
      requestedAmount,
      createdAt: new Date(),
    };

    setReturnRequests(prev => [...prev, returnRequest]);
    return returnRequest;
  };

  // Process Return Request
  const processReturnRequest = async (returnId: string, action: 'approve' | 'reject', amount?: number): Promise<void> => {
    setReturnRequests(prev => prev.map(request => {
      if (request.id === returnId) {
        return {
          ...request,
          status: action === 'approve' ? 'approved' : 'rejected',
          approvedAmount: action === 'approve' ? amount || request.requestedAmount : 0,
          processedAt: new Date(),
        };
      }
      return request;
    }));
  };

  // Get Return Requests
  const getReturnRequests = async (orderId?: string): Promise<ReturnRequest[]> => {
    return orderId 
      ? returnRequests.filter(req => req.orderId === orderId)
      : returnRequests;
  };

  // Add Order Note
  const addOrderNote = async (orderId: string, note: string): Promise<void> => {
    // In a real implementation, this would update the order with the note
    console.log(`Note added to order ${orderId}: ${note}`);
  };

  // Send Order Update
  const sendOrderUpdate = async (orderId: string, message: string): Promise<void> => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      console.log(`Email sent to ${order.customerEmail}: ${message}`);
      // In a real implementation, this would send an actual email
    }
  };

  // Generate Invoice
  const generateInvoice = async (orderId: string): Promise<string> => {
    const order = orders.find(o => o.id === orderId);
    if (!order) throw new Error('Order not found');

    // Return mock PDF URL
    return `https://invoices.risecosmetics.com/${order.orderNumber}.pdf`;
  };

  // Resend Confirmation Email
  const resendConfirmationEmail = async (orderId: string): Promise<void> => {
    await sendOrderUpdate(orderId, 'Order confirmation email resent');
  };

  // Get Order Analytics
  const getOrderAnalytics = async (startDate?: Date, endDate?: Date): Promise<OrderAnalytics> => {
    const filteredOrders = orders.filter(order => {
      if (startDate && order.createdAt < startDate) return false;
      if (endDate && order.createdAt > endDate) return false;
      return true;
    });

    const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);
    const averageOrderValue = totalRevenue / filteredOrders.length || 0;

    const ordersByStatus = filteredOrders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<OrderStatus, number>);

    return {
      totalOrders: filteredOrders.length,
      totalRevenue,
      averageOrderValue,
      topProducts: [], // Calculate top products
      ordersByStatus,
      monthlyTrends: [], // Calculate monthly trends
      customerMetrics: {
        newCustomers: 0,
        returningCustomers: 0,
        lifetimeValue: 0,
      },
    };
  };

  // Additional utility functions
  const updateShippingStatus = async (orderId: string, status: OrderStatus) => updateOrderStatus(orderId, status);
  const exportOrders = async (filters?: any) => JSON.stringify(orders);
  const generateReport = async (type: string, period: string) => ({ type, period, data: orders });
  const getAllOrders = async (filters?: any, pagination?: { page: number; limit: number }) => ({ orders, total: orders.length });
  const bulkUpdateOrders = async (orderIds: string[], updates: Partial<Order>) => {};
  const flagOrder = async (orderId: string, reason: string) => addOrderNote(orderId, `Flagged: ${reason}`);

  const value: OrderManagementContextType = {
    // State
    orders,
    currentOrder,
    returnRequests,
    isLoading,
    
    // Order Operations
    createOrder,
    getOrder,
    getUserOrders,
    updateOrderStatus,
    cancelOrder,
    
    // Tracking & Updates
    addTrackingInfo,
    getTrackingInfo,
    updateShippingStatus,
    
    // Returns & Refunds
    createReturnRequest,
    processReturnRequest,
    getReturnRequests,
    
    // Customer Service
    addOrderNote,
    sendOrderUpdate,
    generateInvoice,
    resendConfirmationEmail,
    
    // Analytics & Reporting
    getOrderAnalytics,
    exportOrders,
    generateReport,
    
    // Admin Functions
    getAllOrders,
    bulkUpdateOrders,
    flagOrder,
  };

  return <OrderManagementContext.Provider value={value}>{children}</OrderManagementContext.Provider>;
};

export const useOrderManagement = () => {
  const context = useContext(OrderManagementContext);
  if (context === undefined) {
    throw new Error('useOrderManagement must be used within an OrderManagementProvider');
  }
  return context;
};
