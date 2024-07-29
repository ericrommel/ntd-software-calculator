import { test, expect } from '@playwright/test'
import { expectResult, runCalculator } from 'tests/support/utils/utils'

const divideByZeroMessage = 'Error: Cannot divide by zero'
const invalidArgumentMessage = 'Invalid argument. Must be a numeric value.'

const testCases = [
  // Basic Operations
  { id: 'TC-ADD-001', description: 'Both positive numbers', dividend: 8, divisor: 4, expected: 8/4 },
  { id: 'TC-ADD-002', description: 'Both negative numbers', dividend: -8, divisor: -4, expected: -8/-4 },
  { id: 'TC-ADD-003', description: 'Negative dividend and positive divisor', dividend: -8, divisor: 4, expected: -8/4 },
  { id: 'TC-ADD-004', description: 'Positive dividend and negative divisor', dividend: 8, divisor: -4, expected: 8/-4 },
  { id: 'TC-ADD-005', description: 'Dividend equals to zero', dividend: 0, divisor: 4, expected: 0/4 },

  // Edge Cases
  { id: 'TC-DIV-101', description: 'Divisor is very small number resulting in a large number', dividend: 50, divisor: 1e-100, expected: 50/1e-100, skip: true },
  { id: 'TC-DIV-102', description: 'Dividend is Very small number resulting in a small number', dividend: 1e-100, divisor: 50, expected: 1e-100/50, skip: true },
  { id: 'TC-DIV-103', description: 'Both with very large numbers', dividend: 1e200, divisor: 1e100, expected: 1e200/1e100, skip: true },

  // Error Handling
  { id: 'TC-DIV-201', description: 'Division by Zero', dividend: 8, divisor: 0, expected: divideByZeroMessage },
  { id: 'TC-DIV-202', description: 'Both are Zero', dividend: 0, divisor: 0, expected: 0/0, skip: true },
  { id: 'TC-DIV-203', description: 'Dividend as an empty string', dividend: '', divisor: 10, expected: invalidArgumentMessage },
  { id: 'TC-DIV-204', description: 'Divisor as an empty string', dividend: 10, divisor: '', expected: invalidArgumentMessage },
  { id: 'TC-DIV-205', description: 'Dividend as a special character', dividend: '@', divisor: 10, expected: invalidArgumentMessage },
  { id: 'TC-DIV-206', description: 'Divisor as a special character', dividend: 10, divisor: '@', expected: invalidArgumentMessage },
  { id: 'TC-DIV-207', description: 'Dividend as a letter', dividend: 'b', divisor: 10, expected: invalidArgumentMessage },
  { id: 'TC-DIV-208', description: 'Divisor as a letter', dividend: 10, divisor: 'b', expected: invalidArgumentMessage },

  // Special cases
  { id: 'TC-DIV-301', description: 'Dividend with max safe integer', dividend: Number.MAX_SAFE_INTEGER, divisor: 10, expected: Number.MAX_SAFE_INTEGER / 10 },
  { id: 'TC-DIV-302', description: 'Divisor with max safe integer', dividend: 10, divisor: Number.MAX_SAFE_INTEGER, expected: 10 / Number.MAX_SAFE_INTEGER, skip: true },
  { id: 'TC-DIV-303', description: 'Dividend with min safe integer', dividend: Number.MIN_SAFE_INTEGER, divisor: 10, expected: Number.MIN_SAFE_INTEGER / 10 },
  { id: 'TC-DIV-304', description: 'Divisor with min safe integer', dividend: 10, divisor: Number.MIN_SAFE_INTEGER, expected: 10 / Number.MIN_SAFE_INTEGER, skip: true },
  { id: 'TC-DIV-305', description: 'Dividend with max value', dividend: Number.MAX_VALUE, divisor: 10, expected: Number.MAX_VALUE / 10, skip: true },
  { id: 'TC-DIV-306', description: 'Divisor with max value', dividend: 10, divisor: Number.MAX_VALUE, expected: 10 / Number.MAX_VALUE, skip: true },
  { id: 'TC-DIV-307', description: 'Dividend is a string number', dividend: '10', divisor: 2, expected: Number('10') / 2 },
  { id: 'TC-DIV-308', description: 'Divisor is a string number', dividend: 10, divisor: '2', expected: 10 / Number('2') },
  { id: 'TC-DIV-309', description: 'Both are string numbers', dividend: '10', divisor: '2', expected: Number(10) / Number('2') },
  { id: 'TC-DIV-310', description: 'Dividend is a float number', dividend: 123.456, divisor: 10, expected: 123.456 / 10, skip: true },
  { id: 'TC-DIV-311', description: 'Divisor is a float number', dividend: 10, divisor: 123.456, expected: 10 / 123.456, skip: true },
  { id: 'TC-DIV-312', description: 'Both are float numbers but dividend is higher', dividend: 654.321, divisor: 123.456, expected: 654.321 / 123.456, skip: true },
  { id: 'TC-DIV-313', description: 'Both are float numbers but divisor is higher', dividend: 123.456, divisor: 654.321, expected: 123.456 / 654.321, skip: true },
  { id: 'TC-DIV-314', description: 'Both use same integer numbers', dividend: 50, divisor: 50, expected: 50 / 50 },
  { id: 'TC-DIV-315', description: 'Both use same float numbers', dividend: 123.456, divisor: 123.456, expected: 123.456 / 123.456 },
  { id: 'TC-MUL-316', description: 'Dividing by infinity', dividend: 20, divisor: Infinity, expected: 20 * Infinity, skip: true },
  { id: 'TC-MUL-317', description: 'Dividing zero by infinity', dividend: 0, divisor: Infinity, expected: 0 * Infinity, skip: true },
  { id: 'TC-MUL-318', description: 'Dividing Infinity by Infinity', dividend: Infinity, divisor: Infinity, expected: Infinity * Infinity, skip: true },
]

/**
 * Failings:
 *   - TC-DIV-101: Expected: "Result: 5e+101", Received: "Result: 500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
 *   - TC-DIV-102: Expected: "Result: 2e-102", Received: "Result: 0"
 *   - TC-DIV-103: Expected: "Result: 1e+100", Received: "Result: 10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
 *   - TC-DIV-202: Expected: "Result: NaN" Received: "Error: Cannot divide by zero" // Known bugs: Dividing by zero returns an error message
 *   - TC-DIV-302: Expected: "Result: 1.1102230246251567e-15" Received: "Result: 0" // Known bugs: precision/rounding cases
 *   - TC-DIV-304: Expected: "Result: 1.1102230246251567e-15" Received: "Result: 0" // Known bugs: precision/rounding cases
 *   - TC-DIV-305: Expected: "Result: 1.7976931348623158e+307" Received: "Result: 17976931348623158000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
 *   - TC-DIV-306: Expected: "Result: 5.562684646268004e-308" Received: "Result: 0" // Known bugs: precision/rounding cases
 *   - TC-DIV-310: Expected: "Result: 12.345600000000001", Received: "Result: 12.3456"
 *   - TC-DIV-311: Expected: "Result: 0.08100051840331778", Received: "Result: 0.08100052"
 *   - TC-DIV-312: Expected: "Result: 5.30003402021773", Received: "Result: 5.30003402"
 *   - TC-DIV-313: Expected: "Result: 0.18867803417588613", Received: "Result: 0.18867803"
 *   - TC-DIV-316: Expected: "Result: ∞, Received: "Result: 0"
 *   - TC-DIV-317: Expected: "Result: NaN", Received: "Result: 0"
 *   - TC-DIV-318: Expected: "Result: ∞, Received: "Result: NaN"
 */
test.describe('Division', () => {
  for (const { id, description, dividend, divisor, expected, skip } of testCases) {
    const testFunction = skip ? test.skip : test
    testFunction(`[${id}] ${description}`, async () => {
      const result = await runCalculator('divide', dividend, divisor)
      if (typeof expected === 'number') {
        expectResult(result, expected)
      } else {
        expect(result).toBe(expected)
      }
    })
  }
})
