const contentData = {
    mealDeals: `
    <img src ="Images/main-container-1.jpg" style="width: 100px ` ,

    whenItsGone: `
     <ul>
            <li>All When it's gone it's gone</li>
            <li>Nutmeg Uniform & Clothing</li>
    </ul>` ,

    MarketStreet: `
    <ul>
    <li>All Market Street </li>
    <ul>
    <li>All Fresh From The Butcher </li>
    <li>Beef</li>
    <li>Lamb</li>
    <li>Pork</li>
    </ul>
    <li>Fresh From the Butcher </li>
    <li> Fresh From The Fishmonger </li>
    <ul>`
};

function displayContent(item)
{
    const contentDisplay =document.getElementById('content-display');
    contentDisplay.innerHTML = contentData[item] || '';

}

document.querySelectorAll('dropdown-item') .forEach(item =>
{
    item.addEventListener('click' ,()=>{
        displayContent(item.id);
    });
});

const mainLink = document.querySelector('.third-header-items a');
mainLink.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default anchor click behavior
    toggleDropdown(); // Toggle dropdown visibility
});

// Add event listeners to dropdown items
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', (event) => {
        event.stopPropagation(); // Stop event from bubbling up to the main link
        displayContent(item.id.trim()); // Call displayContent with the id of the clicked item
    });
});

// Close the dropdown if clicked outside
document.addEventListener('click', () => {
    const dropdown = document.querySelector('.third-header-items ul');
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show'); // Close dropdown if clicking outside
    }
});