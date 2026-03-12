import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Calendar, 
    MapPin, 
    Briefcase, 
    Users, 
    Leaf, 
    ArrowLeft, 
    Edit2,
    CheckCircle2,
    XCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Show({ mission }) {
    const isValidee = mission.statut === 'Validee';

    return (
        <AuthenticatedLayout header={`Détails de la Mission #${mission.id}`}>
            <Head title={`Mission #${mission.id}`} />

            <div className="max-w-5xl mx-auto space-y-8 pb-12">
                {/* Header Actions */}
                <div className="flex items-center justify-between">
                    <Link href={route('mission.index')} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold uppercase text-xs tracking-widest">
                        <ArrowLeft className="w-4 h-4" />
                        Retour aux missions
                    </Link>
                    <Link 
                        href={route('mission.edit', mission.id)}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-600/20"
                    >
                        <Edit2 className="w-4 h-4" />
                        Modifier
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Main Info */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description Card */}
                        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-md">
                            <div className="flex items-center justify-between mb-6">
                                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${isValidee ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
                                    {isValidee ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                                    {mission.statut}
                                </div>
                                <div className="text-slate-500 text-sm font-medium">
                                    Créée le {new Date(mission.created_at).toLocaleDateString()}
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-white leading-tight mb-4">
                                {mission.description || 'Sans description'}
                            </h3>
                        </div>

                        {/* Location & Context */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 backdrop-blur-md">
                                <div className="flex items-center gap-3 text-blue-400 font-bold text-sm mb-4">
                                    <Briefcase className="w-5 h-5" />
                                    Service
                                </div>
                                <p className="text-white font-medium">{mission.service?.libelle || 'N/A'}</p>
                                <p className="text-slate-500 text-xs mt-1">{mission.service?.description}</p>
                            </div>

                            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 backdrop-blur-md">
                                <div className="flex items-center gap-3 text-rose-400 font-bold text-sm mb-4">
                                    <MapPin className="w-5 h-5" />
                                    Localisation
                                </div>
                                <p className="text-white font-medium">{mission.foret?.libelle || 'N/A'}</p>
                                <p className="text-slate-500 text-xs mt-1">{mission.commune?.libelle || mission.foret?.province?.libelle}</p>
                            </div>
                        </div>

                        {/* Team (Grid of Cards) */}
                        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-md">
                            <div className="flex items-center gap-3 text-purple-400 font-bold text-sm mb-6">
                                <Users className="w-5 h-5" />
                                Équipe affectée
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {mission.personnels.map(person => (
                                    <div key={person.id} className="bg-slate-950/50 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-sm">
                                            {person.nom[0]}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-white truncate">{person.nom}</p>
                                            <p className="text-xs text-slate-500 truncate">{person.email}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sidebar Info */}
                    <div className="space-y-6">
                        {/* Dates Card */}
                        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 backdrop-blur-md">
                            <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">Chronologie</h4>
                            <div className="space-y-6 relative before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-px before:bg-slate-800">
                                <div className="relative pl-8">
                                    <div className="absolute left-1.5 top-1.5 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                                    <p className="text-xs text-slate-500">Début</p>
                                    <p className="text-sm font-bold text-white">{new Date(mission.date_debut).toLocaleDateString('fr-FR', { dateStyle: 'long' })}</p>
                                </div>
                                <div className="relative pl-8">
                                    <div className="absolute left-1.5 top-1.5 w-2 h-2 rounded-full bg-rose-500" />
                                    <p className="text-xs text-slate-500">Fin prévue</p>
                                    <p className="text-sm font-bold text-white">{new Date(mission.date_fin).toLocaleDateString('fr-FR', { dateStyle: 'long' })}</p>
                                </div>
                            </div>
                        </div>

                        {/* Essences Card */}
                        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 backdrop-blur-md">
                            <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">Essences</h4>
                            <div className="flex flex-wrap gap-2">
                                {mission.essences.map(essence => (
                                    <div key={essence.id} className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-2">
                                        <Leaf className="w-3.5 h-3.5" />
                                        {essence.nom_essence}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
