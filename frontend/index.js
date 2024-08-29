//Posting Data

const submitBtn = document.getElementById("submitBtn");

const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const categoryInput = document.getElementById("jobCategory");

async function addToDatabase(firstName, lastName, email, jobType) {
	try {
		const response = await fetch("http://localhost:3301/add-user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ firstName, lastName, email, jobType }),
		});

		const data = await response.text();
		console.log(data); // You can replace this with a user-friendly alert or message on the page
	} catch (error) {
		console.error("Error:", error);
	}
}

submitBtn.addEventListener("click", (event) => {
	let isValid = 1;

	if (firstNameInput.value === "") {
		isValid = 0;
	}

	if (lastNameInput.value === "") {
		isValid = 0;
	}

	if (emailInput.value === "") {
		isValid = 0;
	}

	if (categoryInput.value === "") {
		isValid = 0;
	}

	if (isValid === 1) {
		addToDatabase(
			firstNameInput.value,
			lastNameInput.value,
			emailInput.value,
			categoryInput.value
		);
	}
});
