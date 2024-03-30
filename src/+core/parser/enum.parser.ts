export const getKeyByValue = <T extends Record<string, string>>(
    value: string,
    myEnum: T,
): keyof T => {
    const key = Object.keys(myEnum).find((k) => myEnum[k as keyof T] === value);
    return key as keyof T;
};
