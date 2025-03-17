'use client';
import Button from '@/components/atoms/Button';
import IconButton from '@/components/atoms/IconButton';
import Input from '@/components/atoms/Input';
import Popup from '@/components/atoms/Popup';
import Select from '@/components/atoms/Select';
import { attributes, brands, categories, productList, units } from '@/fake';
import { CreateProductForm, ProductProperty, SelectOption, productSchema } from '@/interfaces/createProduct.interface';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiPlus, BiTrash } from 'react-icons/bi';
import SimilarProductsTable from './components/SimilarProductsTable';
import FilterOption from '@/components/atoms/FilterOption';
import { CancelIcon } from '@/assets/icons';

const CreateProduct = () => {
  const { register, handleSubmit, formState: { errors }, setValue, trigger, watch } = useForm<CreateProductForm>({
    defaultValues: {
      code: '',
      name: '',
      description: '',
      category: '',
      brand: '',
      quantity: 0,
      unitPrice: 0,
      barcode: '',
      location: '',
      costPrice: 0,
      weight: 0,
      directSale: false,
      images: [],
      minQuantity: 0,
      maxQuantity: 0,
      unit: '',
      properties: []
    },
    mode: 'onChange',
    resolver: yupResolver(productSchema)
  });

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'description'>('info');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [properties, setProperties] = useState<SelectOption[]>(attributes);
  const [combineAtr, setCombineAtr] = useState<{ key: SelectOption | null, values: any }[]>([]);
  const [inputValue, setInputValue] = useState('')
  const [propertyName, setPropertyName] = useState('');
  const [propertyValue, setPropertyValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (data: CreateProductForm) => {
    console.log('Form submitted:', data);
  };

  const handleCancel = () => {
    // Reset form
    setValue('code', '');
    setValue('name', '');
    setValue('description', '');
    setValue('category', '');
    setValue('brand', '');
    setValue('quantity', 0);
    setValue('unitPrice', 0);
    setValue('barcode', '');
    setValue('location', '');
    setValue('costPrice', 0);
    setValue('weight', 0);
    setValue('directSale', false);
    setValue('images', []);
    setValue('minQuantity', 0);
    setValue('maxQuantity', 0);
    setValue('unit', '');
    setValue('properties', []);
    setImageUrls([]);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newUrls = files.map(file => URL.createObjectURL(file));
      setImageUrls(prev => [...prev, ...newUrls]);
      setValue('images', [...(watch('images') || []), ...files]);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (index: number) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    const newFiles = watch('images').filter((_, i) => i !== index);
    setImageUrls(newUrls);
    setValue('images', newFiles);
  };

  const handleRemoveAttribute = (key: SelectOption | null, valueRemove: any) => {
    const attribute = combineAtr.find((item) => item.key?.id === key?.id)
    if (!attribute) throw Error("not found attribute!!!")
    let valueAttribute = [...attribute.values];
    valueAttribute = valueAttribute.filter((item) => item !== valueRemove)
    attribute.values = valueAttribute
    setCombineAtr((prev) => prev.filter((item) => item.key?.id === key?.id ? attribute : item))
  };


  const addProperties = ({ key, value }: { key: SelectOption | null, value: any }) => {
    const combine = combineAtr.find((item) => item.key?.id === key?.id)
    console.log("check add values 1 ::: ", combine)

    if (!combine) {
      setCombineAtr((prev) => ([...prev, { key: key, values: value }]))
    } else {
      combine.values.push(value)
      const newCombineAtr = [...combineAtr].map((item) => item.key?.id === combine.key?.id ? combine : item)
      setCombineAtr([...newCombineAtr])
    }
  }


  const handleSetAttribute = (key: SelectOption | null, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addProperties({ key, value: e.currentTarget.value })
      e.currentTarget.value = ""
    }
  }
  const handleAddAttribute = () => {
    setCombineAtr((prev) => ([...prev, { key: null, values: [] }]))
  }
  const handleChooseAttribute = (indexItem: number, itemSelect: SelectOption) => {
    const checkAttribute = combineAtr.find((item) => item.key?.id === itemSelect.id)
    if (checkAttribute) throw new Error("error ")
    const attribute = combineAtr[indexItem]
    attribute.key = itemSelect
    setCombineAtr(prev => prev.map((item, index) => index === indexItem ? attribute : item))
  }

  return (
    <>
      <IconButton
        className="!bg-transparent"
        onFC={() => setIsOpen(!isOpen)}
        icon={<BiPlus className="text-text text-[18px]" />}
      />
      <Popup isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <>
          <div className="bg-white rounded-lg text-text max-h-[80vh] overflow-auto ">
            <div className="border-b">
              <div className="flex items-center">
                <button
                  className={`px-4 py-3 text-[13px] font-medium border-b-2 ${activeTab === 'info' ? 'text-primary border-primary' : 'text-text border-transparent'}`}
                  onClick={() => setActiveTab('info')}
                >
                  Thông tin
                </button>
                <button
                  className={`px-4 py-3 text-[13px] font-medium border-b-2 ${activeTab === 'description' ? 'text-primary border-primary' : 'text-text border-transparent'}`}
                  onClick={() => setActiveTab('description')}
                >
                  Mô tả
                </button>
              </div>
            </div>

            <div className="p-4">
              {activeTab === 'info' && (
                <div className="w-full min-w-[960px] max-w-[960px] ">
                  <div className="w-full flex gap-4">
                    <div className="flex-1">
                      <div className="space-y-5">
                        <div className='flex items-center'>
                          <label className="block w-[150px] mb-1 text-[13px] text-text font-bold whitespace-nowrap">Mã hàng:</label>
                          <div className="w-full">
                            <Input
                              {...register('code')}
                              placeholder="Mã hàng tự động"
                              variant="underline"
                              className={`${errors.code ? 'border-red-500' : ''} !p-1`}
                              error={!!errors.code}
                              message={errors.code?.message}
                            />
                          </div>
                        </div>

                        <div className='flex items-center'>
                          <label className="block w-[150px] mb-1 text-[13px] text-text font-bold whitespace-nowrap">Mã vạch:</label>
                          <div className="w-full">
                            <Input
                              {...register('barcode')}
                              placeholder="Nhập mã vạch"
                              variant="underline"
                              className="!p-1"
                            />
                          </div>
                        </div>

                        <div className='flex items-center'>
                          <label className="block w-[150px] mb-1 text-[13px] text-text font-bold whitespace-nowrap">Tên hàng:</label>
                          <div className="w-full">
                            <Input
                              {...register('name')}
                              placeholder="Nhập tên hàng"
                              variant="underline"
                              className={`${errors.name ? 'border-red-500' : ''} !p-1`}
                              error={!!errors.name}
                              message={errors.name?.message}
                            />
                          </div>
                        </div>

                        <div className='flex items-center'>
                          <label className="block w-[150px] mb-1 text-[13px] text-text font-bold whitespace-nowrap">Nhóm hàng:</label>
                          <div className="w-full">
                            <Select
                              className='!p-0'
                              options={categories}
                              selected={categories.find(cat => cat.id === watch('category')) || null}
                              onChange={(item: SelectOption) => {
                                setValue('category', item.id);
                                trigger('category');
                              }}
                              placeholder="--Lựa chọn--"
                              variant="underline"
                              error={!!errors.category}
                              message={errors.category?.message}
                            />
                          </div>
                        </div>

                        <div className='flex items-center'>
                          <label className="block w-[150px] mb-1 text-[13px] text-text font-bold whitespace-nowrap">Thương hiệu:</label>
                          <div className="w-full">
                            <Select
                              className='!p-0'
                              options={brands}
                              selected={brands.find(brand => brand.id === watch('brand')) || null}
                              onChange={(item: SelectOption) => {
                                setValue('brand', item.id);
                                trigger('brand');
                              }}
                              placeholder="--Chọn thương hiệu--"
                              variant="underline"
                              error={!!errors.brand}
                              message={errors.brand?.message}
                            />
                          </div>
                        </div>

                        <div className='flex items-center'>
                          <label className="block w-[150px] mb-1 text-[13px] text-text font-bold whitespace-nowrap">Vị trí:</label>
                          <div className="w-full">
                            <Input
                              {...register('location')}
                              placeholder="Nhập vị trí"
                              variant="underline"
                              className="!p-1"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex gap-4 flex-wrap">
                            {imageUrls.map((url, index) => (
                              <div key={url} className="relative w-24 h-24 border border-separate rounded-lg overflow-hidden group">
                                <Image
                                  src={url}
                                  alt={`Product image ${index + 1}`}
                                  fill
                                  className="object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(index)}
                                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={handleImageClick}
                              className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-500 hover:border-gray-500 transition-colors"
                            >
                              +
                            </button>
                            <input
                              type="file"
                              ref={fileInputRef}
                              className="hidden"
                              accept="image/*"
                              multiple
                              onChange={handleImageChange}
                            />
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="flex-1">
                      <div className="space-y-4">
                        <div className='flex items-center'>
                          <label className="block w-[150px] mb-1 text-[13px] text-text font-bold whitespace-nowrap">Giá vốn:</label>
                          <div className="w-full">
                            <Input
                              type="number"
                              {...register('costPrice')}
                              placeholder="0"
                              variant="underline"
                              className={`${errors.costPrice ? 'border-red-500' : ''} !p-1`}
                              error={!!errors.costPrice}
                              message={errors.costPrice?.message}
                            />
                          </div>
                        </div>

                        <div className='flex items-center'>
                          <label className="block w-[150px] mb-1 text-[13px] text-text font-bold whitespace-nowrap">Giá bán:</label>
                          <div className="w-full">
                            <Input
                              type="number"
                              {...register('unitPrice')}
                              placeholder="0"
                              variant="underline"
                              className={`${errors.unitPrice ? 'border-red-500' : ''} !p-1`}
                              error={!!errors.unitPrice}
                              message={errors.unitPrice?.message}
                            />
                          </div>
                        </div>

                        <div className='flex items-center'>
                          <label className="block w-[150px] mb-1 text-[13px] text-text font-bold whitespace-nowrap">Tồn kho:</label>
                          <div className="w-full">
                            <Input
                              type="number"
                              {...register('quantity')}
                              placeholder="0"
                              variant="underline"
                              className={`${errors.quantity ? 'border-red-500' : ''} !p-1`}
                              error={!!errors.quantity}
                              message={errors.quantity?.message}
                            />
                          </div>
                        </div>

                        <div className='flex items-center'>
                          <label className="block w-[150px] mb-1 text-[13px] text-text font-bold whitespace-nowrap">Trọng lượng:</label>
                          <div className="w-full flex gap-2">
                            <Input
                              type="number"
                              {...register('weight')}
                              placeholder="0"
                              variant="underline"
                              className={`${errors.weight ? 'border-red-500' : ''} !p-1`}
                              error={!!errors.weight}
                              message={errors.weight?.message}
                            />
                            <Select
                              onChange={(item: SelectOption) => {
                                setValue('unit', item.id);
                                trigger('unit');
                              }}
                              placeholder='Chọn đơn vị'
                              className='max-w-[60px] !p-0'
                              variant='underline'
                              selected={units.find((item) => item.id === watch("unit"))}
                              options={units}
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                          <input
                            type="checkbox"
                            {...register('directSale')}
                            id="directSale"
                            className="rounded border-gray-300"
                          />
                          <label htmlFor="directSale" className="text-[13px] text-text">
                            Bán trực tiếp
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">

                    <FilterOption title='Thuộc tính' className='border border-lightGray my-5'>

                      {combineAtr.map((item, index) => (
                        <div className="flex items-center gap-8">

                          <Select
                            variant='underline'
                            className='max-w-[300px] min-w-[300px] !p-0'
                            onChange={(item: SelectOption) => { handleChooseAttribute(index, item) }}
                            selected={item.key ?? null} options={properties} placeholder='---Chọn thuộc tính---' />
                          <div className="flex border-b-[1px] border-green pb-[7px]">
                            <div className="flex flex-wrap items-center gap-1">
                              {
                                item.values.map((valueKey: any) =>
                                  <div className="flex  gap-4 items-center justify-between p-1  text-white bg-blue-400 w-fit  rounded-sm">
                                    <div className=" text-[13px] ">{valueKey} </div>
                                    <IconButton
                                      onFC={() => handleRemoveAttribute(item.key || null, valueKey)}
                                      className='bg-transparent hover:bg-transparent !p-0'
                                      icon={<CancelIcon className='text-white' />} />
                                  </div>
                                )
                              }
                              <input className=' outline-none border-0' onKeyDown={(e) => handleSetAttribute(item.key, e)} />
                            </div>
                          </div>
                        </div>
                      ))}
                      <IconButton className='mt-3' icon={<BiPlus />} label='Thêm thuộc tính' onFC={handleAddAttribute} />
                    </FilterOption>

                    <FilterOption title='Đơn vị tính' className='border border-lightGray my-5'>

                      {combineAtr.map((item, index) => (
                        <div className="flex items-center gap-8">

                          <Select
                            variant='underline'
                            className='max-w-[300px] min-w-[300px] !p-0'
                            onChange={(item: SelectOption) => { handleChooseAttribute(index, item) }}
                            selected={item.key ?? null} options={properties} placeholder='---Chọn thuộc tính---' />
                          <div className="flex border-b-[1px] border-green pb-[7px]">
                            <div className="flex flex-wrap items-center gap-1">
                              {
                                item.values.map((valueKey: any) =>
                                  <div className="flex  gap-4 items-center justify-between p-1  text-white bg-blue-400 w-fit  rounded-sm">
                                    <div className=" text-[13px] ">{valueKey} </div>
                                    <IconButton
                                      onFC={() => handleRemoveAttribute(item.key || null, valueKey)}
                                      className='bg-transparent hover:bg-transparent !p-0'
                                      icon={<CancelIcon className='text-white' />} />
                                  </div>
                                )
                              }
                              <input className=' outline-none border-0' onKeyDown={(e) => handleSetAttribute(item.key, e)} />
                            </div>
                          </div>
                        </div>
                      ))}
                      <IconButton className='mt-3' icon={<BiPlus />} label='Thêm thuộc tính' onFC={handleAddAttribute} />
                    </FilterOption>

                    <SimilarProductsTable products={productList} onDelete={() => { }} onEdit={() => { }} />

                  </div>

                </div>

              )}

              {activeTab === 'description' && (
                <div className="w-full min-w-[960px] flex flex-col gap-4">
                  <div>
                    <label className="block mb-2 text-[13px] text-text font-bold">Mô tả chi tiết:</label>
                    <textarea
                      {...register('description')}
                      className={`w-full min-h-[200px] p-3 border rounded-lg resize-y ${errors.description ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="Nhập mô tả sản phẩm..."
                    />
                    {errors.description && (
                      <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 text-[13px] text-text font-bold">Định mức tồn:</label>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Input
                          type="number"
                          {...register('minQuantity')}
                          placeholder="0"
                          variant="underline"
                          className={`${errors.minQuantity ? 'border-red-500' : ''} !p-1`}
                          error={!!errors.minQuantity}
                          message={errors.minQuantity?.message}
                        />
                        <div className="text-[11px] text-gray-500 mt-1">Tối thiểu</div>
                      </div>
                      <div className="flex-1">
                        <Input
                          type="number"
                          {...register('maxQuantity')}
                          placeholder="0"
                          variant="underline"
                          className={`${errors.maxQuantity ? 'border-red-500' : ''} !p-1`}
                          error={!!errors.maxQuantity}
                          message={errors.maxQuantity?.message}
                        />
                        <div className="text-[11px] text-gray-500 mt-1">Tối đa</div>
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 p-4 border-t">
              <Button
                label="Huỷ bỏ"
                className="bg-white border border-gray-300 hover:bg-gray-50"
                onAction={handleCancel}
              />
              <Button
                label="Lưu"
                className="bg-primary text-white hover:bg-primary/90"
                onAction={handleSubmit(onSubmit)}
              />
            </div>
          </div>

        </>

      </Popup>
    </>
  );
};

export default CreateProduct;
