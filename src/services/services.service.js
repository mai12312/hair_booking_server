import { getBookingDetailsByServiceId } from "../repositories/booking_details.repo";
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
            limit: limit || 10,
            offset: offset || 0,
            order: order || 'asc',
            sortBy: sortBy || 'created_at'
        });
    }

    async getServiceById(serviceId) {
        const service = await getServiceById(serviceId);
        if (!service) throw new Error("Dịch vụ không tồn tại!");
        return service;
    }

    async addService(data) {
        const status = 'pending';
        return await addService({
            ...data,
            status
        });
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
    async getServicesByCategoryId({categoryId, limit, offset, order, sortBy}) {
        const services = await getServicesByCategoryId({
            categoryId, 
            limit: limit || 10, 
            offset: offset || 0, 
            order: order || 'asc', 
            sortBy: sortBy || 'created_at'
        });
        if (!services) throw new Error("Không tìm thấy dịch vụ nào!");
        return services;
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
            limit: limit || 10,
            offset: offset || 0,
            order: order || 'asc',
            sortBy: sortBy || 'created_at'
        });
    }
}

export const servicesService = new ServicesService();
