// Get the grid container element
const gridContainer = document.querySelector('.grid-container');
const slider = document.getElementById('my-range');
const scale = document.getElementById('scale');
const colorPicker = document.getElementById('fav-color'); 

let currentColor = colorPicker.value; 

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
      this.style.backgroundColor = currentColor; 
    });

    gridItem.addEventListener('mouseout', function() {
      this.style.backgroundColor = currentColor; 
    });
  }

  // Update the scale display
  scale.textContent = `${gridSize} x ${gridSize}`;
}

// Function to handle color picker change
function handleColorChange() { 
  currentColor = colorPicker.value; 
}

// Add event listeners
slider.addEventListener('input', updateGridSize);
colorPicker.addEventListener('input', handleColorChange); 

// Initialize the grid size
updateGridSize();
