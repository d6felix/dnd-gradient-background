import classNames from "classnames";
import React from "react";

export type ButtonProps = React.PropsWithChildren<{
    loading?: boolean;
    children: React.ReactNode;
    disabled?: boolean;
    classname?: string;
}> &
    React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
    children,
    loading = false,
    className = "",
    disabled = false,
    ...props
}) => {
    return (
        <button
            {...props}
            disabled={loading || disabled}
            className={classNames(
                className,
            )}
        >
        </button>
    );
};

export default Button;
