export const projects = [
  { id: 1, name: "Project 1" },
  { id: 2, name: "Project 2" },
  { id: 3, name: "Project 3" },
];

export const testPlans = [
  {
    id: 1,
    name: "Test Plan 1",
    projectId: 1,
    iterations: [
      {
        id: 1,
        name: "Iteration 1.1",
        testCases: [
          { id: 1, name: "Test Case 1.1.1" },
          { id: 2, name: "Test Case 1.1.2" },
        ],
      },
      {
        id: 2,
        name: "Iteration 1.2",
        testCases: [
          { id: 3, name: "Test Case 1.2.1" },
          { id: 4, name: "Test Case 1.2.2" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Test Plan 2",
    projectId: 2,
    iterations: [
      {
        id: 3,
        name: "Iteration 2.1",
        testCases: [
          { id: 5, name: "Test Case 2.1.1" },
          { id: 6, name: "Test Case 2.1.2" },
        ],
      },
      {
        id: 4,
        name: "Iteration 2.2",
        testCases: [
          { id: 7, name: "Test Case 2.2.1" },
          { id: 8, name: "Test Case 2.2.2" },
        ],
      },
    ],
  },
];
