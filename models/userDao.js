const { AppDataSource } = require('./dataSource');
const appError = require('../middlewares/appError');

const signUp = async (userName, password, name, email, phoneNumber, birth) => {
    try {
        await AppDataSource.query(`
            INSERT INTO users(
                user_name,
                password,
                name,
                email,
                phone_number,
                birth
            ) VALUES (?, ?, ?, ?, ?, ?)`,
            [userName, password, name, email, phoneNumber, birth]
        );
    } catch (err) {
        throw new appError('INVALID_DATA_INPUT', 500);
    }
};

const getUserByUserName = async (userName) => {
    const [user] = await AppDataSource.query(`
        SELECT
            id,
            user_name,
            password,
            email,
            phone_number,
            birth
        FROM users
        WHERE user_name = ?`,
        [userName]
    );

    return user;
}

const getUserById = async (userId) => {
    const [user] = await AppDataSource.query(`
        SELECT
            id,
            user_name,
            password,
            email,
            phone_number,
            birth
        FROM users
        WHERE id = ?`,
        [userId]
    );

    return user;
}

module.exports = {
    signUp,
    getUserByUserName,
    getUserById
}