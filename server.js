const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 9000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb+srv://crashking999999_db_user:u1mQL3fhDH4hOyaM@cluster0.mte5qrs.mongodb.net/?appName=Cluster0");

const Caption = mongoose.model('Caption', new mongoose.Schema({
    text: String,
    category: String
}));

app.get('/api/captions/:category', async (req, res) => {
    const caps = await Caption.find({ category: req.params.category });
    res.json({ captions: caps });
});

app.post('/api/captions', async (req, res) => {
    const newCap = new Caption(req.body);
    await newCap.save();
    res.json({ success: true });
});

app.delete('/api/captions/:id', async (req, res) => {
    await Caption.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

app.get('/:category', (req, res) => res.sendFile(path.join(__dirname, 'public', 'category.html')));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
