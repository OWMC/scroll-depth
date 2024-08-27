/** @jest-environment jsdom */

const { getLocation, offsetEvent } = require("./script");

describe('getLocation function', () => {
  it('should return just the headerGap when checkpoint is 0%', () => {
    expect(getLocation(0, 1000, 200)).toBe(200);
  });

  it('should return 2000 when checkpoint is 200%', () => {
    expect(getLocation(200, 1000, 0)).toBe(2000);
  });

  it('throws error for invalid percentage value', () => {
    const percentage = -1; // invalid percentage value
    expect(() => getlocation(percentage, 100, 10)).toThrowError();
  });
});



describe('offsetEvent', () => {
    it('returns a CustomEvent with correct event name and detail', () => {
      const percentage = 42; // test with a specific value
      const event = offsetEvent(percentage);
      expect(event.type).toBe('checkpoint');
      expect(event.detail.percentageScrolled).toBe(percentage);
    });
  
    it('handles edge cases (e.g., 0 or null percentage)', () => {
      // test with edge cases
      const percentage0 = 0;
      const percentageNull = null;
      const event0 = offsetEvent(percentage0);
      const eventNull = offsetEvent(percentageNull);
  
      expect(event0.type).toBe('checkpoint');
      expect(event0.detail.percentageScrolled).toBe(percentage0);
  
      expect(eventNull.type).toBe('checkpoint');
      expect(eventNull.detail.percentageScrolled).toBe(percentageNull); // or a default value if intended
    });
  });
  
  