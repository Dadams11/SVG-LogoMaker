const { Circle, Triangle, Square } = require('./shapes.js');

describe('render method', () => {
  test('Circle - returns SVG string with shape color', () => {
    const circle = new Circle('red');
    expect(circle.render()).toBe(`<svg><circle cx="0" cy="0" r="10" fill="red"></circle></svg>`);
  });

  test('Triangle - returns SVG string with shape color', () => {
    const triangle = new Triangle('blue');
    expect(triangle.render()).toBe(`<svg><polygon points="0,0 -4,8 4,8" fill="blue"></polygon></svg>`);
  });

  test('Square - returns SVG string with shape color', () => {
    const square = new Square('green');
    expect(square.render()).toBe(`<svg><rect width="6" height="6" fill="green"></rect></svg>`);
  });
});

