import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, CheckCircle } from 'lucide-react';

const LogWorkout = () => {
    const { exercises, logWorkout } = useContext(AppContext);
    const navigate = useNavigate();
    
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [durationMinutes, setDurationMinutes] = useState(60);
    const [workoutExercises, setWorkoutExercises] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [exerciseSelect, setExerciseSelect] = useState('');

    useEffect(() => {
        if (exercises?.length > 0 && !exerciseSelect) {
            setExerciseSelect(exercises[0]._id);
        }
    }, [exercises, exerciseSelect]);

    const addExercise = () => {
        if (!exerciseSelect) return;
        
        const exerciseDetails = exercises.find(ex => ex._id === exerciseSelect);
        
        setWorkoutExercises([
            ...workoutExercises, 
            { 
                exerciseId: exerciseSelect, 
                name: exerciseDetails?.name || 'Unknown',
                sets: [{ reps: 10, weight: 0 }] 
            }
        ]);
    };

    const removeExercise = (index) => {
        const newExs = [...workoutExercises];
        newExs.splice(index, 1);
        setWorkoutExercises(newExs);
    };

    const addSet = (exerciseIndex) => {
        const newExs = [...workoutExercises];
        newExs[exerciseIndex].sets.push({ reps: 10, weight: 0 });
        setWorkoutExercises(newExs);
    };

    const removeSet = (exerciseIndex, setIndex) => {
        const newExs = [...workoutExercises];
        newExs[exerciseIndex].sets.splice(setIndex, 1);
        setWorkoutExercises(newExs);
    };

    const updateSet = (exerciseIndex, setIndex, field, value) => {
        const newExs = [...workoutExercises];
        newExs[exerciseIndex].sets[setIndex][field] = Number(value);
        setWorkoutExercises(newExs);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (workoutExercises.length === 0) {
            alert("Please add at least one exercise.");
            return;
        }

        setIsSubmitting(true);
        
        const payload = {
            date,
            durationMinutes: Number(durationMinutes),
            exercises: workoutExercises.map(ex => ({
                exercise: ex.exerciseId,
                sets: ex.sets
            }))
        };

        const success = await logWorkout(payload);
        setIsSubmitting(false);

        if (success) {
            navigate('/');
        }
    };

    return (
        <div className="animate-fade-in pb-8">
            <h2 className="mb-6"><span className="text-gold">Log</span> Workout</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="form-group mb-0">
                        <label className="form-label">Date</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            value={date} 
                            onChange={e => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mb-0">
                        <label className="form-label">Duration (min)</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            value={durationMinutes} 
                            onChange={e => setDurationMinutes(e.target.value)}
                            min="1"
                            required
                        />
                    </div>
                </div>

                <div className="glass-card mb-6">
                    <h3 className="mb-4">Exercises</h3>
                    
                    {workoutExercises.map((we, index) => (
                        <div key={index} className="mb-6 p-4 rounded" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)' }}>
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-gold m-0">{we.name}</h4>
                                <button type="button" className="btn-icon text-error bg-transparent" onClick={() => removeExercise(index)}>
                                    <Trash2 size={18} />
                                </button>
                            </div>
                            
                            <div className="flex-col gap-2">
                                <div className="grid grid-cols-[1fr_2fr_2fr_40px] gap-2 items-center text-muted text-sm px-2 mb-1">
                                    <span>Set</span>
                                    <span>kg</span>
                                    <span>Reps</span>
                                    <span></span>
                                </div>
                                {we.sets.map((set, sIndex) => (
                                    <div key={sIndex} className="grid grid-cols-[1fr_2fr_2fr_40px] gap-2 items-center">
                                        <div className="text-center bg-gray-800 rounded py-2">{sIndex + 1}</div>
                                        <input 
                                            type="number" 
                                            className="form-control py-2 text-center" 
                                            value={set.weight} 
                                            onChange={(e) => updateSet(index, sIndex, 'weight', e.target.value)}
                                            placeholder="kg"
                                            required
                                        />
                                        <input 
                                            type="number" 
                                            className="form-control py-2 text-center" 
                                            value={set.reps} 
                                            onChange={(e) => updateSet(index, sIndex, 'reps', e.target.value)}
                                            placeholder="reps"
                                            required
                                        />
                                        <button 
                                            type="button" 
                                            className="btn-icon text-muted" 
                                            onClick={() => removeSet(index, sIndex)}
                                            disabled={we.sets.length === 1}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            
                            <button 
                                type="button" 
                                className="btn btn-outline w-full mt-4 py-2" 
                                style={{ fontSize: '0.875rem' }}
                                onClick={() => addSet(index)}
                            >
                                <Plus size={16} /> Add Set
                            </button>
                        </div>
                    ))}

                    <div className="flex gap-2">
                        <select 
                            className="form-control" 
                            value={exerciseSelect}
                            onChange={(e) => setExerciseSelect(e.target.value)}
                        >
                            {exercises.map(ex => (
                                <option key={ex._id} value={ex._id}>{ex.name} ({ex.muscleGroup})</option>
                            ))}
                        </select>
                        <button type="button" className="btn btn-primary px-4" onClick={addExercise} style={{ width: 'auto' }}>
                            <Plus size={24} />
                        </button>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary py-3 mb-8" disabled={isSubmitting}>
                    {isSubmitting ? 'Logging...' : <><CheckCircle size={20} /> Finish Workout</>}
                </button>
            </form>
        </div>
    );
};

export default LogWorkout;
