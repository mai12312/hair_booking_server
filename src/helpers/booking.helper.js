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

export function handleOrderByBookings({ sortBy, order }) {
    const allowedSortBy = ['id', 'created_at', 'start_time', 'customer_email'];
    const allowedOrder = ['asc', 'desc'];
    const sortColumn = allowedSortBy.includes(sortBy) ? sortBy : 'created_at';
    const sortDirection = allowedOrder.includes(order.toLowerCase()) ? order.toLowerCase() : 'asc';
    return {
        sortDirection,
        sortColumn
    }
}

export function getDateForBookings({month, year}) {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    const safeMonth = !month || isNaN(Number(month)) ? currentMonth : Number(month);
    const safeYear = !year || isNaN(Number(year)) ? currentYear : Number(year);
    return {
        safeMonth,
        safeYear
    };
}

export function formatDateTime(dt) {
    if (typeof dt === "string") {
        const d = new Date(dt);
        if (isNaN(d.getTime())) return null;
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        const hh = String(d.getHours()).padStart(2, "0");
        const min = String(d.getMinutes()).padStart(2, "0");
        const ss = String(d.getSeconds()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
    }
    return dt;
}