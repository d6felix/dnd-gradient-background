import React, { ReactNode, useState } from "react";
import classNames from "classnames";

import "./App.scss";
import DragElement from "./components/DragElement/DragElement";
import DropArea from "./components/DropArea/DropArea";
import Button from "./components/Button/Button";
import { generateColorsTable } from "./utils/generateColorsTable";
import { useGradientColor } from "./utils/useGradientColor";
import ColorLabel from "./components/ColorLabel";
import DropContainer from "./components/DropContainer/DropContainer";

const STORE_SIZE: number = 24;
const CALC_SIZE: number = 6;

export const ItemTypes = {
    STORE: "STORE",
    CALC: "CALC",
}
export type ColorLabel = ReactNode;

export type Selected = {
    isSelected: boolean;
    position: number;
}

export const App = () => {
    const [selected, setSelected] = useState<Selected[]>(Array.from(Array(STORE_SIZE)).map(
        (_, index) => { return { isSelected: index < 2 ? true : false, position: index }; }
    ));
    const [colorsTable, setColorsTable] = useState<string[]>(generateColorsTable());

    const labels: ColorLabel[] = Array.from(Array(STORE_SIZE)).map((_, index) =>
        <ColorLabel index={index} selected={selected[index]} color={colorsTable[index]} />
    );

    document.getElementsByTagName("body")[0].style.background = useGradientColor(selected, colorsTable);
    return (
        <>
            <div className={classNames("wrapper")} >
                <DropContainer type={ItemTypes.STORE} selected={selected} setSelected={setSelected} size={STORE_SIZE} labels={labels} />
                <DropContainer type={ItemTypes.CALC} selected={selected} setSelected={setSelected} size={CALC_SIZE} labels={labels} />
            </div >
            <Button onClick={() => { setColorsTable(generateColorsTable()) }}>Generate new colors</Button>
        </>
    );
}

export default App;