import {
    addCustomer,
    deleteCustomer,
    getAllCustomers,
    getCustomerByEmail,
    getCustomerById,
    updateCustomer
} from "../repositories/customers.repo";

class CustomersService {
    async getAllCustomers(query) {
        return await getAllCustomers(query);
    }
    async getCustomerById(customerId) {
        const customer = await getCustomerById(customerId);
        if (!customer) throw new Error("Customer not found!");
        return customer;
    }
    async getCustomerByEmail(email) {
        const customer = await getCustomerByEmail(email);
        if (!customer) throw new Error("Customer not found!");
        return customer;
    }
    async addCustomer(data) {
        return await addCustomer(data);
    }
    async updateCustomer(customerId, data) {
        const customer = await getCustomerById(customerId);
        if (!customer) throw new Error("Customer not found!");
        return await updateCustomer(customerId, data);
    }
    async deleteCustomer(customerId) {
        const customer = await getCustomerById(customerId);
        if (!customer) throw new Error("Customer not found!");
        return await deleteCustomer(customerId);
    }
}
export const customersService = new CustomersService();
