export const getRandomColor = (): string => {
    const randomNumber = () => {
        const result = Math.floor(Math.random() * 256).toString(16);
        return result.length < 2 ? "0" + result : result;
    }

    return ("#" + randomNumber() + randomNumber() + randomNumber()).toUpperCase();
}