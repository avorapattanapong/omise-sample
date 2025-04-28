import userRepository from '../repositories/inMemUsers.js';
import User from "../model/user.js";

class UserService {
    async register(memberData) {
        const newUser = new User(memberData);
        return await userRepository.create(newUser);
    }

    async getUser(id) {
        return await userRepository.findByIdPublic(id);
    }

    async updateProfile(id, updateData) {
        const user = await userRepository.findById(id);
        if (!user) return null;

        return await userRepository.update(id, updateData);
    }

    async deleteProfile(id) {
        return await userRepository.delete(id);
    }

    async updatePassword(id, currentPassword, newPassword) {
        const user = await userRepository.findById(id);
        if (!user) throw new Error('User not found');
        console.log(user);
        console.log(currentPassword);
        console.log(newPassword);

        if (user.password !== currentPassword) throw new Error('Invalid password');
        if (newPassword === currentPassword) throw new Error('New password must be different from current password');

        user.password = newPassword;
        return await userRepository.update(id, user);
    }
}

const userService = new UserService();
export default userService;
