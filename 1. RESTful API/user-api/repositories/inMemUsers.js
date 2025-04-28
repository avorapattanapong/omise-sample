import User from "../model/user.js";

const users = new Map(); // Simulate storage
let currentId = 0; // Simulate incrementing id

class UserRepository {
    async create(user) {
        currentId++;
        user.id = currentId.toString();
        users.set(user.id, user);
        return user.toProfileView();
    }

    async findById(id) {
        const user = users.get(id.toString());
        if (!user) return null;

        return user
    }

    async findByIdPublic(id){
        return userRepository.findById(id).toProfileView();
    }

    async update(id, updateData) {
        if (!users.has(id.toString())) return null;
        const existing = users.get(id.toString());
        const updated = { ...existing, ...updateData };
        users.set(id.toString(), updated);

        return new User(updated).toProfileView();
    }

    async delete(id) {
        return users.delete(id.toString());
    }

}

const userRepository = new UserRepository();
export default userRepository;
