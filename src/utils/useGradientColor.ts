import { Selected } from "src/App";
import { useMemo } from "react";

export const useGradientColor = (selected: Selected[], colorsTable: string[]): string => useMemo(() => {
    const filteredColors = selected.filter((item) => item.isSelected);
    if (filteredColors.length >= 2) {
        let selectedColors = filteredColors.sort((a, b) => a.position - b.position)
            .reduce((result, item) => {
                const index = selected.findIndex(i => i.isSelected && i.position === item.position)
                return result + ", " + colorsTable[index];
            }, "");

        return `linear-gradient(90deg${selectedColors})`;
    } else {
        return "#FFFFFF";
    }
}, [selected, colorsTable]);
