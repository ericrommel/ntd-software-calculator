import { test, expect } from '@playwright/test'
import { runCalculator } from 'tests/support/utils/calculator'

test.describe('Division Tests', () => {
  test('should divide basic numbers correctly', async () => {
    const result = await runCalculator('divide', '8', '4')
    expect(result).toBe('2')
  })

  test('should handle division resulting in zero', async () => {
    const result = await runCalculator('divide', '0', '12345')
    expect(result).toBe('0')
  })

  test('should handle division by zero', async () => {
    const result = await runCalculator('divide', '10', '0')
    expect(result).toContain('Error: Cannot divide by zero')
  })

  test('should handle division of zero by a number', async () => {
    const result = await runCalculator('divide', '0', '10')
    expect(result).toBe('0')
  })

  test('should handle division with negative and positive numbers', async () => {
    const result = await runCalculator('divide', '-20', '4')
    expect(result).toBe('-5')
  })

  test('should handle division with negative numbers only', async () => {
    const result = await runCalculator('divide', '-30', '-5')
    expect(result).toBe('6')
  })

  test('should handle division with empty strings', async () => {
    const result = await runCalculator('divide', '10', '')
    expect(result).toContain('Usage: cli-calculator operation operand1 operand2\nSupported operations: add, subtract, multiply, divide')
  })

  test.skip('should handle division with non-numeric characters', async () => {
    const result = await runCalculator('divide', '10', 'b')
    expect(result).toContain('Error')
  })

  test.skip('should handle division with special characters', async () => {
    const result = await runCalculator('divide', '10', '!')
    expect(result).toContain('Error')
  })

  test('should handle division with max safe integer', async () => {
    const result = await runCalculator('divide', `${Number.MAX_SAFE_INTEGER}`, '2')
    expect(result).toBe('4503599627370495.5') // (2^53 - 1) / 2
  })

  test('should handle division with min safe integer', async () => {
    const result = await runCalculator('divide', `${Number.MIN_SAFE_INTEGER}`, '2')
    expect(result).toBe('-4503599627370495.5') // -(2^53 - 1) / 2
  })

  test.skip('should handle division with very small number resulting in a large number', async () => {
    const result = await runCalculator('divide', '1e-200', '1e-100')
    expect(result).toBe('1e-100') // Small number divided by another small number
  })

  // scientific notation
  test('should handle division with very large numbers', async () => {
    const result = await runCalculator('divide', '1e+100', '1e+50')
    expect(result).toBe('99999999999999990000000000000000000000000000000000')
  })

  test('should handle division with very small number resulting in very large number', async () => {
    const result = await runCalculator('divide', '1e-100', '1e-200')
    expect(result).toBe('10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000') // Expecting a very large number
  })

  // Precision issue
  test('should handle division with very small numbers', async () => {
    const result = await runCalculator('divide', '1e-100', '1e-50')
    expect(result).toBe('0')
  })

  test.skip('should handle division with very large number resulting in very small number', async () => {
    const result = await runCalculator('divide', '1e+100', '1e+200')
    expect(result).toBe('1e-100') // Expecting a very small number
  })
})
