[![Playwright CI](https://github.com/ericrommel/ntd-software-calculator/actions/workflows/playwright.yml/badge.svg)](https://github.com/ericrommel/ntd-software-calculator/actions/)


# NTD Software - SDET Coding Challenge


## Description of the coding challenge (project)

The full description of the coding challenge is [here](docs/project_description.md)


## Acceptance Criteria

- [X] Come up with a test automation environment.
- [X] Ensure that the tests cover the basic and edge cases for each functionality.
- [X] Deliverables done.


## General settings

- Install and set configuration if needed for:
  - [Node.js](https://nodejs.org/en/download/) (version used: v20.10.0)
  - [Docker](https://www.docker.com/products/docker-desktop/)

- Clone the repository on your local

  ```bash
  $ git clone git@github.com:ericrommel/ntd-software-calculator.git
  ```

- Inside de repository folder, install dependencies

  ```bash
  $ npm install
  ```

## Manual execution

- Run all tests
  
  ```bash
  $ npm run test:e2e
  ```

- Run a single test
  ```bash
  $ npm run test:e2e:single divide.spec.ts
  ```


## Report

After a test execution, you can see the report running the command below:

  ```bash
  npm run test:report
  ```


## CI/CD

This project uses GitHub Actions as a sample CI on [GitHub](https://github.com/ericrommel/ntd-software-challenge/actions/workflows/playwright.yml)


## Approach Used


### TL;DR

- Developed 165 test cases for the calculator functionality for addition, subtraction, multiplication, and division operations.
- Discovered 33 issues during testing. The majority align with known issues. The issues were grouped and documented in [here](docs/issues.md).
- Multiple issues caused test failures, prompting the skipping of 32 failing tests until resolution.
- Test strategy, test plan, and test cases documents were created for reference and documentation purposes.


### Explanation

The task required the creation of test scenarios for various calculator functionalities, resulting in the development of 165 test cases covering addition ([47 test cases](docs/test-cases/addition.test.cases.md)), subtraction ([47 test cases](docs/test-cases/subtraction.test.cases.md)), multiplication ([35 test cases](docs/test-cases/multiplication.test.cases.md)), and division ([36 test cases](docs/test-cases/division.test.cases.md)) operations. During testing, 33 issues were identified and documented in the provided [issue log](docs/list-issues.md). A total of 11 issues were reported and documented [here](docs/issues.md).

To structure the automation code effectively, the test cases were put in a list of objects for better parameterization. This approach promotes code reusability and facilitates maintenance.

Several of the identified issues (32 test cases) led to test failures, necessitating the temporary skipping of affected tests until the underlying problems are resolved. Once the identified issues are addressed and resolved, the affected tests can be revisited and rectified accordingly.

Additionally, as part of the testing process, comprehensive test strategy, test plan, and test cases documents were crafted to provide guidance and reference for the testing efforts. These documents serve as valuable resources for understanding the testing approach, outlining test scenarios, and documenting test cases for future use and collaboration.


### Technologies Used


#### Playwright/TypeScript

Utilized for writing and executing automated tests. Playwright provides a reliable and fast framework for automation, and TypeScript adds type safety, making the codebase more maintainable.


##### Justification for Using Playwright

While Playwright is primarily designed for browser automation, I used it in this project due to its robust capabilities, flexibility, and my familiarity with the tool. Despite the SUT being a terminal app running in a container, Playwright offered several advantages that made it suitable for this particular automation task.


##### Advantages of Using Playwright

1. Comprehensive Automation Capabilities:
   - Playwright supports automation beyond just web browsers, including interacting with the command line and performing various tasks programmatically.
   - I utilized Playwright's ability to execute commands, capture outputs, and validate results, effectively testing the terminal-based calculator.

2. Robust Framework:
   - Playwright provides a reliable and modern API, making the test scripts clean, maintainable, and scalable.
   - Its built-in support for capturing screenshots, handling asynchronous operations, and generating detailed test reports proved beneficial in this context.

3. Integration and Scalability:


#### Considerations and Alternatives

While Playwright was not specifically designed for terminal applications, its versatility and my proficiency with the tool justified its use in this project. However, I acknowledge that other tools like [Expect](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) (a node.js module for automating terminal interactions) or custom shell scripts could also be viable alternatives for terminal automation.

In the future, I may consider exploring specialized tools for terminal applications.


#### Strategy Used Evaluation

Pros:
- Reusability: Parameterized test cases and modularized code promote reuse and reduce duplication.
- Maintainability: Comprehensive documentation and structured codebase make maintenance easier.
- Reliability: Automated tests provide consistent and repeatable test results.

Cons:
- Initial Setup Time: Requires significant initial investment to set up automation frameworks and containerization.
- Skill Requirement: Requires team members to have skills in the specific technologies used (e.g., TypeScript, Docker).


#### Improvements

##### Execution Report Analysis

During the testing process, it was observed that some test files took significantly longer to execute compared to others. The following execution times were recorded for the test files:

  ```
  Slow test file: [Desktop Chrome] › tests/e2e/subtract.spec.ts (54.4s)
  Slow test file: [Desktop Chrome] › tests/e2e/add.spec.ts (50.2s)
  Slow test file: [Desktop Chrome] › tests/e2e/multiply.spec.ts (41.3s)
  Slow test file: [Desktop Chrome] › tests/e2e/divide.spec.ts (33.4s)
  ```


##### Suggested Improvement

To improve the efficiency and speed of the test execution, it is recommended to split the slow test files into smaller test files. This will enable better parallel execution of tests, reducing the overall time required for the test suite to run. Key Benefits of Splitting Tests:
- Improved Readability: Each test file has a clear purpose and is easier to read and understand.
- Better Maintainability: Changes to specific categories of tests are easier to manage.
- Focused Debugging: Isolating tests makes it easier to identify and fix issues within a specific category.
- Scalability: Adding new tests is straightforward and doesn't clutter a single test file.

This distribution method ensures your test suite remains organized, readable, and easy to maintain.


##### Steps for Improvement

1. Analyze Test Cases:
   - Review the existing test cases within the slow test files to identify logical groupings that can be separated into smaller files.

2. Refactor Test Files:
   - Split the identified test cases into new test files, ensuring that each file contains a balanced number of test cases to optimize execution time.

3. Update Test Suite Configuration:
   - Modify the test suite configuration to include the newly created test files, maintaining proper test execution order and dependencies.

4. Monitor and Adjust:
   - Monitor the execution times of the refactored test files to ensure the desired improvement in performance is achieved. Adjust the distribution of test cases as necessary to maintain optimal execution speed.


### Documents

Check out the documents below to learn more about the tests:

- [Test Strategy document](docs/test-strategy.md)
- [Test Plan document](docs/test-plan.md)
- Test Case documents:
  1. [Addition Test Cases](docs/test-cases/addition.test.cases.md)
  2. [Subtraction Test Cases](docs/test-cases/subtraction.test.cases.md)
  3. [Multiplication Test Cases](docs/test-cases/multiplication.test.cases.md)
  4. [Division Test Cases](docs/test-cases/division.test.cases.md)


### Summary of Findings

Findings are documented [here](docs/issues.md).
