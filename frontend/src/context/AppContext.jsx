import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [exercises, setExercises] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_URL = 'http://localhost:5000/api';

    const fetchExercises = async (muscleGroup = '') => {
        try {
            const res = await axios.get(`${API_URL}/exercises${muscleGroup ? `?muscleGroup=${muscleGroup}` : ''}`);
            setExercises(res.data);
        } catch (error) {
            console.error('Error fetching exercises', error);
        }
    };

    const fetchSummary = async () => {
        try {
            const res = await axios.get(`${API_URL}/workouts/summary`);
            setSummary(res.data);
        } catch (error) {
            console.error('Error fetching summary', error);
        }
    };

    const logWorkout = async (workoutData) => {
        try {
            await axios.post(`${API_URL}/workouts`, workoutData);
            fetchSummary(); // Refresh summary
            return true;
        } catch (error) {
            console.error('Error logging workout', error);
            return false;
        }
    };

    useEffect(() => {
        const initData = async () => {
            setLoading(true);
            await Promise.all([fetchExercises(), fetchSummary()]);
            setLoading(false);
        };
        initData();
    }, []);

    return (
        <AppContext.Provider value={{
            exercises,
            summary,
            loading,
            fetchExercises,
            fetchSummary,
            logWorkout
        }}>
            {children}
        </AppContext.Provider>
    );
};
