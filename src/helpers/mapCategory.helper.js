/**
 * Utility: Map category object keys to camelCase
 */
export function mapCategoryToCamelCase(category) {
    if (!category || typeof category !== "object") return category;
    return {
        id: category.id,
        name: category.name,
        adminId: category.admin_id || category.adminId,
        categoryId: category.category_id || category.categoryId,
        createdAt: category.created_at || category.createdAt,
        updatedAt: category.updated_at || category.updatedAt,
        status: category.status || category.status,
        displayOrder: category.display_order || category.displayOrder
    };
}

/**
 * Utility: Map array of categories to camelCase
 */
export function mapCategoriesToCamelCase(categories) {
    if (!Array.isArray(categories)) return [];
    return categories.map(mapCategoryToCamelCase);
}