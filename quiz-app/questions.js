const quizData = [
  {
    question: "You are setting up automated tests against a new application. When a third-party payment gateway is down, your tests fail. What testability characteristic should you improve to fix this?",
    options: [
      "Controllability",
      "Observability",
      "Isolability",
      "Maintainability"
    ],
    correctAnswer: 2,
    explanation: "Isolability allows you to test components independently, usually by mocking third-party dependencies like payment gateways."
  },
  {
    question: "An automated nightly regression suite fails. You find that the DB was refreshed, causing missing test data. How do you classify this failure?",
    options: [
      "True Positive",
      "False Positive",
      "False Negative",
      "True Negative"
    ],
    correctAnswer: 1,
    explanation: "False Positive. The test failed, but there is no actual bug in the System Under Test (SUT)."
  },
  {
    question: "In the Test Automation Architecture (TAA), which layer is responsible for logging detailed execution steps and capturing screenshots?",
    options: [
      "Test Generation Layer",
      "Test Definition Layer",
      "Test Execution Layer",
      "Test Adaptation Layer"
    ],
    correctAnswer: 2,
    explanation: "The Test Execution Layer handles running the tests, logging, capturing screenshots, and generating reports."
  },
  {
    question: "You want to update to a new major version of Selenium. What is the correct FIRST step?",
    options: [
      "Determine the impact across the framework",
      "Create an adoption plan",
      "Perform a pilot on a small subset of tests",
      "Update the dependencies globally"
    ],
    correctAnswer: 2,
    explanation: "Always perform a pilot first on a sandbox/subset of tests to see what breaks before determining the total impact."
  },
  {
    question: "Management is upset that the Test Automation Solution takes 20 hours a week to maintain. What metric category does 'maintenance effort' fall under?",
    options: [
      "External Quality Metrics",
      "Internal TAS Quality Metrics",
      "TAS Deployment/Development Metrics",
      "Test Execution Metrics"
    ],
    correctAnswer: 2,
    explanation: "TAS Deployment/Development Metrics measure the ROI, process, time saved, and maintenance effort."
  },
  {
    question: "A UI automation test randomly fails 20% of the time due to network latency. What is the ISTQB recommended mitigation?",
    options: [
      "Increase the static sleep time by 5 seconds.",
      "Replace static sleeps with dynamic waits (e.g., Wait UNTIL visible).",
      "Log a critical defect against the SUT.",
      "Run the test twice and accept if it passes once."
    ],
    correctAnswer: 1,
    explanation: "Dynamic waits are the standard mitigation for flaky synchronization issues. ISTQB penalizes static sleep times."
  },
  {
    question: "To track performance bottlenecks across a modern microservice architecture, what MUST be implemented?",
    options: [
      "Visual Regression Screenshots",
      "Trace IDs",
      "Equivalence Partitioning",
      "Mocks and Stubs"
    ],
    correctAnswer: 1,
    explanation: "Trace IDs are essential for correlating data from the frontend, API, and database in microservices."
  },
  {
    question: "Which of the following is NOT a good candidate for automation (Low ROI)?",
    options: [
      "Highly repetitive regression tests",
      "Critical business paths",
      "Usability testing",
      "Data-driven tests with many inputs"
    ],
    correctAnswer: 2,
    explanation: "Usability testing requires human intuition and eye-tracking, making it a poor candidate for automation."
  }
];
