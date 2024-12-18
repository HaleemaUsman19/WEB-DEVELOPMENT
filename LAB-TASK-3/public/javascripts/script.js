// script.js
document.getElementById("toggleBtn").addEventListener("click", function() {
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("mainContent");

    // Toggle the 'hidden' class to hide or show the sidebar
    sidebar.classList.toggle("hidden");

    // Adjust main content margin
    mainContent.style.marginLeft = sidebar.classList.contains("hidden") ? "0" : "250px";

    // Rotate the button to indicate the action
    this.style.transform = sidebar.classList.contains("hidden") ? "rotate(0deg)" : "rotate(180deg)";
});
