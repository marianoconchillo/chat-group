import { useEffect, useState } from "react";

interface WindowDimensions {
    width: number;
    height: number;
}

export const useDimensions = (): WindowDimensions => {
    const [windowSize, setWindowSize] = useState<WindowDimensions>(
        getWindowSize()
    );

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize(getWindowSize());
        };

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return {
        width: windowSize.width,
        height: windowSize.height,
    };
};

const getWindowSize = () => {
    const windowDimensions: WindowDimensions = {
        height: window.innerHeight,
        width: window.innerWidth,
    };

    return windowDimensions;
};
