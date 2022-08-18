const { AppDataSource } = require('./dataSource');


const signUp = async (userId, password, name, email, phoneNumber, birth) => {
    try {
        await AppDataSource.query(`
            INSERT INTO users(
                user_id,
                password,
                name,
                email,
                phone_number,
                birth
            ) VALUES (?, ?, ?, ?, ?, ?)`,
            [userId, password, name, email, phoneNumber, birth]
        );
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

const getUserByUserId = async (userId) => {
    const [user] = await AppDataSource.query(`
        SELECT
            id,
            user_id,
            password,
            email,
            phone_number,
            birth
        FROM users
        WHERE user_id = ?`,
        [userId]
    );

    return user;
}

const getUserById = async (userId) => {
    const [user] = await AppDataSource.query(`
        SELECT
            id,
            user_id,
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
    getUserByUserId,
    getUserById
}