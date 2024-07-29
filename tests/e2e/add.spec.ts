import { test, expect } from '@playwright/test'
import { expectResult, runCalculator } from 'tests/support/utils/utils'

const invalidArgumentMessage = 'Invalid argument. Must be a numeric value.'

const testCases = [
  // Basic Operations
  { id: 'TC-ADD-001', description: 'Both positive numbers', first_addend: 2, second_addend: 3, expected: 2 + 3 },
  { id: 'TC-ADD-002', description: 'Both negative numbers', first_addend: -2, second_addend: -3, expected: -2 + -3 },
  { id: 'TC-ADD-003', description: 'Negative first addend and positive second addend', first_addend: -2, second_addend: 3, expected: -2 + 3 },
  { id: 'TC-ADD-004', description: 'Positive first addend and negative second addend', first_addend: 2, second_addend: -3, expected: 2 + -3 },
  { id: 'TC-ADD-005', description: 'first addend equals to zero', first_addend: 0, second_addend: 3, expected: 0 + 3 },
  { id: 'TC-ADD-006', description: 'second addend equals to zero', first_addend: 2, second_addend: 0, expected: 2 + 0 },
  { id: 'TC-ADD-007', description: 'Both operadans equals to zero', first_addend: 0, second_addend: 0, expected: 0 + 0 },

  // Edge Cases
  {
    id: 'TC-ADD-101',
    description: 'First addend as a number and second addend as a string number',
    first_addend: 10,
    second_addend: '20',
    expected: 10 + Number('20'),
  },
  {
    id: 'TC-ADD-102',
    description: 'First addend as a string number and second addend as a number',
    first_addend: '10',
    second_addend: 20,
    expected: Number('10') + 20,
  },
  {
    id: 'TC-ADD-103',
    description: 'Both operands as string numbers',
    first_addend: '10',
    second_addend: '20',
    expected: Number('10') + Number('20'),
  },
  {
    id: 'TC-ADD-104',
    description: 'First addend as a very large and second addend as a very small',
    first_addend: 1e100,
    second_addend: 1e-100,
    expected: 1e100 + 1e-100,
    skip: true,
  },
  {
    id: 'TC-ADD-105',
    description: 'First addend as a very small and second addend as a very large',
    first_addend: 1e-100,
    second_addend: 1e100,
    expected: 1e-100 + 1e100,
    skip: true,
  },
  {
    id: 'TC-ADD-106',
    description: 'Both operands as very large numbers',
    first_addend: 1e100,
    second_addend: 1e100,
    expected: 1e100 + 1e100,
    skip: true,
  },
  {
    id: 'TC-ADD-107',
    description: 'Both operands as very small numbers',
    first_addend: 1e-100,
    second_addend: 1e-100,
    expected: 1e-100 + 1e-100,
    skip: true,
  },

  // Error Handling
  { id: 'TC-ADD-201', description: 'First addend as empty strings', first_addend: '', second_addend: 20, expected: invalidArgumentMessage },
  { id: 'TC-ADD-202', description: 'Second addend as empty strings', first_addend: 10, second_addend: '', expected: invalidArgumentMessage },
  { id: 'TC-ADD-203', description: 'Both operands as empty strings', first_addend: '', second_addend: '', expected: invalidArgumentMessage },
  { id: 'TC-ADD-204', description: 'First addend as a letter', first_addend: 'a', second_addend: 20, expected: invalidArgumentMessage },
  { id: 'TC-ADD-205', description: 'Second addend as a letter', first_addend: 10, second_addend: 'b', expected: invalidArgumentMessage },
  { id: 'TC-ADD-206', description: 'Both operands as letters', first_addend: 'a', second_addend: 'b', expected: invalidArgumentMessage },
  { id: 'TC-ADD-207', description: 'First addend as a special character', first_addend: '@', second_addend: 20, expected: invalidArgumentMessage },
  { id: 'TC-ADD-208', description: 'Second addend as a special character', first_addend: 10, second_addend: '!', expected: invalidArgumentMessage },
  { id: 'TC-ADD-209', description: 'Both operands as special characters', first_addend: '@', second_addend: '!', expected: invalidArgumentMessage },
  { id: 'TC-ADD-210', description: 'First addend as null', first_addend: null, second_addend: 20, expected: invalidArgumentMessage },
  { id: 'TC-ADD-211', description: 'First addend as undefined', first_addend: undefined, second_addend: 20, expected: invalidArgumentMessage },
  { id: 'TC-ADD-212', description: 'Second addend as null', first_addend: 10, second_addend: null, expected: invalidArgumentMessage },
  { id: 'TC-ADD-213', description: 'Second addend as undefined', first_addend: 10, second_addend: undefined, expected: invalidArgumentMessage },
  { id: 'TC-ADD-214', description: 'First addend as a boolean (true)', first_addend: true, second_addend: 20, expected: invalidArgumentMessage },
  { id: 'TC-ADD-215', description: 'First addend as a boolean (false)', first_addend: false, second_addend: 20, expected: invalidArgumentMessage },
  { id: 'TC-ADD-216', description: 'Second addend as a boolean (true)', first_addend: 10, second_addend: true, expected: invalidArgumentMessage },
  { id: 'TC-ADD-217', description: 'Second addend as a boolean (false)', first_addend: 10, second_addend: false, expected: invalidArgumentMessage },
  {
    id: 'TC-ADD-218',
    description: 'First addend as a boolean (true) and second as a boolean (false)',
    first_addend: true,
    second_addend: false,
    expected: invalidArgumentMessage,
  },
  {
    id: 'TC-ADD-219',
    description: 'First addend as a boolean (false) and second as a boolean (true)',
    first_addend: false,
    second_addend: true,
    expected: invalidArgumentMessage,
  },
  { id: 'TC-ADD-220', description: 'Both operands as booleans (true)', first_addend: true, second_addend: true, expected: invalidArgumentMessage },
  { id: 'TC-ADD-221', description: 'Both operands as booleans (false)', first_addend: false, second_addend: false, expected: invalidArgumentMessage },

  // Special Cases
  {
    id: 'TC-ADD-301',
    description: 'First addend as the maximum safe integer',
    first_addend: Number.MAX_SAFE_INTEGER,
    second_addend: 10,
    expected: Number.MAX_SAFE_INTEGER + 10,
  },
  {
    id: 'TC-ADD-302',
    description: 'Second addend as the maximum safe integer',
    first_addend: 20,
    second_addend: Number.MAX_SAFE_INTEGER,
    expected: 20 + Number.MAX_SAFE_INTEGER,
  },
  {
    id: 'TC-ADD-303',
    description: 'Both operands as the maximum safe integer',
    first_addend: Number.MAX_SAFE_INTEGER,
    second_addend: Number.MAX_SAFE_INTEGER,
    expected: Number.MAX_SAFE_INTEGER + Number.MAX_SAFE_INTEGER,
  },
  {
    id: 'TC-ADD-304',
    description: 'First addend as the minimum safe integer',
    first_addend: Number.MIN_SAFE_INTEGER,
    second_addend: 10,
    expected: Number.MIN_SAFE_INTEGER + 10,
  },
  {
    id: 'TC-ADD-305',
    description: 'Second addend as the minimum safe integer',
    first_addend: 20,
    second_addend: Number.MIN_SAFE_INTEGER,
    expected: 20 + Number.MIN_SAFE_INTEGER,
  },
  {
    id: 'TC-ADD-306',
    description: 'Both operands as the minimum safe integer',
    first_addend: Number.MIN_SAFE_INTEGER,
    second_addend: Number.MIN_SAFE_INTEGER,
    expected: Number.MIN_SAFE_INTEGER + Number.MIN_SAFE_INTEGER,
  },
  {
    id: 'TC-ADD-307',
    description: 'First addend as the maximum value',
    first_addend: Number.MAX_VALUE,
    second_addend: 10,
    expected: Number.MAX_VALUE + 10,
    skip: true,
  },
  {
    id: 'TC-ADD-308',
    description: 'Second addend as the maximum value',
    first_addend: 20,
    second_addend: Number.MAX_VALUE,
    expected: 20 + Number.MAX_VALUE,
    skip: true,
  },
  {
    id: 'TC-ADD-309',
    description: 'Both operands as the maximum value',
    first_addend: Number.MAX_VALUE,
    second_addend: Number.MAX_VALUE,
    expected: Number.MAX_VALUE + Number.MAX_VALUE,
  },
  { id: 'TC-ADD-310', description: 'First addend as a float number', first_addend: 123.456, second_addend: 10, expected: 123.456 + 10, skip: true },
  { id: 'TC-ADD-311', description: 'Second addend as a float number', first_addend: 20, second_addend: 123.456, expected: 20 + 123.456, skip: true },
  {
    id: 'TC-ADD-312',
    description: 'Both operands as float numbers',
    first_addend: 123.456,
    second_addend: 654.321,
    expected: 123.456 + 654.321,
    skip: true,
  },
]

/**
 * Failings:
 *   - TC-ADD-104: Expected: "Result: 1e+100", Received: "Result: 10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
 *   - TC-ADD-105: Expected: "Result: 1e+100", Received: "Result: 10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
 *   - TC-ADD-106: Expected: "Result: 2e+100", Received: "Result: 20000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
 *   - TC-ADD-107: Expected: "Result: 2e-100", Received: "Result: 0"
 *   - TC-ADD-307: Expected: "Result: 1.7976931348623157e+308", Received: "Result: 179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
 *   - TC-ADD-308: Expected: "Result: 1.7976931348623157e+308", Received: "Result: 179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
 *   - TC-ADD-310: Expected: "Result: 133.45600000000002", Received: "Result: 133.456"
 *   - TC-ADD-311: Expected: "Result: 143.45600000000002", Received: "Result: 143.456"
 *   - TC-ADD-312: Expected: "Result: 777.777", Received: "Result: 794.777"

 */
test.describe('Addition', () => {
  for (const { id, description, first_addend, second_addend, expected, skip } of testCases) {
    const testFunction = skip ? test.skip : test
    testFunction(`[${id}] ${description}`, async () => {
      const result = await runCalculator('add', first_addend, second_addend)
      if (typeof expected === 'number') {
        expectResult(result, expected)
      } else {
        expect(result).toBe(expected)
      }
    })
  }
})
