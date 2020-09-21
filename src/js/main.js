// Selected elements
const navLinks = document.querySelectorAll(".nav-link");

// Event handlers
function removeActive () {
	navLinks.forEach(function (navLink) {
		navLink.classList.remove("active");
	});
}

function addActive (el) {
	el.classList.add("active");
}

// Event Listeners
navLinks.forEach((navLink) => {
	navLink.addEventListener("click", function (event) {
		removeActive();
		addActive(event.target);
	});
});
