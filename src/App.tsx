import React, { ReactNode, useEffect, useState } from "react";
import Button from "./components/Button/Button";
import classNames from "classnames";

import "./App.scss";
import { useDrag, useDrop } from "react-dnd";
import DragElement from "./components/DragElement/DragElement";
import DropArea from "./components/DropArea/DropArea";

export const ItemTypes = {
    BUTTON: 'button'
}

type CalcButton = {
    button: ReactNode;
    isSelected: boolean;
}

export const App = () => {
    let buttons: CalcButton[] = Array.from(Array(12));
    let storeZone = Array(12).fill(0);
    let calcZone = Array(12).fill(0);
    const [isSelected, setIsSelected] = useState<boolean[]>(Array(12).fill(false));
    const [lastSelected, setLastSelected] = useState<number>(0);

    buttons = buttons.map((_, index) => {
        const button =
            (<DragElement type={ItemTypes.BUTTON} key={index}>
                <button
                    className={classNames("button", isSelected[index] && "button__selected")}
                    onClick={() => {
                        setIsSelected([...isSelected.slice(0, index), !isSelected[index], ...isSelected.slice(index + 1)]);
                    }}
                >My number: {index}</button >
            </DragElement>);
        return ({ button, isSelected: isSelected[index] });
    });

    storeZone = storeZone.map((_, index) => {
        return (
            <DropArea type={ItemTypes.BUTTON} key={index}>
                {!buttons[index].isSelected && buttons[index].button}
            </DropArea>
        );
    });

    calcZone = calcZone.map((_, index) => {
        return (
            <DropArea type={ItemTypes.BUTTON} key={index}>
                {buttons[index].isSelected && buttons[index].button}
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