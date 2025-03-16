import React, { ReactNode } from 'react';
import { LuFolderInput } from 'react-icons/lu';

function FileInput({ multiple = false, label, customInputFile, className, icon = <LuFolderInput />, onChange }: { multiple?: boolean, customInputFile?: string, className?: string, icon?: ReactNode, onChange: React.ChangeEventHandler<HTMLInputElement>; label: string }) {
    return (
        <div className={`px-3 py-1 flex items-center rounded-sm gap-2 bg-green hover:bg-darkGreen text-white text-[15px] font-bold  ${className}`}>
            {icon}
            <label htmlFor="inputFile">{label}</label>
            <input id='inputFile' type='file' onChange={onChange} multiple={multiple} className={`${customInputFile} hidden`} />
        </div>
    );
}

export default FileInput;