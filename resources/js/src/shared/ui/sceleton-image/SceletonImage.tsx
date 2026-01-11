import { forwardRef, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';

interface ImageWithSkeletonProps {
    src: string;
    width?: number | string;
    height?: number | string;
    alt?: string;
    fit?: React.CSSProperties["objectFit"];
    onLoad?: () => void;
}

export const SkeletonImage = forwardRef<HTMLDivElement | null, ImageWithSkeletonProps>(
    ({
        src,
        width = 200,
        height = 140,
        alt = '',
        fit = 'cover',
        onLoad }, ref) => {
        const [loaded, setLoaded] = useState(false);

        const handleLoad = () => {
            setLoaded(true);
            onLoad?.();
        };

        return (
            <div ref={ref} style={{ position: 'relative', width, height }}>
                {!loaded && (
                    <Skeleton
                        variant="rectangular"
                        width={width}
                        height={height}
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: 2,
                        }}
                    />
                )}

                <img
                    
                    src={src}
                    alt={alt}
                    style={{
                        width,
                        height,
                        objectFit: fit,
                        borderRadius: 8,
                        opacity: loaded ? 1 : 0,
                        transition: 'opacity 0.3s',
                    }}
                    onLoad={handleLoad}
                />
            </div>
        );
    }
);
