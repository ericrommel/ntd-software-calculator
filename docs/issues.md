## ISSUE-001: Addition with Very Large Numbers

- **Description:** The calculator is not handling very large numbers correctly, resulting in results displayed in standard notation rather than scientific notation.
- **Type:** Bug
- **Severity:** Major
- **Steps to Reproduce:**
  1. Use the calculator to add very large numbers.
  2. Observe the result.
- **Actual Result:** The result is displayed in standard notation instead of scientific notation (e.g., `1e+100` is displayed as a large number with many zeros).
- **Expected Result:** The result should be displayed in scientific notation (e.g., `1e+100`).
- **Affected Test Cases:** TC-ADD-104, TC-ADD-105, TC-ADD-106
- **Root Cause:** Inadequate handling of scientific notation for very large numbers.
- **Possible Solution:** Update the display logic to handle and format scientific notation correctly.
- **Workaround:** None, requires a fix.
- **Known Issue?:** No

## ISSUE-002: Addition with Very Small Numbers

- **Description:** The calculator is not handling very small numbers correctly, resulting in results displayed as zero instead of in scientific notation.
- **Type:** Bug
- **Severity:** Major
- **Steps to Reproduce:**
  1. Use the calculator to add very small numbers.
  2. Observe the result.
- **Actual Result:** The result is displayed as zero instead of scientific notation (e.g., `2e-100` is displayed as `0`).
- **Expected Result:** The result should be displayed in scientific notation (e.g., `2e-100`).
- **Affected Test Cases:** TC-ADD-107
- **Root Cause:** Inadequate handling of scientific notation for very small numbers.
- **Possible Solution:** Update the display logic to handle and format scientific notation correctly.
- **Workaround:** None, requires a fix.
- **Known Issue?:** No

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
- **Known Issue?:** No

## ISSUE-004: Division with Very Large Numbers

- **Description:** The calculator is not handling very large numbers correctly, resulting in results displayed in standard notation rather than scientific notation.
- **Type:** Bug
- **Severity:** Major
- **Steps to Reproduce:**
  1. Use the calculator to divide very large numbers.
  2. Observe the result.
- **Actual Result:** The result is displayed in standard notation instead of scientific notation (e.g., `5e+101` is displayed as a large number with many zeros).
- **Expected Result:** The result should be displayed in scientific notation (e.g., `5e+101`).
- **Affected Test Cases:** TC-DIV-101
- **Root Cause:** Inadequate handling of scientific notation for very large numbers.
- **Possible Solution:** Update the display logic to handle and format scientific notation correctly.
- **Workaround:** None, requires a fix.
- **Known Issue?:** Yes. This issue is related to the known issue for scientific notation handling in divisions (refer to known issue for TC-DIV-101).

## ISSUE-005: Division with Very Small Numbers

- **Description:** The calculator is not handling very small numbers correctly, resulting in results displayed as zero instead of in scientific notation.
- **Type:** Bug
- **Severity:** Major
- **Steps to Reproduce:**
  1. Use the calculator to divide very small numbers.
  2. Observe the result.
- **Actual Result:** The result is displayed as zero instead of scientific notation (e.g., `2e-102` is displayed as `0`).
- **Expected Result:** The result should be displayed in scientific notation (e.g., `2e-102`).
- **Affected Test Cases:** TC-DIV-102
- **Root Cause:** Inadequate handling of scientific notation for very small numbers.
- **Possible Solution:** Update the display logic to handle and format scientific notation correctly.
- **Workaround:** None, requires a fix.
- **Known Issue?:** No

## ISSUE-006: Division Result Mismatch

- **Description:** The calculator is returning incorrect results for certain divisions.
- **Type:** Bug
- **Severity:** Critical
- **Steps to Reproduce:**
  1. Use the calculator to divide specific numbers that result in known issues.
  2. Observe the result.
- **Actual Result:** The result is incorrect (e.g., `12.345600000000001` is returned as `12.3456`).
- **Expected Result:** The result should match the expected value (e.g., `12.345600000000001`).
- **Affected Test Cases:** TC-DIV-310
- **Root Cause:** Error in division logic.
- **Possible Solution:** Review and correct the division algorithm.
- **Workaround:** None, requires a fix.
- **Known Issue?:** No

## ISSUE-007: Multiplication with Very Large Numbers

- **Description:** The calculator is not handling very large numbers correctly, resulting in results displayed in standard notation rather than scientific notation.
- **Type:** Bug
- **Severity:** Major
- **Steps to Reproduce:**
  1. Use the calculator to multiply very large numbers.
  2. Observe the result.
- **Actual Result:** The result is displayed in standard notation instead of scientific notation (e.g., `1e+200` is displayed as a large number with many zeros).
- **Expected Result:** The result should be displayed in scientific notation (e.g., `1e+200`).
- **Affected Test Cases:** TC-MUL-103
- **Root Cause:** Inadequate handling of scientific notation for very large numbers.
- **Possible Solution:** Update the display logic to handle and format scientific notation correctly.
- **Workaround:** None, requires a fix.
- **Known Issue?:** No

## ISSUE-008: Multiplication Result Mismatch

- **Description:** The calculator is returning incorrect results for certain multiplications.
- **Type:** Bug
- **Severity:** Critical
- **Steps to Reproduce:**
  1. Use the calculator to multiply specific numbers that result in known issues.
  2. Observe the result.
- **Actual Result:** The result is incorrect (e.g., `72057594037927930` is returned as `72057594037927928`).
- **Expected Result:** The result should match the expected value (e.g., `72057594037927930`).
- **Affected Test Cases:** TC-MUL-302, TC-MUL-305
- **Root Cause:** Error in multiplication logic.
- **Possible Solution:** Review and correct the multiplication algorithm.
- **Workaround:** None, requires a fix.
- **Known Issue?:** No

## ISSUE-009: Subtraction Result Mismatch

- **Description:** The calculator is returning incorrect results for certain subtractions.
- **Type:** Bug
- **Severity:** Critical
- **Steps to Reproduce:**
  1. Use the calculator to subtract specific numbers that result in known issues.
  2. Observe the result.
- **Actual Result:** The result is incorrect (e.g., `1e+100` is returned as `10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`).
- **Expected Result:** The result should match the expected value (e.g., `1e+100`).
- **Affected Test Cases:** TC-SUB-104, TC-SUB-105
- **Root Cause:** Error in subtraction logic.
- **Possible Solution:** Review and correct the subtraction algorithm.
- **Workaround:** None, requires a fix.
- **Known Issue?:** No
