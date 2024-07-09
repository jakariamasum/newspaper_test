"use client";
import { useState, useEffect } from 'react';

const Time = () => {
    const [currentDateTime, setCurrentDateTime] = useState('');

    useEffect(() => {
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const dd = String(now.getDate()).padStart(2, '0');
        const hh = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');
        const formattedDateTime = `${yyyy}-${mm}-${dd}T${hh}:${min}`;
        setCurrentDateTime(formattedDateTime);
    }, []);

    return (
        <div className="mb-4">
            <p>public time</p>
            <input
                type="datetime-local"
                value={currentDateTime}
                onChange={(e) => setCurrentDateTime(e.target.value)}
                className="p-2 mt-2 w-full outline-none rounded-md"
            />
        </div>
    );
};

export default Time;
