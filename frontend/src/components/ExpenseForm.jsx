import { useState } from "react";
import { createExpense } from "../services/api";

const CATEGORIES = ["Food","Transport","Utilities","Health","Shopping","Entertainment","Other"];

const ExpenseForm = ({ onSuccess }) => {
  const [form, setForm] = useState({ amount: "", category: "", description: "", date: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.amount || !form.category || !form.date) return "Amount, category, and date are required.";
    if (form.amount <= 0) return "Amount must be positive.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errMsg = validate();
    if (errMsg) return setError(errMsg);
    try {
      setLoading(true);
      setError("");
      await createExpense({ ...form, amount: Number(form.amount) });
      setForm({ amount: "", category: "", description: "", date: "" });
      onSuccess();
    } catch {
      setError("Failed to create expense.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-[0_2px_0_#ddd4c0] p-6 mb-5">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 font-semibold text-sm">+</div>
        <h2 className="font-serif text-xl text-stone-900">Add expense</h2>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-2.5 text-sm mb-4">
          <span>⚠</span><span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-widest text-stone-400 font-mono">Amount (₹)</label>
            <input
              name="amount" type="number" placeholder="0.00" min="0" step="0.01"
              value={form.amount} onChange={handleChange}
              className="bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 outline-none focus:border-amber-400 focus:bg-white transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-widest text-stone-400 font-mono">Category</label>
            <select
              name="category" value={form.category} onChange={handleChange}
              className="bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 outline-none focus:border-amber-400 focus:bg-white transition-colors"
            >
              <option value="">Select category</option>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-widest text-stone-400 font-mono">Date</label>
            <input
              name="date" type="date" value={form.date} onChange={handleChange}
              className="bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 outline-none focus:border-amber-400 focus:bg-white transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-widest text-stone-400 font-mono">Description</label>
            <input
              name="description" placeholder="What was this for?" value={form.description} onChange={handleChange}
              className="bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 outline-none focus:border-amber-400 focus:bg-white transition-colors placeholder:text-stone-400"
            />
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-stone-50 font-medium text-sm rounded-xl py-3 transition-colors disabled:opacity-50 group"
        >
          {loading ? "Recording…" : <><span>Record expense</span><span className="transition-transform group-hover:translate-x-1">→</span></>}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;