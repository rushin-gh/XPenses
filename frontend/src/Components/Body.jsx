import { useEffect, useState } from "react";

const Body = () => {
  const deleteIcon = new URL(
    "../assets/images/DeleteIcon.png",
    import.meta.url
  );
  const updateIcon = new URL(
    "../assets/images/UpdateIcon.png",
    import.meta.url
  );

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
    console.log(expList);
    setExpenseList(expList);
  }

  async function AddExpenseToDb() {
    const objToPost = {
      expense: expense.trim(),
      amount: amount.trim(),
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
      setExpense("");
      setAmount("");
    }
  }

  // @TODO - Create backend api for expense updation
  const UpdateExpense = (item_id) => { };

  // @TODO - Create backend api for expense deletion
  const DeleteExpense = async (item_id) => {
    console.log("Method hit");
    const response = await fetch("http://localhost:3000/expense", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: item_id }),
    });

    if (response.ok) {
      console.log("Expense deleted successfully!");
      const expList = await response.json();
      setExpenseList(expList);
    } else {
      console.log("Error while deleting expense");
    }
  };

  console.log(typeof expenseList);
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

        <button type="submit" onClick={() => AddExpenseToDb()}>
          Add
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <td>Expense</td>
            <td>Amount</td>
            <td width="5%">Update</td>
            <td width="5%">Delete</td>
          </tr>
        </thead>

        <tbody>
          {
            expenseList.map((item, index) => (
              <tr key={index}>
                <td>{item.expense}</td>
                <td>{item.amount}</td>
                <td>
                  <img
                    className="oprIcons"
                    src={updateIcon}
                    alt="Update Icon"
                  // onClick={() => {
                  //   UpdateExpense()
                  // }}
                  />
                </td>
                <td>
                  <img
                    className="oprIcons"
                    src={deleteIcon}
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
