const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Exercise = require('./models/Exercise');
const Workout = require('./models/Workout');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'Backend is running' }));

// Connect Database
connectDB();

// --- Routes ---

// @route   GET /api/exercises
// @desc    Get all exercises
app.get('/api/exercises', async (req, res) => {
    try {
        const { muscleGroup } = req.query;
        const filter = muscleGroup ? { muscleGroup } : {};
        const exercises = await Exercise.find(filter).sort('name');
        res.json(exercises);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/workouts
// @desc    Log a new workout
app.post('/api/workouts', async (req, res) => {
    try {
        const { date, durationMinutes, exercises } = req.body;
        
        const newWorkout = new Workout({
            date: date || Date.now(),
            durationMinutes,
            exercises
        });

        const workout = await newWorkout.save();
        res.json(workout);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/workouts
// @desc    Get all workouts
app.get('/api/workouts', async (req, res) => {
    try {
        const workouts = await Workout.find().sort({ date: -1 }).populate('exercises.exercise');
        res.json(workouts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/workouts/summary
// @desc    Get weekly summary data
app.get('/api/workouts/summary', async (req, res) => {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentWorkouts = await Workout.find({
            date: { $gte: sevenDaysAgo }
        }).populate('exercises.exercise');

        // Calculate total sets, total volume, total duration
        let totalSets = 0;
        let totalVolume = 0;
        let totalDuration = 0;

        recentWorkouts.forEach(workout => {
            totalDuration += workout.durationMinutes;
            workout.exercises.forEach(ex => {
                ex.sets.forEach(set => {
                    totalSets++;
                    totalVolume += (set.reps * set.weight);
                });
            });
        });

        res.json({
            count: recentWorkouts.length,
            totalDuration,
            totalSets,
            totalVolume,
            recentWorkouts
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/seed
// @desc    Seed database with initial exercises
app.post('/api/seed', async (req, res) => {
    try {
        const initialExercises = [
            // Chest
            { name: 'Barbell Bench Press', muscleGroup: 'Chest', equipment: 'Barbell', description: 'Classic chest builder' },
            { name: 'Incline Dumbbell Press', muscleGroup: 'Chest', equipment: 'Dumbbell', description: 'Targets upper chest' },
            { name: 'Push-ups', muscleGroup: 'Chest', equipment: 'Bodyweight', description: 'Bodyweight chest exercise' },
            // Back
            { name: 'Lat Pulldown', muscleGroup: 'Back', equipment: 'Machine', description: 'Builds back width' },
            { name: 'Barbell Row', muscleGroup: 'Back', equipment: 'Barbell', description: 'Builds back thickness' },
            { name: 'Pull-ups', muscleGroup: 'Back', equipment: 'Bodyweight', description: 'Classic bodyweight back exercise' },
            // Legs
            { name: 'Barbell Squat', muscleGroup: 'Legs', equipment: 'Barbell', description: 'The king of leg exercises' },
            { name: 'Leg Press', muscleGroup: 'Legs', equipment: 'Machine', description: 'Machine-based leg builder' },
            { name: 'Romanian Deadlift', muscleGroup: 'Legs', equipment: 'Barbell', description: 'Hamstring and glute focus' },
            { name: 'Calf Raises', muscleGroup: 'Legs', equipment: 'Machine', description: 'Calf muscle isolation' },
            // Shoulders
            { name: 'Overhead Press', muscleGroup: 'Shoulders', equipment: 'Barbell', description: 'Overall shoulder mass' },
            { name: 'Lateral Raises', muscleGroup: 'Shoulders', equipment: 'Dumbbell', description: 'Targets side delts' },
            { name: 'Face Pulls', muscleGroup: 'Shoulders', equipment: 'Cable', description: 'Rear delts and posture' },
            // Arms
            { name: 'Bicep Curls', muscleGroup: 'Arms', equipment: 'Dumbbell', description: 'Bicep isolation' },
            { name: 'Tricep Pushdown', muscleGroup: 'Arms', equipment: 'Cable', description: 'Tricep isolation' },
            { name: 'Hammer Curls', muscleGroup: 'Arms', equipment: 'Dumbbell', description: 'Brachialis focus' },
            { name: 'Skull Crushers', muscleGroup: 'Arms', equipment: 'EZ Bar', description: 'Overhead tricep extension' },
            // Core
            { name: 'Crunches', muscleGroup: 'Core', equipment: 'Bodyweight', description: 'Basic abdominal exercise' },
            { name: 'Plank', muscleGroup: 'Core', equipment: 'Bodyweight', description: 'Core stability' },
            // Cardio
            { name: 'Treadmill Running', muscleGroup: 'Cardio', equipment: 'Machine', description: 'Steady state cardio' },
        ];

        // Clear existing to avoid duplicates if run multiple times
        await Exercise.deleteMany({});
        await Exercise.insertMany(initialExercises);
        
        res.json({ message: 'Database seeded successfully with exercises' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
