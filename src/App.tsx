import React, { ReactNode, useEffect, useState } from "react";
import Button from "./components/Button/Button";
import classNames from "classnames";

import "./App.scss";
import { useDrag, useDrop } from "react-dnd";
import DragElement from "./components/DragElement/DragElement";
import DropArea from "./components/DropArea/DropArea";

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
    let buttons: CalcButton[] = Array.from(Array(12));
    let storeZone = Array.from(Array(12));
    let calcZone = Array.from(Array(12));
    const [selected, setSelected] = useState<Selected[]>(Array.from(Array(12)).map(
        (_, index) => { return { isSelected: false, position: index }; }
    ));

    buttons = buttons.map((_, index) => {
        const button =
            (<DragElement index={index} type={selected[index].isSelected ? ItemTypes.CALC : ItemTypes.STORE} key={index} >
                <button
                    className={classNames("button", selected[index].isSelected && "button__selected")}
                    onClick={() => { }}
                >
                    My number: {index}
                </button >
            </DragElement>);
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

    return (
        <>
            <div className={classNames("container")}>
                {storeZone}
            </div>

            <div className={classNames("container")}>
                {calcZone}
            </div >
        </>
    );
}

export default App;