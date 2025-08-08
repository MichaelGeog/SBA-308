// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};

// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];

//geting learner id
function getLearnerID(lid) {
    let learnersIDs = [];
    for (let i = 0; i < lid.length; i++) {
        let currentID = lid[i].learner_id;
        if (learnersIDs.indexOf(currentID) === -1) {
            learnersIDs.push(currentID);
        }
    }
    return learnersIDs;
}

// getting assignment IDs
function getAssignmentIDs(ag) {
    const assignmentIDs = [];
    ag.assignments.forEach(a => assignmentIDs.push(a.id));
    return assignmentIDs;
}

// get due date
function getDueDateObjects(agd) {
    const dueDates = {};
    agd.assignments.forEach((assignment) => {
        dueDates[assignment.id] = new Date(assignment.due_at);
    });
    return dueDates;
}

function getLearnerData(course, ag, submissions) {

    if (ag.course_id !== course.id) {
        throw new Error("Invalid data: AssignmentGroup does not belong to Course");
    }

    const learnersIDs = getLearnerID(submissions);
    const dueDates = getDueDateObjects(ag);

    const result = [];
    const now = new Date();

    learnersIDs.forEach(function (learner) {
        const percs = {};
        let totalScore = 0;
        let totalPossible = 0;

        ag.assignments.forEach(function (assignment) {
            // find this learner’s submission for this assignment
            let submission;
            for (let i = 0; i < submissions.length; i++) {
                if (submissions[i].learner_id === learner &&
                    submissions[i].assignment_id === assignment.id) {
                    submission = submissions[i];
                    break;
                }
            }
            if (!submission) {
                return; // no submission for this assignment
            }

            try {
                if (typeof assignment.points_possible !== "number" || assignment.points_possible <= 0) {
                    console.log("Invalid points_possible for assignment " + assignment.id);
                    return;
                }
                if (typeof submission.submission.score !== "number") {
                    console.log("Invalid score for learner " + learner + " on assignment " + assignment.id);
                    return;
                }

                const dueDate = dueDates[assignment.id];
                const submissionDate = new Date(submission.submission.submitted_at);

                if (!(dueDate instanceof Date) || isNaN(dueDate)) {
                    console.log("Invalid due date for assignment " + assignment.id);
                    return;
                }
                if (!(submissionDate instanceof Date) || isNaN(submissionDate)) {
                    console.log("Invalid submission date for learner " + learner + " on assignment " + assignment.id);
                    return;
                }

                // process if assignment is due
                if (now >= dueDate) {
                    let score = submission.submission.score;
                    const pointsPossible = assignment.points_possible;

                    // late penalty
                    if (submissionDate > dueDate) {
                        score -= 0.1 * pointsPossible;
                    }
                    if (score < 0) {
                        score = 0;
                    }

                    // store percentage
                    percs["a" + assignment.id] = +(score / pointsPossible).toFixed(3);

                    // add to totals
                    totalScore += score;
                    totalPossible += pointsPossible;
                }
            } catch (err) {
                console.log("Error processing learner " + learner + " assignment " + assignment.id + ": " + err.message);
            }
        });

        if (totalPossible > 0) {
            const avg = +(totalScore / totalPossible).toFixed(3);
            const learnerObj = { id: learner, avg };
            ag.assignments.forEach(function (a) {
                const key = "a" + a.id;
                if (percs[key] !== undefined) {
                    learnerObj[key] = percs[key];
                }
            });
            result.push(learnerObj);
        }
    });

    return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);
