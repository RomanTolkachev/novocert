/**
 * Фильтрует объект, удаляя "пустые" значения, но безопасно для React Hook Form:
 * - пустые строки ('') → удаляются
 * - null и undefined → удаляются
 * - объекты → рекурсивно фильтруются
 * - массивы:
 *   - пустой массив [] → оставляется (важно для checkbox)
 *   - массив полностью из пустых значений → оставляется (важно для checkbox)
 *   - массив с хотя бы одним значимым элементом → оставляется
 */
export const filterEmptyObjectValues = <T extends Record<string, any>>(data: T): Partial<T> => {
    return Object.fromEntries(
        Object.entries(data).filter(([_, value]) => {
            if (value === null || value === undefined) {
                return false;
            }

            if (Array.isArray(value)) {
                // оставляем массивы, даже если пустые, чтобы RHF корректно работал с checkbox
                return true;
            }

            if (typeof value === 'object') {
                if (!value) return false; // null проверили выше, но на всякий случай
                const filtered = filterEmptyObjectValues(value);
                return Object.keys(filtered).length > 0;
            }

            return true; // числа, строки, boolean оставляем
        })
    ) as Partial<T>;
};
