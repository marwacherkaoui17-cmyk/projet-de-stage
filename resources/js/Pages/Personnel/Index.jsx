import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm } from '@inertiajs/react';
import { 
    Plus, 
    Search, 
    Mail, 
    Phone, 
    Briefcase, 
    Edit2, 
    Trash2,
    X,
    UserCircle
} from 'lucide-react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import PersonnelForm from '@/Components/PersonnelForm';
import DeleteConfirmationModal from '@/Components/DeleteConfirmationModal';

export default function Index({ personnels, services }) {
    const { auth } = usePage().props;
    const isAdmin = auth.user.role === 'admin';

    const [modalData, setModalData] = useState({ show: false, personnel: null });
    const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
    const { delete: destroy, processing } = useForm();

    const openCreate = () => setModalData({ show: true, personnel: null });
    const openEdit = (personnel) => setModalData({ show: true, personnel });
    const closeModal = () => setModalData({ show: false, personnel: null });

    const confirmDelete = (id) => setDeleteModal({ show: true, id });
    const closeDeleteModal = () => setDeleteModal({ show: false, id: null });

    const handleDelete = () => {
        destroy(route('personnel.destroy', deleteModal.id), {
            onSuccess: () => closeDeleteModal(),
        });
    };

    return (
        <AuthenticatedLayout header="Gestion du Personnel">
            <Head title="Personnel" />

            <div className="space-y-6">
                {/* Actions Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800 backdrop-blur-sm">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                            type="text" 
                            placeholder="Rechercher un agent..." 
                            className="w-full bg-slate-950 border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 text-slate-200"
                        />
                    </div>
                    
                    {isAdmin && (
                        <button 
                            onClick={openCreate}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-600/20"
                        >
                            <Plus className="w-4 h-4" />
                            Ajouter un Agent
                        </button>
                    )}
                </div>

                {/* Grid View */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {personnels.map((person) => (
                        <div key={person.id} className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 backdrop-blur-md hover:border-slate-700 transition-all group">
                            <div className="flex justify-between items-start">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center text-blue-400 font-bold border border-blue-500/20 group-hover:scale-110 transition-transform">
                                    <UserCircle className="w-12 h-12" />
                                </div>
                                {isAdmin && (
                                    <div className="flex gap-2">
                                        <button onClick={() => openEdit(person)} className="p-2 text-slate-500 hover:text-blue-400 transition-colors">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => confirmDelete(person.id)} className="p-2 text-slate-500 hover:text-rose-400 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="mt-4">
                                <h3 className="text-lg font-bold text-white uppercase tracking-tight">{person.nom}</h3>
                                <div className="flex items-center gap-2 text-xs text-blue-400 font-bold mt-1 bg-blue-400/10 w-fit px-2 py-0.5 rounded-full uppercase">
                                    <Briefcase className="w-3 h-3" />
                                    {person.service?.libelle || 'Services Généraux'}
                                </div>
                            </div>

                            <div className="mt-6 space-y-3">
                                <div className="flex items-center gap-3 text-slate-400 text-sm">
                                    <Mail className="w-4 h-4" />
                                    <span className="truncate">{person.email || 'Non renseigné'}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-400 text-sm">
                                    <Phone className="w-4 h-4" />
                                    <span>{person.telephone || 'Non renseigné'}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {personnels.length === 0 && (
                        <div className="col-span-full py-20 text-center text-slate-500 italic">
                            Aucun membre du personnel trouvé.
                        </div>
                    )}
                </div>

                {/* Form Modal */}
                <Modal show={modalData.show} onClose={closeModal} maxWidth="xl">
                    <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
                        <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                    <UserCircle className="w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-bold text-white">
                                    {modalData.personnel ? 'Modifier l\'Agent' : 'Ajouter un Agent'}
                                </h2>
                            </div>
                            <button onClick={closeModal} className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-xl transition-all">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <PersonnelForm 
                            personnel={modalData.personnel}
                            services={services}
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
                    message="Êtes-vous sûr de vouloir supprimer cet agent ? Toutes ses données seront retirées."
                />
            </div>
        </AuthenticatedLayout>
    );
}
