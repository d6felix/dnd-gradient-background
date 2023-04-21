import React from "react";
import { useDrop } from "react-dnd";
import { DragType } from "@components/DragElement/DragElement";
import { ItemTypes, Selected } from "@App";
import classNames from "classnames";

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
            const itemIsSelected = selected[item.index].isSelected;
            const positionOccupied = selected.findIndex(value =>
                (
                    item.type !== type &&
                    value.position === indexDropArea &&
                    !value.isSelected === itemIsSelected
                ) || (
                    item.type === type &&
                    value.position === indexDropArea &&
                    value.isSelected === itemIsSelected
                ));
            if (positionOccupied === -1) {
                setSelected([...selected.slice(0, item.index),
                { isSelected: (item.type !== type) != selected[item.index].isSelected, position: indexDropArea },
                ...selected.slice(item.index + 1)]);
            }
            else {
                const dragItem = { isSelected: selected[item.index].isSelected, position: selected[item.index].position };
                const dropItem = { isSelected: selected[positionOccupied].isSelected, position: selected[positionOccupied].position };
                const selectedWithSwap = [...selected];
                selectedWithSwap[positionOccupied] = dragItem;
                selectedWithSwap[item.index] = dropItem;
                setSelected(selectedWithSwap);
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    });

    return (
        <div ref={drop} className={classNames("drop__area")}>
            {children}
        </div>
    )
}

export default DropArea;