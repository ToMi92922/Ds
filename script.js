const settingsIcon = document.getElementById("settings-icon");
const dropdown = document.getElementById("dropdown");
const toggleCustomSet = document.getElementById("toggle-custom-set");
const setSelect = document.getElementById("set-select");
const customLetterSetContainer = document.getElementById("custom-letter-set-container");
const letters = document.querySelectorAll(".letter");
const generateButton = document.getElementById("generate");
const randomLetterDisplay = document.getElementById("random-letter");
const loadingIndicator = document.getElementById("loading");
const infoWindow = document.getElementById("info-window");
const letterAudio = document.getElementById("letter-audio");

let selectedLetters = new Set();

settingsIcon.addEventListener("click", () => {
    dropdown.classList.toggle("active");
});

toggleCustomSet.addEventListener("click", () => {
    const isHidden = customLetterSetContainer.style.display === "none";
    customLetterSetContainer.style.display = isHidden ? "block" : "none";
    toggleCustomSet.textContent = isHidden ? "🔼 Skrýt vlastní písmena" : "🔽 Zobrazit vlastní písmena";
});

letters.forEach(letter => {
    letter.addEventListener("click", () => {
        letter.classList.toggle("active");
        letter.classList.toggle("inactive");
        const letterValue = letter.dataset.letter;

        if (selectedLetters.has(letterValue)) {
            selectedLetters.delete(letterValue);
        } else {
            selectedLetters.add(letterValue);
        }
    });
});

setSelect.addEventListener("change", () => {
    const selectedSet = setSelect.value;
    if (selectedSet === "custom") {
        toggleCustomSet.style.display = "block";
        customLetterSetContainer.style.display = "block";
    } else {
        toggleCustomSet.style.display = "none";
        customLetterSetContainer.style.display = "none";
        selectedLetters.clear();
        letters.forEach(letter => {
            letter.classList.remove("active", "inactive");
            letter.classList.add("inactive");
        });
    }
});

generateButton.addEventListener("click", () => {
    if (setSelect.value === "custom" && selectedLetters.size === 0) {
        alert("Nenastavil jsi žádné písmeno.");
        return;
    }

    loadingIndicator.style.display = "block";
    randomLetterDisplay.classList.remove("show");
    randomLetterDisplay.classList.add("hide");
    setTimeout(() => {
        let letter;
        if (setSelect.value === "cs") {
            const csLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÁČĎÉĚÍŇÓŘŠŤÚÝ";
            letter = csLetters.charAt(Math.floor(Math.random() * csLetters.length));
        } else if (setSelect.value === "en") {
            const enLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            letter = enLetters.charAt(Math.floor(Math.random() * enLetters.length));
        } else if (setSelect.value === "custom") {
            const randomIndex = Math.floor(Math.random() * selectedLetters.size);
            letter = Array.from(selectedLetters)[randomIndex];
        }

        randomLetterDisplay.textContent = letter;
        randomLetterDisplay.classList.remove("hide");
        randomLetterDisplay.classList.add("show");

        const audioSrc = `audio/${letter}.mp3`;
        letterAudio.src = audioSrc;
        letterAudio.play();

        const voiceActor = `Toto písmeno pro vás nadaboval: ${letter}`; 
        infoWindow.textContent = voiceActor;
        infoWindow.style.display = "block";

        loadingIndicator.style.display = "none";
    }, 1000);
});
