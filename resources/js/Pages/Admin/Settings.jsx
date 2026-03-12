import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    Briefcase, 
    Layers, 
    BookOpen, 
    Leaf,
    Plus,
    Edit2,
    Trash2,
    Settings as SettingsIcon,
    X
} from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import Modal from '@/Components/Modal';
import CategoryForm from '@/Components/CategoryForm';
import DeleteConfirmationModal from '@/Components/DeleteConfirmationModal';

const TabButton = ({ active, icon: Icon, label }) => (
    <div
        className={clsx(
            'flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all border cursor-pointer',
            active 
                ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
        )}
    >
        <Icon className="w-4 h-4" />
        {label}
    </div>
);

export default function Settings({ activeTab = 'services', data, domaines = [] }) {
    const tabs = [
        { id: 'services', label: 'Services', icon: Briefcase, route: 'service.index' },
        { id: 'domaines', label: 'Domaines', icon: Layers, route: 'domaine.index' },
        { id: 'programmes', label: 'Programmes', icon: BookOpen, route: 'programme.index' },
        { id: 'essences', label: 'Essences', icon: Leaf, route: 'essence.index' },
    ];

    const [modalData, setModalData] = useState({ show: false, item: null });
    const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
    const { delete: destroy, processing } = useForm();

    const openCreate = () => setModalData({ show: true, item: null });
    const openEdit = (item) => setModalData({ show: true, item });
    const closeModal = () => setModalData({ show: false, item: null });

    const confirmDelete = (id) => setDeleteModal({ show: true, id });
    const closeDeleteModal = () => setDeleteModal({ show: false, id: null });

    const handleDelete = () => {
        const routePrefix = activeTab.slice(0, -1);
        destroy(route(`${routePrefix}.destroy`, deleteModal.id), {
            onSuccess: () => closeDeleteModal(),
        });
    };

    return (
        <AuthenticatedLayout header="Paramètres du Système">
            <Head title="Paramètres" />

            <div className="space-y-8">
                {/* Tabs Navigation */}
                <div className="flex flex-wrap gap-3">
                    {tabs.map((tab) => (
                        <Link key={tab.id} href={route(tab.route)}>
                            <TabButton 
                                active={activeTab === tab.id}
                                icon={tab.icon}
                                label={tab.label}
                            />
                        </Link>
                    ))}
                </div>

                {/* Content Area */}
                <div className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-md">
                    <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/20">
                        <div className="flex items-center gap-3">
                            <SettingsIcon className="w-5 h-5 text-slate-500" />
                            <h3 className="text-lg font-bold text-white uppercase tracking-tight">Liste des {activeTab}</h3>
                        </div>
                        <button 
                            onClick={openCreate}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-bold border border-slate-700 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Ajouter
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-800">
                                    <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Libellé / Nom</th>
                                    <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Description</th>
                                    <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {data.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-800/30 transition-colors group">
                                        <td className="px-8 py-5 text-sm font-bold text-white">
                                            {item.libelle || item.nom_essence || item.nom_programme}
                                        </td>
                                        <td className="px-8 py-5 text-sm text-slate-500 italic max-w-xs truncate">
                                            {item.description || 'Aucune description'}
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => openEdit(item)} className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => confirmDelete(item.id)} className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {data.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="px-8 py-10 text-center text-slate-600 text-sm">
                                            Aucune donnée disponible.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Form Modal */}
                <Modal show={modalData.show} onClose={closeModal} maxWidth="xl">
                    <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
                        <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-6">
                            <h2 className="text-xl font-bold text-white capitalize">
                                {modalData.item ? 'Modifier' : 'Ajouter'} {activeTab.slice(0, -1)}
                            </h2>
                            <button onClick={closeModal} className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-xl">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <CategoryForm 
                            type={activeTab}
                            item={modalData.item}
                            extraData={{ domaines }}
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
                    message={`Voulez-vous vraiment supprimer cet élément de la catégorie ${activeTab} ?`}
                />
            </div>
        </AuthenticatedLayout>
    );
}
