const getTimeRemaining = (endTime) => {
    const current: string = new Date() + '';
    const total = Date.parse(endTime) - Date.parse(current);
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    if (total <= 0) {
        return {
            total: Date.parse(endTime),
            // percentage: 100,
            days: `0 day`,
            hours: `0 hour`,
            minutes: `0 minute`,
            seconds: `0 second`,
        };
    }

    return {
        total,
        // percentage: (Date.parse(current) / Date.parse(endTime)) * 100,
        days: days > 1 ? `${days} days` : `${days} day`,
        hours: hours > 1 ? `${hours} hours` : `${hours} hour`,
        minutes: minutes > 1 ? `${minutes} minutes` : `${minutes} minute`,
        seconds: seconds > 1 ? `${seconds} seconds` : `${seconds} second`,
    };
};

export default getTimeRemaining;
