"use client";

import ContainerLayout from "@/components/layouts/ContainerLayout/page";
import UserForm from "@/components/molecules/UserForm";
import { User, UserRole } from "@/interfaces/auth.type";
import { useGetAllUsersQuery, useUpdateUserMutation } from "@/redux/apis/manageuser.api";
import { useState, useMemo } from "react";

export default function UserManagementPage() {
    const [activeTab, setActiveTab] = useState<UserRole | "all">("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<boolean | "all">("all");
    const [viewUser, setViewUser] = useState<User | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editUser, setEditUser] = useState<User | null>(null);

    // Map state to query parameters
    const queryParams = useMemo(() => ({
        role: activeTab === "all" ? undefined : activeTab,
        is_active: statusFilter === "all" ? undefined : statusFilter,
        search: searchQuery || undefined,
    }), [activeTab, statusFilter, searchQuery]);

    // Fetch users
    const { data: users = [], isLoading, error } = useGetAllUsersQuery(queryParams);
    const [updateUser] = useUpdateUserMutation();

    const handleViewUser = (user: User) => {
        setViewUser(user);
    };

    const handleEditUser = (user: User) => {
        setEditUser(user);
        setIsEditModalOpen(true);
    };

    const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
        try {
            await updateUser({ id: userId, is_active: !currentStatus }).unwrap();
        } catch (err) {
            console.error("Failed to toggle status:", err);
        }
    };

    const handleUpdateUser = async (updatedUser: User) => {
        try {
            await updateUser(updatedUser).unwrap();
            setIsEditModalOpen(false);
            setEditUser(null);
        } catch (err) {
            console.error("Failed to update user:", err);
        }
    };

    return (
        <ContainerLayout>
            <div className="mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Quản lý người dùng</h1>

                {/* Tabs and Filters */}
                <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                    <div className="flex gap-2">
                        <button
                            className={`px-4 py-2 rounded ${activeTab === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
                            onClick={() => setActiveTab("all")}
                        >
                            Tất cả
                        </button>
                        <button
                            className={`px-4 py-2 rounded ${activeTab === "customer" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
                            onClick={() => setActiveTab("customer")}
                        >
                            Người mua
                        </button>
                        <button
                            className={`px-4 py-2 rounded ${activeTab === "seller" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
                            onClick={() => setActiveTab("seller")}
                        >
                            Người bán
                        </button>
                    </div>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên, mã người dùng..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                            value={statusFilter.toString()}
                            onChange={(e) => setStatusFilter(e.target.value === "all" ? "all" : e.target.value === "true")}
                            className="border border-gray-300 rounded px-3 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">Tất cả</option>
                            <option value="true">Kích hoạt</option>
                            <option value="false">Vô hiệu</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                {isLoading ? (
                    <div className="text-center py-4">Đang tải...</div>
                ) : error ? (
                    <div className="text-center py-4 text-red-500">Lỗi khi tải dữ liệu.</div>
                ) : (
                    <div className="bg-white shadow rounded-lg">
                        <table className="w-full divide-y divide-gray-200 table-auto">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên đăng nhập</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số điện thoại</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vai trò</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                            Không tìm thấy người dùng.
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr key={user.id}>
                                            <td className="px-6 py-4 text-sm text-gray-900 truncate max-w-[120px]">{user.username}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900 truncate max-w-[200px]">{user.email}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{user.phone}</td>
                                            <td className="px-6 py-4 text-sm">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs ${user.role.name === "customer" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                                                        }`}
                                                >
                                                    {user.role.name === "customer" ? "Người mua" : "Người bán"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs ${user.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                                        }`}
                                                >
                                                    {user.is_active ? "Kích hoạt" : "Vô hiệu"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <div className="flex gap-2 flex-wrap">
                                                    <button
                                                        onClick={() => handleViewUser(user)}
                                                        className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                                                    >
                                                        Xem
                                                    </button>
                                                    <button
                                                        onClick={() => handleEditUser(user)}
                                                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                                    >
                                                        Sửa
                                                    </button>
                                                    <button
                                                        onClick={() => handleToggleStatus(user.id, user.is_active)}
                                                        className={`px-3 py-1 rounded ${user.is_active
                                                            ? "bg-red-600 text-white hover:bg-red-700"
                                                            : "bg-green-600 text-white hover:bg-green-700"
                                                            }`}
                                                    >
                                                        {user.is_active ? "Khóa" : "Mở"}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* View Modal */}
                {viewUser && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
                            <h2 className="text-lg font-semibold mb-4 text-gray-800">Chi tiết người dùng</h2>
                            <div className="space-y-4">
                                <p><strong>Tên đăng nhập:</strong> {viewUser.username}</p>
                                <p><strong>Email:</strong> {viewUser.email}</p>
                                <p><strong>Số điện thoại:</strong> {viewUser.phone}</p>
                                <p><strong>Vai trò:</strong> {viewUser.role.name === "customer" ? "Người mua" : "Người bán"}</p>
                                <p><strong>Trạng thái:</strong> {viewUser.is_active ? "Kích hoạt" : "Vô hiệu"}</p>
                                <p><strong>Ngày tạo:</strong> {new Date(viewUser.created_at).toLocaleString()}</p>
                                <p><strong>Ngày cập nhật:</strong> {new Date(viewUser.updated_at).toLocaleString()}</p>
                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={() => setViewUser(null)}
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                                    >
                                        Đóng
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleEditUser(viewUser);
                                            setViewUser(null);
                                        }}
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Sửa
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Modal */}
                {isEditModalOpen && editUser && (
                    <UserForm
                        isOpen={isEditModalOpen}
                        setIsOpen={setIsEditModalOpen}
                        user={editUser}
                        onUpdateUser={handleUpdateUser}
                    />
                )}
            </div>
        </ContainerLayout>
    );
}