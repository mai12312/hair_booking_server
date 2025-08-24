import { queryArgument } from "../models";

/**
 * Generates a unique booking code not present in the bookings table.
 * @returns {Promise<string>} Unique booking code
 */
export async function generateCodeBooking() {
    let code;
    let exists = true;
    while (exists) {
        code = "BK" + Math.random().toString(36).substring(2, 15).toUpperCase();
        const sql = "SELECT id FROM bookings WHERE code = ?";
        const result = await queryArgument(sql, code);
        exists = result.length > 0;
    }
    return code;
}
