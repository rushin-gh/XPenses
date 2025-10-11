import ExpensesList from "../Data/ExpenseList.json";

const Body = () => {
  console.log(ExpensesList);
  return (
    <div id="body">
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
