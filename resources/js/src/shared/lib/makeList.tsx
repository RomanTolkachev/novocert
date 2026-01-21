import { type ReactNode, type CSSProperties } from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { highlight } from './highlight';

interface SplitStringOptions {
    delimiter?: string;
    showBullets?: boolean;
    trimItems?: boolean;
    filterEmpty?: boolean;
    highlightPattern?: string | string[];
    maxLines?: number;
    maxLiItems?: number;
    clampStyles?: CSSProperties;
    showMoreText?: 'howMany' | string;
    showDelimiter?: boolean;
}

const getElementWord = (count: number): string => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return 'элементов';
    if (lastDigit === 1) return 'элемент';
    if ([2, 3, 4].includes(lastDigit)) return 'элемента';
    return 'элементов';
};

export const makeList = (
    text: string | ReactNode,
    options: SplitStringOptions = {}
): ReactNode => {
    const {
        delimiter = ';',
        showBullets = true,
        trimItems = true,
        filterEmpty = true,
        highlightPattern,
        maxLines,
        maxLiItems: maxItems,
        clampStyles = {},
        showMoreText,
        showDelimiter = true,
    } = options;

    if (!text) return null;

    if (typeof text !== 'string') {
        const liStyle = maxLines
            ? {
                display: '-webkit-box',
                WebkitLineClamp: maxLines,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                lineHeight: 1.2,
                ...clampStyles,
            }
            : {};

        return (
            <List sx={{ listStyle: showBullets ? 'disc' : 'none', pl: showBullets ? 2 : 0 }}>
                <ListItem disablePadding sx={{ display: 'list-item' }}>
                    <ListItemText
                        primary={<Typography variant="inherit" sx={liStyle}>{text}</Typography>}
                    />
                </ListItem>
            </List>
        );
    }

    let parts = text.split(delimiter);

    if (trimItems) parts = parts.map(p => p.trim());
    parts = parts.map(p => p.replace(/^\s+/, ''));

    if (filterEmpty) parts = parts.filter(p => p.length > 0);
    if (parts.length === 0) return null;

    const displayedItems = maxItems ? parts.slice(0, maxItems) : parts;
    const hiddenItemsCount = maxItems ? parts.length - maxItems : 0;

    const liStyle = maxLines
        ? {
            display: '-webkit-box',
            WebkitLineClamp: maxLines,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.2,
            ...clampStyles,
        }
        : {};

    return (
        <List sx={{ listStyle: showBullets ? 'disc' : 'none', pl: showBullets ? 2 : 0 }}>
            {displayedItems.map((part, index) => {
                const isLast = index === displayedItems.length - 1;
                const showDelim = showDelimiter && !isLast;

                return (
                    <ListItem key={index} disablePadding sx={{ display: 'list-item' }}>
                        <ListItemText
                            primary={
                                <Typography variant="inherit" sx={liStyle}>
                                    {highlightPattern ? highlight(part, highlightPattern) : part}
                                    {showDelim ? delimiter : ''}
                                </Typography>
                            }
                        />
                    </ListItem>
                );
            })}

            {hiddenItemsCount > 0 && showMoreText && (
                <ListItem disablePadding sx={{ display: 'list-item', listStyle: 'none' }}>
                    <ListItemText
                        primary={
                            <Typography variant="inherit" sx={{ ...liStyle, WebkitLineClamp: 1, opacity: 0.7 }}>
                                {showMoreText === 'howMany'
                                    ? `... +${hiddenItemsCount} ${getElementWord(hiddenItemsCount)}`
                                    : showMoreText}
                            </Typography>
                        }
                    />
                </ListItem>
            )}
        </List>
    );
};
