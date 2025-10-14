import { useEffect, useState } from "react";
import ExpensesList from "../Data/ExpenseList.json";

const Body = () => {
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseList, setExpenseList] = useState([]);

  useEffect(() => {
    ExpenseAssignment();
  }, []);

  async function ExpenseAssignment() {
    const response = await fetch("http://localhost:3000/expenses", {
      method: "GET",
    });
    const expList = await response.json();
    setExpenseList(expList);
  }

  async function AddExpenseToDb() {
    const objToPost = {
      expense: expense,
      amount: amount,
    };

    console.log(objToPost);

    const response = await fetch("http://localhost:3000/expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objToPost),
    });

    if (!response.ok) {
      console.log("Error occured while adding expense to DB");
    } else {
      console.log("Expense added successfully");
      const expList = await response.json();
      setExpenseList(expList);
    }
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

        <button type="submit" onClick={() => AddExpenseToDb()}>
          Add
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <td>Expense</td>
            <td>Amount</td>
          </tr>
        </thead>

        <tbody>
          {expenseList.map((item, index) => (
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
