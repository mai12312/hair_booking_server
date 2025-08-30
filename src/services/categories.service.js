import { addCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../repositories/categories.repo";
import { getServicesByCategoryId } from "../repositories/services.repo";

class CategoryService {
    async getAllCategories({
        limit,
        offset,
        order,
        sortBy
    }) {
        return await getAllCategories({
            limit,
            offset,
            order,
            sortBy
        });
    }

    async getCategoryById(categoryId) {
        const category = await getCategoryById(categoryId);
        if (!category) throw new Error("Danh mục không tồn tại!");
        return category;
    }

    async addCategory({name, adminId, displayOrder}) {
        return await addCategory({
            name,
            adminId,
            displayOrder
        });
    }
    
    async updateCategory(categoryId, updatedData) {
        const category = await getCategoryById(categoryId);
        if (!category) throw new Error("Danh mục không tồn tại!");
        const data = {
            ...category,
            ...updatedData,
        }
        return await updateCategory({categoryId, data});
    }

    async deleteCategory(categoryId) {
        const category = await getCategoryById(categoryId);
        if (!category) throw new Error("Danh mục không tồn tại!");
        return await deleteCategory(categoryId);
    }

    async getServicesByCategoryId({
        categoryId,
        limit,
        offset,
        order,
        sortBy
    }) {
        return await getServicesByCategoryId({
            categoryId,
            limit,
            offset,
            order,
            sortBy
        });
    }
}

export const categoryService = new CategoryService();