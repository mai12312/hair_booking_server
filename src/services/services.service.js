import {
    addService,
    countServicesByCategoryId,
    deleteService,
    getAllServices,
    getServiceById,
    getServicesByCategoryId,
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

    async updateService(serviceId, updateData) {
        const service = await getServiceById(serviceId);
        if (!service) throw new Error("Dịch vụ không tồn tại!");
        const data = {
            ...service,
            ...updateData
        };
        return await updateService(serviceId, data);
    }

    async deleteService(serviceId) {
        const service = await getServiceById(serviceId);
        if (!service) throw new Error("Dịch vụ không tồn tại!");
        return await deleteService(serviceId);
    }
    async getServicesByCategoryId(categoryId) {
        return await getServicesByCategoryId(categoryId);
    }
    async countServicesByCategoryId(categoryId) {
        return await countServicesByCategoryId(categoryId);
    }
    /**
     * get bookings by service id
     * @returns 
     */
    async getBookingDetailsByServiceId({serviceId,
            limit,
            offset,
            order,
            sortBy
    }) {
        return await getBookingDetailsByServiceId({
            serviceId,
            limit,
            offset,
            order,
            sortBy
        });
    }
}

export const servicesService = new ServicesService();
