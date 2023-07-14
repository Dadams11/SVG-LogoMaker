// Base Shape class
class Shape {
  constructor(color) {
    this.color = color;
  }

  // The render method should be overridden by the specific shape classes
  render() {
    return '';
  }
}

// Circle class extends Shape
 class Circle extends Shape {
  constructor(color) {
    super(color);
  }

  render() {
    return `<svg><circle cx="0" cy="0" r="10" fill="${this.color}"></circle></svg>`;
  }
}

// Triangle class extends Shape
 class Triangle extends Shape {
  constructor(color) {
    super(color);
  }

  render() {
    return `<svg><polygon points="0,0 -4,8 4,8" fill="${this.color}"></polygon></svg>`;
  }
}

// Square class extends Shape
 class Square extends Shape {
  constructor(color) {
    super(color);
  }

  render() {
    return `<svg><rect width="6" height="6" fill="${this.color}"></rect></svg>`;
  }
}

  
  module.exports = { Circle, Triangle, Square };
  