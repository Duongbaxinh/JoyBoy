import React from 'react';
import { BiTrash, BiPencil } from 'react-icons/bi';
import IconButton from '@/components/atoms/IconButton';
import Input from '@/components/atoms/Input';

interface SimilarProduct {
  name: string;
  unit: string;
  productCode: string;
  barcode: string;
  costPrice: number;
  sellingPrice: number;
  stock: number;
}

interface Props {
  products: SimilarProduct[];
  onEdit: (index: number, field: keyof SimilarProduct, value: string | number) => void;
  onDelete: (index: number) => void;
}

const SimilarProductsTable: React.FC<Props> = ({ products, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg border">
      <div className="p-4 border-b">
        <h3 className="text-[13px] font-medium">Danh sách hàng hóa cùng loại</h3>
        <div className="text-[12px] text-gray-500 mt-1">
          Danh sách bao gồm {products.length} hàng hóa cùng loại
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-4 py-3 text-left font-medium">Tên</th>
              <th className="px-4 py-3 text-left font-medium">Đơn vị</th>
              <th className="px-4 py-3 text-left font-medium">Mã hàng</th>
              <th className="px-4 py-3 text-left font-medium">Mã vạch</th>
              <th className="px-4 py-3 text-right font-medium">Giá vốn</th>
              <th className="px-4 py-3 text-right font-medium">Giá bán</th>
              <th className="px-4 py-3 text-right font-medium">Tồn kho</th>
              <th className="w-[100px] px-4 py-3 text-center font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">{product.unit}</td>
                <td className="px-4 py-3">
                  <Input
                    value={product.productCode}
                    placeholder="Mã hàng tự động"
                    variant="underline"
                    className="!p-1 text-gray-500"
                    readOnly
                  />
                </td>
                <td className="px-4 py-3">
                  <Input
                    value={product.barcode}
                    onChange={(e) => onEdit(index, 'barcode', e.target.value)}
                    placeholder="Nhập mã vạch"
                    variant="underline"
                    className="!p-1"
                  />
                </td>
                <td className="px-4 py-3">
                  <Input
                    type="number"
                    value={product.costPrice}
                    onChange={(e) => onEdit(index, 'costPrice', Number(e.target.value))}
                    placeholder="0"
                    variant="underline"
                    className="!p-1 text-right"
                  />
                </td>
                <td className="px-4 py-3">
                  <Input
                    type="number"
                    value={product.sellingPrice}
                    onChange={(e) => onEdit(index, 'sellingPrice', Number(e.target.value))}
                    placeholder="0"
                    variant="underline"
                    className="!p-1 text-right"
                  />
                </td>
                <td className="px-4 py-3">
                  <Input
                    type="number"
                    value={product.stock}
                    onChange={(e) => onEdit(index, 'stock', Number(e.target.value))}
                    placeholder="0"
                    variant="underline"
                    className="!p-1 text-right"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <IconButton
                      className="!bg-transparent"
                      onFC={() => {/* Handle edit */ }}
                      icon={<BiPencil className="text-primary text-[18px]" />}
                    />
                    <IconButton
                      className="!bg-transparent"
                      onFC={() => onDelete(index)}
                      icon={<BiTrash className="text-red-500 text-[18px]" />}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SimilarProductsTable;
