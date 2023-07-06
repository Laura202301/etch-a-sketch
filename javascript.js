// Get the grid container element
const gridContainer = document.querySelector('.grid-container');

// Create the grid items
for (let i = 0; i < 16 * 16; i++) {
  const gridItem = document.createElement('div');
  gridItem.classList.add('grid-item');
  gridContainer.appendChild(gridItem);

  // Set initial background color
  gridItem.style.backgroundColor = '#ccc';

  // Add event listeners to each grid item
  gridItem.addEventListener('mouseover', function() {
    this.style.backgroundColor = 'red';
  });

  gridItem.addEventListener('mouseout', function() {
    this.style.backgroundColor = 'red';
  });
}

