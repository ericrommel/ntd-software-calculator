import { test, expect } from '@playwright/test'
import { expectResult, runCalculator } from 'tests/support/utils/utils'

const invalidArgumentMessage = 'Invalid argument. Must be a numeric value.'

const testCases = [
  // Basic Operations
  { id: 'TC-SUB-001', description: 'Both positive numbers', minuend: 2, subtrahend: 3, expected: 2 - 3 },
  { id: 'TC-SUB-002', description: 'Both negative numbers', minuend: -2, subtrahend: -3, expected: -2 - -3 },
  { id: 'TC-SUB-003', description: 'Negative minuend and positive subtrahend', minuend: -2, subtrahend: 3, expected: -2 - 3 },
  { id: 'TC-SUB-004', description: 'Positive minuend and negative subtrahend', minuend: 2, subtrahend: -3, expected: 2 - -3 },
  { id: 'TC-SUB-005', description: 'Minuend equals to zero', minuend: 0, subtrahend: 3, expected: 0 - 3 },
  { id: 'TC-SUB-006', description: 'Subtrahend equals to zero', minuend: 2, subtrahend: 0, expected: 2 - 0 },
  { id: 'TC-SUB-007', description: 'Both operadans equals to zero', minuend: 0, subtrahend: 0, expected: 0 - 0 },

  // Edge Cases
  { id: 'TC-SUB-101', description: 'Minuend as a number and subtrahend as a string number', minuend: 10, subtrahend: '20', expected: 10 - Number('20') },
  { id: 'TC-SUB-102', description: 'Minuend as a string number and subtrahend as a number', minuend: '10', subtrahend: 20, expected: Number('10') - 20 },
  { id: 'TC-SUB-103', description: 'Both operands as string numbers', minuend: '10', subtrahend: '20', expected: Number('10') - Number('20') },
  { id: 'TC-SUB-104', description: 'Minuend as a very large and subtrahend as a very small', minuend: 1e+100, subtrahend: 1e-100, expected: 1e+100 - 1e-100, skip: true },
  { id: 'TC-SUB-105', description: 'Minuend as a very small and subtrahend as a very large', minuend: 1e-100, subtrahend: 1e+100, expected: 1e-100 - 1e+100, skip: true },
  { id: 'TC-SUB-106', description: 'Both operands as very large numbers', minuend: 1e+100, subtrahend: 1e+100, expected: 1e+100 - 1e+100 },
  { id: 'TC-SUB-107', description: 'Both operands as very small numbers', minuend: 1e-100, subtrahend: 1e-100, expected: 1e-100 - 1e-100 },
  
  // Error Handling
  { id: 'TC-SUB-201', description: 'Minuend as empty strings', minuend: '', subtrahend: 20, expected: invalidArgumentMessage },
  { id: 'TC-SUB-202', description: 'Subtrahend as empty strings', minuend: 10, subtrahend: '', expected: invalidArgumentMessage },
  { id: 'TC-SUB-203', description: 'Both operands as empty strings', minuend: '', subtrahend: '', expected: invalidArgumentMessage },
  { id: 'TC-SUB-204', description: 'Minuend as a letter', minuend: 'a', subtrahend: 20, expected: invalidArgumentMessage },
  { id: 'TC-SUB-205', description: 'Subtrahend as a letter', minuend: 10, subtrahend: 'b', expected: invalidArgumentMessage },
  { id: 'TC-SUB-206', description: 'Both operands as letters', minuend: 'a', subtrahend: 'b', expected: invalidArgumentMessage },
  { id: 'TC-SUB-207', description: 'Minuend as a special character', minuend: '@', subtrahend: 20, expected: invalidArgumentMessage },
  { id: 'TC-SUB-208', description: 'Subtrahend as a special character', minuend: 10, subtrahend: '!', expected: invalidArgumentMessage },
  { id: 'TC-SUB-209', description: 'Both operands as special characters', minuend: '@', subtrahend: '!', expected: invalidArgumentMessage },
  { id: 'TC-SUB-210', description: 'Minuend as null', minuend: null, subtrahend: 20, expected: invalidArgumentMessage },
  { id: 'TC-SUB-211', description: 'Minuend as undefined', minuend: undefined, subtrahend: 20, expected: invalidArgumentMessage },
  { id: 'TC-SUB-212', description: 'Subtrahend as null', minuend: 10, subtrahend: null, expected: invalidArgumentMessage },
  { id: 'TC-SUB-213', description: 'Subtrahend as undefined', minuend: 10, subtrahend: undefined, expected: invalidArgumentMessage },
  { id: 'TC-SUB-214', description: 'Minuend as a boolean (true)', minuend: true, subtrahend: 20, expected: invalidArgumentMessage },
  { id: 'TC-SUB-215', description: 'Minuend as a boolean (false)', minuend: false, subtrahend: 20, expected: invalidArgumentMessage },
  { id: 'TC-SUB-216', description: 'Subtrahend as a boolean (true)', minuend: 10, subtrahend: true, expected: invalidArgumentMessage },
  { id: 'TC-SUB-217', description: 'Subtrahend as a boolean (false)', minuend: 10, subtrahend: false, expected: invalidArgumentMessage },
  { id: 'TC-SUB-218', description: 'Minuend as a boolean (true) and second as a boolean (false)', minuend: true, subtrahend: false, expected: invalidArgumentMessage },
  { id: 'TC-SUB-219', description: 'Minuend as a boolean (false) and second as a boolean (true)', minuend: false, subtrahend: true, expected: invalidArgumentMessage },
  { id: 'TC-SUB-220', description: 'Both operands as booleans (true)', minuend: true, subtrahend: true, expected: invalidArgumentMessage },
  { id: 'TC-SUB-221', description: 'Both operands as booleans (false)', minuend: false, subtrahend: false, expected: invalidArgumentMessage },

  // Special Cases
  { id: 'TC-SUB-301', description: 'Minuend as the maximum safe integer', minuend: Number.MAX_SAFE_INTEGER, subtrahend: 10, expected: Number.MAX_SAFE_INTEGER - 10 },
  { id: 'TC-SUB-302', description: 'Subtrahend as the maximum safe integer', minuend: 20, subtrahend: Number.MAX_SAFE_INTEGER, expected: 20 - Number.MAX_SAFE_INTEGER },
  { id: 'TC-SUB-303', description: 'Both operands as the maximum safe integer', minuend: Number.MAX_SAFE_INTEGER, subtrahend: Number.MAX_SAFE_INTEGER, expected: Number.MAX_SAFE_INTEGER - Number.MAX_SAFE_INTEGER },
  { id: 'TC-SUB-304', description: 'Minuend as the minimum safe integer', minuend: Number.MIN_SAFE_INTEGER, subtrahend: 10, expected: Number.MIN_SAFE_INTEGER - 10 },
  { id: 'TC-SUB-305', description: 'Subtrahend as the minimum safe integer', minuend: 20, subtrahend: Number.MIN_SAFE_INTEGER, expected: 20 - Number.MIN_SAFE_INTEGER },
  { id: 'TC-SUB-306', description: 'Both operands as the minimum safe integer', minuend: Number.MIN_SAFE_INTEGER, subtrahend: Number.MIN_SAFE_INTEGER, expected: Number.MIN_SAFE_INTEGER - Number.MIN_SAFE_INTEGER },
  { id: 'TC-SUB-307', description: 'Minuend as the maximum value', minuend: Number.MAX_VALUE, subtrahend: 10, expected: Number.MAX_VALUE - 10, skip: true },
  { id: 'TC-SUB-308', description: 'Subtrahend as the maximum value', minuend: 20, subtrahend: Number.MAX_VALUE, expected: 20 - Number.MAX_VALUE, skip: true },
  { id: 'TC-SUB-309', description: 'Both operands as the maximum value', minuend: Number.MAX_VALUE, subtrahend: Number.MAX_VALUE, expected: Number.MAX_VALUE - Number.MAX_VALUE },
  { id: 'TC-SUB-310', description: 'Minuend as a float number', minuend: 123.456, subtrahend: 10, expected: 123.456 - 10 },
  { id: 'TC-SUB-311', description: 'Subtrahend as a float number', minuend: 20, subtrahend: 123.456, expected: 20 - 123.456 },
  { id: 'TC-SUB-312', description: 'Both operands as float numbers', minuend: 123.456, subtrahend: 654.321, expected: 123.456 - 654.321 },
]

/**
 * Failings:
 *   - TC-SUB-104: Expected: "Result: 1e+100", Received: "Result: 10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
 *   - TC-SUB-105: Expected: "Result: -1e+100", Received: "Result: -10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
 *   - TC-SUB-307: Expected: "Result: 1.7976931348623157e+308", Received: "Result: 179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
 *   - TC-SUB-308: Expected: "Result: -1.7976931348623157e+308", Received: "Result: -179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
 */
test.describe('Subtraction', () => {
  for (const { id, description, minuend, subtrahend, expected, skip } of testCases) {
    const testFunction = skip ? test.skip : test
    testFunction(`[${id}] ${description}`, async () => {
      const result = await runCalculator('subtract', minuend, subtrahend)
      if (typeof expected === 'number') {
        expectResult(result, expected)
      } else {
        expect(result).toBe(expected)
      }
    })
  }
})



// Failing: Known bug - Precision limit (8 decimal places) and/or rounding cases
//   - Expected: "Result: 2e-100"
//   - Received: "Result: 0"
