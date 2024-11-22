export const numberFormat = (
    number: number,
    decimals: number = 0,
    decPoint: string = '.',
    thousandsSep: string = ','
): string => {
    const fixedNumber = number.toFixed(decimals);

    const [integerPart, decimalPart] = fixedNumber.split('.');

    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSep);

    if (decimals > 0) {
        return `${formattedIntegerPart}${decPoint}${decimalPart}`;
    }

    return formattedIntegerPart;
}