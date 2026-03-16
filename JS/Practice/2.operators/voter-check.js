function checkVoter() {
	const birthDateValue = document.getElementById("ageInput").value;
	const result = document.getElementById("result");

	if (!birthDateValue) {
		result.textContent = "Please select your date of birth.";
		return;
	}

	const birthDate = new Date(birthDateValue);
	const age = new Date().getFullYear() - birthDate.getFullYear();

	if (age >= 18) {
		result.textContent = `You are ${age} years old and eligible to vote.`;
	} else {
		result.textContent = `You are ${age} years old and not eligible to vote yet.`;
	}
}
