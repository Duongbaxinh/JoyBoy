import React, {ReactNode} from "react";

function ContainerShadow({
    className,
    children
}: {
    className?: string;
    children: ReactNode;
}) {
    return (
        <div className={`p-2 bg-white shadow-md rounded-md ${className}`}>
            {children}
        </div>
    );
}

export default ContainerShadow;
