// health.controller.js
exports.checkHealth = (req, res) => {
    res.status(200).json({ status: 'OK' });
};
