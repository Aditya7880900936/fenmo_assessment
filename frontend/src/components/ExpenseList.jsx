const ExpenseList = ({ expenses }) => {
  if (!expenses.length) return <p>No expenses found.</p>;

  return (
    <div className="card">
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e, i) => (
            <tr key={i}>
              <td>{e.category}</td>
              <td>₹{e.amount}</td>
              <td>{e.date}</td>
              <td>{e.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;