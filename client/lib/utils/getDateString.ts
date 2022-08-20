const getDateString = () => {
  const today = new Date();
  const dateString = today.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const dayName = today.toLocaleString('ko-KR', { weekday: 'long' });
  return { dateString, dayName };
};

export default getDateString;
