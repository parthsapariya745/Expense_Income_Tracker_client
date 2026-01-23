import { LayoutDashboard, TrendingUp, TrendingDown, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', page: '/Dashboard' },
  { icon: TrendingUp, label: 'Income', page: '/Income' },
  { icon: TrendingDown, label: 'Expense', page: '/Expense' },
  { icon: User, label: 'Profile', page: '/Profile' },
];

export default function BottomNav() {
  const location = useLocation();
  
  const isActive = (page) => {
    return location.pathname.includes(page) || (page === 'Dashboard' && location.pathname === '/');
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/50">
      <div className="flex items-center justify-around px-2 py-2 safe-area-bottom">
        {navItems.map((item) => {
          const active = isActive(item.page);
          return (
            <Link
              key={item.page}
              to={item.page}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 ${
                active 
                  ? 'bg-violet-500/20 text-violet-400' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <item.icon className={`w-5 h-5 ${active ? 'scale-110' : ''} transition-transform`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}