import {
    Briefcase, ShoppingBag, Car, Utensils, Home, Zap,
    GraduationCap, Heart, Plane, MoreHorizontal, Calendar,
    CreditCard, ImageIcon, User
} from 'lucide-react';

const categoryIcons = {
    // Income categories
    salary: Briefcase,
    business: Briefcase,
    freelance: Briefcase,
    investment: Zap,
    interest: Zap,
    rental: Home,

    // Expense categories
    food: Utensils,
    rent: Home,
    transport: Car,
    shopping: ShoppingBag,
    bills: Zap,
    education: GraduationCap,
    medical: Heart,
    entertainment: MoreHorizontal,
    travel: Plane,
    other: MoreHorizontal,
};

const categoryColors = {
    // Income - Green shades
    salary: 'from-emerald-400 to-cyan-500',
    business: 'from-emerald-400 to-teal-500',
    freelance: 'from-cyan-400 to-blue-500',
    investment: 'from-violet-400 to-purple-500',
    interest: 'from-amber-400 to-orange-500',
    rental: 'from-rose-400 to-pink-500',

    // Expense - Various shades
    food: 'from-orange-400 to-amber-500',
    rent: 'from-blue-400 to-indigo-500',
    transport: 'from-cyan-400 to-teal-500',
    shopping: 'from-pink-400 to-rose-500',
    bills: 'from-yellow-400 to-amber-500',
    education: 'from-violet-400 to-purple-500',
    medical: 'from-red-400 to-rose-500',
    entertainment: 'from-fuchsia-400 to-pink-500',
    travel: 'from-emerald-400 to-cyan-500',
    other: 'from-slate-400 to-gray-500',
};

export default function TransactionCard({
    type,
    amount,
    category,
    date,
    paymentMode,
    description,
    reference,
    // isRecurring,
    // recurringType,
    hasReceipt,
    createdBy,
    onEdit,
    onDelete,
    flag = false
}) {
    const Icon = categoryIcons[category?.toLowerCase()] || MoreHorizontal;
    const colorGradient = categoryColors[category?.toLowerCase()] || categoryColors.other;
    const isIncome = type === 'income';

    return (
        <div className="group rounded-2xl bg-slate-900/50 border border-slate-800/50 p-4 transition-all duration-300 hover:border-slate-700/50 hover:shadow-xl hover:shadow-slate-900/20">
            <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`p-3 rounded-xl bg-linear-to-br ${colorGradient} shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                            <h3 className="font-semibold text-white capitalize truncate">
                                {category?.replace('_', ' ')}
                            </h3>
                            {description && (
                                <p className="text-sm text-slate-400 truncate mt-0.5">{description}</p>
                            )}
                        </div>
                        <p className={`font-bold text-lg whitespace-nowrap ${isIncome ? 'text-emerald-400' : 'text-rose-400'
                            }`}>
                            {isIncome ? '+' : '-'}₹ {amount}
                        </p>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800/50 text-xs text-slate-400">
                            <Calendar className="w-3 h-3" />
                            {date}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800/50 text-xs text-slate-400">
                            <CreditCard className="w-3 h-3" />
                            {paymentMode}
                        </span>
                        {/* {isRecurring && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-violet-500/20 text-xs text-violet-400">
                                <Repeat className="w-3 h-3" />
                                {recurringType}
                            </span>
                        )} */}
                        {hasReceipt && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/20 text-xs text-emerald-400">
                                <ImageIcon className="w-3 h-3" />
                                Receipt
                            </span>
                        )}
                    </div>

                    {/* Reference & Created By */}
                    {(reference || createdBy) && (
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800/50">
                            {reference && (
                                <span className="text-xs text-slate-500">Ref: {reference}</span>
                            )}
                            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                                <User className="w-3 h-3" />
                                {createdBy}
                            </span>
                        </div>
                    )}

                    {/* Action Buttons */}
                    {flag && (
                        <div className="flex justify-end gap-2 mt-3">
                            <button
                                onClick={onEdit}
                                className="px-4 py-1 cursor-pointer text-[15px] rounded-md bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
                            >
                                Edit
                            </button>

                            <button
                                onClick={onDelete}
                                className="px-4 py-1 cursor-pointer text-[15px] rounded-md bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}