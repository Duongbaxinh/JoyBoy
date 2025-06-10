'use client';


import InputForm from '@/components/atoms/InputForm';
import { AuthDataLogin } from '@/interfaces/auth.type';
import { useLoginMutation } from '@/redux/slices/auth.slice';
import { authLoginValid } from '@/validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthDataLogin>({
        resolver: yupResolver(authLoginValid),
        mode: 'onChange', // Enable real-time validation
    });

    const [showPassword, setShowPassword] = useState(false);
    const [login, { isLoading }] = useLoginMutation();
    const router = useRouter();

    const handleLogin = async (dataLogin: AuthDataLogin) => {
        try {
            const res = await login(dataLogin).unwrap();
            console.log("check res ::: ", res)
            if (res.access_token) {
                localStorage.setItem('admin_AccessToken', JSON.stringify(res.access_token));
                localStorage.setItem('admin_FreshToken', JSON.stringify(res.refresh_token));
                toast.success('Đăng nhập thành công!');
                router.push('/product/category');
            }
        } catch (error: any) {
            console.log("check :::", error)
            toast.error(error?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
        }
    };

    const onSubmit: SubmitHandler<AuthDataLogin> = (data) => {
        handleLogin(data);
    };

    return (
        <div className=" flex items-center justify-center w-full h-screen">
            <div className="bg-white h-fit w-[600px] my-0 mx-auto shadow p-4 rounded-md">
                <div className="flex justify-center w-full">
                    <div className="w-full bg-white flex flex-col justify-center">
                        <h1 className="text-2xl font-bold mb-2 uppercase text-center">Đăng nhập</h1>
                        <p className="text-[14px] leading-[17px] font-[500] mb-6 text-center">
                            Hành trình làm đẹp của bạn bắt đầu từ đây
                        </p>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                            <div className="mb-1 sm:mb-4 relative w-full">
                                <InputForm
                                    className="!px-1 !py-3 sm:px-3 sm:py-5 border border-color"
                                    placeholder="Nhập email của bạn"
                                    register={{ ...register("username") }}
                                    error={errors.username}
                                />
                            </div>
                            <div className="mb-1 sm:mb-4 relative w-full">
                                <InputForm
                                    className="!px-1 !py-3 sm:px-3 sm:py-5 border border-color"
                                    placeholder="Nhập mật khẩu"
                                    register={{ ...register("password") }}
                                    error={errors.password}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient rounded-full text-white p-1 sm:p-3 hover:bg-purple-700 transition disabled:bg-purple-400"
                            >
                                {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;