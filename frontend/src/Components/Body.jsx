import { useEffect, useState } from "react";
import { UpdateIcon, DeleteIcon } from "../assets/images/images";
import { GetExpenses, RemoveExpense, SaveExpense } from "../services/expenseService";

const Body = () => {
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseList, setExpenseList] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const expenses = await GetExpenses();
      setExpenseList(expenses);
    }
    fetchExpenses();
  }, [expenseList]);

  async function AddExpense() {
    const Expense = {
      title: expense.trim(),
      amount: amount.trim(),
    };

    SaveExpense(Expense, setExpenseList);
    setExpense("");
    setAmount("");
  }

  const DeleteExpense = (item_id) => RemoveExpense(item_id, setExpenseList);

  // @TODO - Create backend api for expense updation

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
          type="number"
          min={0}
          placeholder="Enter amount"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />

        <button type="submit" onClick={() => AddExpense()}>
          Add
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <td>Title</td>
            <td>Amount</td>
            <td width="5%">Update</td>
            <td width="5%">Delete</td>
          </tr>
        </thead>

        <tbody>
          {
            expenseList.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.amount}</td>
                <td>
                  <img
                    className="oprIcons"
                    src={UpdateIcon}
                    alt="Update Icon"
                  // onClick={() => {
                  //   UpdateExpense()
                  // }}
                  />
                </td>
                <td>
                  <img
                    className="oprIcons"
                    src={DeleteIcon}
                    alt="Delete Icon"
                    onClick={() => {
                      DeleteExpense(item._id);
                    }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Body;
