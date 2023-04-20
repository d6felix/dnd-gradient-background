import { getRandomColor } from "../utils/getRandomColor";

export const generateColorsTable = () => {
    return Array.from(Array(24)).map(() => getRandomColor());
}

