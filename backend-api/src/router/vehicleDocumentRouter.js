const express = require('express');
const router = express.Router();
const vehicleDocumentController = require('../controller/vehicleDocumentController');
const { authenticateToken } = require('../middleware/auth');
const authorize = require('../middleware/role');
const { validateRequest } = require('../middleware/validateInput');
const { uploadSingle } = require('../middleware/fileUpload');
const vehicleDocumentSchemas = require('../validations/vehicleDocument.validator');


router.get(
  '/vehicle/:vehicleId',
  authenticateToken,
  validateRequest(vehicleDocumentSchemas.vehicleIdParam, 'params'),
  vehicleDocumentController.getVehicleDocuments
);



router.get(
  '/expiring/documents',
  authenticateToken,
  authorize('ADMIN', 'PODMANAGER'),
  validateRequest(vehicleDocumentSchemas.getExpiringDocuments, 'query'),
  vehicleDocumentController.getExpiringDocuments
);


router.get(
  '/',
  authenticateToken,
  authorize('ADMIN', 'PODMANAGER'),
  validateRequest(vehicleDocumentSchemas.getAllDocuments, 'query'),
  vehicleDocumentController.getAllVehicleDocuments
);


router.post(
  '/upload',
  authenticateToken,
  authorize('ADMIN', 'PODMANAGER'),
  uploadSingle('document'), 
  validateRequest(vehicleDocumentSchemas.uploadDocument, 'body'),
  vehicleDocumentController.uploadDocument
);


router.get(
  '/:documentId',
  authenticateToken,
  validateRequest(vehicleDocumentSchemas.documentIdParam, 'params'),
  vehicleDocumentController.getDocumentById
);


router.put(
  '/:documentId',
  authenticateToken,
  authorize('ADMIN', 'PODMANAGER'),
  validateRequest(vehicleDocumentSchemas.documentIdParam, 'params'),
  validateRequest(vehicleDocumentSchemas.updateDocument, 'body'),
  vehicleDocumentController.updateDocument
);


router.delete(
  '/:documentId',
  authenticateToken,
  authorize('ADMIN'),
  validateRequest(vehicleDocumentSchemas.documentIdParam, 'params'),
  vehicleDocumentController.deleteDocument
);


router.get(
  '/:documentId/download',
  authenticateToken,
  validateRequest(vehicleDocumentSchemas.documentIdParam, 'params'),
  vehicleDocumentController.downloadDocument
);

module.exports = router;