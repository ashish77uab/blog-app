import { useEffect, useState } from "react";

export default function Timer({ setStopGame, currentQuestion }) {
    const [timer, setTimer] = useState(1000);

    useEffect(() => {
        if (timer === 0) return setStopGame(true);
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer, setStopGame]);

    useEffect(() => {
        setTimer(1000);
    }, [currentQuestion]);
    return timer;
}