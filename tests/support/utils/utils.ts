import { expect } from '@playwright/test'
import { spawn } from 'child_process'

/**
 * Runs a calculator command using Docker.
 * @param operation - The calculator operation (add, subtract, multiply, divide).
 * @param args - The arguments for the operation.
 * @returns The result of the operation.
 */
export async function runCalculator(operation: string, ...args: any[]): Promise<string> {
  return new Promise((resolve, reject) => {
    const command = `public.ecr.aws/l4q9w4c5/loanpro-calculator-cli`
    const params = [operation, ...args]
    const docker = spawn('docker', ['run', '--rm', command, ...params])

    let result = ''

    docker.stdout.on('data', (data) => {
      result += data
    })

    docker.stderr.on('data', (data) => {
      result += data.toString()
    })

    docker.on('close', (code) => {
      resolve(result.trim())
    })

    docker.on('error', (err) => {
      reject(err)
    })
  })
}

/**
 * Utility function to check the result of a calculator operation.
 * @param actualResult - The actual result from the calculator.
 * @param expectedResult - The expected numerical result.
 */
export function expectResult(actualResult: any, expectedResult: any) {
  if (expectedResult === Infinity) {
    expect(actualResult).toMatch(/^(Result: )?(Infinity|∞)$/)
  } else {
    expect(actualResult).toBe(`Result: ${expectedResult}`)
  }
}
