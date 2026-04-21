import { useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Filters from "../components/Filters";
import { useExpenses } from "../hooks/useExpenses";

const Home = () => {
  const [filters, setFilters] = useState({ category: "", sort: "date_desc" });
  const { expenses, loading, error, refetch } = useExpenses(filters);
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-2xl mx-auto px-5">

        {/* Header */}
        <div className="flex items-end justify-between mb-7 pb-5 border-b border-stone-200">
          <h1 className="font-serif text-4xl text-stone-900 leading-tight">
            Expense<br /><span className="text-amber-500 italic">Tracker</span>
          </h1>
          <span className="text-[11px] font-mono text-stone-400">{today}</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-stone-100 border border-stone-200 rounded-2xl p-4">
            <div className="text-[10px] uppercase tracking-widest text-stone-400 font-mono mb-1">Total spent</div>
            <div className="font-serif text-2xl text-amber-500">₹{total.toLocaleString("en-IN")}</div>
          </div>
          <div className="bg-stone-100 border border-stone-200 rounded-2xl p-4">
            <div className="text-[10px] uppercase tracking-widest text-stone-400 font-mono mb-1">Entries</div>
            <div className="font-serif text-2xl text-stone-900">{expenses.length}</div>
          </div>
          <div className="bg-stone-100 border border-stone-200 rounded-2xl p-4">
            <div className="text-[10px] uppercase tracking-widest text-stone-400 font-mono mb-1">Top category</div>
            <div className="font-serif text-lg text-stone-900 mt-1">
              {expenses.length
                ? Object.entries(expenses.reduce((acc, e) => ({ ...acc, [e.category]: (acc[e.category] || 0) + e.amount }), {})).sort((a, b) => b[1] - a[1])[0]?.[0]
                : "—"}
            </div>
          </div>
        </div>

        <ExpenseForm onSuccess={refetch} />
        <Filters setFilters={setFilters} />

        {loading && <p className="text-center text-stone-400 font-mono text-sm py-8 tracking-widest">Loading…</p>}
        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-2.5 text-sm mb-4">
            <span>⚠</span><span>{error}</span>
          </div>
        )}
        {!loading && <ExpenseList expenses={expenses} />}
      </div>
    </div>
  );
};

export default Home;