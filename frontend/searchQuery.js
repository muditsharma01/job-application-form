// RETRIEVING DATA

const searchBtn = document.getElementById("searchBtn");
const searchQuery = document.getElementById("searchQuery");
const resultsDiv = document.getElementById("results");

async function searchInDatabase(jobType) {
	try {
		const response = await fetch("http://localhost:3301/search-user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ jobType }),
		});

		const data = await response.json();
		displayResults(data);
	} catch (error) {
		console.error("Error:", error);
	}
}

function displayResults(data) {
	resultsDiv.innerHTML = ""; // Clear previous results

	if (data.length === 0) {
		resultsDiv.innerHTML = "<p class='text-red-500'>No candidates found for the selected job category.</p>";
		return;
	}

	const table = document.createElement("table");
	table.classList.add("table-auto", "w-full", "border-collapse", "mt-4", "shadow-lg");

	const thead = document.createElement("thead");
	const headerRow = document.createElement("tr");

	const headers = ["First Name", "Last Name", "Email", "Job Type"];
	headers.forEach((header) => {
		const th = document.createElement("th");
		th.textContent = header;
		th.classList.add("px-6", "py-3", "bg-blue-600", "text-white", "font-semibold", "text-left", "border-b");
		headerRow.appendChild(th);
	});

	thead.appendChild(headerRow);
	table.appendChild(thead);

	const tbody = document.createElement("tbody");

	data.forEach((candidate, index) => {
		const row = document.createElement("tr");
		row.classList.add(index % 2 === 0 ? "bg-gray-100" : "bg-white"); // Alternate row colors

		const firstNameCell = document.createElement("td");
		firstNameCell.textContent = candidate.first_name;
		firstNameCell.classList.add("px-6", "py-4", "border-b");

		const lastNameCell = document.createElement("td");
		lastNameCell.textContent = candidate.last_name;
		lastNameCell.classList.add("px-6", "py-4", "border-b");

		const emailCell = document.createElement("td");
		emailCell.textContent = candidate.email;
		emailCell.classList.add("px-6", "py-4", "border-b");

		const jobTypeCell = document.createElement("td");
		jobTypeCell.textContent = candidate.job_type;
		jobTypeCell.classList.add("px-6", "py-4", "border-b");

		row.appendChild(firstNameCell);
		row.appendChild(lastNameCell);
		row.appendChild(emailCell);
		row.appendChild(jobTypeCell);

		tbody.appendChild(row);
	});

	table.appendChild(tbody);
	resultsDiv.appendChild(table);
}

searchBtn.addEventListener("click", (event) => {
	if (searchQuery.value !== "") {
		event.preventDefault();
		searchInDatabase(searchQuery.value);
	}
});
