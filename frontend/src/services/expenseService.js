export const GetExpenses = async () => {
    let expList = [];
    try {
        const response = await fetch("http://localhost:3000/expenses", {
            method: "GET",
        });
        expList = await response.json();
    }
    catch (err) {
        console.log('Error while getting expenses.');
        expList = [];
    }
    return expList;
}

export async function SaveExpense(expense, setExpenseList) {
    const response = await fetch("http://localhost:3000/expense", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
    });

    if (!response.ok) {
        console.log("Error occured while adding expense to DB");
    } else {
        console.log("Expense saved to database successfully");
    }
    setExpenseList(await GetExpenses());
}

export async function RemoveExpense(item_id, setExpenseList) {
    const response = await fetch(`http://localhost:3000/expense/${item_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (!response.ok) {
        console.log('Error while removing expense.');
    } else {
        console.log('Expense removed successfully.');
    }

    setExpenseList(await GetExpenses());
}