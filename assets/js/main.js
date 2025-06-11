// Function to toggle the "Buy E-book" dropdown content
function myFunction() {
  var dropdownContent = document.querySelector(".site-nav .dropdown-content");
  if (dropdownContent) {
    dropdownContent.classList.toggle("show");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle"); // Selects your hamburger button
  const siteNav = document.querySelector(".site-nav"); // Selects your main navigation container

  if (menuToggle && siteNav) {
    // Ensure both elements exist before adding listener
    menuToggle.addEventListener("click", function () {
      const isExpanded = this.getAttribute("aria-expanded") === "true" || false;
      this.setAttribute("aria-expanded", !isExpanded);
      siteNav.classList.toggle("active"); // <<< This line toggles the 'active' class
    });
  }

  // Close dropdowns if clicked outside (existing code)
  window.addEventListener("click", function (event) {
    if (
      !event.target.matches(".dropbtn") &&
      !event.target.closest(".dropdown-content")
    ) {
      var dropdowns = document.querySelectorAll(".dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  });

  // Archive toggling (existing code)
  const toggleButtons = document.querySelectorAll(".toggle-button");
  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetId = this.getAttribute("aria-controls");
      const targetElement = document.getElementById(targetId);
      const isExpanded = this.getAttribute("aria-expanded") === "true";
      if (targetElement) {
        if (isExpanded) {
          targetElement.style.display = "none";
          this.setAttribute("aria-expanded", "false");
        } else {
          targetElement.style.display = "block";
          this.setAttribute("aria-expanded", "true");
        }
      }
    });
  });
});
