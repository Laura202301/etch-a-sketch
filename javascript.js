// Get references to specific elements from the HTML document
const gridContainer = document.querySelector('.grid-container');
const slider = document.getElementById('my-range');
const scale = document.getElementById('scale');
const colorPicker = document.getElementById('fav-color');
const blackDot = document.querySelector('.black-dot'); 
const multicolorDot = document.querySelector('.multicolor-dot'); 
const clearDot = document.querySelector('.clear-dot'); 
const resetButton = document.querySelector('.reset-button');
const darkeningSwitch = document.querySelector('.darkening-switch input');

let currentColor = colorPicker.value;
let isMulticolorMode = false;
let isDarkeningEnabled = false; // Variable to enable/disable darkening
const maxInteractions = 10; // Check if the max number of interactions has been reached

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
      if (isDarkeningEnabled) {
        const currentColor = this.style.backgroundColor;
        
        // Check if the current color is '#ccc' (grid color)
        if (currentColor !== 'rgb(204, 204, 204)') {
          const currentColorRGB = currentColor.match(/\d+/g);
          let [r, g, b] = currentColorRGB.map(Number);
          
          // Calculate the value to darken the current color
          const darkeningValue = Math.floor(255 / maxInteractions);
          
          // Check if the maximum number of interactions has been reached
          const totalInteractions = parseInt(this.getAttribute('data-interactions')) || 0;
          if (totalInteractions < maxInteractions) {
            r = Math.max(0, r - darkeningValue);
            g = Math.max(0, g - darkeningValue);
            b = Math.max(0, b - darkeningValue);
            
            // Increase the interaction counter
            this.setAttribute('data-interactions', totalInteractions + 1);
          }
          
          // Update background color
          this.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        }
      } else {
        // If darkening is not enabled, color with the current color
        if (isMulticolorMode) {
          const randomColor = getRandomColor();
          this.style.backgroundColor = randomColor;
        } else {
          this.style.backgroundColor = currentColor;
        }
      }
    });

    gridItem.addEventListener('mouseout', function() {
      // Reset the interaction counter when leaving the square
      this.setAttribute('data-interactions', 0);
      if (!isDarkeningEnabled && !isMulticolorMode) {
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

// Function to reset the grid item colors
function resetGridColors() {
  const gridItems = Array.from(gridContainer.getElementsByClassName('grid-item'));
  gridItems.forEach((item) => {
    item.style.backgroundColor = '#ccc';
  });
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
resetButton.addEventListener('click', resetGridColors); 
darkeningSwitch.addEventListener('change', function() {
  isDarkeningEnabled = this.checked;
});

// Initialize the grid size
updateGridSize();
