import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Category from "../modules/categoryM.js";
import { isMasterAdmin } from "../middleware/isMasterAdmin.js";
import upload from "../db/Upload.js"; // Import your dynamic Multer config
import cloudinary from "cloudinary"; // Ensure cloudinary is configured
import slugify from 'slugify';

const route = express.Router();

// 1. CREATE CATEGORY (With SVG Upload & Slug)
import fs from 'fs'; // Add this at the top of categoryR.js

route.post(
  "/create",
  authMiddleware,
  isMasterAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const { name } = req.body;

      // ✅ Validate name
      if (!name || typeof name !== "string") {
        return res.status(400).json({
          success: false,
          message: "Category name is required",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Category SVG icon is required",
        });
      }

      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "watch_website/categories",
        resource_type: "auto",
      });

      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);

      const cat = await Category.create({
        name: name.trim(),
        slug: slugify(name.trim(), { lower: true }),
        image: {
          url: result.secure_url,
          public_id: result.public_id,
        },
      });

      res.status(201).json({
        success: true,
        message: "Category created successfully",
        cat,
      });

    } catch (error) {
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// 2. GET ALL CATEGORIES
route.get('/all', authMiddleware, async (req, res) => {
    try {
        const cat = await Category.find();
        res.status(200).json({ success: true, cat}); // Changed 'cat' to 'categories' for clarity
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 3. EDIT CATEGORY
route.put('/edit/:id', isMasterAdmin, upload.single('image'), async (req, res) => {
    const { id } = req.params;
    try {
        let updateData = { ...req.body };

        // If name is updated, update the slug
        if (req.body.catName) {
            updateData.slug = slugify(req.body.catName, { lower: true });
        }

        // If a new SVG is uploaded
        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'watch_website/categories',
            });
            updateData.image = {
                url: result.secure_url,
                public_id: result.public_id
            };
        }

        const cat = await Category.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json({ success: true, message: 'Category updated successfully', cat });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// 4. DELETE CATEGORY
route.delete('/delete/:id', isMasterAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        // Find category to get image public_id
        const cat = await Category.findById(id);
        if (!cat) return res.status(404).json({ success: false, message: "Category not found" });

        // Remove image from Cloudinary
        await cloudinary.v2.uploader.destroy(cat.image.public_id);

        await Category.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default route;