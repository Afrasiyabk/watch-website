import express from 'express';
const route = express.Router();
import Product from '../modules/productM.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import upload from '../db/Upload.js';
import Category from '../modules/categoryM.js';
import { isMasterAdmin } from '../middleware/isMasterAdmin.js';

const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 10MB per image.'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Maximum 4 images allowed.'
      });
    }
  }
  next(error);
};

// Create a new product
route.post('/create', isMasterAdmin ,upload.array('images', 4), handleMulterError ,async(req,res)=>{
    
    const {name,brand,category,stock,price,description,ratings,numReviews} =req.body;

    const categoryId = await Category.findById(category); // Find category by name to get its ID
    if (!categoryId) {
        return res.status(400).json({ success: false, message: 'Invalid category ID' });
    }

    let images = [];
    try {

        

        const files = req.files || [];

        if (description.length > 300) {
            return res.status(400).json({ success: false, message: 'Maximum 300 characters are allowd ' });
        }
        
        // Check if files were uploaded
        if (files.length === 0) {
            return res.status(400).json({ success: false, message: 'At least one image is required' });
        }

        // Upload files to cloudinary
        for (const file of files) {
            try {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'watch website/watches',
                    use_filename: true,
                    unique_filename: false,
                    resource_type: 'image',
                });
                images.push({ url: result.secure_url, public_id: result.public_id });
                
                // Remove temp file
                fs.unlinkSync(file.path);
            } catch (uploadError) {
                console.error('Cloudinary upload error:', uploadError);
                // Clean up remaining files
                files.forEach(f => {
                    if (fs.existsSync(f.path)) {
                        fs.unlinkSync(f.path);
                    }
                });
                return res.status(500).json({ 
                    success: false, 
                    message: 'Failed to upload image to Cloudinary' 
                });
            }
        }

         const product = await Product.create({
            name,
            brand,
            images,
            category: category ,
            description: description || '',
            price: price ? Number(price) : undefined,
            stock: stock ? Number(stock) : undefined,
            ratings: ratings ? Number(ratings) : undefined,
            numReviews: numReviews ? Number(numReviews) : undefined
        });

        await product.save()

        res.status(201).json({ 
            success: true, 
            message: 'watch created successfully',
            product 
        });
        
    } catch (error) {
        console.error('Create watch error:', error);
        
        // Clean up any uploaded Cloudinary images if product creation fails
        if (images && images.length > 0) {
            for (const img of images) {
                try {
                    await cloudinary.uploader.destroy(img.public_id);
                } catch (deleteError) {
                    console.error('Failed to delete Cloudinary image:', deleteError);
                }
            }
        }
        
        // Handle mongoose validation errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ 
                success: false, 
                message: errors,
                errors 
            });
        }
        
        return res.status(500).json({ 
            success: false, 
            message: error.message || 'Internal server error' 
        });
    }
});

//update product
route.put('/edit/:id', isMasterAdmin, upload.fields([
    { name: 'newImg', maxCount: 4 }
]), async (req, res) => {

    const { id } = req.params;
    const update = { ...req.body };
    
    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        
        const files = req.files.newImg || [];
        const imagesToDelete = req.body.imagesToDelete ? JSON.parse(req.body.imagesToDelete) : [];

        // Delete specified images from Cloudinary
        if (imagesToDelete.length > 0) {
            for (const imageUrl of imagesToDelete) {
                const image = product.images.find(img => img.url === imageUrl);
                if (image && image.public_id) {
                    try {
                        await cloudinary.uploader.destroy(image.public_id);
                        console.log(`Deleted image: ${imageUrl}`);
                    } catch (e) {
                        console.warn('Failed to delete image from Cloudinary', e);
                    }
                }
            }
            // Remove deleted images from product's images array
            product.images = product.images.filter(img => !imagesToDelete.includes(img.url));
        }

        // Upload new images if provided
        if (files.length > 0) {
            const newImages = [];
            for (const file of files) {
                try {
                    const result = await cloudinary.uploader.upload(file.path, {
                        folder: 'watch webiste/watches'
                    });
                    newImages.push({ url: result.secure_url, public_id: result.public_id });
                    // Remove temp file
                    fs.unlinkSync(file.path);
                } catch (uploadError) {
                    console.error('Cloudinary upload error:', uploadError);
                    // Clean up temp file even if upload fails
                    if (fs.existsSync(file.path)) {
                        fs.unlinkSync(file.path);
                    }
                    return res.status(500).json({
                        success: false,
                        message: 'Failed to upload image to Cloudinary'
                    });
                }
            }
            // Add new images to product's images array
            product.images = [...product.images, ...newImages];
        }

        // Update other fields
        // 🔥 Fix category
if (update.category) {
    const categoryDoc = await Category.findById(update.category);

    if (!categoryDoc) {
        return res.status(400).json({
            success: false,
            message: "Invalid category"
        });
    }

    update.category = update.category; // Store the category ID directly
}
        if (update.price) update.price= Number(update.price);
        if (update.stock) update.stock = Number(update.stock);
        if (update.ratings) update.ratings = Number(update.ratings);

        // Merge with existing images
        update.images = product.images;

        const updated = await Product.findByIdAndUpdate(id, update, { new: true });
        res.json({ success: true,message: 'product updated successfuly', car: updated });
    } catch (error) {
        console.error('Edit car error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
});

// Get all products
route.get('/all', async (req, res) => {
    try {
        const products = await Product.find().populate('category').sort({createdAt: -1});
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error('Get all products error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch products' });
    }
});

// Get product by ID
route.get('/:id',  async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error('Get product by ID error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch product' });
    }
});

// Delete product
route.delete('/delete/:id', isMasterAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        // Delete associated images from Cloudinary
        if (product.images && product.images.length > 0) {
            for (const img of product.images) {
                if (img.public_id) {
                    try {
                        await cloudinary.uploader.destroy(img.public_id);
                        console.log(`Deleted image: ${img.url}`);
                    } catch (e) {
                        console.warn('Failed to delete image from Cloudinary', e);
                    }
                }
            }
        }
        await Product.findByIdAndDelete(id);
        res.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ success: false, message: 'Failed to delete product' });
    }
});




export default route;