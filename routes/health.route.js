const express = require('express');
const router = express.Router();
const healthController = require('../controllers/health.controller'); // Ensure the path is correct

// Example of a POST route
router.get('/health', healthController.checkHealth); // Make sure checkHealth is defined

module.exports = router;
