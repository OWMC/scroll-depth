/** @jest-environment jsdom */

const getLocation = require("./script");

describe('getLocation function', () => {
  it('should return just the headerGap when checkpoint is 0%', () => {
    expect(getLocation(0, 1000, 200)).toBe(200);
  });
});

describe('getLocation function', () => {
    it('should return 2 when checkpoint is 200%', () => {
      expect(getLocation(200, 1000, 0)).toBe(2000);
    });
  });
  