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

// Image Modal - single image

document.addEventListener("DOMContentLoaded", function () {
  // Get the modal
  var modal = document.getElementById("imageModal");

  // Get the image and insert it inside the modal - use its "alt" text as a caption
  var img = document.querySelector(".blog-post-footer-image img");
  var modalImg = document.getElementById("modalImage");
  var captionText = document.getElementById("modalCaption");

  if (img && modal && modalImg && captionText) {
    img.onclick = function () {
      modal.style.display = "block";
      modalImg.src = this.getAttribute("data-full-src") || this.src; // Use data-full-src if available
      captionText.innerHTML = this.alt;
    };

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close-button")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the image, close the modal
    modal.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }
});
