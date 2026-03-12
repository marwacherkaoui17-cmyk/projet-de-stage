import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, BookOpen, Layers } from 'lucide-react';

export default function Create({ domaines }) {
    const { data, setData, post, processing, errors } = useForm({
        nom_programme: '',
        description: '',
        domaine_id: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('programme.store'));
    };

    return (
        <AuthenticatedLayout header="Nouveau Programme">
            <Head title="Créer Programme" />

            <div className="max-w-2xl mx-auto">
                <form onSubmit={submit} className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-md space-y-6">
                    <div className="flex items-center gap-3 text-white font-bold text-lg mb-6">
                        <BookOpen className="w-6 h-6 text-indigo-500" />
                        Détails du Programme
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Nom du Programme</label>
                            <input 
                                type="text"
                                className="w-full bg-slate-950 border-slate-800 rounded-xl py-3 px-4 text-slate-200 focus:ring-blue-500"
                                value={data.nom_programme}
                                onChange={e => setData('nom_programme', e.target.value)}
                                required
                            />
                            {errors.nom_programme && <p className="text-rose-500 text-xs font-bold">{errors.nom_programme}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                                <Layers className="w-3.5 h-3.5" /> Domaine associé
                            </label>
                            <select 
                                className="w-full bg-slate-950 border-slate-800 rounded-xl py-3 px-4 text-slate-200"
                                value={data.domaine_id}
                                onChange={e => setData('domaine_id', e.target.value)}
                            >
                                <option value="">Sélectionner un domaine</option>
                                {domaines.map(d => <option key={d.id} value={d.id}>{d.libelle}</option>)}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Description</label>
                            <textarea 
                                className="w-full bg-slate-950 border-slate-800 rounded-xl py-3 px-4 text-slate-200 focus:ring-blue-500 min-h-[100px]"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-slate-800">
                        <Link 
                            href={route('programme.index')}
                            className="px-6 py-3 rounded-2xl text-slate-400 font-bold hover:bg-slate-800 transition-colors"
                        >
                            Annuler
                        </Link>
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-2xl font-bold transition-all active:scale-95 shadow-xl shadow-blue-600/30"
                        >
                            <Save className="w-5 h-5 mr-2 inline" />
                            Créer
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
