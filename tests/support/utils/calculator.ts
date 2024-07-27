import { exec as execCb } from 'child_process'
import { promisify } from 'util'

const exec = promisify(execCb)

/**
 * Runs a calculator command using Docker.
 * @param operation - The calculator operation (add, subtract, multiply, divide).
 * @param args - The arguments for the operation.
 * @returns The result of the operation.
 */
export async function runCalculator(operation: string, ...args: string[]): Promise<string> {
  const command = `docker run --rm public.ecr.aws/l4q9w4c5/loanpro-calculator-cli ${operation} ${args.join(' ')}`
  try {
    const { stdout } = await exec(command)
    return stdout.replace(/^Result: /, '').trim()
  } catch (error: any) {
    throw new Error(`Command failed: ${command}\n${error.message}`)
  }
}
