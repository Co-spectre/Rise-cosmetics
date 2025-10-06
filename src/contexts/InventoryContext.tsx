import React, { createContext, useContext, useState, useEffect } from 'react';

interface InventoryItem {
  productId: string;
  sku: string;
  quantity: number;
  reserved: number;
  reorderLevel: number;
  supplier: string;
  lastRestocked: Date;
  cost: number;
}

interface StockAlert {
  id: string;
  productId: string;
  type: 'low_stock' | 'out_of_stock' | 'reorder_needed';
  message: string;
  severity: 'low' | 'medium' | 'high';
  createdAt: Date;
}

interface InventoryContextType {
  inventory: InventoryItem[];
  alerts: StockAlert[];
  updateStock: (productId: string, newQuantity: number) => void;
  reserveStock: (productId: string, quantity: number) => boolean;
  releaseReservedStock: (productId: string, quantity: number) => void;
  getAvailableStock: (productId: string) => number;
  isInStock: (productId: string) => boolean;
  getLowStockItems: () => InventoryItem[];
  getStockValue: () => number;
  generateStockReport: () => {
    totalItems: number;
    totalValue: number;
    lowStockCount: number;
    outOfStockCount: number;
  };
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      productId: '1',
      sku: 'RGF001',
      quantity: 50,
      reserved: 5,
      reorderLevel: 10,
      supplier: 'Beauty Supply Co',
      lastRestocked: new Date('2025-07-15'),
      cost: 25.00
    },
    {
      productId: '2',
      sku: 'VML002',
      quantity: 25,
      reserved: 3,
      reorderLevel: 15,
      supplier: 'Cosmetic Distributors',
      lastRestocked: new Date('2025-07-20'),
      cost: 12.50
    },
    {
      productId: '3',
      sku: 'HFS003',
      quantity: 8,
      reserved: 2,
      reorderLevel: 20,
      supplier: 'Skincare Solutions',
      lastRestocked: new Date('2025-07-10'),
      cost: 35.00
    }
  ]);

  const [alerts, setAlerts] = useState<StockAlert[]>([]);

  useEffect(() => {
    checkStockLevels();
  }, [inventory]);

  const checkStockLevels = () => {
    const newAlerts: StockAlert[] = [];

    inventory.forEach(item => {
      const availableStock = item.quantity - item.reserved;
      
      if (availableStock <= 0) {
        newAlerts.push({
          id: `${item.productId}-out-of-stock`,
          productId: item.productId,
          type: 'out_of_stock',
          message: `Product ${item.sku} is out of stock`,
          severity: 'high',
          createdAt: new Date()
        });
      } else if (availableStock <= item.reorderLevel) {
        newAlerts.push({
          id: `${item.productId}-low-stock`,
          productId: item.productId,
          type: 'low_stock',
          message: `Product ${item.sku} is running low (${availableStock} remaining)`,
          severity: availableStock <= item.reorderLevel / 2 ? 'high' : 'medium',
          createdAt: new Date()
        });
      }
    });

    setAlerts(newAlerts);
  };

  const updateStock = (productId: string, newQuantity: number) => {
    setInventory(prev => prev.map(item => 
      item.productId === productId 
        ? { ...item, quantity: Math.max(0, newQuantity) }
        : item
    ));
  };

  const reserveStock = (productId: string, quantity: number): boolean => {
    const item = inventory.find(inv => inv.productId === productId);
    if (!item) return false;

    const availableStock = item.quantity - item.reserved;
    if (availableStock >= quantity) {
      setInventory(prev => prev.map(inv => 
        inv.productId === productId 
          ? { ...inv, reserved: inv.reserved + quantity }
          : inv
      ));
      return true;
    }
    return false;
  };

  const releaseReservedStock = (productId: string, quantity: number) => {
    setInventory(prev => prev.map(item => 
      item.productId === productId 
        ? { ...item, reserved: Math.max(0, item.reserved - quantity) }
        : item
    ));
  };

  const getAvailableStock = (productId: string): number => {
    const item = inventory.find(inv => inv.productId === productId);
    return item ? item.quantity - item.reserved : 0;
  };

  const isInStock = (productId: string): boolean => {
    return getAvailableStock(productId) > 0;
  };

  const getLowStockItems = (): InventoryItem[] => {
    return inventory.filter(item => {
      const availableStock = item.quantity - item.reserved;
      return availableStock <= item.reorderLevel && availableStock > 0;
    });
  };

  const getStockValue = (): number => {
    return inventory.reduce((total, item) => total + (item.quantity * item.cost), 0);
  };

  const generateStockReport = () => {
    const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
    const totalValue = getStockValue();
    const lowStockCount = getLowStockItems().length;
    const outOfStockCount = inventory.filter(item => getAvailableStock(item.productId) === 0).length;

    return {
      totalItems,
      totalValue,
      lowStockCount,
      outOfStockCount
    };
  };

  return (
    <InventoryContext.Provider value={{
      inventory,
      alerts,
      updateStock,
      reserveStock,
      releaseReservedStock,
      getAvailableStock,
      isInStock,
      getLowStockItems,
      getStockValue,
      generateStockReport
    }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
