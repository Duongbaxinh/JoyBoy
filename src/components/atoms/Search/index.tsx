
import React, { ChangeEvent, ReactNode, useRef, useState } from 'react';
import Input from '../Input';
import { SearchIcon } from '@/assets/icons';
import useClickOutside from '@/hooks/useClickOuside';

function Search({ className,
    onBlur,
    children,
    titleSearch,
    textSearch,
    onSearch, suggestions, tailIcon, tailIconSecond,
    classInput, onHandleTailIcon, onHandleTaiIconSecond, }: {
        className?: string, children: ReactNode, titleSearch: string,
        textSearch: string,
        classInput?: string,
        onSearch: (e: ChangeEvent<HTMLInputElement>) => void,
        suggestions?: any,
        tailIcon?: ReactNode,
        onHandleTailIcon?: () => void;
        onBlur?: () => void;
        onHandleTaiIconSecond?: () => void;
        tailIconSecond?: ReactNode
    }) {
    const refSearch = useRef<HTMLDivElement | null>(null);
    return (
        <div className='w-full min-w-[100px] relative h-full'>
            <Input className={className}
                onBlur={onBlur}
                value={textSearch}
                onChange={onSearch} placeholder={titleSearch}
                leadingIcon={<SearchIcon />}
                tailIcon={tailIcon}
                tailIconSecond={tailIconSecond}
                onHandleTailIcon={onHandleTailIcon}
                classInput={classInput}
            />
            <div ref={refSearch} className="absolute z-30 top-auto left-0 bg-white shadow-md w-full h-fit max-h-[400px] rounded-md overflow-auto">
                {children}
            </div>

        </div>
    );
}

export default Search;