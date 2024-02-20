export const getCurrentMondayDate = () => {
    const currentDate = new Date();
    currentDate.setHours(0);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);
    const mondayDay = currentDate.getTime() - 
    ((((new Date().getDay()) == 0 ? 8 : new Date().getDay()) - 1) * 86400000)
    return new Date(mondayDay);
}

export const getRangeWeek = (date:Date) => {
    const start = new Date(date);
    const end = new Date(date);
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    start.setMilliseconds(0);
    const mondayDay = start.getTime() - 
    ((((start.getDay()) == 0 ? 8 : start.getDay()) - 1) * 86400000)
    start.setTime(mondayDay);
    end.setTime(mondayDay + 604800000);
    return {start, end};
}