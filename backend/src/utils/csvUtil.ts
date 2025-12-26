export const toCSV = (
    headers: string[],
    rows: (string | number)[][]
): string => {
    const escape = (value: string | number) =>
        `"${String(value).replace(/"/g, '""')}"`

    const headerRow = headers.map(escape).join(",")
    const dataRows = rows.map(row => row.map(escape).join(","))

    return [headerRow, ...dataRows].join("\n")
}
