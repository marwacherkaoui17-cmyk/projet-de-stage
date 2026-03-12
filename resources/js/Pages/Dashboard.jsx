import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Users, 
    ClipboardList, 
    TrendingUp, 
    Clock, 
    ChevronRight,
    Search,
    MapPin,
    Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';

const SummaryCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl backdrop-blur-md hover:border-slate-700 transition-all group">
        <div className="flex justify-between items-start">
            <div className={`p-3 rounded-2xl bg-${color}-500/10 text-${color}-500 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6" />
            </div>
            {trend && (
                <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded-full">
                    <TrendingUp className="w-3 h-3" />
                    {trend}
                </div>
            )}
        </div>
        <div className="mt-4">
            <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
            <p className="text-3xl font-bold text-white mt-1">{value}</p>
        </div>
    </div>
);

const RecentMissionItem = ({ mission }) => (
    <Link 
        href={route('mission.show', mission.id)}
        className="flex items-center gap-4 p-4 hover:bg-slate-800/30 rounded-2xl transition-colors border border-transparent hover:border-slate-800 group"
    >
        <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-blue-600/20 group-hover:text-blue-400 transition-colors">
            <ClipboardList className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-white truncate">{mission.description || 'Mission sans description'}</h4>
            <div className="flex items-center gap-4 mt-1">
                <p className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {mission.foret?.libelle || 'Site N/A'}
                </p>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {new Date(mission.date_debut).toLocaleDateString()}
                </p>
            </div>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
    </Link>
);

export default function Dashboard({ stats, recent_missions }) {
    return (
        <AuthenticatedLayout header="Tableau de Bord">
            <Head title="Dashboard" />

            <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <SummaryCard title="Total Missions" value={stats.total_missions} icon={ClipboardList} color="blue" trend="+12%" />
                    <SummaryCard title="Personnel Actif" value={stats.total_personnel} icon={Users} color="purple" trend="+5%" />
                    <SummaryCard title="Missions Validées" value={stats.validee_missions} icon={ClipboardList} color="emerald" />
                    <SummaryCard title="Missions à Venir" value={stats.upcoming_missions} icon={Clock} color="amber" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Missions */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex justify-between items-center px-2">
                            <h3 className="text-lg font-bold text-white">Missions Récentes</h3>
                            <Link href={route('mission.index')} className="text-sm text-blue-400 font-medium hover:underline flex items-center gap-1">
                                Tout voir <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-4 backdrop-blur-md space-y-2">
                             {recent_missions.map(mission => (
                                 <RecentMissionItem key={mission.id} mission={mission} />
                             ))}
                             {recent_missions.length === 0 && (
                                 <div className="p-8 text-center text-slate-500 text-sm italic">
                                     Aucune mission récente.
                                 </div>
                             )}
                        </div>
                    </div>

                    {/* Activity Feed (Static for now but styled) */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white px-2">Activité Système</h3>
                        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 backdrop-blur-md">
                            <div className="space-y-6 relative before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-px before:bg-slate-800">
                                <div className="relative pl-8">
                                    <div className="absolute left-1 top-1.5 w-3 h-3 rounded-full bg-blue-500" />
                                    <p className="text-xs text-slate-500">Aujourd'hui, 10:30</p>
                                    <p className="text-sm font-bold text-white">Synchronisation des données ANEF</p>
                                </div>
                                <div className="relative pl-8">
                                    <div className="absolute left-1 top-1.5 w-3 h-3 rounded-full bg-emerald-500" />
                                    <p className="text-xs text-slate-500">Aujourd'hui, 09:15</p>
                                    <p className="text-sm font-bold text-white">Backup journalier terminé</p>
                                </div>
                                <div className="relative pl-8 opacity-50">
                                    <div className="absolute left-1 top-1.5 w-3 h-3 rounded-full bg-slate-700" />
                                    <p className="text-xs text-slate-500">Hier, 18:00</p>
                                    <p className="text-sm font-bold text-white">Génération du rapport mensuel</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
