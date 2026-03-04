console.log('Hello World!')

const name = 'Jeremiah J Allen';
let hasDownloadedResume = false;

const downloadResumeButton = document.getElementById('downloadPdfBtn');
const menuButton = document.querySelector('.menuButton button');
const dropdownContent = document.querySelector('.dropdownContent');
const spinner = document.querySelector('.spinner');
const greetingMessage = document.getElementById('greetingMessage');
const ongoingProjectDays = document.getElementById('ongoingProjectDays');

function showGreeting(name) {
    return 'Hello, my name is ' + name + '! Welcome to my portfolio!';
}

function daysUntilDeadline(submissionDate) {
    const currentDate = new Date();
    const deadlineDate = new Date(submissionDate);
    const millisecondsDifference = deadlineDate - currentDate;
    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    return Math.max(0, Math.ceil(millisecondsDifference / millisecondsPerDay));
}


if (downloadResumeButton) {
	downloadResumeButton.addEventListener('click', () => {
        if (!hasDownloadedResume) {
            alert('Your resume is downloaded successfully!');
            hasDownloadedResume = true;
        }
	});
}

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
    const projectSubmissionDate = '2026-06-30';
    const remainingDays = daysUntilDeadline(projectSubmissionDate);

    console.log('Days left until deadline:', remainingDays);

    if (greetingMessage) {
        greetingMessage.textContent = showGreeting(name);
    }

    if (ongoingProjectDays) {
        ongoingProjectDays.textContent = remainingDays + ' days remaining';
    }

    if (spinner) {
        spinner.style.display = 'none';
    }
});
