// assets/js/carousel.js

document.addEventListener("DOMContentLoaded", () => {
  const carouselContainers = document.querySelectorAll(".carousel-container");

  carouselContainers.forEach((container) => {
    const carouselTrack = container.querySelector(".carousel-track");
    const carouselSlides = container.querySelectorAll(".carousel-slide");

    const prevButton = container.querySelector(".carousel-button-prev");
    const nextButton = container.querySelector(".carousel-button-next");

    const filmstripContainer = container.nextElementSibling;
    const filmstripThumbnails = filmstripContainer
      ? filmstripContainer.querySelectorAll(".carousel-filmstrip-thumbnail")
      : [];

    let currentIndex = 0;
    const totalImages = carouselSlides.length;

    if (totalImages === 0) {
      console.log("Carousel: No images found, hiding container and filmstrip.");
      container.style.display = "none";
      if (filmstripContainer) filmstripContainer.style.display = "none";
      return;
    }

    function updateCarousel() {
      const offset = -currentIndex * 100;
      carouselTrack.style.transform = `translateX(${offset}%)`;
      console.log(
        `Carousel: Updating to slide ${currentIndex}, transform: ${offset}%`,
      );

      carouselSlides.forEach((slide, index) => {
        if (index === currentIndex) {
          slide.classList.add("active");
        } else {
          slide.classList.remove("active");
        }
      });

      filmstripThumbnails.forEach((thumbnail, index) => {
        if (index === currentIndex) {
          thumbnail.classList.add("active");
          thumbnail.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
          });
        } else {
          thumbnail.classList.remove("active");
        }
      });
    }

    // Add click listener directly to each individual carousel slide
    carouselSlides.forEach((slide) => {
      slide.addEventListener("click", (e) => {
        console.log("Carousel Slide Clicked!");
        console.log("Event Target:", e.target);
        console.log("Current Target:", e.currentTarget); // This will be the .carousel-slide itself

        const clickedOnCaption = e.target.closest(".carousel-caption-wrapper");

        if (clickedOnCaption) {
          console.log("Clicked on caption, not advancing slide.");
        } else {
          // Determine if click was on the left or right half
          const slideRect = slide.getBoundingClientRect();
          const clickX = e.clientX - slideRect.left; // X position relative to the slide
          const slideWidth = slideRect.width;

          if (clickX < slideWidth / 2) {
            // Click on the left half, go to previous image
            console.log("Clicked left half - going to previous slide.");
            currentIndex--;
            if (currentIndex < 0) {
              currentIndex = totalImages - 1; // Loop to the last slide
            }
          } else {
            // Click on the right half, go to next image
            console.log("Clicked right half - going to next slide.");
            currentIndex++;
            if (currentIndex >= totalImages) {
              currentIndex = 0; // Loop to the first slide
            }
          }
          updateCarousel();
        }
      });
    });

    // Keeping these listeners for robustness, though buttons are hidden via CSS
    if (nextButton) {
      nextButton.addEventListener("click", () => {
        console.log("Next button clicked (hidden).");
        currentIndex++;
        if (currentIndex >= totalImages) {
          currentIndex = 0;
        }
        updateCarousel();
      });
    }

    if (prevButton) {
      prevButton.addEventListener("click", () => {
        console.log("Prev button clicked (hidden).");
        currentIndex--;
        if (currentIndex < 0) {
          currentIndex = totalImages - 1;
        }
        updateCarousel();
      });
    }

    filmstripThumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", (e) => {
        console.log("Filmstrip thumbnail clicked!");
        const clickedIndex = parseInt(e.target.dataset.index);
        if (!isNaN(clickedIndex)) {
          currentIndex = clickedIndex;
          updateCarousel();
        }
      });
    });

    // Initialize carousel and filmstrip on load
    console.log("Carousel: Initializing...");
    updateCarousel();
  });
});

// assets/js/carousel.js

document.addEventListener("DOMContentLoaded", () => {
  const carouselContainers = document.querySelectorAll(".carousel-container");

  // Get modal elements once, outside the loop as there's usually only one modal
  const modal = document.getElementById("carousel-modal");
  const modalImage = document.querySelector(".carousel-modal-image");
  const modalCaption = document.querySelector(".carousel-modal-caption");
  const modalClose = document.querySelector(".carousel-modal-close");
  const modalPrev = document.querySelector(".carousel-modal-prev");
  const modalNext = document.querySelector(".carousel-modal-next");

  // Keep track of which carousel instance is currently active in the modal
  let activeCarouselContainer = null;
  let activeCarouselSlides = [];
  let activeCurrentIndex = 0;

  carouselContainers.forEach((container) => {
    const carouselTrack = container.querySelector(".carousel-track");
    const carouselSlides = container.querySelectorAll(".carousel-slide");

    // Existing buttons (hidden by CSS)
    const prevButton = container.querySelector(".carousel-button-prev");
    const nextButton = container.querySelector(".carousel-button-next");

    const filmstripContainer = container.nextElementSibling;
    const filmstripThumbnails = filmstripContainer
      ? filmstripContainer.querySelectorAll(".carousel-filmstrip-thumbnail")
      : [];

    let currentIndex = 0; // This is the local index for THIS specific carousel
    const totalImages = carouselSlides.length;

    if (totalImages === 0) {
      console.log("Carousel: No images found, hiding container and filmstrip.");
      container.style.display = "none";
      if (filmstripContainer) filmstripContainer.style.display = "none";
      return;
    }

    function updateCarousel() {
      const offset = -currentIndex * 100;
      carouselTrack.style.transform = `translateX(${offset}%)`;
      // console.log(`Carousel: Updating to slide ${currentIndex}, transform: ${offset}%`); // Temporarily comment for cleaner console

      carouselSlides.forEach((slide, index) => {
        if (index === currentIndex) {
          slide.classList.add("active");
        } else {
          slide.classList.remove("active");
        }
      });

      filmstripThumbnails.forEach((thumbnail, index) => {
        if (index === currentIndex) {
          thumbnail.classList.add("active");
          thumbnail.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
          });
        } else {
          thumbnail.classList.remove("active");
        }
      });
    }

    // Main carousel image click for prev/next
    carouselSlides.forEach((slide) => {
      slide.addEventListener("click", (e) => {
        // Check if the click originated from the caption wrapper
        const clickedOnCaption = e.target.closest(".carousel-caption-wrapper");

        if (clickedOnCaption) {
          // console.log("Clicked on caption, not advancing slide."); // Temporarily comment for cleaner console
        } else {
          // Determine if click was on the left or right half
          const slideRect = slide.getBoundingClientRect();
          const clickX = e.clientX - slideRect.left; // X position relative to the slide
          const slideWidth = slideRect.width;

          if (clickX < slideWidth / 2) {
            // Click on the left half, go to previous image
            // console.log("Clicked left half - going to previous slide."); // Temporarily comment for cleaner console
            currentIndex--;
            if (currentIndex < 0) {
              currentIndex = totalImages - 1; // Loop to the last slide
            }
          } else {
            // Click on the right half, go to next image
            // console.log("Clicked right half - going to next slide."); // Temporarily comment for cleaner console
            currentIndex++;
            if (currentIndex >= totalImages) {
              currentIndex = 0; // Loop to the first slide
            }
          }
          updateCarousel();
        }
      });
    });

    // OPEN MODAL: Click listener on the image itself to open full-screen modal
    carouselSlides.forEach((slide, slideIndex) => {
      const imageElement = slide.querySelector(".carousel-image");
      if (imageElement) {
        imageElement.addEventListener("click", (e) => {
          // Stop propagation if click on image is for modal, not for carousel advance
          e.stopPropagation(); // Prevent the slide click listener from firing

          // Set the active carousel for modal navigation
          activeCarouselContainer = container;
          activeCarouselSlides = carouselSlides;
          activeCurrentIndex = slideIndex;

          openModal(activeCurrentIndex);
        });
      }
    });

    // Existing hidden button listeners
    if (nextButton) {
      nextButton.addEventListener("click", () => {
        // console.log("Next button clicked (hidden)."); // Temporarily comment for cleaner console
        currentIndex++;
        if (currentIndex >= totalImages) {
          currentIndex = 0;
        }
        updateCarousel();
      });
    }

    if (prevButton) {
      prevButton.addEventListener("click", () => {
        // console.log("Prev button clicked (hidden)."); // Temporarily comment for cleaner console
        currentIndex--;
        if (currentIndex < 0) {
          currentIndex = totalImages - 1;
        }
        updateCarousel();
      });
    }

    filmstripThumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", (e) => {
        // console.log("Filmstrip thumbnail clicked!"); // Temporarily comment for cleaner console
        const clickedIndex = parseInt(e.target.dataset.index);
        if (!isNaN(clickedIndex)) {
          currentIndex = clickedIndex;
          updateCarousel();
        }
      });
    });

    // Initialize carousel and filmstrip on load
    // console.log("Carousel: Initializing..."); // Temporarily comment for cleaner console
    updateCarousel();
  });

  // --- MODAL FUNCTIONS (outside the carouselContainers.forEach loop) ---

  function openModal(index) {
    if (!modal || !activeCarouselSlides || activeCarouselSlides.length === 0)
      return;

    modal.classList.add("open"); // Show modal
    document.body.style.overflow = "hidden"; // Prevent body scroll

    // Set modal content
    updateModalContent(index);
  }

  function updateModalContent(index) {
    if (!activeCarouselSlides || activeCarouselSlides.length === 0) return;

    activeCurrentIndex = index;
    if (activeCurrentIndex >= activeCarouselSlides.length) {
      activeCurrentIndex = 0;
    } else if (activeCurrentIndex < 0) {
      activeCurrentIndex = activeCarouselSlides.length - 1;
    }

    const currentSlide = activeCarouselSlides[activeCurrentIndex];
    const imageUrl = currentSlide.querySelector(".carousel-image").src;
    const captionText = currentSlide.querySelector(".carousel-caption-text")
      ? currentSlide.querySelector(".carousel-caption-text").innerHTML
      : "";

    modalImage.src = imageUrl;
    modalImage.alt = captionText; // Use caption as alt text
    modalCaption.innerHTML = captionText;
  }

  function closeModal() {
    modal.classList.remove("open"); // Hide modal
    document.body.style.overflow = ""; // Restore body scroll
  }

  // Modal Close Button
  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  // Modal Previous Button
  if (modalPrev) {
    modalPrev.addEventListener("click", () => {
      updateModalContent(activeCurrentIndex - 1);
    });
  }

  // Modal Next Button
  if (modalNext) {
    modalNext.addEventListener("click", () => {
      updateModalContent(activeCurrentIndex + 1);
    });
  }

  // Close modal on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });

  // Close modal when clicking outside the content (but not on arrows/close button)
  if (modal) {
    modal.addEventListener("click", (e) => {
      // Check if the click target is the modal background itself, not its children
      if (e.target === modal) {
        closeModal();
      }
    });
  }
});
