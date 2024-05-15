const { Router } = require('express');
const router = Router();
const isAuthorized = require('../services/authorized.service');


const { getCloudContent } = require('../controllers/cloud/content.controller');
const { getFile } = require('../controllers/cloud/file.controller');
const { privateFilePriority } = require('../controllers/cloud/private.controller');
const { publicFilePriority } = require('../controllers/cloud/public.controller')
const { uploadFile } = require('../controllers/cloud/upload.controller');
const { downloadFile } = require('../controllers/cloud/download.controller');
const { renameFile } = require('../controllers/cloud/rename.controller');
const { dropFile } = require('../controllers/cloud/drop.controller');
const { destroyFile } = require('../controllers/cloud/destroy.controller');
const { backupContent } = require('../controllers/cloud/backup.content.controller');
const { backupFile } = require('../controllers/cloud/backup.file.controller');


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
 * 
 * /api/v1/cloud/rename/:file_id        PUT
 * /api/v1/cloud/drop/:file_id          DELETE
 * /api/v1/cloud/destroy/:file_id       DELETE
 * 
 * /api/v1/cloud/backup                 GET
 * /api/v1/cloud/backup/:file_id        GET
 */


router.get('/', isAuthorized, getCloudContent)
router.get('/backup', isAuthorized, backupContent)

router.get('/:id', isAuthorized, getFile)
router.get('/backup/:id', isAuthorized, backupFile)
router.get('/download/:id', isAuthorized, downloadFile)

router.post('/upload', isAuthorized, uploadFile)
    
router.put('/rename/:id', isAuthorized, renameFile)
router.put('/private/:id', isAuthorized, privateFilePriority)
router.put('/public/:id', isAuthorized, publicFilePriority)

router.delete('/drop/:id', isAuthorized, dropFile)
router.delete('/destroy/:id', isAuthorized, destroyFile)
    

module.exports = router;