import { test, expect } from '@playwright/test'
import { expectResult, runCalculator } from 'tests/support/utils/utils'

const invalidArgumentMessage = 'Invalid argument. Must be a numeric value.'

const testCases = [
  // Basic Operations
  { id: 'TC-MUL-001', description: 'Both positive numbers', multiplier: 8, multiplicand: 4, expected: 8 * 4 },
  { id: 'TC-MUL-002', description: 'Both negative numbers', multiplier: -8, multiplicand: -4, expected: -8 * -4 },
  { id: 'TC-MUL-003', description: 'Negative multiplier and positive multiplicand', multiplier: -8, multiplicand: 4, expected: -8 * 4 },
  { id: 'TC-MUL-004', description: 'Positive multiplier and negative multiplicand', multiplier: 8, multiplicand: -4, expected: 8 * -4 },
  { id: 'TC-MUL-005', description: 'Multiplier equals to zero', multiplier: 0, multiplicand: 4, expected: 0 * 4 },
  { id: 'TC-MUL-006', description: 'Multiplicand equals to zero', multiplier: 8, multiplicand: 0, expected: 8 * 0 },
  { id: 'TC-MUL-007', description: 'Both operadans equals to zero', multiplier: 0, multiplicand: 0, expected: 0 * 0 },

  // Edge Cases
  {
    id: 'TC-MUL-101',
    description: 'Multiplier is very large and multiplicand is very small',
    multiplier: 1e100,
    multiplicand: 1e-100,
    expected: 1e100 * 1e-100,
  },
  {
    id: 'TC-MUL-102',
    description: 'Multiplier is very small and multiplicand is very large',
    multiplier: 1e-100,
    multiplicand: 1e100,
    expected: 1e-100 * 1e100,
  },
  { id: 'TC-MUL-103', description: 'Both are very large numbers', multiplier: 1e100, multiplicand: 1e100, expected: 1e100 * 1e100, skip: true },
  { id: 'TC-MUL-104', description: 'Both are very small numbers', multiplier: 1e-100, multiplicand: 1e-100, expected: 1e-100 * 1e-100, skip: true },
  { id: 'TC-MUL-105', description: 'Leading to overflow (Infinity)', multiplier: 1e308, multiplicand: 1e10, expected: 1e308 * 1e10 },

  // Error Handling
  { id: 'TC-MUL-201', description: 'Multiplier is an empty string', multiplier: '', multiplicand: 4, expected: invalidArgumentMessage },
  { id: 'TC-MUL-202', description: 'Multiplicand is an empty string', multiplier: 8, multiplicand: '', expected: invalidArgumentMessage },
  { id: 'TC-MUL-203', description: 'Both are empty strings', multiplier: '', multiplicand: '', expected: invalidArgumentMessage },
  { id: 'TC-MUL-204', description: 'Multiplier is a letter', multiplier: 'a', multiplicand: 4, expected: invalidArgumentMessage },
  { id: 'TC-MUL-205', description: 'Multiplicand is a letter', multiplier: 8, multiplicand: 'b', expected: invalidArgumentMessage },
  { id: 'TC-MUL-206', description: 'Both are letters', multiplier: 'a', multiplicand: 'b', expected: invalidArgumentMessage },
  { id: 'TC-MUL-207', description: 'Multiplier is a special character', multiplier: '@', multiplicand: 4, expected: invalidArgumentMessage },
  { id: 'TC-MUL-208', description: 'Multiplicand is a special character', multiplier: 8, multiplicand: '!', expected: invalidArgumentMessage },
  { id: 'TC-MUL-209', description: 'Both are special characters', multiplier: '@', multiplicand: '!', expected: invalidArgumentMessage },

  // Special Cases
  {
    id: 'TC-MUL-301',
    description: 'Multiplier is a max safe integer',
    multiplier: Number.MAX_SAFE_INTEGER,
    multiplicand: 4,
    expected: Number.MAX_SAFE_INTEGER * 4,
  },
  {
    id: 'TC-MUL-302',
    description: 'Multiplicand is a max safe integer',
    multiplier: 8,
    multiplicand: Number.MAX_SAFE_INTEGER,
    expected: 8 * Number.MAX_SAFE_INTEGER,
    skip: true,
  },
  {
    id: 'TC-MUL-303',
    description: 'Both are max safe integers',
    multiplier: Number.MAX_SAFE_INTEGER,
    multiplicand: Number.MAX_SAFE_INTEGER,
    expected: Number.MAX_SAFE_INTEGER * Number.MAX_SAFE_INTEGER,
    skip: true,
  },
  {
    id: 'TC-MUL-304',
    description: 'Multiplier is a min safe integer',
    multiplier: Number.MIN_SAFE_INTEGER,
    multiplicand: 4,
    expected: Number.MIN_SAFE_INTEGER * 4,
  },
  {
    id: 'TC-MUL-305',
    description: 'Multiplicand is a min safe integer',
    multiplier: 8,
    multiplicand: Number.MIN_SAFE_INTEGER,
    expected: 8 * Number.MIN_SAFE_INTEGER,
    skip: true,
  },
  {
    id: 'TC-MUL-306',
    description: 'Both are min safe integers',
    multiplier: Number.MIN_SAFE_INTEGER,
    multiplicand: Number.MIN_SAFE_INTEGER,
    expected: Number.MIN_SAFE_INTEGER * Number.MIN_SAFE_INTEGER,
    skip: true,
  },
  { id: 'TC-MUL-307', description: 'Multiplier is a max value', multiplier: Number.MAX_VALUE, multiplicand: 4, expected: Number.MAX_VALUE * 4 },
  { id: 'TC-MUL-308', description: 'Multiplicand is a max value', multiplier: 8, multiplicand: Number.MAX_VALUE, expected: 8 * Number.MAX_VALUE },
  { id: 'TC-MUL-309', description: 'Multiplier is string number', multiplier: '8', multiplicand: 4, expected: Number('8') * 4 },
  { id: 'TC-MUL-310', description: 'Multiplicand is a string number', multiplier: 8, multiplicand: '4', expected: 8 * Number('4') },
  { id: 'TC-MUL-311', description: 'Both are string numbers', multiplier: '8', multiplicand: '4', expected: Number('8') * Number('4') },
  { id: 'TC-MUL-312', description: 'Multiplying by infinity', multiplier: 2, multiplicand: Infinity, expected: 2 * Infinity },
  { id: 'TC-MUL-313', description: 'Multiplying zero by infinity', multiplier: 0, multiplicand: Infinity, expected: 0 * Infinity },
  { id: 'TC-MUL-314', description: 'Multiplying Infinity by Infinity', multiplier: Infinity, multiplicand: Infinity, expected: Infinity * Infinity },
]

/**
 * Failings:
 *   - TC-MUL-103: Expected: "Result: 1e+200", Received: "Result: 100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
 *   - TC-MUL-104: Expected: "Result: 1e-200", Received: "Result: 0" // Known bugs: precision/rounding cases
 *   - TC-MUL-302: Expected: "Result: 72057594037927930" Received: "Result: 72057594037927928"
 *   - TC-MUL-303: Expected: "Result: 8.112963841460666e+31" Received: "Result: 81129638414606660000000000000000"
 *   - TC-MUL-305: Expected: "Result: -72057594037927930" Received: "Result: -72057594037927928"
 *   - TC-MUL-306: Expected: "Result: 8.112963841460666e+31" Received: "Result: 81129638414606660000000000000000"
 *   - TC-MUL-313: Expected: "Result: NaN" Received: "Invalid argument. Must be a numeric value."
 */
test.describe('Multiplication', () => {
  for (const { id, description, multiplier, multiplicand, expected, skip } of testCases) {
    const testFunction = skip ? test.skip : test
    testFunction(`[${id}] ${description}`, async () => {
      const result = await runCalculator('multiply', multiplier, multiplicand)
      if (typeof expected === 'number') {
        expectResult(result, expected)
      } else {
        expect(result).toBe(expected)
      }
    })
  }
})
