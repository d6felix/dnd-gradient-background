import { useDrag } from "react-dnd";
import React from "react";
type DragElementProps = React.PropsWithChildren<{
    className?: string;
    type: string
}>

export const DragElement: React.FC<DragElementProps> = ({ children, className = "", type }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: type,
        collect: (monitor) => {
            return {
                isDragging: !!monitor.isDragging()
            };
        }
    }));
    return (
        <div ref={drag}>
            {children}
        </div >
    );
};

export default DragElement;