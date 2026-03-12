import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm } from '@inertiajs/react';
import { 
    Plus, 
    Search, 
    Filter, 
    Calendar, 
    MapPin, 
    Eye, 
    Edit2, 
    Trash2,
    X
} from 'lucide-react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import MissionForm from '@/Components/MissionForm';
import DeleteConfirmationModal from '@/Components/DeleteConfirmationModal';

const StatCard = ({ label, value, color }) => (
    <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl">
        <span className="text-slate-500 text-sm font-medium">{label}</span>
        <div className={`text-2xl font-bold mt-1 text-${color}-500`}>{value}</div>
    </div>
);

const StatusBadge = ({ status }) => {
    const styles = {
        Validee: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
        Annulee: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
        En_cours: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    };
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[status] || styles.En_cours}`}>
            {status}
        </span>
    );
};

export default function Index({ missions, services, programmes, communes, forets, personnels, essences }) {
    const { auth } = usePage().props;
    const isChef = auth.user.role === 'chef_service';

    const [modalData, setModalData] = useState({ show: false, mission: null });
    const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
    const { delete: destroy, processing } = useForm();

    const openCreate = () => setModalData({ show: true, mission: null });
    const openEdit = (mission) => setModalData({ show: true, mission });
    const closeModal = () => setModalData({ show: false, mission: null });

    const confirmDelete = (id) => setDeleteModal({ show: true, id });
    const closeDeleteModal = () => setDeleteModal({ show: false, id: null });

    const handleDelete = () => {
        destroy(route('mission.destroy', deleteModal.id), {
            onSuccess: () => closeDeleteModal(),
        });
    };

    return (
        <AuthenticatedLayout header="Gestion des Missions">
            <Head title="Missions" />

            <div className="space-y-6">
                {/* Stats Header */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <StatCard label="Total Missions" value={missions.length} color="blue" />
                    <StatCard label="Validées" value={missions.filter(m => m.statut === 'Validee').length} color="emerald" />
                    <StatCard label="Annulées" value={missions.filter(m => m.statut === 'Annulee').length} color="rose" />
                    <StatCard label="Ce mois" value={missions.length} color="purple" />
                </div>

                {/* Actions Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800 backdrop-blur-sm">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                            type="text" 
                            placeholder="Rechercher une mission..." 
                            className="w-full bg-slate-950 border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 text-slate-200"
                        />
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-medium transition-colors border border-slate-700">
                            <Filter className="w-4 h-4" />
                            Filtres
                        </button>
                        {isChef && (
                            <button 
                                onClick={openCreate}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-600/20"
                            >
                                <Plus className="w-4 h-4" />
                                Nouvelle Mission
                            </button>
                        )}
                    </div>
                </div>

                {/* Table */}
                <div className="bg-slate-900/40 rounded-2xl border border-slate-800 overflow-hidden backdrop-blur-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-800/50 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Mission</th>
                                    <th className="px-6 py-4">Dates</th>
                                    <th className="px-6 py-4">Localisation</th>
                                    <th className="px-6 py-4">Statut</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {missions.map((mission) => (
                                    <tr key={mission.id} className="hover:bg-slate-800/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                                                    {mission.description || 'Sans description'}
                                                </span>
                                                <span className="text-xs text-slate-500 mt-1 uppercase tracking-tight">
                                                    {mission.service?.libelle || 'Service inconnu'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col text-xs text-slate-400">
                                                <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {new Date(mission.date_debut).toLocaleDateString()}</span>
                                                <span className="pl-4.5 opacity-50">au {new Date(mission.date_fin).toLocaleDateString()}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                                <MapPin className="w-3.5 h-3.5 text-rose-500/70" />
                                                <span>{mission.foret?.libelle || 'N/A'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={mission.statut} />
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-1">
                                                <button onClick={() => window.location.href = route('mission.show', mission.id)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                {isChef && (
                                                    <>
                                                        <button onClick={() => openEdit(mission)} className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg">
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button onClick={() => confirmDelete(mission.id)} className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Form Modal */}
                <Modal show={modalData.show} onClose={closeModal} maxWidth="3xl">
                    <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
                        <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-white">
                                    {modalData.mission ? `Modifier Mission #${modalData.mission.id}` : 'Nouvelle Mission'}
                                </h2>
                                <p className="text-slate-500 text-sm mt-1">
                                    Veuillez renseigner les détails de la mission ci-dessous.
                                </p>
                            </div>
                            <button onClick={closeModal} className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-xl transition-all">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <MissionForm 
                            mission={modalData.mission}
                            services={services}
                            programmes={programmes}
                            communes={communes}
                            forets={forets}
                            personnels={personnels}
                            essences={essences}
                            onSuccess={closeModal}
                        />
                    </div>
                </Modal>

                {/* Delete Modal */}
                <DeleteConfirmationModal 
                    show={deleteModal.show}
                    processing={processing}
                    onClose={closeDeleteModal}
                    onConfirm={handleDelete}
                    message="Voulez-vous vraiment supprimer cette mission ? Cette opération est définitive."
                />
            </div>
        </AuthenticatedLayout>
    );
}
