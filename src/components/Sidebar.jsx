import { LayoutDashboard, TrendingUp, TrendingDown, User, Wallet, LogOut, Settings } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', page: '/user/dashboard' },
  { icon: TrendingUp, label: 'Income', page: '/user/income' },
  { icon: TrendingDown, label: 'Expense', page: '/user/expense' },
  { icon: User, label: 'Profile', page: '/user/profile' },
];

export default function Sidebar({ onLogout }) {
  const location = useLocation();
  
  const isActive = (page) => {
    return location.pathname.includes(page) || (page === '/user/dashboard' && location.pathname === '/');
  };

  const { user } = useSelector((state) => state.user)

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-72 bg-slate-900/80 backdrop-blur-xl border-r border-slate-800/50 flex-col z-50">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Expense Income Tracker</h1>
            <p className="text-xs text-slate-400">Manage your finances</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold px-4 mb-3">Menu</p>
        {navItems.map((item) => {
          const active = isActive(item.page)
          return (
            <Link
              key={item.page}
              to={item.page}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                active 
                  ? 'bg-linear-to-r from-violet-500/20 to-purple-500/10 text-violet-400 border border-violet-500/20' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <item.icon className={`w-5 h-5 ${active ? 'text-violet-400' : 'group-hover:text-violet-400'} transition-colors`} />
              <span className="font-medium">{item.label}</span>
              {active && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-slate-800/50">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/30">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm">
            {user?.firstName[0]}{user?.lastName[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-slate-400 truncate">{user?.email}</p>
          </div>
          <button onClick={onLogout} className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-rose-400 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}