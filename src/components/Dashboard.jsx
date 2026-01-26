import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Header from './Header';
// import ChartPlaceholder from './ChartPlaceholder';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { getExpense } from '../Redux/Reducers/expenseSlice';
import { getIncome } from '../Redux/Reducers/incomeSlice';
import TransactionCard from './TransactionCard';

export default function Dashboard() {
    const { user } = useSelector((state) => state.user)
    const { incomes } = useSelector((state) => state.income)
    const { expenses } = useSelector((state) => state.expense)

    const dispatch = useDispatch()

    const totalIncome = useMemo(() => {
        return incomes?.reduce(
            (sum, item) => sum + Number(item.amount),
            0
        ) || 0;
    }, [incomes])

    const totalExpense = useMemo(() => {
        return expenses?.reduce(
            (sum, item) => sum + Number(item.amount),
            0
        ) || 0;
    }, [expenses])


    const totalBalance = useMemo(() => {
        return totalIncome - totalExpense
    }, [totalExpense, totalIncome])

    useEffect(() => {
        dispatch(getIncome())
        dispatch(getExpense())
    }, [dispatch])

    const balanceData = useMemo(() => ([
        {
            key: "balance",
            title: "Total Balance",
            icon: Wallet,
            value: totalBalance,
            gradient: "from-violet-500 to-purple-600",
            bgGlow: "bg-violet-500/10",
            iconBg: "bg-violet-500/20",
            textColor: "text-violet-400",
        },
        {
            key: "income",
            title: "Total Income",
            icon: TrendingUp,
            value: totalIncome,
            gradient: "from-emerald-400 to-cyan-500",
            bgGlow: "bg-emerald-500/10",
            iconBg: "bg-emerald-500/20",
            textColor: "text-emerald-400",
        },
        {
            key: "expense",
            title: "Total Expense",
            icon: TrendingDown,
            value: totalExpense,
            gradient: "from-rose-400 to-pink-500",
            bgGlow: "bg-rose-500/10",
            iconBg: "bg-rose-500/20",
            textColor: "text-rose-400",
        },
    ]), [totalBalance, totalExpense, totalIncome])

    const amountData = useMemo(() => {
        return [
            ...incomes.map((i) => ({ ...i, type: "income" })),
            ...expenses.map((i) => ({ ...i, type: "expense" }))
        ]
    }, [expenses, incomes])

    return (
        <>
            <Header title="Dashboard" />

            <main className="px-4 py-6 pb-24 lg:pb-6 max-w-7xl lg:ml-72">
                {/* Welcome Section - Desktop Only */}
                <div className="hidden lg:block mb-8">
                    <h1 className="text-3xl font-bold text-white">Welcome back, {user?.firstName} {user?.lastName}👋</h1>
                    <p className="text-slate-400 mt-1">Here's what's happening with your finances today.</p>
                </div>

                {/* Balance Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {
                        balanceData.map((balance, index) => {
                            const Icon = balance.icon;
                            return (
                                <div key={index} className={`relative overflow-hidden rounded-2xl bg-slate-900/50 border border-slate-800/50 p-5 transition-all duration-300 hover:border-slate-700/50 hover:shadow-xl group`}>
                                    {/* Background Glow */}
                                    <div className={`absolute -top-12 -right-12 w-32 h-32 ${balance.bgGlow} rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity`} />

                                    <div className="relative">
                                        {/* Header */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`p-2.5 rounded-xl ${balance.iconBg}`}>
                                                <Icon className={`w-5 h-5 ${balance.textColor}`} />
                                            </div>
                                            {/* <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${trendUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                                {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                                {trend}
                                            </div> */}
                                        </div>

                                        {/* Content */}
                                        <p className="text-slate-400 text-sm mb-1">{balance.title}</p>
                                        <p className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                                            ₹ {balance.value.toLocaleString("en-IN")}
                                        </p>

                                        {/* Bottom Accent */}
                                        <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r ${balance.gradient} opacity-50 rounded-full`} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                {/* Charts Section */}
                {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                    <ChartPlaceholder type="bar" title="Income vs Expense" />
                    <ChartPlaceholder type="pie" title="Income & Expense by Category" />
                </div> */}

                {/* Recent Transactions */}
                {(incomes.length !== 0 || expenses.length !== 0) && (
                    <div className="rounded-2xl bg-slate-900/50 border border-slate-800/50 p-5">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h2 className="text-lg font-semibold text-white">All Transactions</h2>
                                <p className="text-sm text-slate-400 mt-0.5">Your latest financial activity</p>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
                            {amountData.map((amount) => (
                                <TransactionCard
                                    key={amount._id}
                                    type={amount.type}
                                    amount={amount.amount}
                                    category={amount.category}
                                    date={new Date(amount.incomeDate || amount.expenseDate).toLocaleDateString()}
                                    paymentMode={amount.paymentMode}
                                    description={amount.description}
                                    reference={amount.reference}
                                    hasReceipt={!!amount.receiptImage}
                                    createdBy={amount.createdBy || "User"}
                                    flag={false}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {incomes.length === 0 && expenses.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2m0-6h3a2 2 0 012 2v2a2 2 0 01-2 2h-3V9z" />
                            </svg>
                        </div>

                        <h3 className="text-lg font-semibold text-white mb-2">No Transactions Yet</h3>
                        <p className="text-slate-400 text-sm mb-6">You haven’t added any income or expenses yet. Start by adding your first transaction.</p>
                    </div>
                )}
            </main>
        </>
    );
}