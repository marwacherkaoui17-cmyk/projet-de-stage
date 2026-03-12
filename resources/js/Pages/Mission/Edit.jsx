import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { 
    Save, 
    X, 
    ClipboardList, 
    Calendar, 
    MapPin, 
    Briefcase,
    Leaf,
    Users
} from 'lucide-react';
import clsx from 'clsx';

export default function Edit({ mission, services, programmes, communes, forets, personnels, essences }) {
    const { data, setData, put, processing, errors } = useForm({
        description: mission.description || '',
        date_debut: mission.date_debut,
        date_fin: mission.date_fin,
        statut: mission.statut,
        service_id: mission.service_id,
        programme_id: mission.programme_id || '',
        commune_id: mission.commune_id || '',
        foret_id: mission.foret_id || '',
        personnel_ids: mission.personnels.map(p => p.id),
        essence_ids: mission.essences.map(e => e.id)
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('mission.update', mission.id));
    };

    const handleMultiSelect = (key, value) => {
        setData(key, data[key].includes(value) 
            ? data[key].filter(id => id !== value) 
            : [...data[key], value]
        );
    };

    return (
        <AuthenticatedLayout header={`Modifier Mission #${mission.id}`}>
            <Head title="Modifier Mission" />

            <div className="max-w-4xl mx-auto">
                <form onSubmit={submit} className="space-y-8 pb-12">
                    {/* General Information */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-md space-y-6">
                        <div className="flex items-center gap-2 text-white font-bold text-lg mb-4">
                            <ClipboardList className="w-6 h-6 text-blue-500" />
                            Informations Générales
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 col-span-2">
                                <label className="text-sm font-medium text-slate-400">Description / Intitulé</label>
                                <textarea 
                                    className="w-full bg-slate-950 border-slate-800 rounded-xl py-3 px-4 text-slate-200 focus:ring-blue-500 min-h-[100px]"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                />
                                {errors.description && <p className="text-rose-500 text-xs font-bold">{errors.description}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Date de début</label>
                                <input 
                                    type="date" 
                                    className="w-full bg-slate-950 border-slate-800 rounded-xl py-3 px-4 text-slate-200"
                                    value={data.date_debut}
                                    onChange={e => setData('date_debut', e.target.value)}
                                />
                                {errors.date_debut && <p className="text-rose-500 text-xs font-bold">{errors.date_debut}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Date de fin</label>
                                <input 
                                    type="date" 
                                    className="w-full bg-slate-950 border-slate-800 rounded-xl py-3 px-4 text-slate-200"
                                    value={data.date_fin}
                                    onChange={e => setData('date_fin', e.target.value)}
                                />
                                {errors.date_fin && <p className="text-rose-500 text-xs font-bold">{errors.date_fin}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Statut</label>
                                <select 
                                    className="w-full bg-slate-950 border-slate-800 rounded-xl py-3 px-4 text-slate-200"
                                    value={data.statut}
                                    onChange={e => setData('statut', e.target.value)}
                                >
                                    <option value="Validee">Validée</option>
                                    <option value="Annulee">Annulée</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Context & Location */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-md space-y-6">
                        <div className="flex items-center gap-2 text-white font-bold text-lg mb-4">
                            <MapPin className="w-6 h-6 text-rose-500" />
                            Contexte & Localisation
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Service concerné</label>
                                <select 
                                    className="w-full bg-slate-950 border-slate-800 rounded-xl py-3 px-4 text-slate-200"
                                    value={data.service_id}
                                    onChange={e => setData('service_id', e.target.value)}
                                >
                                    <option value="">Sélectionner un service</option>
                                    {services.map(s => <option key={s.id} value={s.id}>{s.libelle}</option>)}
                                </select>
                                {errors.service_id && <p className="text-rose-500 text-xs font-bold">{errors.service_id}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Forêt / Site</label>
                                <select 
                                    className="w-full bg-slate-950 border-slate-800 rounded-xl py-3 px-4 text-slate-200"
                                    value={data.foret_id}
                                    onChange={e => setData('foret_id', e.target.value)}
                                >
                                    <option value="">Sélectionner une forêt</option>
                                    {forets.map(f => <option key={f.id} value={f.id}>{f.libelle}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Personnel & Essences */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-md space-y-6">
                         <div className="flex items-center gap-2 text-white font-bold text-lg mb-4">
                            <Users className="w-6 h-6 text-purple-500" />
                            Équipe & Ressources
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-medium text-slate-400 block">Personnel affecté (Multiple)</label>
                            <div className="flex flex-wrap gap-2">
                                {personnels.map(p => (
                                    <button
                                        key={p.id}
                                        type="button"
                                        onClick={() => handleMultiSelect('personnel_ids', p.id)}
                                        className={clsx(
                                            'px-4 py-2 rounded-xl text-sm font-medium border transition-all',
                                            data.personnel_ids.includes(p.id) 
                                                ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' 
                                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'
                                        )}
                                    >
                                        {p.nom}
                                    </button>
                                ))}
                            </div>
                        </div>

                         <div className="space-y-4">
                            <label className="text-sm font-medium text-slate-400 block">Essences concernées</label>
                            <div className="flex flex-wrap gap-2">
                                {essences.map(e => (
                                    <button
                                        key={e.id}
                                        type="button"
                                        onClick={() => handleMultiSelect('essence_ids', e.id)}
                                        className={clsx(
                                            'px-4 py-2 rounded-xl text-sm font-medium border transition-all',
                                            data.essence_ids.includes(e.id) 
                                                ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'
                                        )}
                                    >
                                        {e.nom_essence}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end gap-3 pt-6">
                        <Link 
                            href={route('mission.index')}
                            className="px-6 py-3 rounded-2xl text-slate-400 font-bold hover:bg-slate-800 transition-colors"
                        >
                            Annuler
                        </Link>
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-blue-600/30 transition-all active:scale-95"
                        >
                            <Save className="w-5 h-5" />
                            {processing ? 'Enregistrement...' : 'Mettre à jour la Mission'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
