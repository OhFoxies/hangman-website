const keyboardButtons = document.querySelectorAll(".button")
const word = "Wzium";
const letters = []
const letters_elements = {}
const polish_letters = {'A': 'Ą', 'E': 'Ę', 'C': 'Ć', 'L': 'Ł', 'O': 'Ó', 'S': 'Ś', 'N': 'Ń', 'Z': 'Ż', 'X': 'Ź'}
let isHoldingCtrl = false
const lettersElement = document.getElementById('letters')

for (const letter of word) {
    lettersElement.innerHTML += `<div class="letter-cell">
                    <p class="letter">${letter}</p>
                    <span class="underline"></span>
                </div>`

    letters.push(letter)
}

for (const button of keyboardButtons) {
    const inside = button.childNodes[0]
    letters_elements[inside.innerHTML] = button
    button.addEventListener("click", e => {
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

function pressedKey(key) {
    if (key==='ALT') {
        isHoldingCtrl = true
        return
    }
    if (isHoldingCtrl) {
        if (Object.keys(polish_letters).includes(key)) {
            letters_elements[polish_letters[key]].animate(newspaperSpinning, newspaperTiming)
            console.log(polish_letters[key])
            return
        }
    }
    letters_elements[key].animate(newspaperSpinning, newspaperTiming)
    console.log(key)
}

const newspaperSpinning = [
    { transform: "scale(1)" },
    { transform: "scale(1.2)" },
    { transform: "scale(1.1)" },
    { transform: "scale(1)" },
];

const newspaperTiming = {
    duration: 1000,
    iterations: 1,
}