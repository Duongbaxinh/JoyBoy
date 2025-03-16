'use client';
import { useState } from 'react';
import Select from '@/components/atoms/Select';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import { CreateProductForm, SelectOption } from '@/interfaces/createProduct.interface';

const CreateProduct = () => {
  const [form, setForm] = useState<CreateProductForm>({
    code: '',
    name: '',
    category: '',
    brand: '',
    quantity: 0,
    unitPrice: 0
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CreateProductForm, string>>>({});

  // Mock data - replace with actual API calls later
  const categories: SelectOption[] = [
    { id: '1', value: 'Điện thoại' },
    { id: '2', value: 'Laptop' },
    { id: '3', value: 'Phụ kiện' }
  ];

  const brands: SelectOption[] = [
    { id: '1', value: 'Apple' },
    { id: '2', value: 'Samsung' },
    { id: '3', value: 'Dell' }
  ];

  const validateForm = () => {
    const newErrors: Partial<Record<keyof CreateProductForm, string>> = {};
    
    if (!form.code.trim()) {
      newErrors.code = 'Vui lòng nhập mã hàng';
    }
    if (!form.name.trim()) {
      newErrors.name = 'Vui lòng nhập tên hàng';
    }
    if (!form.category) {
      newErrors.category = 'Vui lòng chọn nhóm hàng';
    }
    if (!form.brand) {
      newErrors.brand = 'Vui lòng chọn thương hiệu';
    }
    if (form.quantity < 0) {
      newErrors.quantity = 'Số lượng không thể âm';
    }
    if (form.unitPrice < 0) {
      newErrors.unitPrice = 'Giá bán không thể âm';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof CreateProductForm, value: any) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Add API call to save product
      console.log('Form submitted:', form);
    }
  };

  const handleCancel = () => {
    setForm({
      code: '',
      name: '',
      category: '',
      brand: '',
      quantity: 0,
      unitPrice: 0
    });
    setErrors({});
  };

  return (
    <div className="p-6 bg-[#f5f5f5] min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-medium mb-6 text-text">Thêm hàng hóa</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-[13px] text-text">Mã hàng</label>
              <Input
                value={form.code}
                onChange={(e) => handleInputChange('code', e.target.value)}
                placeholder="Nhập mã hàng"
                variant="outline"
                className={errors.code ? 'border-red-500' : ''}
              />
              {errors.code && <span className="text-red-500 text-xs mt-1">{errors.code}</span>}
            </div>
            <div>
              <label className="block mb-1 text-[13px] text-text">Tên hàng</label>
              <Input
                value={form.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Nhập tên hàng"
                variant="outline"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-[13px] text-text">Nhóm hàng</label>
              <Select
                options={categories}
                selected={categories.find(cat => cat.id === form.category) || null}
                onChange={(item: SelectOption) => handleInputChange('category', item.id)}
                placeholder="Chọn nhóm hàng"
                className={`w-full ${errors.category ? 'border-red-500' : ''}`}
              />
              {errors.category && <span className="text-red-500 text-xs mt-1">{errors.category}</span>}
            </div>
            <div>
              <label className="block mb-1 text-[13px] text-text">Thương hiệu</label>
              <Select
                options={brands}
                selected={brands.find(brand => brand.id === form.brand) || null}
                onChange={(item: SelectOption) => handleInputChange('brand', item.id)}
                placeholder="Chọn thương hiệu"
                className={`w-full ${errors.brand ? 'border-red-500' : ''}`}
              />
              {errors.brand && <span className="text-red-500 text-xs mt-1">{errors.brand}</span>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-[13px] text-text">Số lượng</label>
              <Input
                type="number"
                value={form.quantity}
                onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 0)}
                placeholder="Nhập số lượng"
                variant="outline"
                className={errors.quantity ? 'border-red-500' : ''}
              />
              {errors.quantity && <span className="text-red-500 text-xs mt-1">{errors.quantity}</span>}
            </div>
            <div>
              <label className="block mb-1 text-[13px] text-text">Giá bán</label>
              <Input
                type="number"
                value={form.unitPrice}
                onChange={(e) => handleInputChange('unitPrice', parseFloat(e.target.value) || 0)}
                placeholder="Nhập giá bán"
                variant="outline"
                className={errors.unitPrice ? 'border-red-500' : ''}
              />
              {errors.unitPrice && <span className="text-red-500 text-xs mt-1">{errors.unitPrice}</span>}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6">
            <Button 
              label="Hủy"
              className="px-6 py-2 hover:bg-gray-100"
              onAction={handleCancel}
            />
            <Button
              label="Lưu"
              className="px-6 py-2 bg-green hover:bg-green/90"
              onAction={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
