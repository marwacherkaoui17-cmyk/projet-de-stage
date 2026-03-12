import Modal from './Modal';
import { AlertTriangle, Trash2 } from 'lucide-react';

export default function DeleteConfirmationModal({ 
    show, 
    onClose, 
    onConfirm, 
    title = "Confirmer la suppression", 
    message = "Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.",
    processing = false 
}) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden relative">
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-rose-500/20 blur-3xl rounded-full -z-10" />

                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 mb-6">
                        <AlertTriangle className="w-8 h-8" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8">
                        {message}
                    </p>

                    <div className="flex flex-col w-full gap-3">
                        <button
                            onClick={onConfirm}
                            disabled={processing}
                            className="w-full py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-rose-600/20"
                        >
                            <Trash2 className="w-5 h-5" />
                            {processing ? 'Suppression...' : 'Supprimer définitivement'}
                        </button>
                        
                        <button
                            onClick={onClose}
                            className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl font-bold transition-all"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
