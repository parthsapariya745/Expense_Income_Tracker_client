import { Plus, TrendingDown, Search, Filter, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import Header from './Header';
import TransactionCard from './TransactionCard';
import ExpenseForm from './ExpenseForm';
import { useDispatch, useSelector } from 'react-redux';
import { deleteExpense, getExpense } from '../Redux/Reducers/expenseSlice';

export default function Expense() {
  const [showForm, setShowForm] = useState(false);
  const [editExpense, setEditExpense] = useState(null)
  const [searchExpense, setSearchExpense] = useState('');
  const [expenseData, setExpenseData] = useState([])

  const dispatch = useDispatch()

  const { expenses } = useSelector((state) => state.expense)
  const { isUserAuth } = useSelector((state) => state.user)

  useEffect(() => {
    if (isUserAuth) {
      dispatch(getExpense())
    }
  }, [isUserAuth, dispatch])

  useEffect(() => {
    setExpenseData(expenses)
  }, [expenses])

  const totalAmount = expenses.reduce(
    (total, expense) => total + Number(expense.amount), 0
  )

  let highestExpense = expenses[0], lowestExpense = expenses[0]

  expenses.forEach((expense) => {
    if (expense.amount > highestExpense.amount) {
      highestExpense = expense
    }
    if (expense.amount < lowestExpense.amount) {
      lowestExpense = expense
    }
  });

  let realData = new Date()
  let monthText = realData.toLocaleString("default", { month: "long" })
  let monthCount = realData.getMonth()
  let yearCount = realData.getFullYear()

  let monthExpense = 0

  expenses.forEach((expense) => {
    const expenseDate = new Date(expense.expenseDate)

    if (
      expenseDate.getMonth() === monthCount &&
      expenseDate.getFullYear() === yearCount
    ) {
      monthExpense += Number(expense.amount)
    }
  })

  const handleEdit = (expense) => {
    setEditExpense(expense)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    dispatch(deleteExpense(id))
  }

  const handleSearchExpenseData = (e) => {
    let inputVal = e.target.value.toLowerCase()
    setSearchExpense(inputVal)

    setExpenseData(expenses.filter((expense) => expense.category.toLowerCase().includes(inputVal)))
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Header title="Expense" />

      <main className="px-4 py-6 pb-24 lg:pb-6 max-w-7xl lg:ml-72">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Expenses</h1>
            <p className="text-slate-400 text-sm mt-0.5">Monitor and control your spending</p>
          </div>

          {/* Desktop Add Button */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center justify-center px-3.5 cursor-pointer h-11 bg-linear-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-rose-500/25"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Expense
          </button>
        </div>

        {/* Mobile & Tablet Form (Collapsible) */}
        {showForm && (
          <div className="lg:hidden block mb-6 animate-in slide-in-from-top-4 duration-300">
            <ExpenseForm
              key={editExpense?._id || "new"}
              onClose={() => {
                setShowForm(false)
                setEditExpense(null)
              }}
              editData={editExpense}
            />
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="rounded-xl bg-slate-900/50 border border-slate-800/50 p-4">
            <p className="text-[16px] text-slate-400 mb-1">Total Expenses</p>
            <p className="text-xl font-bold text-white">₹ {totalAmount}</p>
            {/* <p className="text-xs text-rose-400 mt-1">+8.3% vs last month</p> */}
          </div>
          <div className="rounded-xl bg-slate-900/50 border border-slate-800/50 p-4">
            <p className="text-[16px] text-slate-400 mb-1">This Month</p>
            <p className="text-xl font-bold text-white">₹ {monthExpense}</p>
            <p className="text-[16px] text-slate-400 mt-1">{monthText} {yearCount}</p>
          </div>
          <div className="rounded-xl bg-slate-900/50 border border-slate-800/50 p-4">
            <p className="text-[16px] text-slate-400 mb-1">Highest Expense</p>
            <p className="text-xl font-bold text-white">₹ {highestExpense?.amount || "0"}</p>
            <p className="text-[16px] text-slate-400 mt-1">{highestExpense?.category}</p>
          </div>
          <div className="rounded-xl bg-slate-900/50 border border-slate-800/50 p-4">
            <p className="text-[16px] text-slate-400 mb-1">Lowest Expense</p>
            <p className="text-xl font-bold text-white">₹ {lowestExpense?.amount || "0"}</p>
            <p className="text-[16px] text-slate-400 mt-1">{lowestExpense?.category}</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchExpense}
              onChange={handleSearchExpenseData}
              className="pl-10 h-12 bg-slate-900/50 border-slate-800/50 text-white placeholder:text-slate-500 rounded-xl"
            />
          </div>
          {/* <button
            variant="outline" 
            className="h-12 px-4 bg-slate-900/50 border-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl"
          >
            <Filter className="w-5 h-5 lg:mr-2" />
            <span className="hidden lg:inline">Filters</span>
          </button>
          <button
            variant="outline" 
            className="h-12 px-4 bg-slate-900/50 border-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl"
          >
            <Calendar className="w-5 h-5 lg:mr-2" />
            <span className="hidden lg:inline">Date</span>
          </button> */}
        </div>

        {/* Desktop Form (Collapsible) */}
        {showForm && (
          <div className="hidden lg:block mb-6 animate-in slide-in-from-top-4 duration-300">
            <ExpenseForm
              key={editExpense?._id || "new"}
              onClose={() => {
                setShowForm(false)
                setEditExpense(null)
              }}
              editData={editExpense}
            />
          </div>
        )}

        {/* Expense List */}
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
          {expenseData.map((expense) => (
            <TransactionCard
              key={expense._id}
              type="expense"
              amount={expense.amount}
              category={expense.category}
              date={new Date(expense.expenseDate).toLocaleDateString()}
              paymentMode={expense.paymentMode}
              description={expense.description}
              reference={expense.reference}
              hasReceipt={!!expense.receiptImage}
              createdBy={expense.createdBy || "User"}
              onEdit={() => handleEdit(expense)}
              onDelete={() => handleDelete(expense._id)}
              flag={true}
            />
          ))}
        </div>

        {/* Empty State */}
        {expenseData.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 flex items-center justify-center mx-auto mb-4">
              <TrendingDown className="w-8 h-8 text-rose-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No expenses recorded</h3>
            <p className="text-slate-400 text-sm mb-6">Start tracking your spending by adding your first expense entry.</p>
          </div>
        )}

        {/* Mobile FAB */}
        {/* <Sheet>
          <SheetTrigger asChild>
            <button className="sm:hidden fixed bottom-20 right-4 w-14 h-14 rounded-2xl bg-linear-to-r from-rose-500 to-pink-500 shadow-lg shadow-rose-500/30 flex items-center justify-center z-40">
              <Plus className="w-6 h-6 text-white" />
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="bg-slate-950 border-slate-800 rounded-t-3xl max-h-[90vh] overflow-y-auto">
            <ExpenseForm />
          </SheetContent>
        </Sheet> */}
      </main>
    </div>
  );
}