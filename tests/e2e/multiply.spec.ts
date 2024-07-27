import { test, expect } from '@playwright/test'
import { runCalculator } from 'tests/support/utils/calculator'

test.describe('Multiplication Tests', () => {
  test('should multiply basic numbers correctly', async () => {
    const result = await runCalculator('multiply', '3', '4')
    expect(result).toBe('12')
  })

  test('should handle multiplication with very large and very small numbers', async () => {
    const result = await runCalculator('multiply', '1e+100', '1e-100')
    expect(result).toBe('1')
  })

  test('should handle multiplication with negative and positive numbers', async () => {
    const result = await runCalculator('multiply', '-5', '5')
    expect(result).toBe('-25')
  })

  test('should handle multiplication with negative numbers only', async () => {
    const result = await runCalculator('multiply', '-15', '-15')
    expect(result).toBe('225')
  })

  test('should handle multiplication with empty strings', async () => {
    const result = await runCalculator('multiply', '10', '')
    expect(result).toContain('Usage: cli-calculator operation operand1 operand2\nSupported operations: add, subtract, multiply, divide')
  })

  test('should handle multiplication leading to overflow', async () => {
    const result = await runCalculator('multiply', '1e+308', '1e+10')
    expect(result).toBe('∞') // Or a very large number
  })

  test('should handle multiplication with max safe integer', async () => {
    const result = await runCalculator('multiply', `${Number.MAX_SAFE_INTEGER}`, '2')
    expect(result).toBe('18014398509481982') // 2 * (2^53 - 1)
  })

  test('should handle multiplication with min safe integer', async () => {
    const result = await runCalculator('multiply', `${Number.MIN_SAFE_INTEGER}`, '2')
    expect(result).toBe('-18014398509481982') // 2 * -(2^53 - 1)
  })

  test('should handle multiplication resulting in zero', async () => {
    const result = await runCalculator('multiply', '12345', '0')
    expect(result).toBe('0')
  })

  test('should handle multiplication with very large and very small numbers resulting in very large number', async () => {
    const result = await runCalculator('multiply', '1e+100', '1e-100')
    expect(result).toBe('1')
  })

  test('should handle large numbers correctly', async () => {
    const result = await runCalculator('multiply', '1e+50', '1e+50')
    expect(result).toBe('10000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000')
  })

  test.skip('should handle multiplication with non-numeric characters', async () => {
    const result = await runCalculator('multiply', '10', 'b')
    expect(result).toContain('Error')
  })

  test.skip('should handle multiplication with special characters', async () => {
    const result = await runCalculator('multiply', '10', '!')
    expect(result).toContain('Error')
  })
})
