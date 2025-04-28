export default class User {
    constructor({
        id,
        email,
        password,
        name,
        dateOfBirth,
        gender,
        address,
        subscribeToNewsletter
    }) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.address = address;
        this.subscribeToNewsletter = subscribeToNewsletter;
    }

    // Computed field - age (calculated from DOB)
    get age() {
        if (!this.dateOfBirth) return null;
        const diff = Date.now() - new Date(this.dateOfBirth).getTime();
        return new Date(diff).getUTCFullYear() - 1970;
    }

    // Hide sensitive data (optional helper)
    toProfileView() {
        return {
            id: this.id,
            email: this.email,
            name: this.name,
            age: this.age,
            gender: this.gender,
            address: this.address,
            subscribeToNewsletter: this.subscribeToNewsletter
        };
    }

    // Optional: validate password (could be enhanced with hashing later)
    isPasswordCorrect(password) {
        return this.password === password;
    }

    // Update editable fields
    updateProfile({ dateOfBirth, gender, address, subscribeToNewsletter }) {
        if (dateOfBirth !== undefined) this.dateOfBirth = dateOfBirth;
        if (gender !== undefined) this.gender = gender;
        if (address !== undefined) this.address = address;
        if (subscribeToNewsletter !== undefined) this.subscribeToNewsletter = subscribeToNewsletter;
    }

    // Update password
    changePassword(newPassword) {
        this.password = newPassword;
    }
}
