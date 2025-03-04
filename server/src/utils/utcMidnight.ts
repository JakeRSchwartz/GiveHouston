// Helper function to normalize dates to UTC Midnight
export const toUtcMidnight = (date: string | Date) => {
  const d = new Date(date);
  return new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
  );
};


