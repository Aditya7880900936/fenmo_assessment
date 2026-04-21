import { useState } from "react";
import { debounce } from "../utils/debounce";

const Filters = ({ setFilters }) => {
  const [category, setCategory] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    setCategory(val);
    setFilters(prev => ({ ...prev, category: val }));
  };

  return (
    <div className="flex items-center gap-2.5 bg-stone-100 border border-stone-200 rounded-2xl px-4 py-3 mb-4">
      <span className="text-stone-400 text-sm">⊘</span>
      <input
        value={category} onChange={handleChange}
        placeholder="Filter by category…"
        className="flex-1 bg-white border border-stone-200 rounded-xl px-3.5 py-2 text-sm text-stone-900 outline-none focus:border-amber-400 transition-colors placeholder:text-stone-400"
      />
      <select
        onChange={e => setFilters(prev => ({ ...prev, sort: e.target.value }))}
        className="bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-700 outline-none cursor-pointer font-mono"
      >
        <option value="date_desc">Newest first</option>
        <option value="date_asc">Oldest first</option>
        <option value="amount_desc">Highest amount</option>
        <option value="amount_asc">Lowest amount</option>
      </select>
    </div>
  );
};

export default Filters;