export const formatDate = (date)=>{
    return (
        new Date(date).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
    )
}

export const formatTime = (date) => {
    return new Date(date).toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // optional: true for AM/PM format, false for 24hr
    });
  };
  
