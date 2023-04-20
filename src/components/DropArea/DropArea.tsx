import React from "react";
import { useDrop } from "react-dnd";
import { DragType } from "../DragElement/DragElement";
import { ItemTypes, Selected } from "../../../src/App";

type DropAreaProps = React.PropsWithChildren<{
    type: string;
    selected: Selected[];
    indexDropArea: number;
    setSelected: React.Dispatch<React.SetStateAction<Selected[]>>;
}>;

export const DropArea: React.FC<DropAreaProps> = ({ children, type, indexDropArea, selected, setSelected }) => {
    const [collectedProps, drop] = useDrop({
        accept: [ItemTypes.CALC, ItemTypes.STORE],
        drop: (item: DragType, monitor) => {
            if (item.type !== type) {
                setSelected([...selected.slice(0, item.index),
                { isSelected: !selected[item.index].isSelected, position: indexDropArea },
                ...selected.slice(item.index + 1)]);
            } else {
                setSelected([...selected.slice(0, item.index),
                { isSelected: selected[item.index].isSelected, position: indexDropArea },
                ...selected.slice(item.index + 1)]);
            }
        },
        canDrop: (item, monitor) => {
            const itemIsSelected = selected[item.index].isSelected;
            const positionOccupied = selected.findIndex(value =>
                item.type !== type &&
                value.position === indexDropArea &&
                !value.isSelected === itemIsSelected) !== -1;
            return positionOccupied === false;
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    });

    return (
        <div ref={drop}>
            {children}
        </div>
    )
}

export default DropArea;