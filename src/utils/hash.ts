import bcrypt from 'bcrypt';

// Hashes the password using bcrypt with a salt rounds of 10
export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// Compares a plaintext password with a hashed password
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};
