import { Selected } from "@App";
import { useMemo } from "react";

export const useGradientColor = (selected: Selected[], colorsTable: string[], tilt: number): string => useMemo(() => {
    const filteredColors = selected.filter((item) => item.isSelected);
    if (filteredColors.length >= 2) {
        let selectedColors = filteredColors.sort((a, b) => a.position - b.position)
            .reduce((result, item, i) => {
                const percentStep = (100 / (filteredColors.length - 1) * i).toFixed(2);
                const index = selected.findIndex(i => i.isSelected && i.position === item.position)
                return result + `, ${colorsTable[index]} ${percentStep}%`;
            }, "");

        return `linear-gradient(${tilt}deg${selectedColors})`;
    } else {
        return "#FFFFFF";
    }
}, [selected, colorsTable, tilt]);
