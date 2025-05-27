export const cleanInput = (input: string): string[] => {
    return input
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean)
}
