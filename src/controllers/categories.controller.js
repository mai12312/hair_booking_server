"use strict"
import { verifyAccessToken } from "../helpers/authToken.helper";
import { mapCategoriesToCamelCase, mapCategoryToCamelCase } from "../helpers/mapCategory.helper";
import { authService } from "../services/auth.service";
import { categoryService } from "../services/categories.service";

class CategoriesController {
    /**
     * Route: GET /service-categories
     * method: GET
     * Description: Get all categories
     */
    async getAllCategories(req, res, next) {
        try{
            const {
                limit,
                offset,
                order,
                sortBy
            } = req.query;
            const categories = await categoryService.getAllCategories({
                limit: Number(isNaN(limit) ? "10" : limit),
                offset: Number(isNaN(offset) ? "0" : offset),
                order: order === "desc" ? "desc" : "asc",
                sortBy
            });

            return res.status(200).json({
                status: 200,
                message: "Lấy danh mục thành công!",
                datas: {
                    categories: mapCategoriesToCamelCase(categories)
                }
            });
        } catch (error) {
            next(error);
        }
    }
    /**
     * Route: GET /service-categories/:categoryId
     * method: GET
     * Description: Get one category by ID
     */
    async getCategoryById(req, res, next) {
        try{
            const categoryId = req.params.categoryId;
            const category = await categoryService.getCategoryById(categoryId);
            return res.status(200).json({
                status: 200,
                message: "Lấy danh mục thành công!",
                datas: {
                    category: mapCategoryToCamelCase(category)
                }
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Route: DELETE /service-categories/:categoryId
     * method: DELETE
     * Description: Delete one category by ID
     */
    async deleteCategory(req, res, next) {
        try{
            const categoryId = req.params.categoryId;
            await categoryService.deleteCategory(categoryId);
            return res.json({
                status: 201,
                message: "Xóa danh mục thành công!",
                datas: null
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Route: POST /service-categories
     * method: POST
     * Description: Create new category
     */
    async addCategory(req, res, next) {
        try{
            const {name, displayOrder} = req.body;
            const authHeader = req.headers['authorization'];
            const payload = verifyAccessToken(authHeader);
            const admin = await authService.getAdminByEmail(payload.email ?? "");
            const adminId = admin.id;
            const id = await categoryService.addCategory({
                name,
                adminId,
                displayOrder
            });
            return res.json({
                status: 201,
                message: "Thêm danh mục thành công!",
                datas: {
                    id
                }
            });
        } catch (error) {
            next(error);
        }
    }
    /**
     * Route: PATCH /service-categories/:categoryId
     * method: PATCH
     * Description: Update category by ID
     */
    async updateCategory(req, res, next) {
        try{
            const categoryId = req.params.categoryId;
            const updatedData = req.body;
            const isUpdated = await categoryService.updateCategory(categoryId, updatedData);
            if(!isUpdated) {
                return res.status(400).json({
                    status: 400,
                    message: "Cập nhật danh mục thất bại!",
                    data: null
                });
            }
            return res.json({
                status: 200,
                message: "Cập nhật danh mục thành công!",
                datas: {
                    id: categoryId
                }
            });
        } catch (error) {
            next(error);
        }
    }
    async getServicesByCategoryId(req, res, next) {
        try {
            const categoryId = req.params.categoryId;
            const {
                limit,
                offset,
                order,
                sortBy
            } = req.query;
            const services = await categoryService.getServicesByCategoryId({
                categoryId,
                limit: Number(isNaN(limit) ? "10" : limit),
                offset: Number(isNaN(offset) ? "0" : offset),
                order: order === "desc" ? "desc" : "asc",
                sortBy
            });
            return res.status(200).json({
                status: 200,
                message: "Lấy dịch vụ theo danh mục thành công!",
                datas: {
                    services
                }
            });
        } catch (error) {
            next(error);
        }
    }
}

export const categoriesController = new CategoriesController();