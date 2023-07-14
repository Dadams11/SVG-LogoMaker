const fs = require('fs');
const { Circle, Triangle, Square } = require('./shapes.js');
const inquirer = require('inquirer');

const generateLogo = (text, textColor, shape, shapeColor) => {
  let svg = '';

  let shapeObj;
  if (shape === 'circle') {
    shapeObj = new Circle(shapeColor);
  } else if (shape === 'triangle') {
    shapeObj = new Triangle(shapeColor);
  } else if (shape === 'square') {
    shapeObj = new Square(shapeColor);
  }

  if (shapeObj) {
    svg += shapeObj.render();
  }

  svg += `<text x="150" y="100" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${text}</text>`;

  svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">${svg}</svg>`;

  return svg;
};

module.exports = { generateLogo };

if (require.main === module) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'text',
        message: 'Enter the text (up to 3 characters):',
        validate: (input) => input.length <= 3 || 'Text should be up to 3 characters long.',
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
    .then(({ text, textColor, shape, shapeColor }) => {
      const svgContent = generateLogo(text, textColor, shape, shapeColor);

      let fileCounter = 1;
      let fileName = `logo_${fileCounter}.svg`;
      let filePath = `./examples/${fileName}`;

      while (fs.existsSync(filePath)) {
        fileCounter++;
        fileName = `logo_${fileCounter}.svg`;
        filePath = `./examples/${fileName}`;
      }

      fs.writeFileSync(filePath, svgContent);

      console.log(`Generated ${filePath}`);
    })
    .catch((error) => {
      console.error('An error occurred:', error);
    });
}
