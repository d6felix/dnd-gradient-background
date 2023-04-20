import React, { ReactNode, useState } from "react";
import classNames from "classnames";

import "./App.scss";
import DragElement from "./components/DragElement/DragElement";
import DropArea from "./components/DropArea/DropArea";
import Button from "./components/Button/Button";
import { ColorsTable } from "./data/colors";
import { useGradientColor } from "./utils/useGradientColor";

const STORE_SIZE: number = 24;
const CALC_SIZE: number = 12;

export const ItemTypes = {
    STORE: "STORE",
    CALC: "CALC",
}
type CalcButton = {
    button: ReactNode;
}

export type Selected = {
    isSelected: boolean;
    position: number;
}

export const App = () => {
    let buttons: CalcButton[] = Array.from(Array(STORE_SIZE));
    let storeZone = Array.from(Array(STORE_SIZE));
    let calcZone = Array.from(Array(CALC_SIZE));
    const [selected, setSelected] = useState<Selected[]>(Array.from(Array(STORE_SIZE)).map(
        (_, index) => { return { isSelected: false, position: index }; }
    ));
    const [inputValue, setInputValue] = useState<string>("");

    buttons = buttons.map((_, index) => {
        const button =
            (<DragElement
                index={index}
                type={selected[index].isSelected ? ItemTypes.CALC : ItemTypes.STORE}
                key={index}
            >
                <Button
                    className={classNames("button", selected[index].isSelected && "button__selected")}
                    onClick={() => setInputValue(inputValue + index)}
                    disabled={!selected[index].isSelected}
                    style={{ backgroundColor: ColorsTable[index] }}
                >
                    My number: {index}
                </Button >
            </DragElement >);
        return ({ button });
    });

    storeZone = storeZone.map((_, index) => {
        const itemIndex = selected.findIndex((value) => value.position === index && value.isSelected === false);

        return (
            <DropArea type={ItemTypes.STORE} key={index} indexDropArea={index} selected={selected} setSelected={setSelected}>
                {itemIndex !== -1 && !selected[itemIndex].isSelected && buttons[itemIndex].button}
            </DropArea>
        );
    });

    calcZone = calcZone.map((_, index) => {
        const itemIndex = selected.findIndex((value) => value.position === index && value.isSelected === true);

        return (
            <DropArea type={ItemTypes.CALC} key={index} indexDropArea={index} selected={selected} setSelected={setSelected}>
                {itemIndex !== -1 && selected[itemIndex].isSelected && buttons[itemIndex].button}
            </DropArea>
        );
    });


    document.getElementsByTagName("body")[0].style.background = useGradientColor(selected);
    return (
        <div className={classNames("wrapper")} >
            <div className={classNames("container")}>
                {storeZone}
            </div>

            <div className={classNames("container")}>
                {calcZone}
            </div >
        </div >
    );
}

export default App;