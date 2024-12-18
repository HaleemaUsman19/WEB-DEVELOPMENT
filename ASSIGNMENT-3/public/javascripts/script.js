

  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("mainContent");
  const toggleButton = document.getElementById("toggleSidebar");

  toggleButton.addEventListener("click", () => {
    sidebar.classList.toggle("d-none");
    mainContent.style.marginLeft = sidebar.classList.contains("d-none") ? "0" : "250px";
  });

