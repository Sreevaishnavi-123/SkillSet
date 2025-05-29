const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const authMiddleware = require('../middleware/auth'); 

router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().populate('user', 'username');
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/', authMiddleware, async (req, res) => {
  const skill = new Skill({
    title: req.body.title,
    description: req.body.description,
    user: req.user.id,
  });
  try {
    const newSkill = await skill.save();
    res.status(201).json(newSkill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    if (skill.user.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Skill deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;