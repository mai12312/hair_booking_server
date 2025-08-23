import db from "../models"; // adjust import to your DB connection

export const servicesRepository = {
    async getServiceById(serviceId) {
        // Replace with your ORM/DB query
        return db.services.findOne({ where: { id: serviceId } });
    },
    async deleteService(serviceId) {
        return db.services.destroy({ where: { id: serviceId } });
    },
    async updateService(serviceId, updateData) {
        return db.services.update(updateData, { where: { id: serviceId } });
    },
    async getAllServices() {
        return db.services.findAll();
    },
    async addService(serviceData) {
        return db.services.create(serviceData);
    }
};
