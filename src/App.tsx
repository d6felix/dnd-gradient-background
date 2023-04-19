import React, { useEffect, useState } from "react";
import Button from "./components/Button/Button";
import classNames from "classnames";

import "./App.scss";
import { useDrag } from "react-dnd";

export const ItemTypes = {
    BUTTON: 'button'
}

export const App = () => {
    let buttons = Array(12).fill(0);
    const [isSelected, setIsSelected] = useState<boolean[]>(Array(12).fill(false));


    buttons = buttons.map((value, index) => {
        const [{ isDragging }, drag] = useDrag(() => ({
            type: ItemTypes.BUTTON,
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging()
            })
        }))
        return (
            <button
                ref={drag}
                key={index}
                className={classNames("button", isDragging && "button_dragging", isSelected[index] && "button__selected")}
                onClick={() => {
                    setIsSelected([...isSelected.slice(0, index), !isSelected[index], ...isSelected.slice(index + 1)]);
                }}
            >My number: {index}</button >
        );
    });


    return (
        <>
            <div className={classNames("container")}>
                {buttons}
            </div>

            <div className={classNames("container")}>
            </div>
        </>
    );
}

export default App;