import { useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Filters from "../components/Filters";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { useExpenses } from "../hooks/useExpenses";

const Home = () => {
  const [filters, setFilters] = useState({
    category: "",
    sort: "date_desc",
  });

  const { expenses, loading, error, refetch } = useExpenses(filters);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      <ExpenseForm onSuccess={refetch} />
      <Filters setFilters={setFilters} />

      <h3>Total: ₹{total}</h3>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && <ExpenseList expenses={expenses} />}
    </div>
  );
};

export default Home;