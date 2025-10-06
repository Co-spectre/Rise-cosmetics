import React, { useState } from 'react';
import { Product } from '@/contexts/ProductManagementContext';
import { Edit3, Save, X, Upload, Plus, Minus, Package, DollarSign, Tag, Image } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onUpdate: (productId: string, updates: Partial<Product>) => Promise<void>;
  onImageUpload: (productId: string, file: File) => Promise<string>;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onUpdate, onImageUpload }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product>(product);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProduct({ ...product });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProduct(product);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onUpdate(product.id, editedProduct);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await onImageUpload(product.id, file);
        setEditedProduct(prev => ({
          ...prev,
          images: [...prev.images, imageUrl]
        }));
      } catch (error) {
        console.error('Failed to upload image:', error);
      }
    }
  };

  const updateInventory = (change: number) => {
    setEditedProduct(prev => ({
      ...prev,
      inventory: {
        ...prev.inventory,
        quantity: Math.max(0, prev.inventory.quantity + change)
      }
    }));
  };

  const getStockStatus = () => {
    const { quantity, lowStockThreshold } = product.inventory;
    if (quantity === 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    if (quantity <= lowStockThreshold) return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'In Stock', color: 'bg-green-100 text-green-800' };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-olive-50 to-rice-50 px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={editedProduct.name}
                onChange={(e) => setEditedProduct(prev => ({ ...prev, name: e.target.value }))}
                className="text-xl font-semibold text-olive-900 bg-white border border-gray-300 rounded px-3 py-1 w-full focus:outline-none focus:ring-2 focus:ring-olive-500"
              />
            ) : (
              <h3 className="text-xl font-semibold text-olive-900">{product.name}</h3>
            )}
            <div className="flex items-center gap-2 mt-2">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${stockStatus.color}`}>
                {stockStatus.label}
              </span>
              <span className="text-sm text-gray-500">SKU: {product.sku}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="flex items-center gap-1 px-3 py-1.5 bg-olive-600 text-white text-sm rounded hover:bg-olive-700"
              >
                <Edit3 className="w-4 h-4" />
                Edit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Product Info */}
          <div className="space-y-4">
            {/* Price */}
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-olive-600" />
              <span className="text-sm font-medium text-gray-700">Price:</span>
              {isEditing ? (
                <input
                  type="number"
                  step="0.01"
                  value={editedProduct.price}
                  onChange={(e) => setEditedProduct(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                  className="border border-gray-300 rounded px-2 py-1 w-20 text-sm focus:outline-none focus:ring-2 focus:ring-olive-500"
                />
              ) : (
                <span className="text-lg font-semibold text-olive-900">€{product.price.toFixed(2)}</span>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Description:</label>
              {isEditing ? (
                <textarea
                  value={editedProduct.description}
                  onChange={(e) => setEditedProduct(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-olive-500"
                />
              ) : (
                <p className="text-sm text-gray-600">{product.description}</p>
              )}
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-olive-600" />
              <span className="text-sm font-medium text-gray-700">Status:</span>
              {isEditing ? (
                <select
                  value={editedProduct.status}
                  onChange={(e) => setEditedProduct(prev => ({ ...prev, status: e.target.value as any }))}
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-olive-500"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              ) : (
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  product.status === 'active' ? 'bg-green-100 text-green-800' : 
                  product.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {product.status === 'active' ? 'Active' : product.status === 'draft' ? 'Draft' : 'Archived'}
                </span>
              )}
            </div>
          </div>

          {/* Right Column - Inventory & Actions */}
          <div className="space-y-4">
            {/* Inventory Management */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Package className="w-4 h-4 text-olive-600" />
                <span className="text-sm font-medium text-gray-700">Inventory</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Current Stock:</span>
                  <div className="flex items-center gap-2">
                    {isEditing && (
                      <>
                        <button
                          onClick={() => updateInventory(-1)}
                          className="w-6 h-6 bg-red-100 text-red-600 rounded flex items-center justify-center hover:bg-red-200"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                      </>
                    )}
                    <span className="font-semibold text-olive-900 min-w-[2rem] text-center">
                      {isEditing ? editedProduct.inventory.quantity : product.inventory.quantity}
                    </span>
                    {isEditing && (
                      <button
                        onClick={() => updateInventory(1)}
                        className="w-6 h-6 bg-green-100 text-green-600 rounded flex items-center justify-center hover:bg-green-200"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Low Stock Threshold:</span>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedProduct.inventory.lowStockThreshold}
                      onChange={(e) => setEditedProduct(prev => ({
                        ...prev,
                        inventory: {
                          ...prev.inventory,
                          lowStockThreshold: parseInt(e.target.value) || 0
                        }
                      }))}
                      className="border border-gray-300 rounded px-2 py-1 w-16 text-sm text-center focus:outline-none focus:ring-2 focus:ring-olive-500"
                    />
                  ) : (
                    <span className="font-semibold text-olive-900">{product.inventory.lowStockThreshold}</span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Allow Backorder:</span>
                  {isEditing ? (
                    <input
                      type="checkbox"
                      checked={editedProduct.inventory.allowBackorder}
                      onChange={(e) => setEditedProduct(prev => ({
                        ...prev,
                        inventory: {
                          ...prev.inventory,
                          allowBackorder: e.target.checked
                        }
                      }))}
                      className="rounded border-gray-300 text-olive-600 focus:ring-olive-500"
                    />
                  ) : (
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      product.inventory.allowBackorder ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.inventory.allowBackorder ? 'Yes' : 'No'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Image Management */}
            {isEditing && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Image className="w-4 h-4 text-olive-600" />
                  <span className="text-sm font-medium text-gray-700">Images</span>
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-olive-500 hover:bg-olive-50">
                    <div className="text-center">
                      <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                      <span className="text-xs text-gray-600">Upload Image</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  
                  <div className="text-xs text-gray-500">
                    Current images: {product.images.length}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Analytics Row */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm text-gray-600">Rating</div>
              <div className="font-semibold text-olive-900">{product.averageRating}/5.0</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Reviews</div>
              <div className="font-semibold text-olive-900">{product.reviewCount}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Total Sales</div>
              <div className="font-semibold text-olive-900">{product.totalSales}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
