import { useEffect, useState } from "react";
import { debounce } from "../utils/debounce";

const Filters = ({ setFilters }) => {
  const [category, setCategory] = useState("");

  const debouncedUpdate = debounce((value) => {
    setFilters((prev) => ({
      ...prev,
      category: value,
    }));
  }, 500);

  useEffect(() => {
    debouncedUpdate(category);
  }, [category]);

  return (
    <div className="card">
      <input
        placeholder="Filter by category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
    </div>
  );
};

export default Filters;