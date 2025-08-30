/**
 * Map admin information
 * @param {Object} admin 
 * @returns 
 */
export function mapAdminInfo(admin) {
    if (!admin) return null;
    return {
        id: admin.id,
        fullname: admin.fullname,
        avatar: admin.avatar,
        phone: admin.phone,
        email: admin.email,
    };
}