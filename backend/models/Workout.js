const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    durationMinutes: {
        type: Number,
        required: true,
    },
    exercises: [{
        exercise: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exercise',
            required: true,
        },
        sets: [{
            reps: { type: Number, required: true },
            weight: { type: Number, required: true },
        }]
    }]
}, {
    timestamps: true,
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
