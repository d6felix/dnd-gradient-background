import classNames from "classnames";
import React from "react";

type SliderInputProps = {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
}

export const SliderInput: React.FC<SliderInputProps> = ({ value, setValue }) => {
    return (
        <div className={classNames("slider__container")}>
            <input
                type="range"
                min={0}
                max={360}
                value={value}
                onChange={(e) => setValue(Number.parseInt(e.target.value))}
                className={classNames("slider__input")}
            />
        </div>
    );
}

export default SliderInput;
