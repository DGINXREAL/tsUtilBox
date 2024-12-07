export const csvStringToArray = (
    csvString: string,
    delimiter: string = ','
): string[][] => {
    const rows: string[] = csvString.split('\n');

    const result: string[][] = rows.map(row => row.split(delimiter));

    return result.map(row => row.map(value => value.trim()));
}