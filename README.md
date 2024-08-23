# Introduction


Ever get tired of using your non-delicate fingers to place small boats on a battleship board? 
<br>(An illustration is drawn to help visualise this severe problem below)

![image](https://github.com/user-attachments/assets/002dc132-0b31-4237-8064-00955dd8b1e2)

***Well, fear no more!***

**BlottleShip**, an open-source battleship game generator designed for the Blot drawing machine (by hack club) is here to save families from this tedious process.

With BlottleShip, families and friends can finally engage with each other in a fun, yet competitive (not to mention chaotic) classic family board game in a whole new way!

Preview:

![image](https://github.com/user-attachments/assets/89d6f360-be15-4866-91d4-79dbad1a5f3f)

## Prologue - basically stuff I said in the [PR](https://github.com/hackclub/blot/pull/733)
My artwork is a battleship board that can be playable and scalable (also responsive) when drawn. I intended this artwork to be interactive and admirable simultaneously, with the mesmerising grid pattern and captivating ship details. I am 13 y/o and have been learning programming for around 1 year, with beginner to intermediate experience in Javascript, React (& Native), C, C++, C#, Kotlin, HTML & CSS (Since 2021), and Python. My most proficient language should be Python since my school uses it to teach CS concepts. My first experience with JavaScript was an inter-school hackathon in November of 2023, which was my first time programming (By the way, I chose JavaScript due to my teammate's preference, and we got to the podium (3rd place) in that hackathon).
I think I worked 10+ hours on this project and I'm quite proud of the maths I learnt from it, especially trigonometry.

# How do you access it and use it?
## Downloading the files

***Note: It is very much preferable that you have a blot to draw this out.***

Since my project has already been merged into the main branch of the blot repository, it now appears in the blot gallery which you can access directly by just clicking on my project.

As of now (August 24th 2024), my project is on the 6th row of the gallery when you scroll down.

![image](https://github.com/user-attachments/assets/d6a1728a-7841-46d9-929f-2ba212cafac3)

If for any reason you cannot find/access it, you can always download the file `index.js` in this repository and import it into the blot editor.

To import into / access the blot editor from your local machine,
- Go to the [blot website]([url](https://blot.hackclub.com/))
- Head to the 'editor' on the top navigation bar
- Select 'File'
- Select 'Open from disk'
- And finally open the `index.js` file (where you saved it)

## Using this project

So you've found the project and now you're wondering what in the world can I do with it.

Well, you can do a lot of customising with it by changing certain parameters included at the top of the file (lines 7-17)!

![image](https://github.com/user-attachments/assets/fe4de158-5a09-4aa8-acac-774841b1fb9a)


Here is a list of the changeable parameters:
- `empty` (bool): default is `false`, states whether the board is empty or not (for marking opponents boat purposes, or drawing your own boats, etc.)
- `gridWidth` (int): default is `10`, changes the size of the square grid, local maximum is 26 since the English alphabet, but you can go higher and boats will still generate outside the a-z range
- `boatSizes` (list of ints): default is `[2,3,4,4,5]`, each item in the list represents a boat and its corresponding length, so the length of the array == the no. of boats
- `randomSeed` (int): default is `bt.randInRange(0, 10000)`, generates a random seed, can change if you want a specific arrangement of boats
- `scale` (int): default is `gridWidth >= 9 ? (gridWidth >= 15 ? 0.5 : 1) : 2`, ternary operation to evaluate how large the text should be on the paper, change if your grid goes too small or something

Play around with the editor and make the best fun out of this small game and innovative of technology!
