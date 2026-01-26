import { Bell, Search, Wallet } from 'lucide-react';
import { useSelector } from "react-redux"

export default function Header({ title = "Dashboard" }) {
  const { user } = useSelector((state) => state.user)

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 lg:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
            <Wallet className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-lg font-bold text-white">{title}</h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* <button className="p-2.5 rounded-xl bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
            <Search className="w-4 h-4" />
          </button>
          <button className="relative p-2.5 rounded-xl bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-slate-950" />
          </button> */}
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm ml-1">
            {user?.firstName[0]}{user?.lastName[0]}
          </div>
        </div>  
      </div>
    </header>
  );
}