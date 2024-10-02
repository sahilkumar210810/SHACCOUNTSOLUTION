// किसी सदस्य की जानकारी दिखाने के लिए JavaScript फंक्शन
function showDetails(memberId) {
    // सभी सदस्य जानकारी वाली divs को लाएं
    const memberDetails = document.querySelectorAll('.details');

    // सभी सदस्य जानकारी छिपाएं
    memberDetails.forEach(detail => {
        detail.style.display = 'none'; // सभी को छिपाएं
    });

    // डिफ़ॉल्ट संदेश छिपाएं
    const defaultMessage = document.getElementById('default-message');
    if (defaultMessage) {
        defaultMessage.style.display = 'none'; // डिफ़ॉल्ट संदेश छिपाएं
    }

    // चयनित सदस्य की जानकारी दिखाएं
    const selectedDetail = document.getElementById(memberId);
    if (selectedDetail) {
        selectedDetail.style.display = 'block'; // चयनित सदस्य की जानकारी दिखाएं
    }

    // सभी लिंक से "selected" क्लास हटाएं
    const memberLinks = document.querySelectorAll('.team-list ul li a');
    memberLinks.forEach(link => {
        link.classList.remove('selected'); // "selected" क्लास हटाएं
    });

    // चयनित लिंक को "selected" क्लास दें
    const clickedMemberLink = document.querySelector(`a[onclick="showDetails('${memberId}')"]`);
    if (clickedMemberLink) {
        clickedMemberLink.classList.add('selected'); // चयनित लिंक को "selected" क्लास दें
    }
}

// डिफ़ॉल्ट जानकारी दिखाने के लिए शुरुआती कॉल
document.addEventListener("DOMContentLoaded", function() {
    const welcomeMessage = document.getElementById('default-message');
    if (welcomeMessage) {
        welcomeMessage.style.display = 'block'; // डिफ़ॉल्ट संदेश दिखाएं
    }

    // प्रारंभ में सभी सदस्य जानकारी छिपाएं
    const memberDetails = document.querySelectorAll('.details');
    memberDetails.forEach(detail => {
        detail.style.display = 'none'; // सभी को छिपाएं
    });
});

// Function to load member info from the text file
async function loadMemberInfo() {
    try {
        const response = await fetch('team/members.txt'); // Fetch the members.txt file
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        
        const data = await response.text();

        // Create an object to hold member info
        const memberInfo = {};
        data.split('\n').forEach(line => {
            const [name, info] = line.split(':').map(item => item.trim());
            if (name && info) { // Check if both name and info are present
                memberInfo[name] = info;
            }
        });

        // Assign the text to the appropriate paragraphs
        document.getElementById('member1-info').innerText = memberInfo['RAGHUNATH DAS'] || 'No info available';
        document.getElementById('member2-info').innerText = memberInfo['SOURABH TANEJA'] || 'No info available';
    } catch (error) {
        console.error('Error loading member info:', error);
        alert('Could not load member information. Please check the console for more details.');
    }
}

// Call the function to load member info on page load
window.onload = loadMemberInfo;
