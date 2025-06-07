"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Popup from "@/components/atoms/Popup";
import { User, UserRole } from "@/interfaces/auth.type";
import { useEffect } from "react";

export type UserFormType = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    user: User;
    onUpdateUser: (updatedUser: User) => void;
};

interface FormValues {
    id: string;
    username: string;
    email: string;
    phone: string;
    role: UserRole;
    is_active: boolean;
}

function UserForm({ isOpen, setIsOpen, user, onUpdateUser }: UserFormType) {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            id: user.id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            role: (user.role.name as UserRole) ?? "customer",
            is_active: user.is_active,
        },
    });

    useEffect(() => {
        reset({
            id: user.id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            role: (user.role.name as UserRole) ?? "customer",
            is_active: user.is_active,
        });
    }, [user, reset]);

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const updatedUser: User = {
            id: data.id,
            username: data.username,
            email: data.email,
            phone: data.phone,
            role: {
                ...user.role,
                name: data.role,
            },
            is_active: data.is_active,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };

        onUpdateUser(updatedUser);
        setIsOpen(false);
        reset();
    };

    return (
        <Popup isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="p-6 bg-white rounded-lg w-full max-w-3xl">
                <h2 className="text-lg font-semibold mb-6 text-gray-800">Chỉnh sửa người dùng</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tên đăng nhập</label>
                                <input
                                    {...register("username", { required: "Tên đăng nhập là bắt buộc" })}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    {...register("email", {
                                        required: "Email là bắt buộc",
                                        pattern: { value: /^\S+@\S+$/i, message: "Email không hợp lệ" },
                                    })}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                                <input
                                    {...register("phone", {
                                        required: "Số điện thoại là bắt buộc",
                                        pattern: { value: /^[0-9]{10}$/, message: "Số điện thoại phải có 10 chữ số" },
                                    })}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Vai trò</label>
                                <select
                                    {...register("role", { required: "Vai trò là bắt buộc" })}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="customer">Người mua</option>
                                    <option value="seller">Người bán</option>
                                </select>
                                {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
                                <select
                                    {...register("is_active", { required: "Trạng thái là bắt buộc" })}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="true">Kích hoạt</option>
                                    <option value="false">Vô hiệu</option>
                                </select>
                                {errors.is_active && <p className="text-red-500 text-sm mt-1">{errors.is_active.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2 mt-6">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Lưu
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setIsOpen(false);
                                reset();
                            }}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                        >
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </Popup>
    );
}

export default UserForm;