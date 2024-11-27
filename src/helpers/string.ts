export const getDataByStringSeparatorKey = (obj: any, key: string) => {
    const parts: string[] = key.split(".");
    let value = obj;

    parts.forEach(function (e: string) {
        value = value?.[e]
    })

    return value
}