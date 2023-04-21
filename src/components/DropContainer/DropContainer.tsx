import classNames from "classnames";
import React from "react";
import { ColorLabel, ItemTypes, Selected } from "@App";
import DropArea from "@components/DropArea";

type DropContainerProps = {
    size: number;
    selected: Selected[];
    setSelected: React.Dispatch<React.SetStateAction<Selected[]>>;
    labels: ColorLabel[];
    type: string;
}

export const DropContainer: React.FC<DropContainerProps> = ({ size, type, selected, labels, setSelected }) => {
    const allowSelected = type === ItemTypes.CALC ? true : false;
    const dropZones = Array.from(Array(size)).map((_, index) => {
        const itemIndex = selected.findIndex((value) => value.position === index && value.isSelected === allowSelected);

        return (
            <DropArea type={type} key={index} indexDropArea={index} selected={selected} setSelected={setSelected}>
                {itemIndex !== -1 && selected[itemIndex].isSelected === allowSelected && labels[itemIndex]}
            </DropArea>
        );
    });

    return <div className={classNames("drop__container", allowSelected ? "drop__container_small" : "drop__container_big")}>
        {dropZones}
    </div>;
}

export default DropContainer;