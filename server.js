const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize the app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors());         // Enable Cross-Origin Resource Sharing

// MongoDB connection
mongoose
    .connect('mongodb://localhost:27017/lostAndFound', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define Schema and Model
const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    itemLost: { type: String, required: true },
    itemDescriptionLost: { type: String, required: true },
    lostLocation: { type: String, required: true },
    contactLostInput: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }, // Timestamp for each item
});

const Item = mongoose.model('Item', itemSchema);

// Routes

// POST: Add a new lost item
app.post('/api/items', async (req, res) => {
    const { name, itemLost, itemDescriptionLost, lostLocation, contactLostInput } = req.body;

    // Validate request
    if (!name || !itemLost || !itemDescriptionLost || !lostLocation || !contactLostInput) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        // Create a new item
        const newItem = new Item({
            name,
            itemLost,
            itemDescriptionLost,
            lostLocation,
            contactLostInput,
        });

        // Save to the database
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save the item. Please try again later.' });
    }
});

// GET: Fetch all lost items
app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.find().sort({ createdAt: -1 }); // Fetch items sorted by newest first
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items. Please try again later.' });
    }
});

// GET: Fetch a specific lost item by ID
app.get('/api/items/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const item = await Item.findById(id);

        if (!item) {
            return res.status(404).json({ error: 'Item not found.' });
        }

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch the item. Please try again later.' });
    }
});

// DELETE: Remove a lost item by ID
app.delete('/api/items/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedItem = await Item.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ error: 'Item not found.' });
        }

        res.status(200).json({ message: 'Item deleted successfully.', deletedItem });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the item. Please try again later.' });
    }
});

// PUT: Update a lost item by ID
app.put('/api/items/:id', async (req, res) => {
    const { id } = req.params;
    const { name, itemLost, itemDescriptionLost, lostLocation, contactLostInput } = req.body;

    // Validate request
    if (!name || !itemLost || !itemDescriptionLost || !lostLocation || !contactLostInput) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const updatedItem = await Item.findByIdAndUpdate(
            id,
            { name, itemLost, itemDescriptionLost, lostLocation, contactLostInput },
            { new: true, runValidators: true } // Return updated item and validate inputs
        );

        if (!updatedItem) {
            return res.status(404).json({ error: 'Item not found.' });
        }

        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update the item. Please try again later.' });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
