import React, { ReactNode, useState } from "react";
import classNames from "classnames";

import "./App.scss";
import Button from "@components/Button/Button";
import { generateColorsTable } from "@utils/generateColorsTable";
import { useGradientColor } from "@utils/useGradientColor";
import ColorLabel from "@components/ColorLabel";
import DropContainer from "@components/DropContainer/DropContainer";
import SliderInput from "@components/SliderInput";

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
    const [colorsTable, setColorsTable] = useState<string[]>(generateColorsTable());
    const [selected, setSelected] = useState<Selected[]>(Array.from(Array(STORE_SIZE)).map(
        (_, index) => { return { isSelected: index < 2 ? true : false, position: index }; }
    ));
    const labels: ColorLabel[] = Array.from(Array(STORE_SIZE)).map((_, index) =>
        <ColorLabel index={index} selected={selected[index]} color={colorsTable[index]} />
    );
    const [valueSlider, setValueSlider] = useState<number>(0);

    document.getElementsByTagName("body")[0].style.background = useGradientColor(selected, colorsTable, valueSlider);
    return (
        <>
            <div className={classNames("flex-wrapper")}>
                <h1 className={classNames("header")}>Try to drag and drop color lables beetwen boxes.</h1>
            </div>
            <div className={classNames("flex-wrapper", "flex-wrapper_drop")}>
                <DropContainer type={ItemTypes.STORE} selected={selected} setSelected={setSelected} size={STORE_SIZE} labels={labels} />
                <DropContainer type={ItemTypes.CALC} selected={selected} setSelected={setSelected} size={CALC_SIZE} labels={labels} />
            </div>
            <div className={classNames("flex-wrapper")}>
                <SliderInput value={valueSlider} setValue={setValueSlider} />
                <Button className={classNames("button")} onClick={() => { setColorsTable(generateColorsTable()) }}>Generate new colors</Button>
            </div>
        </>
    );
}

export default App;