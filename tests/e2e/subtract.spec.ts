import { test, expect } from '@playwright/test'
import { runCalculator } from 'tests/support/utils/calculator'

test.describe('Subtraction Tests', () => {
  test('should subtract basic numbers correctly', async () => {
    const result = await runCalculator('subtract', '7', '3')
    expect(result).toBe('4')
  })

  test('should handle large numbers correctly', async () => {
    const result = await runCalculator('subtract', '1e+100', '1e+100')
    expect(result).toBe('0')
  })

  test('should handle small floating-point numbers correctly', async () => {
    const result = await runCalculator('subtract', '0.00000001', '0.00000001')
    expect(result).toBe('0')
  })

  test('should handle subtraction with negative and positive numbers', async () => {
    const result = await runCalculator('subtract', '-5', '5')
    expect(result).toBe('-10')
  })

  test('should handle subtraction with negative numbers only', async () => {
    const result = await runCalculator('subtract', '-15', '-15')
    expect(result).toBe('0')
  })

  test('should handle subtraction with empty strings', async () => {
    const result = await runCalculator('subtract', '10', '')
    expect(result).toContain('Usage: cli-calculator operation operand1 operand2\nSupported operations: add, subtract, multiply, divide')
  })

  test.skip('should handle subtraction with non-numeric characters', async () => {
    const result = await runCalculator('subtract', '10', 'b')
    expect(result).toContain('Error')
  })

  test.skip('should handle subtraction with special characters', async () => {
    const result = await runCalculator('subtract', '10', '!')
    expect(result).toContain('Error')
  })

  test('should handle subtraction leading to underflow', async () => {
    const result = await runCalculator('subtract', '-1e+308', '1e+308')
    expect(result).toBe('-∞')
  })

  test('should handle subtraction with max safe integer', async () => {
    const result = await runCalculator('subtract', `${Number.MAX_SAFE_INTEGER}`, '1')
    expect(result).toBe('9007199254740990') // 2^53 - 1 + 1
  })

  test('should handle subtraction with min safe integer', async () => {
    const result = await runCalculator('subtract', `${Number.MIN_SAFE_INTEGER}`, '-1')
    expect(result).toBe('-9007199254740990') // -(2^53 - 1) - 1
  })

  test('should handle subtraction resulting in zero', async () => {
    const result = await runCalculator('subtract', '12345', '12345')
    expect(result).toBe('0')
  })

  test('should handle subtraction with large negative result', async () => {
    const result = await runCalculator('subtract', '12345', '123456789')
    expect(result).toBe('-123444444')
  })

  test('should handle subtraction with small negative result', async () => {
    const result = await runCalculator('subtract', '0.0001', '0.0002')
    expect(result).toBe('-0.0001')
  })

  test('should handle very small numbers correctly', async () => {
    const result = await runCalculator('subtract', '1e-100', '1e-300')
    expect(result).toBe('0')
  })

  test('should handle subtraction with very large and very small numbers', async () => {
    const result = await runCalculator('subtract', '1e+100', '1e-100')
    expect(result).toBe('10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000')
  })  
})
