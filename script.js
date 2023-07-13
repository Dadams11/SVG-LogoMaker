import inquirer from 'inquirer';
import fs from 'fs';

// Function to generate the SVG file based on user inputs
function generateLogo(text, textColor, shape, shapeColor) {
  let svg = '';

  // Draw the shape
  if (shape === 'circle') {
    svg += `<circle cx="150" cy="100" r="50" fill="${shapeColor}" />`;
  } else if (shape === 'triangle') {
    svg += `<polygon points="150 50 100 150 200 150" fill="${shapeColor}" />`;
  } else if (shape === 'square') {
    svg += `<rect x="100" y="50" width="100" height="100" fill="${shapeColor}" />`;
  }

  // Add the text
  svg += `<text x="150" y="100" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${text}</text>`;

  // Wrap the SVG content
  svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">${svg}</svg>`;

  return svg;
}

// Prompt the user for input
inquirer
  .prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter the text (up to 3 characters):',
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter the text color (keyword or hexadecimal number):',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['circle', 'triangle', 'square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter the shape color (keyword or hexadecimal number):',
    },
  ])
  .then((answers) => {
    const { text, textColor, shape, shapeColor } = answers;

    // Generate the SVG content
    const svgContent = generateLogo(text, textColor, shape, shapeColor);

    // Generate the unique file name
    let fileCounter = 1;
    let fileName = `logo_${fileCounter}.svg`;
    let filePath = `./examples/${fileName}`;

    while (fs.existsSync(filePath)) {
      fileCounter++;
      fileName = `logo_${fileCounter}.svg`;
      filePath = `./examples/${fileName}`;
    }

    // Write the SVG file
    fs.writeFileSync(filePath, svgContent);

    console.log(`Generated ${filePath}`);
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });
