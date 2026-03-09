import type { IGridPosition } from "../model/types";

/**
 * Маппит конфиг position из Form2 в чистые CSS свойства для grid.
 */
export function gridPositionToCss(position?: IGridPosition): React.CSSProperties {
    if (!position) {
        return {};
    }

    const styles: React.CSSProperties = {};

    if (position.colSpan !== undefined && position.colSpan > 0) {
        styles.gridColumn = `span ${position.colSpan}`;
    }

    if (position.rowSpan !== undefined && position.rowSpan > 0) {
        styles.gridRow = `span ${position.rowSpan}`;
    }

    return styles;
}
