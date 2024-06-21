import { useState, useEffect } from "react";

function Clock() {

    const getTime = () => {
        const now = new Date();
        const hour = now.getHours().toString().padStart(2, '0');;
        const minute = now.getMinutes().toString().padStart(2, '0');;
        return `${hour}:${minute}`
    }

    const [time, setTime] = useState(getTime());

    useEffect( () => {
        const timer = setInterval( () => {
            setTime(getTime());
        }, 1000)
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            {time}
        </>
    )
}

export default Clock;