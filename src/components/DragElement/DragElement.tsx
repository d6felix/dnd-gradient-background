import { useDrag } from "react-dnd";
import React from "react";
type DragElementProps = React.PropsWithChildren<{
    className?: string;
    type: string;
    index: number;
}>

export type DragType = {
    type: string;
    index: number;
};

export const DragElement: React.FC<DragElementProps> = ({ children, className = "", type, index }) => {
    const [{ isDragging }, drag] = useDrag({
        type: type,
        item: { type, index },
        collect: (monitor) => {
            return {
                isDragging: !!monitor.isDragging()
            };
        }
    });
    return (
        <div ref={drag}>
            {children}
        </div >
    );
};

export default DragElement;