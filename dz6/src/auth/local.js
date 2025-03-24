const { Request, Response, NextFunction } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateAccessToken, generateRefreshToken } = require('./jwt');

const loginHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'Email и пароль обязательны' });
            return;
        }

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({ message: 'Неверный email или пароль' });
            return;
        }

        const accessToken = generateAccessToken({
            username: user.username,
            email: user.email,
            group: user.group,
            avatarUrl: user.avatarUrl,
        });

        const refreshToken = generateRefreshToken({ id: user._id });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000, // 15 минут
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
        });

        res.status(200).json({ message: 'Вход выполнен', accessToken });
    } catch (err) {
        next(err);
    }
};

module.exports = { loginHandler };