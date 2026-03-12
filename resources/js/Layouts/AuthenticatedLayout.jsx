import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    Users, 
    ClipboardList, 
    Settings, 
    LogOut, 
    Menu, 
    X,
    ChevronRight,
    Briefcase,
    Shield,
    FileText,
    Leaf
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const SidebarItem = ({ href, icon: Icon, label, active, collapsed }) => (
    <Link
        href={href}
        className={clsx(
            'flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group',
            active 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
        )}
    >
        <Icon className={clsx('w-5 h-5 shrink-0', active ? 'text-white' : 'group-hover:scale-110 transition-transform')} />
        {!collapsed && (
            <span className="font-medium whitespace-nowrap overflow-hidden">
                {label}
            </span>
        )}
        {active && !collapsed && <ChevronRight className="w-4 h-4 ml-auto" />}
    </Link>
);

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const isAdmin = user.role === 'admin';
    const isChef = user.role === 'chef_service';
    const isViewer = ['section_administratif', 'directeur'].includes(user.role);

    const navItems = [
        { href: route('dashboard'), icon: LayoutDashboard, label: 'Tableau de bord', active: route().current('dashboard') },
        // Chef de Service / Viewer Links
        { 
            href: route('mission.index'), 
            icon: ClipboardList, 
            label: 'Missions', 
            active: route().current('mission.*'),
            show: true 
        },
        // Admin Links
        { 
            href: route('personnel.index'), 
            icon: Users, 
            label: 'Personnel', 
            active: route().current('personnel.*'),
            show: isAdmin || isChef
        },
        { 
            href: route('essence.index'), 
            icon: Leaf, 
            label: 'Essences', 
            active: route().current('essence.*'),
            show: isAdmin
        },
        { 
            href: route('service.index'), 
            icon: Settings, 
            label: 'Paramètres', 
            active: route().current('service.*') || route().current('domaine.*') || route().current('programme.*'),
            show: isAdmin
        },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 flex overflow-hidden">
            {/* Desktop Sidebar */}
            <aside 
                className={clsx(
                    'hidden md:flex flex-col bg-slate-900 border-r border-slate-800 transition-all duration-300 relative z-20',
                    isSidebarCollapsed ? 'w-20' : 'w-64'
                )}
            >
                <div className="p-4 flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    {!isSidebarCollapsed && (
                        <motion.span 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }}
                            className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent"
                        >
                            ANEF Admin
                        </motion.span>
                    )}
                </div>

                <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
                    {navItems.filter(item => item.show !== false).map((item) => (
                        <SidebarItem 
                            key={item.label} 
                            {...item} 
                            collapsed={isSidebarCollapsed} 
                        />
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button 
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white transition-colors"
                    >
                        <Menu className="w-5 h-5" />
                        {!isSidebarCollapsed && <span className="text-sm font-medium">Réduire</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Header */}
                <header className="h-16 bg-slate-900/50 backdrop-blur-xl border-b border-slate-800 flex items-center justify-between px-6 z-10">
                    <div className="flex items-center gap-4">
                        <button 
                            className="md:hidden p-2 text-slate-400 hover:bg-slate-800 rounded-lg"
                            onClick={() => setIsMobileOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h2 className="text-lg font-semibold text-white">
                            {header}
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex flex-col items-end mr-2">
                            <span className="text-sm font-semibold text-white">{user.nom} {user.prenom}</span>
                            <span className="text-xs text-slate-500 uppercase tracking-wider">{user.role?.replace('_', ' ')}</span>
                        </div>
                        
                        <div className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
                             <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                {user.nom?.[0]}{user.prenom?.[0]}
                             </div>
                        </div>

                        <Link 
                            href={route('logout')} 
                            method="post" 
                            as="button"
                            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                            title="Déconnexion"
                        >
                            <LogOut className="w-5 h-5" />
                        </Link>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 bottom-0 w-64 bg-slate-900 z-40 md:hidden p-4 flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-xl font-bold text-white">ANEF Admin</span>
                                <button onClick={() => setIsMobileOpen(false)} className="text-slate-400">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <nav className="space-y-2">
                                {navItems.filter(item => item.show !== false).map((item) => (
                                    <SidebarItem key={item.label} {...item} active={item.active} />
                                ))}
                            </nav>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
