export function getEnumKeys(enumType: any): string[] {
    return Object.keys(enumType).filter((x) => !(parseInt(x) >= 0));
}
