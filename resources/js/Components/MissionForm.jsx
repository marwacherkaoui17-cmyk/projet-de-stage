import { useForm } from '@inertiajs/react';
import { Save, ClipboardList, MapPin, Users, Leaf } from 'lucide-react';
import clsx from 'clsx';

export default function MissionForm({ 
    mission = null, 
    services = [], 
    programmes = [], 
    communes = [], 
    forets = [], 
    personnels = [], 
    essences = [], 
    onSuccess = () => {} 
}) {
    const isEdit = !!mission;
    const { data, setData, post, put, processing, errors } = useForm({
        description: mission?.description || '',
        date_debut: mission?.date_debut || '',
        date_fin: mission?.date_fin || '',
        statut: mission?.statut || 'En_cours',
        service_id: mission?.service_id || '',
        programme_id: mission?.programme_id || '',
        commune_id: mission?.commune_id || '',
        foret_id: mission?.foret_id || '',
        personnel_ids: mission?.personnels?.map(p => p.id) || [],
        essence_ids: mission?.essences?.map(e => e.id) || []
    });

    const submit = (e) => {
        e.preventDefault();
        const action = isEdit 
            ? put(route('mission.update', mission.id), { onSuccess }) 
            : post(route('mission.store'), { onSuccess });
    };

    const handleMultiSelect = (key, value) => {
        setData(key, data[key].includes(value) 
            ? data[key].filter(id => id !== value) 
            : [...data[key], value]
        );
    };

    return (
        <form onSubmit={submit} className="space-y-6 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar p-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Status & Dates */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Statut</label>
                        <select 
                            className="w-full bg-slate-950 border-slate-800 rounded-xl py-3 px-4 text-slate-300 focus:ring-blue-500"
                            value={data.statut}
                            onChange={e => setData('statut', e.target.value)}
                        >
                            <option value="En_cours">En cours</option>
                            <option value="Validee">Validée</option>
                            <option value="Annulee">Annulée</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Début</label>
                            <input 
                                type="date" 
                                className="w-full bg-slate-950 border-slate-800 rounded-xl py-3 text-sm text-slate-300"
                                value={data.date_debut}
                                onChange={e => setData('date_debut', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Fin</label>
                            <input 
                                type="date" 
                                className="w-full bg-slate-950 border-slate-800 rounded-xl py-3 text-sm text-slate-300"
                                value={data.date_fin}
                                onChange={e => setData('date_fin', e.target.value)}
                            />
                        </div>
                    </div>
                    {errors.date_debut && <p className="text-rose-500 text-xs font-bold">{errors.date_debut}</p>}
                    {errors.date_fin && <p className="text-rose-500 text-xs font-bold">{errors.date_fin}</p>}
                </div>

                {/* Service & Foret */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Service</label>
                        <select 
                            className="w-full bg-slate-950 border-slate-800 rounded-xl py-3 px-4 text-slate-300"
                            value={data.service_id}
                            onChange={e => setData('service_id', e.target.value)}
                        >
                            <option value="">Sélectionner</option>
                            {services.map(s => <option key={s.id} value={s.id}>{s.libelle}</option>)}
                        </select>
                        {errors.service_id && <p className="text-rose-500 text-xs font-bold">{errors.service_id}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Site / Forêt</label>
                        <select 
                            className="w-full bg-slate-950 border-slate-800 rounded-xl py-3 px-4 text-slate-300"
                            value={data.foret_id}
                            onChange={e => setData('foret_id', e.target.value)}
                        >
                            <option value="">Sélectionner</option>
                            {forets.map(f => <option key={f.id} value={f.id}>{f.libelle}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Description / Objectif</label>
                <textarea 
                    className="w-full bg-slate-950 border-slate-800 rounded-xl py-3 px-4 text-slate-300 min-h-[80px]"
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                />
            </div>

            <div className="space-y-4">
                <label className="text-sm font-medium text-slate-400 block flex items-center gap-2">
                    <Users className="w-4 h-4" /> Personnel affecté
                </label>
                <div className="flex flex-wrap gap-2">
                    {personnels.map(p => (
                        <button
                            key={p.id}
                            type="button"
                            onClick={() => handleMultiSelect('personnel_ids', p.id)}
                            className={clsx(
                                'px-3 py-1.5 rounded-lg text-xs font-bold border transition-all',
                                data.personnel_ids.includes(p.id) 
                                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' 
                                    : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-600'
                            )}
                        >
                            {p.nom}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <label className="text-sm font-medium text-slate-400 block flex items-center gap-2">
                    <Leaf className="w-4 h-4" /> Essences
                </label>
                <div className="flex flex-wrap gap-2">
                    {essences.map(e => (
                        <button
                            key={e.id}
                            type="button"
                            onClick={() => handleMultiSelect('essence_ids', e.id)}
                            className={clsx(
                                'px-3 py-1.5 rounded-lg text-xs font-bold border transition-all',
                                data.essence_ids.includes(e.id) 
                                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                                    : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-600'
                            )}
                        >
                            {e.nom_essence}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-800 sticky bottom-0 bg-slate-900/95 py-4">
                <button 
                    type="submit" 
                    disabled={processing}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-blue-600/30 transition-all active:scale-95"
                >
                    <Save className="w-5 h-5" />
                    {isEdit ? 'Mettre à jour' : 'Créer la mission'}
                </button>
            </div>
        </form>
    );
}
