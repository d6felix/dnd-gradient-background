import React from "react";
import { useDrop } from "react-dnd";

type DropAreaProps = React.PropsWithChildren<{
    type: string;
}>;

export const DropArea: React.FC<DropAreaProps> = ({ children, type }) => {
    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: type,
            drop: () => { },
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        }),
        []
    )

    return (
        <div ref={drop}>
            {children}
        </div>
    )
}

export default DropArea;