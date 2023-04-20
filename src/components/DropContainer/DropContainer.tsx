import classNames from "classnames";
import React from "react";
import { ColorLabel, ItemTypes, Selected } from "../../../src/App";
import DropArea from "../DropArea";

type DropContainerProps = {
    size: number;
    selected: Selected[];
    setSelected: React.Dispatch<React.SetStateAction<Selected[]>>;
    labels: ColorLabel[];
    type: string;
}

export const DropContainer: React.FC<DropContainerProps> = ({ size, selected, setSelected, labels, type }) => {
    const allowSelected = type === ItemTypes.CALC ? true : false;
    const dropZones = Array.from(Array(size)).map((_, index) => {
        const itemIndex = selected.findIndex((value) => value.position === index && value.isSelected === allowSelected);

        return (
            <DropArea type={type} key={index} indexDropArea={index} selected={selected} setSelected={setSelected}>
                {itemIndex !== -1 && selected[itemIndex].isSelected === allowSelected && labels[itemIndex]}
            </DropArea>
        );
    });

    return <div className={classNames("container", allowSelected ? "container_small" : "container_big")}>
        {dropZones}
    </div>;
}

export default DropContainer;