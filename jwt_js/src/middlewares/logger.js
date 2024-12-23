const logMiddleware = (req, res, next) => {
    console.log(`Ruta consultada: ${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
};

module.exports = logMiddleware;