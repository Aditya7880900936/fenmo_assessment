const CAT_STYLES = {
  Food: "bg-red-50 text-red-800",
  Transport: "bg-emerald-50 text-emerald-800",
  Utilities: "bg-blue-50 text-blue-800",
  Health: "bg-purple-50 text-purple-800",
  Shopping: "bg-orange-50 text-orange-800",
  Entertainment: "bg-pink-50 text-pink-800",
};

const ExpenseList = ({ expenses }) => {
  if (!expenses.length)
    return (
      <div className="py-12 text-center text-stone-400">
        <div className="text-3xl mb-3 opacity-30">◈</div>
        <p className="text-sm">No expenses found</p>
      </div>
    );

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-[0_2px_0_#ddd4c0] overflow-hidden">
      <div className="grid grid-cols-[2fr_1.5fr_1fr_2fr] gap-2 px-5 py-3 bg-stone-50 border-b border-stone-100">
        {["Category","Amount","Date","Description"].map(h => (
          <div key={h} className="text-[10px] uppercase tracking-widest text-stone-400 font-mono">{h}</div>
        ))}
      </div>
      {expenses.map((e, i) => (
        <div key={i} className="grid grid-cols-[2fr_1.5fr_1fr_2fr] gap-2 px-5 py-3.5 border-b border-stone-50 last:border-0 hover:bg-stone-50/60 transition-colors items-center">
          <div>
            <span className={`inline-block text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full ${CAT_STYLES[e.category] || "bg-amber-50 text-amber-800"}`}>
              {e.category}
            </span>
          </div>
          <div className="font-mono text-sm font-medium text-stone-900">₹{Number(e.amount).toLocaleString("en-IN")}</div>
          <div className="font-mono text-xs text-stone-400">{e.date}</div>
          <div className="text-sm text-stone-500 truncate">{e.description || "—"}</div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;