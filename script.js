import inquirer from 'inquirer';
import fs from 'fs';

// Base Shape class
class Shape {
  constructor(color) {
    this.color = color;
  }

  // The draw method should be overridden by the specific shape classes
  draw() {
    return '';
  }
}

// Circle class extends Shape
class Circle extends Shape {
  constructor(color) {
    super(color);
  }

  draw() {
    return `<circle cx="150" cy="100" r="50" fill="${this.color}" />`;
  }
}

// Triangle class extends Shape
class Triangle extends Shape {
  constructor(color) {
    super(color);
  }

  draw() {
    return `<polygon points="150 50 100 150 200 150" fill="${this.color}" />`;
  }
}

// Square class extends Shape
class Square extends Shape {
  constructor(color) {
    super(color);
  }

  draw() {
    return `<rect x="100" y="50" width="100" height="100" fill="${this.color}" />`;
  }
}

// Function to generate the SVG file based on user inputs
function generateLogo(text, textColor, shape, shapeColor) {
  let svg = '';

  // Create the shape object based on user input
  let shapeObj;
  if (shape === 'circle') {
    shapeObj = new Circle(shapeColor);
  } else if (shape === 'triangle') {
    shapeObj = new Triangle(shapeColor);
  } else if (shape === 'square') {
    shapeObj = new Square(shapeColor);
  }

  // Draw the shape
  if (shapeObj) {
    svg += shapeObj.draw();
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
      validate: function (input) {
        return input.length <= 3 ? true : 'Text should be up to 3 characters long.';
      },
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
