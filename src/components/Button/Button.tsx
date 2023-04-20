import classNames from "classnames";
import React from "react";

export type ButtonProps = React.PropsWithChildren<{
    children: React.ReactNode;
    disabled?: boolean;
    classname?: string;
}> &
    React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
    children,
    className = "",
    disabled = false,
    ...props
}) => {
    return (
        <button
            {...props}
            disabled={disabled}
            className={classNames(
                className,
            )}
        >
            {children}
        </button>
    );
};

export default Button;
