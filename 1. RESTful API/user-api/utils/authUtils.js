export const validateAuthUser = (req) => {
    // Check if the user is authenticated
    if (!req.user || !req.user.id) {
        return {
        status: 401,
        message: 'Unauthorized: User not authenticated.',
        };
    }

    // Check if the user has the required role
    if (!req.user.roles || !req.user.roles.includes('admin')) {
        return {
        status: 403,
        message: 'Forbidden: User does not have the required role.',
        };
    }

    return null; // No errors, user is authenticated and authorized
}
