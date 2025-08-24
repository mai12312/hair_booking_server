import { getCustomerByEmail } from "../repositories/customers.repo";

/**
 * @desc Get customer by email
 * @param {string} email 
 * @returns 
 */
export async function checkCustomerByEmail(email) {
    return await getCustomerByEmail(email);
}