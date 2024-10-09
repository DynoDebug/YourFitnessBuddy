const express = require('express');
const cors = require('cors');
const { User, MuscleGroup, Exercise } = require('./src/database');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });
  if (user && user.password === req.body.password) {
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Invalid credentials' });
  }
});

app.get('/api/muscle-groups', async (req, res) => {
  const muscleGroups = await MuscleGroup.findAll();
  res.json(muscleGroups);
});

app.get('/api/exercises/:muscleGroupId', async (req, res) => {
  const exercises = await Exercise.findAll({ where: { MuscleGroupId: req.params.muscleGroupId } });
  res.json(exercises);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));