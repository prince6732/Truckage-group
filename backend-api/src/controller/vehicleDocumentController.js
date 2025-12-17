const { VehicleDocument, Vehicle } = require('../../models');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');

const getRelativePath = (absolutePath) => {
  return absolutePath.replace(process.cwd(), '').replace(/\\/g, '/');
};

const getVehicleDocuments = async (req, res, next) => {
  try {
    const { vehicleId } = req.params;
    const tenantId = req.user.tenantId;

    const documents = await VehicleDocument.findAll({
      where: {
        vehicle_id: vehicleId,   // ✅ snake_case
        tenant_id: tenantId      // ✅ snake_case
      },
      include: [
        {
          model: Vehicle,
          as: 'vehicle',
          attributes: ['id', 'vehicleNumber', 'model']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: documents
    });
  } catch (error) {
    console.error('GET VEHICLE DOCUMENTS ERROR:', error);
    next(error);
  }
};



const getAllVehicleDocuments = async (req, res, next) => {
  try {
    const tenantId = req.user.tenantId;
    const { page = 1, limit = 10, documentType, expiryStatus } = req.query;

    const offset = (page - 1) * limit;
    
    // Build where clause
    const whereClause = { tenantId };
    
    if (documentType) {
      whereClause.documentType = documentType;
    }

    // Filter by expiry status
    if (expiryStatus === 'expired') {
      whereClause.expiryDate = {
        [Op.lt]: new Date()
      };
    } else if (expiryStatus === 'expiring_soon') {
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      
      whereClause.expiryDate = {
        [Op.between]: [new Date(), thirtyDaysFromNow]
      };
    }

    const { count, rows: documents } = await VehicleDocument.findAndCountAll({
      where: whereClause,
      include: [{
        model: Vehicle,
        as: 'vehicle',
        attributes: ['id', 'vehicleNumber', 'model', 'make']
      }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    const totalPages = Math.ceil(count / limit);

    return res.status(200).json(
      new ApiResponse(200, {
        documents,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalDocuments: count,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }, 'All vehicle documents retrieved successfully')
    );

  } catch (error) {
    next(error);
  }
};

/**
 * Get specific document by ID
 */
const getDocumentById = async (req, res, next) => {
  try {
    const { documentId } = req.params;
    const { tenantId } = req.user;

    const document = await VehicleDocument.findOne({
      where: {
        id: documentId,
        tenantId
      },
      include: [{
        model: Vehicle,
        as: 'vehicle',
        attributes: ['id', 'vehicleNumber', 'model', 'make']
      }]
    });

    if (!document) {
      throw new ApiError(404, 'Document not found or access denied');
    }

    return res.status(200).json(
      new ApiResponse(200, document, 'Document retrieved successfully')
    );

  } catch (error) {
    next(error);
  }
};

/**
 * Upload new document
 */
const uploadDocument = async (req, res, next) => {
  try {
    const { vehicleId, documentType, expiryDate } = req.body;
    const tenantId = req.user.tenantId;

    const vehicle = await Vehicle.findOne({
      where: { id: vehicleId, tenantId }
    });

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found or access denied' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // 🔍 File type
    const ext = path.extname(req.file.originalname).toLowerCase();
    let fileType;

    if (ext === '.pdf') fileType = 'pdf';
    else if (['.jpg', '.jpeg', '.png'].includes(ext)) fileType = 'image';
    else throw new Error('Invalid file type');

    // ✅ Convert absolute path → relative path
    const relativePath = getRelativePath(req.file.path);

    const existingDocument = await VehicleDocument.findOne({
      where: {
        tenant_id: tenantId,
        vehicle_id: vehicleId,
        document_type: documentType
      }
    });

    if (existingDocument) {
      const oldAbsolutePath = path.join(process.cwd(), existingDocument.file_path);

      if (fs.existsSync(oldAbsolutePath)) {
        fs.unlinkSync(oldAbsolutePath);
      }

      await existingDocument.update({
        file_path: relativePath,   // ✅ SAVE RELATIVE
        file_type: fileType,
        expiry_date: expiryDate || null
      });

      return res.json({
        success: true,
        message: 'Document updated successfully',
        data: existingDocument
      });
    }

    const newDocument = await VehicleDocument.create({
      tenant_id: tenantId,
      vehicle_id: vehicleId,
      document_type: documentType,
      file_path: relativePath,     // ✅ SAVE RELATIVE
      file_type: fileType,
      expiry_date: expiryDate || null
    });

    return res.status(201).json({
      success: true,
      message: 'Document uploaded successfully',
      data: newDocument
    });

  } catch (error) {
    console.error('UPLOAD DOCUMENT ERROR:', error);

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    next(error);
  }
};

/**
 * Update document (metadata only, not file)
 */
const updateDocument = async (req, res, next) => {
  try {
    const { documentId } = req.params;
    const { documentType, expiryDate } = req.body;
    const tenantId = req.user.tenantId;

    const document = await VehicleDocument.findOne({
      where: {
        id: documentId,
        tenantId
      }
    });

    if (!document) {
      throw new ApiError(404, 'Document not found or access denied');
    }

    // Update document metadata
    if (documentType) document.documentType = documentType;
    if (expiryDate !== undefined) document.expiryDate = expiryDate;

    await document.save();

    return res.status(200).json(
      new ApiResponse(200, document, 'Document updated successfully')
    );

  } catch (error) {
    next(error);
  }
};

/**
 * Delete document
 */
const deleteDocument = async (req, res, next) => {
  try {
    const { documentId } = req.params;
    const tenantId = req.user.tenantId;

    const document = await VehicleDocument.findOne({
      where: {
        id: documentId,
        tenant_id: tenantId   // ✅ FIX
      }
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found or access denied'
      });
    }

    // 🔹 Build absolute path from relative DB path
    const absolutePath = path.join(process.cwd(), document.file_path);

    // 🔹 Delete physical file
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }

    // 🔹 Delete DB record
    await document.destroy();

    return res.status(200).json({
      success: true,
      message: 'Document deleted successfully'
    });

  } catch (error) {
    console.error('DELETE DOCUMENT ERROR:', error);
    next(error);
  }
};
/**
 * Download/View document
 */
const downloadDocument = async (req, res, next) => {
  try {
    const { documentId } = req.params;
    const tenantId = req.user.tenantId;

    const document = await VehicleDocument.findOne({
      where: {
        id: documentId,
        tenant_id: tenantId   // ✅ FIX
      }
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found or access denied'
      });
    }

    // ✅ Use snake_case fields
    if (!fs.existsSync(document.file_path)) {
      return res.status(404).json({
        success: false,
        message: 'File not found on server'
      });
    }

    const fileName = path.basename(document.file_path);
    const mimeType =
      document.file_type === 'pdf'
        ? 'application/pdf'
        : 'image/*';

    res.setHeader('Content-Type', mimeType);
    res.setHeader(
      'Content-Disposition',
      `inline; filename="${fileName}"`
    );

    const fileStream = fs.createReadStream(document.file_path);
    fileStream.pipe(res);

  } catch (error) {
    console.error('DOWNLOAD DOCUMENT ERROR:', error);
    next(error);
  }
};

/**
 * Get documents expiring soon
 */
const getExpiringDocuments = async (req, res, next) => {
  try {
    const tenantId = req.user.tenantId;
    const { days = 30 } = req.query;

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + parseInt(days));

    const expiringDocuments = await VehicleDocument.findAll({
      where: {
        tenantId,
        expiryDate: {
          [Op.between]: [new Date(), futureDate]
        }
      },
      include: [{
        model: Vehicle,
        as: 'vehicle',
        attributes: ['id', 'vehicleNumber', 'model', 'make']
      }],
      order: [['expiryDate', 'ASC']]
    });

    return res.status(200).json(
      new ApiResponse(200, expiringDocuments, `Documents expiring in next ${days} days`)
    );

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getVehicleDocuments,
  getAllVehicleDocuments,
  getDocumentById,
  uploadDocument,
  updateDocument,
  deleteDocument,
  downloadDocument,
  getExpiringDocuments
};