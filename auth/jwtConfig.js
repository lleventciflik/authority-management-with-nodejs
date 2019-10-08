module.exports = {
    jwt: {
        secret: process.env.JWT_SECRET || 'SetStrongSecretInDotEnv',
        options: {
            audience: 'https://example.io',
            expiresIn: '12h', // 1d
            issuer: 'example.io'
        },
        cookie: {
            httpOnly: true,
            sameSite: true,
            signed: true,
            secure: true
        }
    }
};