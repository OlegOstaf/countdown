import React, { useState, useEffect } from 'react';

const getNextSaturday = () => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysUntilSaturday = (6 - dayOfWeek + 7) % 7;

  if (daysUntilSaturday === 0) now.setDate(now.getDate() + 7);
  else now.setDate(now.getDate() + daysUntilSaturday);

  now.setHours(0, 0, 0, 0);
  return now;
};

const formatRenderDate = (timeDiff) => {
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  const formatedDays = String(days).padStart(2, '0');
  const formatedHours = String(hours).padStart(2, '0');
  const formatedMinutes = String(minutes).padStart(2, '0');
  const formatedSeconds = String(seconds).padStart(2, '0');

  return `Days: ${formatedDays}, Hours: ${formatedHours}, Minutes: ${formatedMinutes}, Seconds: ${formatedSeconds}`;
};

const CountdownToSaturday = () => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const nextSaturday = getNextSaturday();

    const interval = setInterval(() => {
      const now = new Date();
      const timeDiff = nextSaturday - now;

      if (timeDiff <= 0) {
        setTimeLeft('Days: 00, Hours: 00, Minutes: 00, Seconds: 00');
        clearInterval(interval);
      } else {
        setTimeLeft(formatRenderDate(timeDiff));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Countdown to Next Saturday</h2>
      <p>{timeLeft}</p>
    </div>
  );
};

export default CountdownToSaturday;