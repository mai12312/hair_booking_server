// Calculator duration
export function getTotalDuration(services) {
    if (!Array.isArray(services)) return 0;
    return services.reduce((total, service) => total + service.duration, 0);
}
// Calculator duration
export function getTotalPrice(services) {
    if (!Array.isArray(services)) return 0;
    return services.reduce((total, service) => total + service.price, 0);
}
// Calculator end time
export function calculatorEndTime(startTime, totalDuration) {
    // Accept startTime as string, parse to Date
    const start = typeof startTime === "string" ? new Date(startTime) : startTime;
    if (!(start instanceof Date) || isNaN(start.getTime()) || typeof totalDuration !== "number" || totalDuration < 0) {
        return null;
    }
    return new Date(start.getTime() + totalDuration * 60000);
}

export function findServiceById(services, id) {
    if (!Array.isArray(services)) return null;
    return services.find(service => service.id === id) || null;
}