import { IndianRupee, Calendar, Hash, X, Upload, Check } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense, updateExpense } from "../Redux/Reducers/expenseSlice";

const expenseCategories = [
  "Food", "Rent", "Transport", "Shopping", "Bills",
  "Education", "Medical", "Entertainment", "Travel", "Other"
];

const paymentModes = ["Cash", "Bank", "UPI", "Card", "Other"];

export default function ExpenseForm({ onClose, editData }) {
  const [amount, setAmount] = useState(editData?.amount || "");
  const [category, setCategory] = useState(editData?.category || "");
  const [date, setDate] = useState(
    editData?.expenseDate ? editData?.expenseDate.slice(0, 10) : ""
  );
  const [paymentMode, setPaymentMode] = useState(editData?.paymentMode || "");
  const [reference, setReference] = useState(editData?.reference || "");
  const [description, setDescription] = useState(editData?.description || "");
  const [receiptImage, setReceiptImage] = useState(editData?.receiptImage || null)

  // const [isRecurring, setIsRecurring] = useState(false);
  // const [recurringType, setRecurringType] = useState("Select Recuring Type");

  const dispatch = useDispatch()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setReceiptImage(file)
  };

  const handleExpenseForm = (e) => {
    e.preventDefault()

    if (!amount || !category || !date || !paymentMode) return

    const formData = new FormData()
    formData.append("amount", Math.round(Number(amount)))
    formData.append("category", category.toLowerCase())
    formData.append("expenseDate", date)
    formData.append("paymentMode", paymentMode)
    formData.append("reference", reference)
    formData.append("description", description)

    if (receiptImage instanceof File) formData.append("receiptImage", receiptImage)

    if (editData) {
      dispatch(updateExpense({ id: editData._id, expenseData: formData }))
    } else {
      dispatch(addExpense({ expenseData: formData }))
    }

    setAmount("")
    setCategory("")
    setDate("")
    setPaymentMode("");
    setReference("");
    setDescription("");
    setReceiptImage(null);

    onClose() && onClose()
  }

  return (
    <div className="rounded-2xl bg-slate-900/80 border border-slate-800/50 p-6 backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">{editData ? "Edit" : "Add"} Expense</h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Record a new expense entry
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 cursor-pointer rounded-xl hover:bg-slate-800/50 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form className="space-y-5" onSubmit={handleExpenseForm}>
        {/* Amount */}
        <div className="space-y-2">
          <label className="text-slate-300 text-sm font-medium">Amount *</label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              required
              className="pl-10 w-full mt-1 h-12 bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-rose-500/50 focus:ring-rose-500/20 rounded-xl"
            />
          </div>
        </div>

        {/* Category & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-slate-300 text-sm font-medium">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full mt-1 h-12 bg-slate-800 text-white px-4 rounded-xl outline-none"
            >
              <option disabled hidden value="">
                Select category
              </option>
              {expenseCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-slate-300 text-sm font-medium">
              Expense Date *
            </label>
            <div className="relative mt-1">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
                required
                className="pl-10 pr-3.5 w-full h-12 bg-slate-800/50 border-slate-700/50 text-white rounded-xl [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
              />
            </div>
          </div>
        </div>

        {/* Payment Mode & Reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-slate-300 text-sm font-medium">
              Payment Mode *
            </label>
            <select
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              required
              className="w-full mt-1 h-12 bg-slate-800 text-white px-4 rounded-xl outline-none"
            >
              <option disabled hidden value="">
                Select payment mode
              </option>
              {paymentModes.map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-slate-300 text-sm font-medium">
              Reference
            </label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="Transaction ID"
                className="pl-10 w-full mt-1 h-12 bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-500 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-slate-300 text-sm font-medium">
            Description *
          </label>
          <textarea
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a note about this expense..."
            className="bg-slate-800/50 px-4 pt-3 border-slate-700/50 text-white placeholder:text-slate-500 min-h-25 w-full mt-1 rounded-xl resize-none"
          />
        </div>

        {/* Receipt Upload */}
        <div className="space-y-2">
          <label className="text-slate-300 text-sm font-medium">
            Receipt Image
          </label>

          {/* hidden input */}
          <input
            type="file"
            id="receiptImage"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* clickable UI */}
          <label
            htmlFor="receiptImage"
            className={`border-2 mt-1 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 block
              ${receiptImage 
                ? 'border-emerald-500/50 bg-emerald-500/5' 
                : 'border-slate-700/50 hover:border-rose-500/50 bg-slate-800/20'}`}
          >
            {receiptImage ? (
              <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-3">
                  <Check className="w-6 h-6 text-emerald-500" />
                </div>
                <p className="text-sm text-emerald-400 font-medium truncate max-w-xs">
                  {receiptImage instanceof File ? receiptImage.name : "Receipt Attached"}
                </p>
                <p className="text-xs text-slate-500 mt-1">Click to replace image</p>
              </div>
            ) : (
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6 text-slate-400" />
                </div>
                <p className="text-sm text-slate-400">
                  <span className="text-rose-400 font-medium">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-slate-500 mt-1">PNG, JPG, JPEG, WEBP</p>
              </div>
            )}
          </label>
        </div>

        {/* Recurring Toggle */}
        {/* <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30 border border-slate-700/30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-violet-500/20">
              <Repeat className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Recurring Expense</p>
              <p className="text-xs text-slate-400">Set as a recurring entry</p>
            </div>
          </div>
          <input
            type='checkbox'
            checked={isRecurring}
            onCheckedChange={setIsRecurring}
            className="data-[state=checked]:bg-violet-500"
          />
        </div> */}

        {/* Recurring Type */}
        {/* {isRecurring && (
          <div className="space-y-2 animate-in slide-in-from-top-2 duration-200">
            <label className="text-slate-300 text-sm font-medium">Recurring Type</label>
            <select
              className="w-full h-12 bg-slate-800/50 border border-slate-700/50 text-white px-4 rounded-xl outline-none"
              defaultValue="monthly"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        )} */}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full cursor-pointer h-12 bg-linear-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-rose-500/25 transition-all duration-300"
        >
          {editData ? "Edit" : "Add"} Expense
        </button>
      </form>
    </div>
  );
}