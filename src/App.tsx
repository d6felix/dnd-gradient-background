import React, { ReactNode, useState } from "react";
import classNames from "classnames";

import "./App.scss";
import DragElement from "./components/DragElement/DragElement";
import DropArea from "./components/DropArea/DropArea";
import Button from "./components/Button/Button";
import { generateColorsTable } from "./utils/generateColorsTable";
import { useGradientColor } from "./utils/useGradientColor";

const STORE_SIZE: number = 24;
const CALC_SIZE: number = 6;

export const ItemTypes = {
    STORE: "STORE",
    CALC: "CALC",
}
type ColorLabel = {
    label: ReactNode;
}

export type Selected = {
    isSelected: boolean;
    position: number;
}

export const App = () => {
    let labels: ColorLabel[] = Array.from(Array(STORE_SIZE));
    let storeZone = Array.from(Array(STORE_SIZE));
    let calcZone = Array.from(Array(CALC_SIZE));
    const [selected, setSelected] = useState<Selected[]>(Array.from(Array(STORE_SIZE)).map(
        (_, index) => { return { isSelected: false, position: index }; }
    ));
    const [colorsTable, setColorsTable] = useState<string[]>(generateColorsTable());
    const [inputValue, setInputValue] = useState<string>("");

    labels = labels.map((_, index) => {
        const label =
            (<DragElement
                index={index}
                type={selected[index].isSelected ? ItemTypes.CALC : ItemTypes.STORE}
                key={index}
            >
                <div
                    className={classNames("color-label")}
                    style={{ backgroundColor: colorsTable[index] }}
                >
                    {colorsTable[index]}
                </div >
            </DragElement >);
        return ({ label });
    });

    storeZone = storeZone.map((_, index) => {
        const itemIndex = selected.findIndex((value) => value.position === index && value.isSelected === false);

        return (
            <DropArea type={ItemTypes.STORE} key={index} indexDropArea={index} selected={selected} setSelected={setSelected}>
                {itemIndex !== -1 && !selected[itemIndex].isSelected && labels[itemIndex].label}
            </DropArea>
        );
    });

    calcZone = calcZone.map((_, index) => {
        const itemIndex = selected.findIndex((value) => value.position === index && value.isSelected === true);

        return (
            <DropArea type={ItemTypes.CALC} key={index} indexDropArea={index} selected={selected} setSelected={setSelected}>
                {itemIndex !== -1 && selected[itemIndex].isSelected && labels[itemIndex].label}
            </DropArea>
        );
    });


    document.getElementsByTagName("body")[0].style.background = useGradientColor(selected, colorsTable);
    return (
        <>
            <div className={classNames("wrapper")} >
                <div className={classNames("container")}>
                    {storeZone}
                </div>
                <div className={classNames("container")}>
                    {calcZone}
                </div >
            </div >
            <Button onClick={() => { setColorsTable(generateColorsTable()) }}>Generate new colors</Button>
        </>
    );
}

export default App;