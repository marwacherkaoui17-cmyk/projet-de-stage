import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, Layers } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        libelle: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('domaine.store'));
    };

    return (
        <AuthenticatedLayout header="Nouveau Domaine">
            <Head title="Créer Domaine" />

            <div className="max-w-xl mx-auto">
                <form onSubmit={submit} className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-md space-y-6">
                    <div className="flex items-center gap-3 text-white font-bold text-lg mb-6">
                        <Layers className="w-6 h-6 text-amber-500" />
                        Détails du Domaine
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Libellé du Domaine</label>
                            <input 
                                type="text"
                                className="w-full bg-slate-950 border-slate-800 rounded-xl py-3 px-4 text-slate-200 focus:ring-blue-500"
                                value={data.libelle}
                                onChange={e => setData('libelle', e.target.value)}
                                required
                            />
                            {errors.libelle && <p className="text-rose-500 text-xs font-bold">{errors.libelle}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-slate-800">
                        <Link 
                            href={route('domaine.index')}
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
