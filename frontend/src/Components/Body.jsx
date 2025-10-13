import { useEffect, useState } from "react";
import ExpensesList from "../Data/ExpenseList.json";

const Body = () => {
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    Fun();
  }, []);

  async function Fun() {
    const ex = await fetch("http://localhost:3000/expense", {
      method: "GET",
    });
    const exx = await ex.json();
    console.log(exx);
  }

  return (
    <div id="body">
      <div id="expenseInput">
        <input
          id="expenseTxt"
          type="text"
          placeholder="Enter expense"
          value={expense}
          onChange={(event) => setExpense(event.target.value)}
        />
        <input
          id="expenseAmt"
          type="text"
          placeholder="Enter amount"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />

        <button type="submit">Add</button>
      </div>
      <table>
        <thead>
          <tr>
            <td>Expense</td>
            <td>Amount</td>
          </tr>
        </thead>

        <tbody>
          {ExpensesList.map((item, index) => (
            <tr key={index}>
              <td>{item.expense}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Body;
