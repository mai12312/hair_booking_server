const bcrypt = require('bcryptjs');
// hash password
export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        throw new Error("Password is invalid!");
    }
}

export const comparePassword = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        console.log("error: ", error);
        throw new Error("Email hoặc mật khẩu không đúng!");
    }
}