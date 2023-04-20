import { getRandomColor } from "../utils/getRandomColor";

export const ColorsTable = Array.from(Array(24)).map(() => getRandomColor());
