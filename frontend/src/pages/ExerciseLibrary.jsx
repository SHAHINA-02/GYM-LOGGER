import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { Search } from 'lucide-react';

const ExerciseLibrary = () => {
    const { exercises, loading } = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('All');

    const muscleGroups = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Cardio', 'Full Body'];

    const filteredExercises = useMemo(() => {
        if (!exercises) return [];
        return exercises.filter(ex => {
            const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesMuscle = selectedMuscleGroup === 'All' || ex.muscleGroup === selectedMuscleGroup;
            return matchesSearch && matchesMuscle;
        });
    }, [exercises, searchTerm, selectedMuscleGroup]);

    if (loading) {
        return <div className="text-center mt-8"><p className="text-gold">Loading exercises...</p></div>;
    }

    return (
        <div className="animate-fade-in pb-8">
            <h2 className="mb-6"><span className="text-gold">Exercise</span> Library</h2>

            <div className="glass-card mb-6 p-4">
                <div className="form-group mb-4 relative">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search exercises..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ paddingLeft: '2.5rem' }}
                    />
                    <Search className="absolute left-3 top-3 text-muted" size={18} />
                </div>
                
                <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {muscleGroups.map(group => (
                        <button
                            key={group}
                            className={`btn ${selectedMuscleGroup === group ? 'btn-primary' : 'btn-outline'}`}
                            style={{ padding: '0.4rem 1rem', fontSize: '0.875rem', whiteSpace: 'nowrap', width: 'auto' }}
                            onClick={() => setSelectedMuscleGroup(group)}
                        >
                            {group}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid">
                {filteredExercises.map(ex => (
                    <div key={ex._id} className="glass-card p-4">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="text-gold m-0">{ex.name}</h4>
                            <span className="text-xs text-muted bg-gray-800 px-2 py-1 rounded border border-gray-700">
                                {ex.muscleGroup}
                            </span>
                        </div>
                        <p className="text-sm text-muted mb-2">{ex.description}</p>
                        <p className="text-xs">
                            <strong className="text-gray-300">Equipment:</strong> {ex.equipment}
                        </p>
                    </div>
                ))}

                {filteredExercises.length === 0 && (
                    <div className="text-center text-muted p-8">
                        No exercises found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExerciseLibrary;
