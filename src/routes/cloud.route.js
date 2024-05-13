const { Router } = require('express');
const router = Router();
const isAuthorized = require('../services/authorized.service');


const { uploadFile } = require('../controllers/cloud/upload.controller');
const { getCloudContent } = require('../controllers/cloud/content.controller')

/**
 * /api/v1/cloud/                       GET
 * /api/v1/cloud/upload                 POST
 * /api/v1/cloud/download/:file_id      GET
 * /api/v1/cloud/rename/:file_id        PUT
 * /api/v1/cloud/delete/:file_id        DELETE
 * /api/v1/cloud/private/:file_id       PUT
 * /api/v1/cloud/public/:private_id     PUT
 */


router.get('/', isAuthorized, getCloudContent);
router.post('/upload', isAuthorized, uploadFile);
router.get('/download/:id');
router.put('/rename/:id');
router.delete('/delete/:id');
router.put('/private/:id');
router.put('/public/:id');


module.exports = router;