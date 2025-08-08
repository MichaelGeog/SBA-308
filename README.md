# This is a lab practice as a part of per scholas program

## Learner Data Processing

This script processes course, assignment, and submission data to calculate each learner’s weighted average and per-assignment percentage.

## Features
- Validates that the assignment group belongs to the course.
- Ignores assignments not yet due.
- Applies a 10% late penalty for submissions after the due date.
- Calculates weighted averages across all due assignments.
- Provides per-assignment percentages for each learner.
- Handles invalid data gracefully with basic `try/catch` and input checks.

## Data Format
- **CourseInfo**: course ID and name.  
- **AssignmentGroup**: ID, name, course ID, weight, and assignments (with `id`, `name`, `due_at`, `points_possible`).  
- **LearnerSubmissions**: learner ID, assignment ID, and submission object (`submitted_at`, `score`).

## Output Format
An array of learner objects:
```json
[
  { "id": 125, "avg": 0.985, "a1": 0.94, "a2": 1 },
  { "id": 132, "avg": 0.82, "a1": 0.78, "a2": 0.833 }
]
