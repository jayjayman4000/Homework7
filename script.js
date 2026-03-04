const menuButton = document.querySelector('.menuButton button');
const dropdownContent = document.querySelector('.dropdownContent');
const spinner = document.querySelector('.spinner');

if (menuButton && dropdownContent) {
    menuButton.addEventListener('click', (event) => {
        event.stopPropagation();
        dropdownContent.style.display =
            dropdownContent.style.display === 'block' ? 'none' : 'block';
    });

    window.addEventListener('click', () => {
        dropdownContent.style.display = 'none';
    });
}

window.addEventListener('load', () => {
    if (spinner) {
        spinner.style.display = 'none';
    }
});

