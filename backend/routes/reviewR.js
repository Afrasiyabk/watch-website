import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'; // Protects routes
import Review from '../modules/reviewM.js';
import Product from '../modules/productM.js';

const route = express.Router();

/** * @desc    CREATE a new review
 * @route   POST /api/reviews/write
 */
route.post('/write', authMiddleware, async (req, res) => {
    // Get data from body. We need productId to know which watch is being reviewed.
    const { rating, comment, productId } = req.body;
    
    // The userId comes from your authMiddleware (assuming it attaches the user to req.user)
    const userId = req.user.id; 

    try {
        // 1. Verify if the product actually exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Watch not found' });
        }

        // 2. Create and Save the review (Review.create automatically saves)
        const review = await Review.create({
            user: userId,
            product: productId,
            rating: Number(rating),
            comment
        });

        res.status(201).json({ 
            success: true, 
            message: 'Review posted successfully!', 
            review 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/** * @desc    UPDATE an existing review
 * @route   PUT /api/reviews/edit/:id
 */
route.put('/edit/:id', authMiddleware, async (req, res) => {
    const { rating, comment } = req.body;
    const reviewId = req.params.id;
    const userId = req.user.id;

    try {
        // 1. Find the review by ID
        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }

        // 2. Security Check: Only the person who wrote the review can edit it
        if (review.user.toString() !== userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized: You can only edit your own reviews' });
        }

        // 3. Update the fields
        review.rating = rating ? Number(rating) : review.rating;
        review.comment = comment || review.comment;

        const updatedReview = await review.save();

        res.status(200).json({ 
            success: true, 
            message: 'Review updated', 
            updatedReview 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/** * @desc    DELETE a review
 * @route   DELETE /api/reviews/delete/:id
 */
route.delete('/delete/:id', authMiddleware, async (req, res) => {
    const reviewId = req.params.id;
    const userId = req.user.id;

    try {
        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }

        // Security Check: Only the owner can delete
        if (review.user.toString() !== userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        // Remove the review from database
        await review.deleteOne();

        res.status(200).json({ 
            success: true, 
            message: 'Review deleted successfully' 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/** * @desc    GET ALL reviews for a specific product
 * @route   GET /api/reviews/product/:productId
 */
route.get('/all/:productId', async (req, res) => {
    try {
        // Find all reviews for a watch and populate user names
        const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name');
        res.status(200).json({ success: true, count: reviews.length, reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default route;