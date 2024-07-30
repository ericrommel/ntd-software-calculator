# Test Plan Document

## Execution Plan

1. **Setup:**
   - Ensure Docker is installed and configured.
   - Pull the Docker image and run the container as specified in the instructions.

2. **Execution:**
   - Execute the test cases as listed.
   - Document the outcomes of each test case including pass/fail status.

3. **Reporting:**
   - Provide a detailed report of test results and findings.
   - Include steps to reproduce any bugs and potential hints about their causes.

## Reporting and Documentation

- **Documentation:** Prepare a report summarizing the test cases executed, results, and any issues encountered.
- **Bugs:** Detail each bug found with reproduction steps and potential causes.
- **Automation Code:** If applicable, include the source code and instructions for any automation tools or scripts used.

## Review and Approval

- **Review:** All test results and documentation will be reviewed by the QA Lead for accuracy before final submission.

## Dependencies

- **Docker:** Ensure Docker environment is properly set up and running.
- **Tool Access:** Ensure access to any automation tools or test frameworks used.

## Exit Criteria

- All planned test cases are executed.
- Results are documented and reviewed.
- All known issues are documented and communicated.

## Test Scenarios

### Scenario 1: Basic Arithmetic Operations

**Objective:** Verify that the calculator performs addition, subtraction, multiplication, and division accurately with various input combinations.

- **Test Cases:**
  - **Addition (Basic Operations)**
    - `TC-ADD-001`: Both positive numbers
    - `TC-ADD-002`: Both negative numbers
    - `TC-ADD-003`: Negative first addend and positive second addend
    - `TC-ADD-004`: Positive first addend and negative second addend
    - `TC-ADD-005`: First addend equals to zero
    - `TC-ADD-006`: Second addend equals to zero
    - `TC-ADD-007`: Both addends equal to zero

  - **Subtraction (Basic Operations)**
    - `TC-SUB-001`: Both positive numbers
    - `TC-SUB-002`: Both negative numbers
    - `TC-SUB-003`: Negative minuend and positive subtrahend
    - `TC-SUB-004`: Positive minuend and negative subtrahend
    - `TC-SUB-005`: Minuend equals to zero
    - `TC-SUB-006`: Subtrahend equals to zero
    - `TC-SUB-007`: Both minuend and subtrahend equal to zero

  - **Multiplication (Basic Operations)**
    - `TC-MUL-001`: Both positive numbers
    - `TC-MUL-002`: Both negative numbers
    - `TC-MUL-003`: Negative multiplier and positive multiplicand
    - `TC-MUL-004`: Positive multiplier and negative multiplicand
    - `TC-MUL-005`: Multiplier equals to zero
    - `TC-MUL-006`: Multiplicand equals to zero
    - `TC-MUL-007`: Both multiplier and multiplicand equal to zero

  - **Division (Basic Operations)**
    - `TC-DIV-001`: Both positive numbers
    - `TC-DIV-002`: Both negative numbers
    - `TC-DIV-003`: Negative dividend and positive divisor
    - `TC-DIV-004`: Positive dividend and negative divisor
    - `TC-DIV-005`: Dividend equals to zero

### Scenario 2: Edge Cases and Special Values

**Objective:** Test the calculator with edge cases and special values to ensure robust handling of extreme conditions.

- **Test Cases:**
  - **Addition (Edge Cases)**
    - `TC-ADD-101`: First addend as a number and second addend as a string number
    - `TC-ADD-102`: First addend as a string number and second addend as a number
    - `TC-ADD-103`: Both addends as string numbers
    - `TC-ADD-104`: First addend as a very large and second addend as a very small
    - `TC-ADD-105`: First addend as a very small and second addend as a very large
    - `TC-ADD-106`: Both addends as very large numbers
    - `TC-ADD-107`: Both addends as very small numbers

  - **Subtraction (Edge Cases)**
    - `TC-SUB-101`: Minuend as a number and subtrahend as a string number
    - `TC-SUB-102`: Minuend as a string number and subtrahend as a number
    - `TC-SUB-103`: Both minuend and subtrahend as string numbers
    - `TC-SUB-104`: Minuend as a very large and subtrahend as a very small
    - `TC-SUB-105`: Minuend as a very small and subtrahend as a very large
    - `TC-SUB-106`: Both minuend and subtrahend as very large numbers
    - `TC-SUB-107`: Both minuend and subtrahend as very small numbers

  - **Multiplication (Edge Cases)**
    - `TC-MUL-101`: Multiplier as a very large and multiplicand as a very small
    - `TC-MUL-102`: Multiplier as a very small and multiplicand as a very large
    - `TC-MUL-103`: Both multiplier and multiplicand as very large numbers
    - `TC-MUL-104`: Both multiplier and multiplicand as very small numbers

  - **Division (Edge Cases)**
    - `TC-DIV-101`: Divisor is very small resulting in a large number
    - `TC-DIV-102`: Dividend is very small resulting in a small number
    - `TC-DIV-103`: Both dividend and divisor as very large numbers

### Scenario 3: Error Handling

**Objective:** Ensure the calculator handles various invalid inputs and error conditions appropriately.

- **Test Cases:**
  - **Addition (Error Handling)**
    - `TC-ADD-201`: First addend as empty strings
    - `TC-ADD-202`: Second addend as empty strings
    - `TC-ADD-203`: Both addends as empty strings
    - `TC-ADD-204`: First addend as a letter
    - `TC-ADD-205`: Second addend as a letter
    - `TC-ADD-206`: Both addends as letters
    - `TC-ADD-207`: First addend as a special character
    - `TC-ADD-208`: Second addend as a special character
    - `TC-ADD-209`: Both addends as special characters
    - `TC-ADD-210`: First addend as null
    - `TC-ADD-211`: First addend as undefined
    - `TC-ADD-212`: Second addend as null
    - `TC-ADD-213`: Second addend as undefined
    - `TC-ADD-214`: First addend as a boolean (true)
    - `TC-ADD-215`: First addend as a boolean (false)
    - `TC-ADD-216`: Second addend as a boolean (true)
    - `TC-ADD-217`: Second addend as a boolean (false)
    - `TC-ADD-218`: First addend as a boolean (true) and second as a boolean (false)
    - `TC-ADD-219`: First addend as a boolean (false) and second as a boolean (true)
    - `TC-ADD-220`: Both addends as booleans (true)
    - `TC-ADD-221`: Both addends as booleans (false)

  - **Subtraction (Error Handling)**
    - `TC-SUB-201`: Minuend as empty strings
    - `TC-SUB-202`: Subtrahend as empty strings
    - `TC-SUB-203`: Both minuend and subtrahend as empty strings
    - `TC-SUB-204`: Minuend as a letter
    - `TC-SUB-205`: Subtrahend as a letter
    - `TC-SUB-206`: Both minuend and subtrahend as letters
    - `TC-SUB-207`: Minuend as a special character
    - `TC-SUB-208`: Subtrahend as a special character
    - `TC-SUB-209`: Both minuend and subtrahend as special characters
    - `TC-SUB-210`: Minuend as null
    - `TC-SUB-211`: Minuend as undefined
    - `TC-SUB-212`: Subtrahend as null
    - `TC-SUB-213`: Subtrahend as undefined
    - `TC-SUB-214`: Minuend as a boolean (true)
    - `TC-SUB-215`: Minuend as a boolean (false)
    - `TC-SUB-216`: Subtrahend as a boolean (true)
    - `TC-SUB-217`: Subtrahend as a boolean (false)
    - `TC-SUB-218`: Minuend as a boolean (true) and second as a boolean (false)
    - `TC-SUB-219`: Minuend as a boolean (false) and second as a boolean (true)
    - `TC-SUB-220`: Both minuend and subtrahend as booleans (true)
    - `TC-SUB-221`: Both minuend and subtrahend as booleans (false)

  - **Multiplication (Error Handling)**
    - `TC-MUL-201`: Multiplier as empty strings
    - `TC-MUL-202`: Multiplicand as empty strings
    - `TC-MUL-203`: Both multiplier and multiplicand as empty strings
    - `TC-MUL-204`: Multiplier as a letter
    - `TC-MUL-205`: Multiplicand as a letter
    - `TC-MUL-206`: Both multiplier and multiplicand as letters
    - `TC-MUL-207`: Multiplier as a special character
    - `TC-MUL-208`: Multiplicand as a special character
    - `TC-MUL-209`: Both multiplier and multiplicand as special characters

  - **Division (Error Handling)**
    - `TC-DIV-201`: Dividend as empty strings
    - `TC-DIV-202`: Divisor as empty strings
    - `TC-DIV-203`: Both dividend and divisor as empty strings
    - `TC-DIV-204`: Dividend as a letter
    - `TC-DIV-205`: Divisor as a letter
    - `TC-DIV-206`: Both dividend and divisor as letters
    - `TC-DIV-207`: Dividend as a special character
    - `TC-DIV-208`: Divisor as a special character
    - `TC-DIV-209`: Both dividend and divisor as special characters
    - `TC-DIV-210`: Division by zero

### Scenario 4: Special Values

**Objective:** Verify that special values such as infinity, negative infinity, and NaN are handled correctly.

- **Test Cases:**
  - **Addition (Special Values)**
    - `TC-ADD-301`: Adding positive infinity to a number
    - `TC-ADD-302`: Adding negative infinity to a number
    - `TC-ADD-303`: Adding a number to NaN
    - `TC-ADD-304`: Adding NaN to a number
    - `TC-ADD-305`: Adding NaN to NaN

  - **Subtraction (Special Values)**
    - `TC-SUB-301`: Subtracting positive infinity from a number
    - `TC-SUB-302`: Subtracting negative infinity from a number
    - `TC-SUB-303`: Subtracting NaN from a number
    - `TC-SUB-304`: Subtracting a number from NaN
    - `TC-SUB-305`: Subtracting NaN from NaN

  - **Multiplication (Special Values)**
    - `TC-MUL-301`: Multiplying a number by positive infinity
    - `TC-MUL-302`: Multiplying a number by negative infinity
    - `TC-MUL-303`: Multiplying a number by NaN
    - `TC-MUL-304`: Multiplying NaN by a number
    - `TC-MUL-305`: Multiplying NaN by NaN

  - **Division (Special Values)**
    - `TC-DIV-301`: Dividing a number by positive infinity
    - `TC-DIV-302`: Dividing a number by negative infinity
    - `TC-DIV-303`: Dividing a number by NaN
    - `TC-DIV-304`: Dividing NaN by a number
    - `TC-DIV-305`: Dividing NaN by NaN
