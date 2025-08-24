"use strict"
import { mapCategoriesToCamelCase, mapCategoryToCamelCase } from "../helpers/mapCategory.helper";
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
                data: null
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
            const {name, adminId} = req.body;
            const id = await categoryService.addCategory({
                name,
                adminId
            });
            return res.json({
                status: 201,
                message: "Thêm danh mục thành công!",
                data: {
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
            await categoryService.updateCategory(categoryId, updatedData);
            return res.json({
                status: 200,
                message: "Cập nhật danh mục thành công!",
                data: {
                    id: categoryId
                }
            });
        } catch (error) {
            next(error);
        }
    }
}

export const categoriesController = new CategoriesController();