// DateTime state helper functions
export const dtTZFixed = () => {
    const timeZoneOffset = new Date().getTimezoneOffset() * 60000; //offset in ms
    return new Date(Date.now() - timeZoneOffset);
  };

export const dtToSlicedISO = (time) => time.toISOString().slice(0, 16);