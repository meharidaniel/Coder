function authenticat (req, res, next) {
    console.log('Authentcating...')
    next();
};

module.exports = authenticat;