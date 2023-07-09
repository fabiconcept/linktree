const crypto = require('crypto');

// Generate a random salt
export const generateSalt = () => {
    return crypto.randomBytes(16).toString('hex');
};

// Hash the password with the provided salt
export const hashPassword = (password, salt) => {
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hashedPassword;
};

// Compare the hashed password with the provided password
export const comparePassword = (password, hashedPassword, salt) => {
    const hashedInputPassword = hashPassword(password, salt);
    return hashedInputPassword === hashedPassword;
};