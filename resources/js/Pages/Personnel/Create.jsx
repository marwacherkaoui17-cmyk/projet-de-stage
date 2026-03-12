import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, UserPlus, Mail, Phone, Briefcase } from 'lucide-react';

export default function Create({ services }) {
    const { data, setData, post, processing, errors } = useForm({
        nom: '',
        email: '',
        telephone: '',
        service_id: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('personnel.store'));
    };

    return (
        <AuthenticatedLayout header="Nouvel Agent">
            <Head title="Ajouter Personnel" />

            <div className="max-w-2xl mx-auto">
                <form onSubmit={submit} className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-md space-y-6">
                    <div className="flex items-center gap-3 text-white font-bold text-lg mb-6">
                        <UserPlus className="w-6 h-6 text-blue-500" />
                        Informations de l'Agent
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Nom Complet</label>
                            <input 
                                type="text"
                                className="w-full bg-slate-950 border-slate-800 rounded-xl py-3 px-4 text-slate-200 focus:ring-blue-500"
                                value={data.nom}
                                onChange={e => setData('nom', e.target.value)}
                                required
                            />
                            {errors.nom && <p className="text-rose-500 text-xs font-bold">{errors.nom}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                                    <Mail className="w-3.5 h-3.5" /> Email
                                </label>
                                <input 
                                    type="email"
                                    className="w-full bg-slate-950 border-slate-800 rounded-xl py-3 px-4 text-slate-200 focus:ring-blue-500"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                />
                                {errors.email && <p className="text-rose-500 text-xs font-bold">{errors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                                    <Phone className="w-3.5 h-3.5" /> Téléphone
                                </label>
                                <input 
                                    type="text"
                                    className="w-full bg-slate-950 border-slate-800 rounded-xl py-3 px-4 text-slate-200 focus:ring-blue-500"
                                    value={data.telephone}
                                    onChange={e => setData('telephone', e.target.value)}
                                />
                                {errors.telephone && <p className="text-rose-500 text-xs font-bold">{errors.telephone}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                                <Briefcase className="w-3.5 h-3.5" /> Service
                            </label>
                            <select 
                                className="w-full bg-slate-950 border-slate-800 rounded-xl py-3 px-4 text-slate-200"
                                value={data.service_id}
                                onChange={e => setData('service_id', e.target.value)}
                                required
                            >
                                <option value="">Sélectionner un service</option>
                                {services.map(s => <option key={s.id} value={s.id}>{s.libelle}</option>)}
                            </select>
                            {errors.service_id && <p className="text-rose-500 text-xs font-bold">{errors.service_id}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-slate-800">
                        <Link 
                            href={route('personnel.index')}
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
                            Enregistrer l'Agent
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
