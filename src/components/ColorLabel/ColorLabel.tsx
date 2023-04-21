import React from "react";
import DragElement from "@components/DragElement";
import { ItemTypes, Selected } from "@App";
import classNames from "classnames";


type ColorLabelProps = {
    index: number;
    selected: Selected;
    color: string;
}

export const ColorLabel: React.FC<ColorLabelProps> = ({ index, selected, color }) => {
    return (
        <DragElement
            index={index}
            type={selected.isSelected ? ItemTypes.CALC : ItemTypes.STORE}
            key={index}
        >
            <div
                className={classNames("color-label")}
                style={{ backgroundColor: color }}
            >
                {color}
            </div >
        </DragElement>
    );
}

export default ColorLabel;