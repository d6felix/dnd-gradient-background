import { Selected } from "src/App";
import { useMemo } from "react";

export const useGradientColor = (selected: Selected[], colorsTable: string[]): string => useMemo(() => {
    let selectedColors = selected.filter((item) => item.isSelected)
        .sort((a, b) => a.position - b.position)
        .reduce((result, item) => {
            const index = selected.findIndex(i => i.isSelected && i.position === item.position)
            return result + ", " + colorsTable[index];
        }, "");

    return `linear-gradient(90deg${selectedColors})`;
}, [selected, colorsTable]);
