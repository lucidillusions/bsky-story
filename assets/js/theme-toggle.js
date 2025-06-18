// theme-toggle.js

document.addEventListener("DOMContentLoaded", () => {
  // CHANGE THIS LINE: Target the new ID
  const themeToggle = document.getElementById("floating-theme-toggle"); // <--- UPDATED ID
  const themeIconSun = document.getElementById("theme-icon-sun");
  const themeIconMoon = document.getElementById("theme-icon-moon");
  const htmlElement = document.documentElement;

  // Function to set the theme and update the icon
  const setTheme = (theme) => {
    htmlElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    if (theme === "mocha") {
      themeIconSun.style.display = "none";
      themeIconMoon.style.display = "inline-block";
    } else {
      themeIconSun.style.display = "inline-block";
      themeIconMoon.style.display = "none";
    }
  };

  const savedTheme = localStorage.getItem("theme") || "latte";
  setTheme(savedTheme);

  if (themeToggle) {
    // Add a check to ensure the button exists
    themeToggle.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme");
      const newTheme = currentTheme === "latte" ? "mocha" : "latte";
      setTheme(newTheme);
    });
  }
});
