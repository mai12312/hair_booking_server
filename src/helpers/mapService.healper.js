
/**
 * Utility: Map service object keys to camelCase
 */
export function mapServiceToCamelCase(service) {
    if (!service || typeof service !== "object") return service;
    return {
        id: service.id,
        name: service.name,
        categoryId: service.category_id || service.categoryId,
        categoryName: service.category_name || service.categoryName,
        price: service.price,
        status: service.status,
        image: service.image,
        duration: service.duration,
        createdAt: service.created_at || service.createdAt,
        updatedAt: service.updated_at || service.updatedAt,
        description: service.description || service.description,
        // ...add more fields as needed
    };
}

/**
 * Utility: Map array of services to camelCase
 */
export function mapServicesToCamelCase(services) {
    if (!Array.isArray(services)) return [];
    return services.map(mapServiceToCamelCase);
}