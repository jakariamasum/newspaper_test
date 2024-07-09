"use client";
import React, { useState, useEffect } from 'react';

interface DateProps {
  lan: string;
}

const Dates: React.FC<DateProps> = ({ lan }) => {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    const timerId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timerId); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    setDate(new Date());
  }, []);

  if (!date) {
    return null; // Or you could return a loading spinner or placeholder text
  }

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: '2-digit',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit', // Include seconds for live updating
    hour12: true
  };

  const formattedDate = date.toLocaleDateString(lan, options);

  return <p className="text-base leading-none">{formattedDate}</p>;
};

export default Dates;

