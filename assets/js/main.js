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

// Image Modal - Multiple Images (non carousel)

document.addEventListener("DOMContentLoaded", function () {
  // Get the modal (there should only be one modal on the page)
  var modal = document.getElementById("imageModal");

  // Get the image and caption elements inside the modal
  var modalImage = document.getElementById("modalImage");
  var modalCaption = document.getElementById("modalCaption");

  // Check if the modal and its internal elements exist before proceeding
  if (!modal || !modalImage || !modalCaption) {
    console.warn(
      "Image modal or its elements not found. Modal functionality will not work.",
    );
    return; // Exit if critical elements are missing
  }

  // Get all images that should open the modal
  // This will return a NodeList of all matching elements
  var images = document.querySelectorAll(".blog-post-footer-image img");

  // Loop through all found images and add a click event listener to each
  images.forEach(function (img) {
    img.style.cursor = "zoom-in"; // Ensure cursor indicates clickability

    img.onclick = function () {
      modal.style.display = "block"; // Show the modal
      modalImage.src = this.getAttribute("data-full-src") || this.src; // Use data-full-src if available, fallback to src

      // --- CHANGE IS HERE ---
      // Now prioritizes 'alt' text. If 'alt' is empty, it falls back to the content of the 'image-caption' p tag.
      var captionElement = this.closest(
        ".blog-post-footer-image",
      ).querySelector(".image-caption");
      modalCaption.innerHTML =
        this.alt || (captionElement ? captionElement.innerHTML : "");
      // --- END CHANGE ---
    };
  });

  // Get the <span> element that closes the modal
  var closeButton = document.getElementsByClassName("close-button")[0];

  // When the user clicks on <span> (x), close the modal
  if (closeButton) {
    closeButton.onclick = function () {
      modal.style.display = "none";
    };
  }

  // When the user clicks anywhere outside of the modal content, close it
  modal.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
});
