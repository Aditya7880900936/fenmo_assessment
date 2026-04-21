import { useState } from "react";
import { createExpense } from "../services/api";

const ExpenseForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.amount || !form.category || !form.date) {
      return "All required fields must be filled";
    }
    if (form.amount <= 0) {
      return "Amount must be positive";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errMsg = validate();
    if (errMsg) return setError(errMsg);

    try {
      setLoading(true);
      setError("");
      await createExpense({
        ...form,
        amount: Number(form.amount),
      });
      setForm({ amount: "", category: "", description: "", date: "" });
      onSuccess();
    } catch {
      setError("Failed to create expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>Add Expense</h2>

      {error && <p className="error">{error}</p>}

      <input name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <input type="date" name="date" value={form.date} onChange={handleChange} />

      <button disabled={loading}>
        {loading ? "Adding..." : "Add Expense"}
      </button>
    </form>
  );
};

export default ExpenseForm;