# NTD Software - SDET Coding Challenge

## Description of the coding challenge

### 1. Intro
We have built a new, state-of-the-art calculator that's set to revolutionize the world of basic arithmetic operations. As part of the team that built it, your job is to build the right tools, tests, processes, and procedures to guarantee correctness. Your software developer peers tell you that it appears to be
working OK for all intended purposes; there are even some unit tests providing coverage, so their confidence level is high. As a Software Developer Engineer in
Testing, you think it’s great there’s unit test coverage but would like to perform other types of testing as well before releasing to the public.

### 2. Goals
The goal is to use any means necessary to uncover any and all bugs.

### 3. Deliverables
- [] A document with all findings, so that developers can replicate bugs in their own environment.
- [] For each bug, provide hints into what might be happening that causes the bug.
- [] If you use automation tools or custom code, provide the source code and instructions on how to run those.

### 4. Instructions for the calculator
The only requirement is to have Docker installed in your computer. It should work OK in macOS (apple silicon and intel) and Linux (x8664 and arm64). Windows is
not supported.

First pull the image: `docker pull public.ecr.aws/l4q9w4c5/loanpro-calculator-cli:latest`
After pulling the image, execute it with: `docker run --rm public.ecr.aws/l4q9w4c5/loanpro-calculator-cli add 8 5`

Available operations are:
- add
- subtract
- multiply
- divide

### 5. Known bugs
The following is a list of known bugs and/or issues that should not be included in the report.
1. All commands take exactly two numbers. Attempting to use more or less operands will result in an error message; this is expected behavior.
2. Dividing by zero returns an error message.
3. Results may be displayed as scientific notation. This is correct and expected, as long as the value is correct. Results are guaranteed exact up to 8 decimal places. For example, adding 1.0000001 + 1.0000001 (six 0's) yields the expected 2.0000002, but 1.00000001 + 1.00000001 (seven 0’s) results in 2.0. Similar rounding errors due to the data type used are expected.
5. Operations resulting in infinity, negative infinity or "not a number" are supported.

## Acceptance Criteria
- [X] Come up with a test automation environment
- [X] Ensure that the tests cover the basic and edge cases for each functionality.

## General settings
- Install and set configuration if needed for:
  - [Node.js](https://nodejs.org/en/download/) (version used: v20.10.0)
- Install dependencies

  ```batch
  npm install
  ```

## Manual execution
Run the tests:
  
  ```batch
  npm run test:e2e
  ```

## Report
After a test execution, you can see the report running the command below:

  ```batch
  npm run test:report
  ```

## CI/CD
This project uses GitHub Actions as a sample CI in [GitHub](https://github.com/ericrommel/ntd-software-challenge/actions/workflows/playwright.yml)


## Approach used

### TL;DR
- Developed 6 test cases for the add computer functionality, spanning 2 scenarios
- Discovered 5 issues during testing, documented in [here](docs/issues.md)
- Utilized the Page Object Model (POM) to organize locators and functions, enhancing code reusability and maintainability
- Two issues caused test failures, prompting the skipping of failing tests until resolution
- Implemented workarounds for the remaining issues
- Test strategy, test plan, and test cases documents were created for reference and documentation purposes.

### Explanation
The task required the creation of test scenarios for the add computer functionality, resulting in the development of 6 test cases covering 2 distinct scenarios. During testing, 5 issues were identified and documented in the provided issue log. To structure the automation code effectively, the Page Object Model (POM) was employed, enabling the systematic organization of locators and functions into reusable components associated with specific pages, such as the List computers page and Add computers page. This approach promotes code reusability and facilitates maintenance.

Two of the identified issues led to test failures, necessitating the temporary skipping of affected tests until the underlying problems are resolved. For the remaining issues, temporary workarounds were implemented to ensure test continuity. Once the identified issues are addressed and resolved, the affected tests can be revisited and rectified accordingly.

Additionally, as part of the testing process, comprehensive test strategy, test plan, and test cases documents were crafted to provide guidance and reference for the testing efforts. These documents serve as valuable resources for understanding the testing approach, outlining test scenarios, and documenting test cases for future use and collaboration.

### Documents
Check out the the documents below to learn more about the tests:

- [Test Strategy document](docs/test-strategy.md)
- [Test Plan document](docs/test-plan.md)
- Test Case documents:
  1. [Test Case: Verify Alert Message for Successful Addition](docs/test-cases/T001.md)
  2. [Test Case: Verify that the new computer is saved in the database and reflected in the list of computers.](docs/test-cases/T002.md)
  3. [Test Case: Verify Error Message for Missing Name Field](docs/test-cases/T003.md)
  4. [Test Case: Verify Error Message for Invalid Introduced Date](docs/test-cases/T004.md)
  5. [Test Case: Verify Handling of Discontinued Date Before Introduced Date](docs/test-cases/T005.md)
  6. [Test Case: Verify Maximum Character Limit for Name Field](docs/test-cases/T006.md)

### Summary of findings
Findings are in this [document](docs/issues.md).
