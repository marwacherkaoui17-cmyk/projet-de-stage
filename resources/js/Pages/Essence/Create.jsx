import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, Leaf, FileText } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nom_essence: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('essence.store'));
    };

    return (
        <AuthenticatedLayout header="Nouvelle Essence">
            <Head title="Créer Essence" />

            <div className="max-w-2xl mx-auto">
                <form onSubmit={submit} className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-md space-y-6">
                    <div className="flex items-center gap-3 text-white font-bold text-lg mb-6">
                        <Leaf className="w-6 h-6 text-emerald-500" />
                        Détails de l'Essence
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Nom de l'Essence</label>
                            <input 
                                type="text"
                                className="w-full bg-slate-950 border-slate-800 rounded-xl py-3 px-4 text-slate-200 focus:ring-blue-500"
                                value={data.nom_essence}
                                onChange={e => setData('nom_essence', e.target.value)}
                                required
                            />
                            {errors.nom_essence && <p className="text-rose-500 text-xs font-bold">{errors.nom_essence}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                                <FileText className="w-3.5 h-3.5" /> Description
                            </label>
                            <textarea 
                                className="w-full bg-slate-950 border-slate-800 rounded-xl py-3 px-4 text-slate-200 focus:ring-blue-500 min-h-[120px]"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                            />
                            {errors.description && <p className="text-rose-500 text-xs font-bold">{errors.description}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-slate-800">
                        <Link 
                            href={route('essence.index')}
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
                            Créer
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
