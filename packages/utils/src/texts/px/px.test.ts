import { describe, it, expect } from 'vitest';
import { px } from './px';

describe('px', () => {
  it('should convert a number to a pixel string', () => {
    expect(px(10)).toBe('10px');
  });

  it('should convert a string number to a pixel string', () => {
    expect(px('10')).toBe('10px');
  });

  it('should handle zero correctly', () => {
    expect(px(0)).toBe('0px');
    expect(px('0')).toBe('0px');
  });

  it('should handle negative numbers correctly', () => {
    expect(px(-5)).toBe('-5px');
    expect(px('-5')).toBe('-5px');
  });

  it('should handle decimal numbers correctly', () => {
    expect(px(10.5)).toBe('10.5px');
    expect(px('10.5')).toBe('10.5px');
  });
});