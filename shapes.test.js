const { Circle, Triangle, Square } = require('./shapes.js');

describe('render method', () => {
  test('returns SVG string with shape color', () => {
    const circle = new Circle('red');
    const triangle = new Triangle('blue');
    const square = new Square('green');

    expect(circle.render()).toBe(`<svg><circle cx="0" cy="0" r="10" fill="red"></circle></svg>`);
    expect(triangle.render()).toBe(`<svg><polygon points="0,0 -4,8 4,8" fill="blue"></polygon></svg>`);
    expect(square.render()).toBe(`<svg><rect width="6" height="6" fill="green"></rect></svg>`);
  });
});
