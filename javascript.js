// Get the grid container element
const gridContainer = document.querySelector('.grid-container');
const slider = document.getElementById('my-range');
const scale = document.getElementById('scale');
const colorPicker = document.getElementById('fav-color');
const blackDot = document.querySelector('.black-dot'); 
const multicolorDot = document.querySelector('.multicolor-dot'); 
const clearDot = document.querySelector('.clear-dot'); 

let currentColor = colorPicker.value;
let isMulticolorMode = false; 

// Function to update the grid size
function updateGridSize() { 
  const gridSize = parseInt(slider.value);
  const gridItems = Array.from(gridContainer.getElementsByClassName('grid-item'));

  // Remove existing grid items
  gridItems.forEach((item) => {
    gridContainer.removeChild(item);
  });

  // Create new grid items with the updated size
  for (let i = 0; i < gridSize * gridSize; i++) {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridContainer.appendChild(gridItem);

    // Set initial background color
    gridItem.style.backgroundColor = '#ccc';

    // Set the new flex-basis and padding-top values
    const flexBasis = `calc(${100 / gridSize}% - 2px)`;
    const paddingTop = `calc(${100 / gridSize}% - 2px)`;
    gridItem.style.flexBasis = flexBasis;
    gridItem.style.paddingTop = paddingTop;

    // Add event listeners to each grid item 
    gridItem.addEventListener('mouseover', function() {
      if (isMulticolorMode) {
        const randomColor = getRandomColor();
        this.style.backgroundColor = randomColor;
      } else {
        this.style.backgroundColor = currentColor;
      }
    });

    gridItem.addEventListener('mouseout', function() {
      if (!isMulticolorMode) {
        this.style.backgroundColor = currentColor;
      }
    });
  }

  // Update the scale display
  scale.textContent = `${gridSize} x ${gridSize}`;
}

function handleColorChange() {
  currentColor = colorPicker.value;
  isMulticolorMode = false; 
}

// Functions to handle dot buttons 
function handleBlackDotClick() { 
  isMulticolorMode = false;
  currentColor = '#000000';
}

function handleMulticolorDotClick() { 
  isMulticolorMode = true;
}

function handleClearDotClick() { 
  isMulticolorMode = false;
  currentColor = '#ccc';
}

// Helper function to generate a random color 
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Add event listeners
slider.addEventListener('input', updateGridSize);
colorPicker.addEventListener('input', handleColorChange);
blackDot.addEventListener('click', handleBlackDotClick); 
multicolorDot.addEventListener('click', handleMulticolorDotClick); 
clearDot.addEventListener('click', handleClearDotClick); 

// Initialize the grid size
updateGridSize();