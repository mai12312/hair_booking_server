import {
    addService,
    deleteService,
    getAllServices,
    getServiceById,
    updateService
} from "../repositories/services.repo";

class ServicesService {
    async getAllServices({
        limit,
        offset,
        order,
        sortBy
    }) {
        return await getAllServices({
            limit,
            offset,
            order,
            sortBy
        });
    }

    async getServiceById(serviceId) {
        const service = await getServiceById(serviceId);
        if (!service) throw new Error("Dịch vụ không tồn tại!");
        return service;
    }

    async addService(data) {
        return await addService(data);
    }

    async updateService(serviceId, data) {
        const service = await getServiceById(serviceId);
        if (!service) throw new Error("Dịch vụ không tồn tại!");
        return await updateService(serviceId, data);
    }

    async deleteService(serviceId) {
        const service = await getServiceById(serviceId);
        if (!service) throw new Error("Dịch vụ không tồn tại!");
        return await deleteService(serviceId);
    }
}

export const servicesService = new ServicesService();
