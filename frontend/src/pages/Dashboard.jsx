import React, { useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';
import { Activity, Dumbbell, Timer, Flame } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
    <div className="glass-card flex items-center gap-4">
        <div className={`btn-icon ${colorClass}`} style={{ background: 'rgba(212, 175, 55, 0.1)', color: 'var(--gold-primary)' }}>
            <Icon size={20} />
        </div>
        <div>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>{title}</p>
            <h3 style={{ margin: 0 }}>{value}</h3>
        </div>
    </div>
);

const Dashboard = () => {
    const { summary, loading } = useContext(AppContext);

    const chartData = useMemo(() => {
        if (!summary?.recentWorkouts) return [];
        
        // Group by date
        const grouped = summary.recentWorkouts.reduce((acc, workout) => {
            const dateStr = format(parseISO(workout.date), 'MMM dd');
            if (!acc[dateStr]) acc[dateStr] = { date: dateStr, volume: 0 };
            
            let workoutVolume = 0;
            workout.exercises.forEach(ex => {
                ex.sets.forEach(set => {
                    workoutVolume += (set.reps * set.weight);
                });
            });
            
            acc[dateStr].volume += workoutVolume;
            return acc;
        }, {});

        return Object.values(grouped).reverse();
    }, [summary]);

    if (loading) {
        return <div className="text-center mt-8"><p className="text-gold">Loading dashboard...</p></div>;
    }

    return (
        <div className="animate-fade-in">
            <h2 className="mb-4">Welcome Back! <span className="text-gold">💪</span></h2>
            
            <div className="grid grid-cols-2 mb-8">
                <StatCard title="Workouts" value={summary?.count || 0} icon={Activity} />
                <StatCard title="Volume (kg)" value={summary?.totalVolume || 0} icon={Dumbbell} />
                <StatCard title="Sets" value={summary?.totalSets || 0} icon={Flame} />
                <StatCard title="Time (min)" value={summary?.totalDuration || 0} icon={Timer} />
            </div>

            <div className="glass-card mb-8">
                <h3 className="mb-4 text-gold">Volume Progression</h3>
                {chartData.length > 0 ? (
                    <div style={{ height: '250px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--gold-primary)" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="var(--gold-primary)" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'var(--bg-darker)', border: '1px solid var(--gold-primary)', borderRadius: '8px' }}
                                    itemStyle={{ color: 'var(--text-main)' }}
                                />
                                <Area type="monotone" dataKey="volume" stroke="var(--gold-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorVolume)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <p className="text-muted text-center py-8">Log your first workout to see your progress!</p>
                )}
            </div>
            
            <h3 className="mb-4">Recent Activity</h3>
            {summary?.recentWorkouts?.length > 0 ? (
                <div className="flex-col gap-4">
                    {summary.recentWorkouts.slice(0, 3).map(workout => (
                        <div key={workout._id} className="glass-card mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="text-gold" style={{margin: 0}}>{format(parseISO(workout.date), 'MMM dd, yyyy')}</h4>
                                <span className="text-muted text-sm">{workout.durationMinutes} min</span>
                            </div>
                            <p className="text-sm">
                                {workout.exercises.length} exercises • {workout.exercises.reduce((acc, ex) => acc + ex.sets.length, 0)} sets
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-muted text-center pt-4">No recent activity.</p>
            )}
        </div>
    );
};

export default Dashboard;
