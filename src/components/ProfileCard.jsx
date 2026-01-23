import { 
  User, Mail, Shield, Moon, LogOut, Settings, 
  ChevronRight, Bell, Lock, HelpCircle, Edit3
} from 'lucide-react';

// const menuItems = [
//   { icon: Bell, label: 'Notifications', description: 'Manage alerts' },
//   { icon: Lock, label: 'Security', description: 'Password & 2FA' },
//   { icon: Settings, label: 'Preferences', description: 'App settings' },
//   { icon: HelpCircle, label: 'Help & Support', description: 'Get assistance' },
// ];

export default function ProfileCard({ 
  firstName,
  lastName,
  email,
  role = 'User',
  avatar,
  onLogout
}) {
  return (
    <div className="space-y-4">
      {/* Profile Header Card */}
      <div className="rounded-2xl bg-slate-900/50 border border-slate-800/50 overflow-hidden">
        {/* Banner */}
        <div className="h-24 bg-linear-to-r from-violet-600 via-purple-600 to-fuchsia-600 relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?w=800')] opacity-20 bg-cover bg-center" />
        </div>
        
        {/* Profile Info */}
        <div className="px-6 pb-6 relative">
          {/* Avatar */}
          <div className="absolute -top-10 left-6">
            <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white font-bold text-2xl border-4 border-slate-950 shadow-xl">
              {avatar}
            </div>
            <button className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors">
              <Edit3 className="w-3 h-3" />
            </button>
          </div>

          {/* User Info */}
          <div className="pt-14">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">{firstName} {lastName}</h2>
                <p className="text-sm text-slate-400 flex items-center gap-1.5 mt-1">
                  <Mail className="w-3.5 h-3.5" />
                  {email}
                </p>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
                role === 'Admin' 
                  ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30' 
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                <Shield className="w-3 h-3" />
                {role}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      {/* <div className="rounded-2xl bg-slate-900/50 border border-slate-800/50 divide-y divide-slate-800/50 overflow-hidden">
        {menuItems.map((item) => (
          <button 
            key={item.label}
            className="w-full flex items-center gap-4 p-4 hover:bg-slate-800/30 transition-colors group"
          >
            <div className="p-2.5 rounded-xl bg-slate-800/50 group-hover:bg-slate-700/50 transition-colors">
              <item.icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-white">{item.label}</p>
              <p className="text-xs text-slate-400">{item.description}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-slate-400 transition-colors" />
          </button>
        ))}
      </div> */}

      {/* Logout Button */}
      <button
        onClick={onLogout}
        variant="outline"
        className="w-full h-12 flex items-center justify-center cursor-pointer bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 rounded-xl font-semibold"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </button>
    </div>
  );
}