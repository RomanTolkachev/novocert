import {
    type FC,
    type ReactNode,
    type RefObject,
    useEffect,
    useLayoutEffect,
    useRef,
    useState
} from 'react';
import { createPortal } from 'react-dom';
import { Paper, Box } from '@mui/material';

interface TooltipProps {
    content: ReactNode;
    className?: string;
    delay?: number;
    hideDelay?: number;
    maxWidth?: string;
    maxHeight?: string;
    distanceFromTrigger?: number;
    windowEdgeMargin?: number;
    padding?: number;
    triggerRef: RefObject<HTMLElement | null>;
    tooltipRef?: RefObject<HTMLDivElement | null>;
    isImage?: boolean;
}

export const CustomTooltip: FC<TooltipProps> = ({
    content,
    className = '',
    maxWidth = '800px',
    maxHeight = '400px',
    distanceFromTrigger = 0,
    windowEdgeMargin = 16,
    padding = 12,
    triggerRef,
    tooltipRef,
    delay = 400,
    hideDelay = 300,
    isImage = false,
}) => {
    const [visible, setVisible] = useState(false);
    const [ready, setReady] = useState(false);

    const [position, setPosition] = useState({
        top: '',
        bottom: '',
        left: '',
        right: '',
        maxWidth,
        maxHeight,
    });

    const internalTooltipRef = useRef<HTMLDivElement | null>(null);
    const combinedTooltipRef = tooltipRef || internalTooltipRef;

    const showTimer = useRef<number | null>(null);
    const hideTimer = useRef<number | null>(null);

    const mousePos = useRef({ x: 0, y: 0 });

    const clearTimers = () => {
        if (showTimer.current) clearTimeout(showTimer.current);
        if (hideTimer.current) clearTimeout(hideTimer.current);
        showTimer.current = null;
        hideTimer.current = null;
    };

    const handleShow = () => {
        clearTimers();
        showTimer.current = setTimeout(() => setVisible(true), delay);
    };

    const handleHide = () => {
        clearTimers();

        hideTimer.current = setTimeout(() => {
            const el = document.elementFromPoint(mousePos.current.x, mousePos.current.y);
            const stillHovering =
                triggerRef.current?.contains(el) ||
                combinedTooltipRef.current?.contains(el);

            if (!stillHovering) setVisible(false);
        }, hideDelay);
    };

    useEffect(() => {
        const move = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', move);
        return () => window.removeEventListener('mousemove', move);
    }, []);

    useEffect(() => {
        const onWheel = (e: WheelEvent) => {
            const tooltip = combinedTooltipRef.current;
            if (tooltip && tooltip.matches(':hover')) {
                e.stopPropagation();
                e.preventDefault(); // важно
            }
        };

        window.addEventListener('wheel', onWheel, { passive: false });
        return () => window.removeEventListener('wheel', onWheel);
    }, []);

    useEffect(() => {
        const trigger = triggerRef.current;
        if (!trigger) return;

        trigger.addEventListener('mouseenter', handleShow);
        trigger.addEventListener('mouseleave', handleHide);

        return () => {
            trigger.removeEventListener('mouseenter', handleShow);
            trigger.removeEventListener('mouseleave', handleHide);
        };
    }, [triggerRef.current]);

    const calculatePosition = () => {
        const trigger = triggerRef.current;
        if (!trigger) return;

        const rect = trigger.getBoundingClientRect();

        const vpCenterX = window.innerWidth / 2;
        const vpCenterY = window.innerHeight / 2;

        const trigCenterX = rect.left + rect.width / 2;
        const trigCenterY = rect.top + rect.height / 2;

        const horizontal = trigCenterX < vpCenterX ? 'right' : 'left';
        const vertical = trigCenterY < vpCenterY ? 'bottom' : 'top';

        const pos: typeof position = {
            top: '',
            bottom: '',
            left: '',
            right: '',
            maxWidth,
            maxHeight,
        };

        if (vertical === 'bottom') {
            pos.top = `${rect.bottom + distanceFromTrigger}px`;
        } else {
            pos.bottom = `${window.innerHeight - rect.top + distanceFromTrigger}px`;
        }

        if (horizontal === 'right') {
            pos.left = `${rect.right + distanceFromTrigger}px`;
        } else {
            pos.right = `${window.innerWidth - rect.left + distanceFromTrigger}px`;
        }

        const availW =
            horizontal === 'right'
                ? window.innerWidth - rect.right - windowEdgeMargin - distanceFromTrigger
                : rect.left - windowEdgeMargin - distanceFromTrigger;

        pos.maxWidth = `${Math.max(Math.min(parseInt(maxWidth), availW), 100)}px`;

        const availH =
            vertical === 'bottom'
                ? window.innerHeight - rect.bottom - windowEdgeMargin - distanceFromTrigger
                : rect.top - windowEdgeMargin - distanceFromTrigger;

        pos.maxHeight = `${Math.max(Math.min(parseInt(maxHeight), availH), 60)}px`;

        setPosition(pos);
        setReady(true);
    };

    useLayoutEffect(() => {
        if (visible) calculatePosition();
    }, [visible]);

    const portal = document.getElementById('portal');
    if (!portal) return null;

    if (!visible || !ready) return null;

    return createPortal(
        <Paper
            ref={combinedTooltipRef}
            className={className}
            sx={{
                position: 'fixed',
                zIndex: 1300,
                top: position.top,
                bottom: position.bottom,
                left: position.left,
                right: position.right,
                maxWidth: position.maxWidth,
                maxHeight: position.maxHeight,
                p: `${padding}px`,
                overflow: 'hidden',
                bgcolor: 'background.paper',
                boxShadow: 3,
                borderRadius: 2,
                opacity: visible ? 1 : 0,
                transform: visible ? 'scale(1)' : 'scale(0.95)',
                transition: 'opacity .15s ease, transform .15s ease'
            }}
            onMouseEnter={handleShow}
            onMouseLeave={handleHide}
        >
            <Box
                sx={{
                    maxHeight: isImage ? 'auto' : position.maxHeight,
                    overflowY: isImage ? 'hidden' : 'auto',
                }}
            >
                {content}
            </Box>
        </Paper>,
        portal
    );
};
