"use strict"
import { verifyAccessToken } from "../helpers/authToken.helper";
import { mapServicesToCamelCase, mapServiceToCamelCase } from "../helpers/mapService.healper";
import { authService } from "../services/auth.service";
import { servicesService } from "../services/services.service";

class ServicesController {
    /**
     * Route: GET /services
     * method: GET
     * Description: Get all services
     */
    async getAllServices(req, res, next) {
        try {
            const {
                limit,
                offset,
                order,
                sortBy
            } = req.query;
            const services = await servicesService.getAllServices({
                limit: Number(isNaN(limit) ? "10" : limit),
                offset: Number(isNaN(offset) ? "0" : offset),
                order: order === "desc" ? "desc" : "asc",
                sortBy
            });
            return res.status(200).json({
                status: 200,
                message: "Lấy dịch vụ thành công!",
                datas: {
                    services: mapServicesToCamelCase(services)
                }
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Route: GET /services/:serviceId
     * method: GET
     * Description: Get one service by ID
     */
    async getServiceById(req, res, next) {
        try {
            const serviceId = req.params.serviceId;
            const service = await servicesService.getServiceById(serviceId);
            return res.status(200).json({
                status: 200,
                message: "Lấy dịch vụ thành công!",
                datas: {
                    service: mapServiceToCamelCase(service)
                }
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Route: DELETE /services/:serviceId
     * method: DELETE
     * Description: Delete one service by ID
     */
    async deleteService(req, res, next) {
        try {
            console.log("Deleting service with ID: ", req.params.serviceId);
            const serviceId = req.params.serviceId;
            await servicesService.deleteService(serviceId);
            return res.json({
                status: 201,
                message: "Xóa dịch vụ thành công!",
                datas: null
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Route: POST /services
     * method: POST
     * Description: Create new service
     */
    async addService(req, res, next) {
        try {
            const serviceData = req.body;
            const authHeader = req.headers['authorization'];
            const payload = verifyAccessToken(authHeader);
            const admin = await authService.getAdminByEmail(payload.email ?? "");
            const adminId = admin.id;
            const id = await servicesService.addService({
                ...serviceData,
                adminId
            });
            return res.json({
                status: 201,
                message: "Thêm dịch vụ thành công!",
                datas: {
                    id
                }
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Route: PATCH /services/:serviceId
     * method: PATCH
     * Description: Update service by ID
     */
    async updateService(req, res, next) {
        try {
            const serviceId = req.params.serviceId;
            const updatedData = req.body;
            const isUpdated = await servicesService.updateService(serviceId, updatedData);
             if(!isUpdated) {
                return res.status(400).json({
                    status: 400,
                    message: "Cập nhật dịch vụ thất bại!",
                    data: null
                });
            }
            return res.json({
                status: 200,
                message: "Cập nhật dịch vụ thành công!",
                datas: {
                    id: serviceId
                }
            });
        } catch (error) {
            next(error);
        }
    }
    /**
     * Route: GET /services/:serviceId/bookings
     * method: GET
     * Description: Get bookings by service ID
     */
    async getBookingDetailsByServiceId(req, res, next) {
        try {
            const serviceId = req.params.serviceId;
            const {
                limit,
                offset,
                order,
                sortBy
            } = req.query;
            const bookings = await servicesService.getBookingDetailsByServiceId({
                serviceId,
                limit: Number(isNaN(limit) ? "10" : limit),
                offset: Number(isNaN(offset) ? "0" : offset),
                order: order === "desc" ? "desc" : "asc",
                sortBy
            });
            return res.status(200).json({
                status: 200,
                message: "Lấy danh sách đặt chỗ thành công!",
                datas: {
                    bookings
                }
            });
        } catch (error) {
            next(error);
        }
    }
}

export const servicesController = new ServicesController();
