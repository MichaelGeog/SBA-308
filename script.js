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
        for (let j = 0; j < learnersIDs.length; j++) {
            // check if the learner id matches current id
            if (learnersIDs[j] === currentID) {
                continue; 
            }
        }
        //checking if the id exists in the array if not push it to the array
        if (learnersIDs.indexOf(currentID) === -1) {
            learnersIDs.push(currentID);
        }
    }
    return learnersIDs;
}

// getting assignment IDs
function getAssignmentId(ag) {
    let assignmentIDs = [];
    for (let i = 0; i < ag.assignments.length; i++) {
        // console.log(`Assignment ${i+1} id:`, ag.assignments[i].id); 
        assignmentIDs.push(ag.assignments[i].id);
    }
    return assignmentIDs;
}

function getLearnerData(course, ag, submissions) {
    // console.log(course.id);
    // console.log(ag.course_id);

    // check if the assignment belong to the course
    if(ag.course_id !== course.id){
        throw new Error("Invalid data: AssignmentGroup does not belong to Course");
    }

    // here, we would process this data to achieve the desired result.
    // const result = [
    //     {
    //         id: 125,
    //         avg: 0.985, // (47 + 150) / (50 + 150)
    //         1: 0.94, // 47 / 50
    //         2: 1.0 // 150 / 150
    //     },
    //     {
    //         id: 132,
    //         avg: 0.82, // (39 + 125) / (50 + 150)
    //         1: 0.78, // 39 / 50
    //         2: 0.833 // late: (140 - 15) / 150
    //     }
    // ];

    // return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

// console.log(result);
