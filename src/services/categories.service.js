import { addCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../repositories/categories.repo";

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

    async addCategory({name, adminId}) {
        return await addCategory({
            name,
            adminId
        });
    }
    
    async updateCategory(categoryId, data) {
        const category = await getCategoryById(categoryId);
        if (!category) throw new Error("Danh mục không tồn tại!");
        return await updateCategory(categoryId, data);
    }

    async deleteCategory(categoryId) {
        const category = await getCategoryById(categoryId);
        if (!category) throw new Error("Danh mục không tồn tại!");
        return await deleteCategory(categoryId);
    }
}

export const categoryService = new CategoryService();