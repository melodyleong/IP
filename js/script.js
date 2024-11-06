document.addEventListener('DOMContentLoaded', function () {
    const switchThemeButton = document.getElementById('switch-theme-button');
    const themePopup = document.getElementById('theme-popup');
    const dropdownButton = document.getElementById('dropdown-button');
    const dropdownContent = document.querySelector('.dropdown-content');
    const videoOptions = document.querySelectorAll('.video-option');
    const backgroundVideo = document.getElementById('background-video');
    let isDragging = false;

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



//Draggable Icons
document.addEventListener('DOMContentLoaded', (event) => {
    const draggables = document.querySelectorAll('.draggable');

    draggables.forEach(draggable => {
        draggable.addEventListener('mousedown', onMouseDown);

        function onMouseDown(event) {
            event.preventDefault();
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);

            let shiftX = event.clientX - draggable.getBoundingClientRect().left;
            let shiftY = event.clientY - draggable.getBoundingClientRect().top;

            draggable.style.position = 'absolute';
            draggable.style.zIndex = 1000;
            document.body.append(draggable);

            moveAt(event.pageX, event.pageY);

            function moveAt(pageX, pageY) {
                draggable.style.left = pageX - shiftX + 'px';
                draggable.style.top = pageY - shiftY + 'px';
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            function onMouseUp() {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
        }

        draggable.ondragstart = function() {
            return false;
        };
    });
});
