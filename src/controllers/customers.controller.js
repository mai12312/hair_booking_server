"use strict"
import { customersService } from "../services/customers.service";

class CustomersController {
    async getAllCustomers(req, res, next) {
        try {
            const customers = await customersService.getAllCustomers(req.query);
            res.status(200).json({ status: 200, message: "ok", datas: { customers } });
        } catch (error) { next(error); }
    }
    async getCustomerById(req, res, next) {
        try {
            const customer = await customersService.getCustomerById(req.params.customerId);
            res.status(200).json({ status: 200, message: "ok", datas: { customer } });
        } catch (error) { next(error); }
    }
    async deleteCustomer(req, res, next) {
        try {
            await customersService.deleteCustomer(req.params.customerId);
            res.json({ status: 201, message: "Deleted!", data: null });
        } catch (error) { next(error); }
    }
    async addCustomer(req, res, next) {
        try {
            const id = await customersService.addCustomer(req.body);
            res.json({ status: 201, message: "Created!", data: { id } });
        } catch (error) { next(error); }
    }
    async updateCustomer(req, res, next) {
        try {
            await customersService.updateCustomer(req.params.customerId, req.body);
            res.json({ status: 200, message: "Updated!", data: { id: req.params.customerId } });
        } catch (error) { next(error); }
    }
}
export const customersController = new CustomersController();
