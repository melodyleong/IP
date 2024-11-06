document.addEventListener('DOMContentLoaded', function () {
    const switchThemeButton = document.getElementById('switch-theme-button');
    const themePopup = document.getElementById('theme-popup');
    const dropdownButton = document.getElementById('dropdown-button');
    const dropdownContent = document.querySelector('.dropdown-content');
    const videoOptions = document.querySelectorAll('.video-option');
    const backgroundVideo = document.getElementById('background-video');


    // Show theme popup
    switchThemeButton.addEventListener('click', function () {
        themePopup.style.display = 'block';
    });

    // Close theme popup
    document.getElementById('ok-button').addEventListener('click', function () {
        themePopup.style.display = 'none';
    });

    // Toggle dropdown visibility
    dropdownButton.addEventListener('click', function () {
        dropdownContent.classList.toggle('show');
    });

    // Change background video on theme selection
    videoOptions.forEach(option => {
        option.addEventListener('click', function () {
            const videoSrc = this.getAttribute('data-video');
            const themeText = this.textContent;

            // Update the button text
            dropdownButton.textContent = themeText;

            // Update the background video source
            backgroundVideo.querySelector('source').setAttribute('src', videoSrc);
            backgroundVideo.load();

            // Save the selected theme to localStorage
            localStorage.setItem('selectedTheme', videoSrc);
        });
    });

    // Close the dropdown if the user clicks outside of it
    window.addEventListener('click', function (event) {
        if (!event.target.matches('#dropdown-button')) {
            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show');
            }
        }
    });

    // Apply the saved theme from localStorage on page load
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        backgroundVideo.querySelector('source').setAttribute('src', savedTheme);
        backgroundVideo.load();
    }

        });

// Date & Clock
function updateClockAndDate() {
    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date');
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const day = now.getDate();
    dateElement.textContent = `${dayName} ${day} ${monthName}`;
}

setInterval(updateClockAndDate, 1000);
updateClockAndDate(); // initial call to display clock and date immediately


//Draggable Icons
document.addEventListener('DOMContentLoaded', function () {
    const draggableItems = document.querySelectorAll('.draggable-container');  // Select all draggable items
    let draggedItem = null;

    // Set up the dragstart event for each draggable item
    draggableItems.forEach(item => {
        item.addEventListener('dragstart', function (event) {
            draggedItem = item;  // Keep track of the item being dragged
            setTimeout(function () {
                item.style.opacity = '0.5';  // Make the dragged item semi-transparent
            }, 0);
        });

        // Set up the dragend event
        item.addEventListener('dragend', function () {
            setTimeout(function () {
                draggedItem.style.opacity = '1';  // Reset the opacity once dragging ends
                draggedItem = null;
            }, 0);
        });
    });

    // Enable the drop area by adding a drop event listener to the body
    document.body.addEventListener('dragover', function (event) {
        event.preventDefault();  // Allow the drop to happen
    });

    document.body.addEventListener('drop', function (event) {
        event.preventDefault();  // Prevent the default action (such as opening a link)
        if (draggedItem) {
            const newX = event.clientX;
            const newY = event.clientY;

            // Update the position of the dragged item to the mouse location
            draggedItem.style.position = 'absolute';
            draggedItem.style.left = newX - draggedItem.offsetWidth / 2 + 'px';
            draggedItem.style.top = newY - draggedItem.offsetHeight / 2 + 'px';
        }
    });
});

//explorer pop up
function openGoogle() {
    window.open("https://www.google.com", "_blank", "fullscreen=yes");
}


//notes
const noteIcon = document.getElementById('notes-icon');

// Toggle the visibility of the note widget
noteIcon.addEventListener('click', function() {
    const notesWidget = document.getElementById('notes-widget');
    notesWidget.style.display = (notesWidget.style.display === 'none' || notesWidget.style.display === '') ? 'block' : 'none';
});

// Save the note to localStorage and close the widget
document.getElementById('save-note').addEventListener('click', function() {
    const noteText = document.getElementById('note-text').value;
    localStorage.setItem('userNote', noteText);
    document.getElementById('notes-widget').style.display = 'none';
});

// Load saved note on page load
window.onload = function() {
    const savedNote = localStorage.getItem('userNote');
    if (savedNote) {
        document.getElementById('note-text').value = savedNote;
    }
};

// Make the widget draggable
const notesWidget = document.getElementById('notes-widget');
const notesHeader = notesWidget.querySelector('.notes-header');
let isDragging = false;
let offsetX, offsetY;

notesHeader.addEventListener('mousedown', function(e) {
    isDragging = true;
    offsetX = e.clientX - notesWidget.offsetLeft;
    offsetY = e.clientY - notesWidget.offsetTop;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

function onMouseMove(e) {
    if (isDragging) {
        notesWidget.style.left = (e.clientX - offsetX) + 'px';
        notesWidget.style.top = (e.clientY - offsetY) + 'px';
    }
}

function onMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}

//Contact Form
// Get the modal
var modal = document.getElementById("contactFormModal");

// Get the link that opens the modal
var link = document.getElementById("contactLink");

// When the user clicks the link, open the modal 
link.onclick = function(event) {
    event.preventDefault();
    modal.style.display = "block";
}

// Get the close button
var closeButton = document.querySelector(".close-btn");

// When the user clicks on the close button, close the modal
closeButton.onclick = function() {
    modal.style.display = "none";
}
