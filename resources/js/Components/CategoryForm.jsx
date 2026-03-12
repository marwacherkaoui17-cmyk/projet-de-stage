import { useForm } from '@inertiajs/react';
import { Save, FileText, Tag } from 'lucide-react';

export default function CategoryForm({ 
    type, 
    item = null, 
    extraData = {}, 
    onSuccess = () => {} 
}) {
    const isEdit = !!item;
    
    // Map type to route prefix
    const routePrefix = type.slice(0, -1); // e.g., 'services' -> 'service'
    
    // Initial data mapping
    const getInitialData = () => {
        const base = {
            description: item?.description || '',
        };
        
        if (type === 'programmes') {
            return { 
                ...base, 
                nom_programme: item?.nom_programme || '', 
                domaine_id: item?.domaine_id || '' 
            };
        }
        if (type === 'essences') {
            return { ...base, nom_essence: item?.nom_essence || '' };
        }
        return { ...base, libelle: item?.libelle || '' }; // services, domaines
    };

    const { data, setData, post, put, processing, errors } = useForm(getInitialData());

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route(`${routePrefix}.update`, item.id), { onSuccess });
        } else {
            post(route(`${routePrefix}.store`), { onSuccess });
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                        <Tag className="w-4 h-4" /> Nom / Libellé
                    </label>
                    <input 
                        type="text"
                        className="w-full bg-slate-950 border-slate-800 rounded-xl py-3 px-4 text-slate-200 focus:ring-blue-500"
                        value={data.libelle ?? data.nom_essence ?? data.nom_programme}
                        onChange={e => {
                            const val = e.target.value;
                            if (type === 'programmes') setData('nom_programme', val);
                            else if (type === 'essences') setData('nom_essence', val);
                            else setData('libelle', val);
                        }}
                        required
                    />
                    {errors.libelle && <p className="text-rose-500 text-xs font-bold">{errors.libelle}</p>}
                    {errors.nom_essence && <p className="text-rose-500 text-xs font-bold">{errors.nom_essence}</p>}
                    {errors.nom_programme && <p className="text-rose-500 text-xs font-bold">{errors.nom_programme}</p>}
                </div>

                {type === 'programmes' && (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Domaine</label>
                        <select 
                            className="w-full bg-slate-950 border-slate-800 rounded-xl py-3 px-4 text-slate-200"
                            value={data.domaine_id}
                            onChange={e => setData('domaine_id', e.target.value)}
                            required
                        >
                            <option value="">Sélectionner</option>
                            {extraData.domaines?.map(d => <option key={d.id} value={d.id}>{d.libelle}</option>)}
                        </select>
                    </div>
                )}

                {type !== 'domaines' && (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                            <FileText className="w-4 h-4" /> Description
                        </label>
                        <textarea 
                            className="w-full bg-slate-950 border-slate-800 rounded-xl py-3 px-4 text-slate-200 focus:ring-blue-500 min-h-[100px]"
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                        />
                    </div>
                )}
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-800">
                <button 
                    type="submit" 
                    disabled={processing}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-blue-600/30 transition-all active:scale-95"
                >
                    <Save className="w-5 h-5" />
                    {isEdit ? 'Mettre à jour' : 'Ajouter'}
                </button>
            </div>
        </form>
    );
}
