## ISSUE-001: Addition with Very Large Numbers

- **Description:** The calculator is not handling very large numbers correctly, resulting in results displayed in standard notation rather than scientific notation.
- **Type:** Bug
- **Severity:** Major
- **Steps to Reproduce:**
  1. Use the calculator to add very large numbers.
  2. Observe the result.
- **Actual Result:** The result is displayed in standard notation instead of scientific notation (e.g., `1e+100` is displayed as a large number with many zeros).
- **Expected Result:** The result should be displayed in scientific notation as per project documentation (e.g., `1e+100`).
- **Affected Test Cases:** TC-ADD-104, TC-ADD-105, TC-ADD-106, TC-ADD-307, TC-ADD-308
- **Root Cause:** Inadequate handling of scientific notation for very large numbers.
- **Possible Solution:** Update the display logic to handle and format scientific notation correctly.
- **Workaround:** None, requires a fix.
- **Known Issue?:** No.


## ISSUE-002: Addition with Very Small Numbers

- **Description:** The calculator is not handling very small numbers correctly, resulting in results displayed as zero instead of in scientific notation.
- **Type:** Bug
- **Severity:** Minor
- **Steps to Reproduce:**
  1. Use the calculator to add very small numbers.
  2. Observe the result.
- **Actual Result:** The result is displayed as zero instead of scientific notation (e.g., `2e-100` is displayed as `0`).
- **Expected Result:** The result should be displayed in scientific notation as per project documentation (e.g., `2e-100`).
- **Affected Test Cases:** TC-ADD-107
- **Root Cause:** Inadequate handling of scientific notation for very small numbers.
- **Possible Solution:** Update the display logic to handle and format scientific notation correctly.
- **Workaround:** None, requires a fix.
- **Known Issue?:** Yes. This is a rounding issue and was referred by the project documentation.


## ISSUE-003: Addition Result Mismatch

- **Description:** The calculator is returning incorrect results for certain additions.
- **Type:** Bug
- **Severity:** Critical
- **Steps to Reproduce:**
  1. Use the calculator to add specific numbers that result in known issues.
  2. Observe the result.
- **Actual Result:** The result is incorrect (e.g., `777.777` is returned as `794.777`).
- **Expected Result:** The result should match the expected value (e.g., `777.777`).
- **Affected Test Cases:** TC-ADD-312
- **Root Cause:** Error in addition logic.
- **Possible Solution:** Review and correct the addition algorithm.
- **Workaround:** None, requires a fix.
- **Known Issue?:** No.
- **Notes:** There are 2 TCs that the have result mismatch as well: TC-ADD-310 (Expected: 133.45600000000002, Received: 133.456), TC-ADD-311 (Expected: 143.45600000000002, Received:  143.456). However, these are known issues (rounding) and won't be reported.

## ISSUE-004: Division with Very Large Numbers

- **Description:** The calculator is not handling very large numbers correctly, resulting in results displayed in standard notation rather than scientific notation.
- **Type:** Bug
- **Severity:** Major
- **Steps to Reproduce:**
  1. Use the calculator to divide very large numbers.
  2. Observe the result.
- **Actual Result:** The result is displayed in standard notation instead of scientific notation (e.g., `5e+101` is displayed as a large number with many zeros).
- **Expected Result:** The result should be displayed in scientific notation  as per project documentation (e.g., `5e+101`).
- **Affected Test Cases:** TC-DIV-101, TC-DIV-305
- **Root Cause:** Inadequate handling of scientific notation for very large numbers.
- **Possible Solution:** Update the display logic to handle and format scientific notation correctly.
- **Workaround:** None, requires a fix.
- **Known Issue?:** No.


## ISSUE-005: Division with Very Small Numbers

- **Description:** The calculator is not handling very small numbers correctly, resulting in results displayed as zero instead of in scientific notation.
- **Type:** Bug
- **Severity:** Minor
- **Steps to Reproduce:**
  1. Use the calculator to divide very small numbers.
  2. Observe the result.
- **Actual Result:** The result is displayed as zero instead of scientific notation (e.g., `2e-102` is displayed as `0`).
- **Expected Result:** The result should be displayed in scientific notation as per project documentation (e.g., `2e-102`).
- **Affected Test Cases:** TC-DIV-102, TC-DIV-302, TC-DIV-304, TC-DIV-306, 
- **Root Cause:** Inadequate handling of scientific notation for very small numbers.
- **Possible Solution:** Update the display logic to handle and format scientific notation correctly.
- **Workaround:** None, requires a fix.
- **Known Issue?:** Yes. This is a rounding issue and was referred by the project documentation.


## ISSUE-006: Division Result Mismatch

- **Description:** The calculator is returning incorrect results for certain divisions.
- **Type:** Bug
- **Severity:** Minor
- **Steps to Reproduce:**
  1. Use the calculator to divide specific numbers that result in known issues.
  2. Observe the result.
- **Actual Result:** The result is incorrect (e.g., `12.345600000000001` is returned as `12.3456`).
- **Expected Result:** The result should match the expected value (e.g., `12.345600000000001`).
- **Affected Test Cases:** TC-DIV-310
- **Root Cause:** Error in division logic.
- **Possible Solution:** Review and correct the division algorithm.
- **Workaround:** None, requires a fix.
- **Known Issue?:** Yes. This is a rounding issue and was referred by the project documentation.
- **Notes:** There are 3 TCs that the have result mismatch as well: TC-DIV-310 (Expected: 12.345600000000001, Received: 12.3456), TC-DIV-311 (Expected: 0.08100051840331778, Received: 0.08100052), TC-DIV-312 (Expected: 5.30003402021773, Received: 5.30003402), TC-DIV-313 (Expected: 0.18867803417588613, Received: 0.18867803). However, these are known issues (rounding) and won't be reported.


## ISSUE-007: Incorrect Handling of Division by Zero

- **Description:** The calculator incorrectly handles division by zero when the divisor is zero or a negative number, returning an error message instead of `NaN` or `-∞`.
- **Type:** Bug
- **Severity:** Minor
- **Steps to Reproduce:**
  1. Use the calculator to divide zero by zero.
  2. Observe the result.
  3. Use the calculator to divide -10 by zero.
  4. Observe the result
- **Actual Result:** The result is an error message "Error: Cannot divide by zero."
- **Expected Result:** The result should be `NaN` when the dividend is zero or should be `-∞` when the dividend is a negative number as it is support and documented by the project.
- **Affected Test Cases:** TC-DIV-202, TC-DIV-319.
- **Workaround:** None, requires a fix to handle zero numerator division by zero correctly.
- **Root Cause:** Incorrect error handling logic for division by zero with a zero numerator.
- **Possible Solution:** Adjust the logic to return `NaN` when both the numerator and the denominator are zero and `-∞` when the numberator is a negative number.
- **Known Issue?:** Yes. This is a division by zero issue and was referred by the project documentation.


## ISSUE-008: Multiplication with Very Large Numbers

- **Description:** The calculator is not handling very large numbers correctly, resulting in results displayed in standard notation rather than scientific notation.
- **Type:** Bug
- **Severity:** Major
- **Steps to Reproduce:**
  1. Use the calculator to multiply very large numbers.
  2. Observe the result.
- **Actual Result:** The result is displayed in standard notation instead of scientific notation as per project documentation (e.g., `1e+200` is displayed as a large number with many zeros).
- **Expected Result:** The result should be displayed in scientific notation (e.g., `1e+200`).
- **Affected Test Cases:** TC-MUL-103, TC-MUL-303, TC-MUL-306
- **Root Cause:** Inadequate handling of scientific notation for very large numbers.
- **Possible Solution:** Update the display logic to handle and format scientific notation correctly.
- **Workaround:** None, requires a fix.
- **Known Issue?:** No


## ISSUE-009: Multiplication Result Mismatch

- **Description:** The calculator is returning incorrect results for certain multiplications.
- **Type:** Bug
- **Severity:** Critical
- **Steps to Reproduce:**
  1. Use the calculator to multiply a basic number by the max safe integer. Same for the min safe integer.
  2. Observe the result.
- **Actual Result:** The result is incorrect (e.g., `72057594037927930` is returned as `72057594037927928`).
- **Expected Result:** The result should match the expected value (e.g., `72057594037927930`).
- **Affected Test Cases:** TC-MUL-302, TC-MUL-305
- **Root Cause:** Error in multiplication logic.
- **Possible Solution:** Review and correct the multiplication algorithm.
- **Workaround:** None, requires a fix.
- **Known Issue?:** No
- **Notes:** There is a TC that the had result mismatch as well: TC-DIV-104 (Expected: 1e-200, Received: 0). However, this is a known issues (rounding) and won't be reported.


## ISSUE-010: Multiplication zero by Infinity should return NaN

- **Description:** The calculator is not handling multiplication resulting in `NaN` correctly, displaying an invalid argument error instead.
- **Type:** Bug
- **Severity:** Major
- **Steps to Reproduce:**
  1. Use the calculator to multiply zero by Infinity.
  2. Observe the result.
- **Actual Result:** The result is "Invalid argument. Must be a numeric value."
- **Expected Result:** The result should be `NaN`.
- **Affected Test Cases:** TC-MUL-313
- **Root Cause:** The system does not correctly handle operations that result in `NaN`, instead throwing an invalid argument error.
- **Possible Solution:** Implement proper handling and return of `NaN` for multiplication operations that result in undefined or non-numeric values.
- **Workaround:** None, requires a fix to handle `NaN` results correctly.
- **Known Issue?:** No.


## ISSUE-011: Subtraction with Very Large Numbers

- **Description:** The calculator is returning incorrect results for certain subtractions, resulting in results displayed in standard notation rather than scientific notation.
- **Type:** Bug
- **Severity:** Critical
- **Steps to Reproduce:**
  1. Use the calculator to subtract very large numbers.
  2. Observe the result.
- **Actual Result:** The result is incorrect (e.g., `1e+100` is returned as `10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`).
- **Expected Result:** The result should be displayed in scientific notation (e.g., `1e+100`).
- **Affected Test Cases:** TC-SUB-104, TC-SUB-105, TC-SUB-307, TC-SUB-308
- **Root Cause:** Error in subtraction logic.
- **Possible Solution:** Review and correct the subtraction algorithm.
- **Workaround:** None, requires a fix.
- **Known Issue?:** No
