let state = 'start'; // 'start', 'gallery', 'modal'
let characters = [];
let selectedIndex = 0;
let modalVisible = false;

function preload() {
  // Load the custom font
  customFont = loadFont('MPLUS1Code-VariableFont_wght.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(customFont);

  // Define characters (Image and description)
  characters = [
    { img: loadImage('cat.png'), description: 'Sporty Cat: You are an active person, or at least you are trying to be. More sports and less stress. Cats are always cool! ' },
    { img: loadImage('dvds.png'), description: 'Shy DVD: You are not always confident about what you are doing. But does it really matter, what others are thinking of you? Don’t let other people decide, what kind of DVD are you!' },
    { img: loadImage('nokia.png'), description: 'Naughty Nokia: Bro, you are old! Stop trying to pretend to be as young as all teenagers today. Accept yourself and appreciate your individuality!' },
    { img: loadImage('star3.png'), description: 'Pop Star: You are famous! You have a lot of talents, show them to this world! You can do it.' },
    { img: loadImage('explorer.png'), description: 'Explorer Grandpa: You are wise, it can be easily seen by your beard. But despite your age, the spirit of adventure still lives in you! And that is right, traveling is the coolest thing.' },
    { img: loadImage('star2.png'), description: 'Cool Star: You are cool. Just cool. But do not let this facade hide your real feelings!' },
  ];
}

function draw() {
  background(255);

  if (state === 'start') {
    drawStartPage();
  } else if (state === 'gallery') {
    drawCharacterGallery();
  } else if (state === 'modal') {
    drawCharacterModal();
  }
}

function drawStartPage() {
  textSize(32);
  textAlign(CENTER, CENTER);
  text('Hello', width / 2, height / 4);
  
  // Draw play button
  fill(222, 161, 255);
  rect(width / 2 - 100, height / 2, 200, 50, 10);
  fill(0);
  noStroke();
  textSize(24);
  text('Play', width / 2, height / 2 + 20);
  
  if (mouseIsPressed && mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height / 2 && mouseY < height / 2 + 50) {
    state = 'gallery';
  }
}

function drawCharacterGallery() {
  textSize(32);
  fill(0);
  textAlign(CENTER, CENTER);
  text('Select Your Character', width / 2, height / 4.9);
  
  // Draw navigation buttons
  fill(222, 161, 255);
  noStroke();
  rect(width / 4 - 50, height / 2 + 150, 100, 50, 10); // Left Button
  rect(3 * width / 4 - 50, height / 2 + 150, 100, 50, 10); // Right Button
  
  fill(255);
  textSize(34);
  text('<', width / 4, height / 2 + 170); // Left Button Text
  text('>', 3 * width / 4, height / 2 + 170); // Right Button Text

  // Increase image size for gallery
  let imgSize = 250; // Increased size
  let charX = width / 2 - imgSize / 2; // Center the image horizontally
  
  image(characters[selectedIndex].img, charX, height / 2 - imgSize / 2, imgSize, imgSize);
}

function drawCharacterModal() {
  // Dark background overlay
  fill(94, 62, 173);
  rect(0, 0, width, height);
  
  // Display larger character image in the modal
  let char = characters[selectedIndex];
  let imgSize = 300; // Increased size in the modal
  image(char.img, width / 2 - imgSize / 2, height / 2.3 - imgSize / 2, imgSize, imgSize);
  
  // Invisible rectangle for the description (400x200)
  let descriptionBoxWidth = 600;
  let descriptionBoxHeight = 200;
  let descriptionBoxX = width / 2 - descriptionBoxWidth / 2; // Centered horizontally
  let descriptionBoxY = height / 2 + 140; // Placed below the character image
  
  // Draw invisible rectangle (just for layout, no fill)
  noFill();
  noStroke(); // Optional: Use stroke to outline the box for debugging
  rect(descriptionBoxX, descriptionBoxY, descriptionBoxWidth, descriptionBoxHeight);
  
  // Display character description inside the invisible rectangle
  fill(255);
  textSize(16);
  textAlign(CENTER, TOP);
  text(char.description, descriptionBoxX + 10, descriptionBoxY + 10, descriptionBoxWidth - 20, descriptionBoxHeight - 20); // Padding inside the box
  
  // Close button
  fill(222, 161, 255);
  rect(width / 2 - 50, height - 65, 100, 40, 10);
  fill(255);
  text('Close', width / 2, height - 58);
}

function mousePressed() {
  if (state === 'gallery') {
    // Check if left button is clicked
    if (mouseX > width / 4 - 50 && mouseX < width / 4 + 50 && mouseY > height / 2 + 150 && mouseY < height / 2 + 200) {
      selectedIndex = (selectedIndex - 1 + characters.length) % characters.length;
    }
    // Check if right button is clicked
    else if (mouseX > 3 * width / 4 - 50 && mouseX < 3 * width / 4 + 50 && mouseY > height / 2 + 150 && mouseY < height / 2 + 200) {
      selectedIndex = (selectedIndex + 1) % characters.length;
    }
    
    // Check if a character was clicked
    let imgSize = 250; // Increased size in the gallery
    let charX = width / 2 - imgSize / 2;
    if (mouseX > charX && mouseX < charX + imgSize && mouseY > height / 2 - imgSize / 2 && mouseY < height / 2 + imgSize / 2) {
      state = 'modal';
    }
  }
  
  if (state === 'modal') {
    // Close modal if the "Close" button is clicked
    if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > height - 80 && mouseY < height - 40) {
      state = 'gallery';
    }
  }
}
