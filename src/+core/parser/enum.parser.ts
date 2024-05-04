export const getKeyByValue = <T extends Record<string, string>>(
    value: string,
    myEnum: T,
): keyof T => {
    const key = Object.keys(myEnum).find((k) => myEnum[k as keyof T] === value);
    return key as keyof T;
};

export function getEnum<T>(value: string | number | null, myEnum: object): T | null {
    if (value === null) return null;
    const index = Object.values(myEnum).indexOf(value as unknown as T);
    if (index !== -1) return value as T;
    return null;
}
