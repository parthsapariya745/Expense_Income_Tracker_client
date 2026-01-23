// import { Wallet, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import Header from './Header';
import ProfileCard from './ProfileCard';
import { useSelector } from 'react-redux';

// const statsData = [
//   {
//     icon: Wallet,
//     label: 'Total Transactions',
//     value: '156',
//     color: 'text-violet-400',
//     bgColor: 'bg-violet-500/20',
//   },
//   {
//     icon: TrendingUp,
//     label: 'Income Entries',
//     value: '48',
//     color: 'text-emerald-400',
//     bgColor: 'bg-emerald-500/20',
//   },
//   {
//     icon: TrendingDown,
//     label: 'Expense Entries',
//     value: '108',
//     color: 'text-rose-400',
//     bgColor: 'bg-rose-500/20', 
//   },
//   {
//     icon: Calendar,
//     label: 'Member Since',
//     value: 'Jan 2024',
//     color: 'text-cyan-400',
//     bgColor: 'bg-cyan-500/20',
//   },
// ];

export default function Profile({ onLogout }) {
  const { user } = useSelector((state) => state.user)

  const avtar = user?.firstName && user?.lastName ? `${user.firstName[0]}${user.lastName[0]}` : "U"

  // const dispatch = useDispatch()
  // const navigate = useNavigate()

  // const handleLogout = () => {
  //   dispatch(isLogout())
  //   navigate("/")
  // }

  return (
    <div className="min-h-screen bg-slate-950">
      <Header title="Profile" />

      <main className="px-4 py-6 pb-24 lg:pb-6 max-w-3xl lg:ml-72">
        {/* Profile Card */}
        <ProfileCard
          firstName={user?.firstName}
          lastName={user?.lastName}
          email={user?.email}
          role="User"
          avatar={avtar}
          onLogout={onLogout}
        />

        {/* Account Stats */}
        {/* <div className="mt-6">
          <h2 className="text-lg font-semibold text-white mb-4">Account Statistics</h2>
          <div className="grid grid-cols-2 gap-3">
            {statsData.map((stat) => (
              <div 
                key={stat.label}
                className="rounded-xl bg-slate-900/50 border border-slate-800/50 p-4"
              >
                <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center mb-3`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div> */}

        {/* App Version */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">Expense Tracker v1.0.0</p>
          <p className="text-xs text-slate-600 mt-1">© 2024 All rights reserved</p>
        </div>
      </main>
    </div>
  );
}