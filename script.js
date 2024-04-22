const keyboardButtons = document.querySelectorAll(".button")
let word = "";
let letters = []
const letters_elements = {}
const polish_letters = {'A': 'Ą', 'E': 'Ę', 'C': 'Ć', 'L': 'Ł', 'O': 'Ó', 'S': 'Ś', 'N': 'Ń', 'Z': 'Ż', 'X': 'Ź'}
let isHoldingCtrl = false
const max_mistakes = 7
let mistakes = 0;
let inGame = false;
let inMenu = false;
const animation = [
    {transform: "scale(1)"},
    {transform: "scale(1.1)"},
    {transform: "scale(1.2)"},
    {transform: "scale(1.1)"},
    {transform: "scale(1)"},
];

const animationTiming = {
    duration: 500,
    iterations: 1,
}
const random_words = [
    "dom",
    "szkoła",
    "samochód",
    "książka",
    "telefon",
    "kot",
    "pies",
    "krzesło",
    "stół",
    "telewizor",
    "kwiat",
    "laptop",
    "rower",
    "buty",
    "okno",
    "drzwi",
    "ręka",
    "twarz",
    "serce",
    "motocykl",
    "kawa",
    "herbata",
    "kotlet",
    "szafa",
    "kurtka",
    "spodnie",
    "koszula",
    "płaszcz",
    "bluzka",
    "bluza",
    "spódniczka",
    "kubek",
    "widelec",
    "łyżka",
    "nóż",
    "kanapa",
    "fotel",
    "dywan",
    "koc",
    "poduszka",
    "biurko",
    "długopis",
    "ołówek",
    "zeszyt",
    "notes",
    "komputer",
    "ekran",
    "myszka",
    "klawiatura",
    "głośniki"
];
let guessed = []

for (const button of keyboardButtons) {
    const inside = button.childNodes[0]
    letters_elements[inside.innerHTML] = button
    button.addEventListener("click", () => {
        const inside = button.childNodes[0]
        pressedKey(inside.innerHTML)
    })
}

document.addEventListener("keydown", e => {
    pressedKey(e.key.toUpperCase())
})

document.addEventListener("keyup", e => {
    if (e.key === "Alt") {
        isHoldingCtrl = false
    }
})

function won() {
    const wonElement = document.getElementById('won')
    wonElement.classList.add('show')
    inMenu = true
}

function lost() {
    const lettersElement = document.getElementById('letters')
    const lostElement = document.getElementById('lost')

    lostElement.classList.add('show')
    lettersElement.innerHTML = ""
    for (const letter of word) {
        lettersElement.innerHTML += `<div class="letter-cell">
                        <p class="letter">${letter.toUpperCase()}</p>
                        <span class="underline"></span>
                    </div>`
    }
    inMenu = true
}

function pressedKey(key) {
    if (!inGame || inMenu) {
        return
    }
    let pressedKey = ''
    if (key === 'ALT') {
        isHoldingCtrl = true
        return
    }
    if (isHoldingCtrl) {
        if (Object.keys(polish_letters).includes(key)) {
            pressedKey = polish_letters[key]
            letters_elements[polish_letters[key]].animate(animation, animationTiming)

        }
    } else {
        pressedKey = key

        letters_elements[key].animate(animation, animationTiming)
    }

    console.log(pressedKey)
    if (letters.includes(pressedKey)) {
        const lettersElement = document.getElementById('letters')
        letters_elements[pressedKey].style.backgroundColor = 'green'

        if (!guessed.includes(pressedKey)) {
            lettersElement.innerHTML = ""
            for (const letter of letters) {
                if (guessed.includes(letter) || letter === pressedKey) {
                    lettersElement.innerHTML += `<div class="letter-cell">
                        <p class="letter">${letter}</p>
                        <span class="underline"></span>
                    </div>`
                } else {
                    lettersElement.innerHTML += `<div class="letter-cell">
                        <p class="letter" style="opacity: 0">X</p>
                        <span class="underline"></span>
                    </div>`
                }

            }
            let uniq = [...new Set(letters)];
            let wziumwon = true;
            guessed.push(pressedKey)
            for (const i of uniq) {
                if (!guessed.includes(i)) {
                    wziumwon = false;
                    break
                }
            }
            if (wziumwon) {
                won()
            }
        }
    } else {
        letters_elements[pressedKey].style.backgroundColor = 'red'
        if (!guessed.includes(pressedKey)) {
            const mistakesElement = document.getElementById('mistakes')
            mistakes++;
            mistakesElement.innerHTML = `Błędy ${mistakes}/${max_mistakes}`
            if (mistakes >= max_mistakes) {
                lost()
            }
        }
    }
}


function start() {
    if (inGame || inMenu) {
        return
    }
    reset()
    inGame = true
    word = random_words[Math.floor(Math.random() * random_words.length)]
    const lettersElement = document.getElementById('letters')

    lettersElement.innerHTML = ""
    for (const letter of word) {
        lettersElement.innerHTML += `<div class="letter-cell">
                        <p class="letter" style="opacity: 0">X</p>
                        <span class="underline"></span>
                    </div>`

        letters.push(letter.toUpperCase())
    }
}

function reset() {
    inMenu = false;
    const lettersElement = document.getElementById('letters')
    lettersElement.innerHTML = ''
    lettersElement.innerHTML += `<div class="letter-cell">
                        <p class="letter" style="opacity: 0">X</p>
                        <span class="underline" style="opacity: 0"></span>
                    </div>`

    for (const i of Object.values(letters_elements)) {
        i.style.backgroundColor = '#A3BAC3'
    }
    letters = []
    word = "";
    isHoldingCtrl = false
    mistakes = 0;
    guessed = []
    inGame = false;
    const lostElement = document.getElementById('lost')
    lostElement.classList.remove('show')
    const wonElement = document.getElementById('won')
    wonElement.classList.remove('show')
    const mistakesElement = document.getElementById('mistakes')
    mistakesElement.innerHTML = 'Błędy 0/7'
    // start()

}