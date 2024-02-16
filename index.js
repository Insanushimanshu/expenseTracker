document.addEventListener("DOMContentLoaded", () => {
	const expenseForm = document.getElementById("expenseForm");
	const expenseBody = document.getElementById("expenseBody");


	function displayExpenses() {
		expenseBody.innerHTML = "";
		const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
		expenses.forEach((expense, index) => {
			const tr = document.createElement("tr");
			tr.innerHTML = `
				<td>${expense.description}</td>
				<td>₹${expense.amount}</td>
				<td>
					<button onclick="editExpense(${index})">Edit</button>
					<button onclick="deleteExpense(${index})">Delete</button>
				</td>`;
			expenseBody.appendChild(tr);
		});
	}

	displayExpenses();

	expenseForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const description = document.getElementById("expenseDescription").value;
		const amount = document.getElementById("expenseAmount").value;
		const expense = { description, amount };
		const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
		expenses.push(expense);
		localStorage.setItem("expenses", JSON.stringify(expenses));
		displayExpenses();
		expenseForm.reset();
	});

	window.deleteExpense = (index) => {
		const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
		expenses.splice(index, 1);
		localStorage.setItem("expenses", JSON.stringify(expenses));
		displayExpenses();
	};

	window.editExpense = (index) => {
		const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
		const newDescription = prompt("Enter new description:", expenses[index].description);
		const newAmount = prompt("Enter new amount:", expenses[index].amount);
		if (newDescription !== null && newAmount !== null) {
			expenses[index].description = newDescription;
			expenses[index].amount = newAmount;
			localStorage.setItem("expenses", JSON.stringify(expenses));
			displayExpenses();
		}
	};
});