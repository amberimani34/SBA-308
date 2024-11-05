const courseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

const assignmentGroups = [
    {
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
    }
];
const learnerSubmissions = [
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
function getLearnerData(courseInfo, assignmentGroups, learnerSubmissions) {
    try {
        for (const group of assignmentGroups) {
            if (group.course_id !== courseInfo.id) {
                throw new Error(`AssignmentGroup with ID ${group.id} does not match course ID ${courseInfo.id}`);
            }
        }
        const currentDate = new Date();
        const learnerResults = {};
     
        learnerSubmissions.forEach(submission => {
            const { learner_id, assignment_id, submission: { submitted_at, score } } = submission;
            let learnerData = learnerResults[learner_id] || { id: learner_id, totalWeightedScore: 0, totalWeight: 0, assignments: {} };
              
              const assignmentGroup = assignmentGroups.find(group => group.assignments.some(assignment => assignment.id === assignment_id));
              if (!assignmentGroup) return;  
              const assignment = assignmentGroup.assignments.find(a => a.id === assignment_id);
              if (!assignment) return;  
              const dueDate = new Date(assignment.due_at);
              if (currentDate < dueDate) return;  