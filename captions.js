const captionList = [
    "For all sheeps and sizes.",
    "You herd it here first.",
    "Baby don't herd me.",
    "Wool you be my friend?",
    "Even Britany Shears is here.",
    "Full of baaaad puns.",
    "Oh shear up, darling!",
    "Alive and wool.",
    "To wool the world!",
    "Abandon sheep!",
    "I love sheep thrills!",
    "Love wool find a way.",
    "Breaking the fourth wool!",
    "Raise the baaaa!"
]

exports.getRandomCaption = function () {
    return captionList[(Math.random() * captionList.length).toFixed()%captionList.length]
}