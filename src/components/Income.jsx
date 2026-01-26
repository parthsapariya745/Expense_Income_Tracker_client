import { Plus, TrendingUp, Search, Filter, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import Header from './Header';
import TransactionCard from './TransactionCard';
import IncomeForm from './IncomeForm';
import { useDispatch, useSelector } from 'react-redux';
import { deleteIncome, getIncome } from '../Redux/Reducers/incomeSlice';

export default function Income() {
  const [showForm, setShowForm] = useState(false);
  const [editIncome, setEditIncome] = useState(null)
  const [searchIncome, setSearchIncome] = useState('');
  const [incomeData, setIncomeData] = useState([])

  const dispatch = useDispatch()

  const { incomes } = useSelector((state) => state.income)
  const { isUserAuth } = useSelector((state) => state.user)

  useEffect(() => {
    if (isUserAuth) {
      dispatch(getIncome())
    }
  }, [isUserAuth, dispatch])

  useEffect(() => {
    setIncomeData(incomes)
  }, [incomes])

  const totalAmount = incomes.reduce(
    (total, income) => total + Number(income.amount), 0
  )

  let highestIncome = incomes[0], lowestIncome = incomes[0]

  incomes.forEach((income) => {
    if (income.amount > highestIncome.amount) {
      highestIncome = income
    }
    if (income.amount < lowestIncome.amount) {
      lowestIncome = income
    }
  })

  let realData = new Date()
  let monthText = realData.toLocaleString('default', { month: "long" })
  let monthCount = realData.getMonth()
  let yearCount = realData.getFullYear()

  let monthIncome = 0

  incomes.forEach((income) => {
    const incomeDate = new Date(income.incomeDate)

    if (
      incomeDate.getMonth() === monthCount &&
      incomeDate.getFullYear() === yearCount
    ) {
      monthIncome += Number(income.amount)
    }
  })

  const handleEdit = (income) => {
    setEditIncome(income)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    dispatch(deleteIncome(id))
  }

  const handleSearchIncomeData = (e) => {
    let inputVal = e.target.value.toLowerCase()
    setSearchIncome(inputVal)

    setIncomeData(incomes.filter((income) => income.category.toLowerCase().includes(inputVal)))
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Header title="Income" />

      <main className="px-4 py-6 pb-24 lg:pb-6 max-w-7xl lg:ml-72">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Income</h1>
            <p className="text-slate-400 text-sm mt-0.5">Track and manage your earnings</p>
          </div>

          {/* Desktop Add Button */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center justify-center px-3.5 cursor-pointer h-11 bg-linear-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Income
          </button>
        </div>

        {/* Mobile & Tablet Form (Collapsible) */}
        {showForm && (
          <div className="lg:hidden block mb-6 animate-in slide-in-from-top-4 duration-300">
            <IncomeForm 
              key={editIncome?._id || "new"}
              onClose={() => {
                setShowForm(false)
                setEditIncome(null)
              }}
              editData={editIncome}
            />
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="rounded-xl bg-slate-900/50 border border-slate-800/50 p-4">
            <p className="text-[16px] text-slate-400 mb-1">Total Income</p>
            <p className="text-xl font-bold text-white">₹ {totalAmount}</p>
            {/* <p className="text-[16px] text-emerald-400 mt-1">+12.5% vs last month</p> */}
          </div>
          <div className="rounded-xl bg-slate-900/50 border border-slate-800/50 p-4">
            <p className="text-[16px] text-slate-400 mb-1">This Month</p>
            <p className="text-xl font-bold text-white">₹ {monthIncome}</p>
            <p className="text-[16px] text-slate-400 mt-1">{monthText} {yearCount}</p>
          </div>
          <div className="rounded-xl bg-slate-900/50 border border-slate-800/50 p-4">
            <p className="text-[16px] text-slate-400 mb-1">Highest Income</p>
            <p className="text-xl font-bold text-white">₹ {highestIncome?.amount || "0"}</p>
            <p className="text-[16px] text-slate-400 mt-1">{highestIncome?.category}</p>
          </div>
          <div className="rounded-xl bg-slate-900/50 border border-slate-800/50 p-4">
            <p className="text-[16px] text-slate-400 mb-1">Lowest Income</p>
            <p className="text-xl font-bold text-white">₹ {lowestIncome?.amount || "0"}</p>
            <p className="text-[16px] text-slate-400 mt-1">{lowestIncome?.category}</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="search"
              placeholder="Search income..."
              value={searchIncome}
              onChange={handleSearchIncomeData}
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
            <IncomeForm 
              key={editIncome?._id || "new"}
              onClose={() => {
                setShowForm(false)
                setEditIncome(null)
              }}
              editData={editIncome}
            />
          </div>
        )}
  
        {/* Income List */}
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
          {incomeData.map((income) => (
            <TransactionCard
              key={income._id}
              type="income"
              amount={income.amount}
              category={income.category}
              date={new Date(income.incomeDate).toLocaleDateString()}
              paymentMode={income.paymentMode}
              description={income.description}
              reference={income.reference}
              hasReceipt={!!income.receiptImage}
              createdBy={income.createdBy || "User"}
              onEdit={() => handleEdit(income)}
              onDelete={() => handleDelete(income._id)}
              flag={true}
            />
          ))}
        </div>

        {/* Empty State */}
        {incomeData.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No income recorded</h3>
            <p className="text-slate-400 text-sm mb-6">Start tracking your earnings by adding your first income entry.</p>
          </div>
        )}

        {/* Mobile FAB */}
        {/* <Sheet>
          <SheetTrigger asChild>
            <button className="sm:hidden fixed bottom-20 right-4 w-14 h-14 rounded-2xl bg-linear-to-r from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/30 flex items-center justify-center z-40">
              <Plus className="w-6 h-6 text-white" />
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="bg-slate-950 border-slate-800 rounded-t-3xl max-h-[90vh] overflow-y-auto">
            <IncomeForm />
          </SheetContent>
        </Sheet> */}
      </main>
    </div>
  );
}