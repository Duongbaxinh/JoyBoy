// src/components/InputForm.tsx
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface NumberInputProps {
    leadingIcon?: React.ReactNode,
    register?: UseFormRegisterReturn;
    error?: FieldError;
    placeholder?: string;
    className?: string;
    type?: string
    defaultValue?: any
    onChange?: any
}


const InputForm: React.FC<NumberInputProps> = ({ register, leadingIcon, error, placeholder, type, defaultValue, onChange, className = "" }) => {
    return (
        <div className="flex items-center gap-2">
            {leadingIcon && (leadingIcon)}
            <div className="flex flex-col">
                <input

                    defaultValue={defaultValue}
                    type={type || "text"}
                    {...register}
                    onChange={onChange ? onChange : () => { }}
                    placeholder={placeholder}
                    className={`mt-1 p-2 w-full border border-purple-300 rounded ${className} ${error ? "border-red-500" : ""}`}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
            </div>
        </div>
    );
};

export default InputForm;