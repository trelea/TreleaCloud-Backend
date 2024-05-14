const { Router } = require('express');
const router = Router();
const isAuthorized = require('../services/authorized.service');


const { getCloudContent } = require('../controllers/cloud/content.controller');
const { getFile } = require('../controllers/cloud/file.controller');
const { privateFilePriority } = require('../controllers/cloud/private.controller');
const { publicFilePriority } = require('../controllers/cloud/public.controller')
const { uploadFile } = require('../controllers/cloud/upload.controller');


/**
 * 
 * /api/v1/cloud/                       GET
 * /api/v1/cloud/:file_id               GET
 * 
 * /api/v1/cloud/private/:file_id       PUT
 * /api/v1/cloud/public/:file_id        PUT
 * 
 * /api/v1/cloud/upload                 POST
 * /api/v1/cloud/download/:file_id      GET
 * /api/v1/cloud/rename/:file_id        PUT
 * /api/v1/cloud/drop/:file_id          DELETE
 * 
 */


router.get('/', isAuthorized, getCloudContent);
router.get('/:id', isAuthorized, getFile);

router.put('/private/:id', isAuthorized, privateFilePriority);
router.put('/public/:id', isAuthorized, publicFilePriority);

router.post('/upload', isAuthorized, uploadFile);



module.exports = router;