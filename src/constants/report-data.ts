export type AgentId = "lo" | "learner" | "instruction" | "content" | "assessment" | "technical" | "suggestions";

export interface ReportData {
    title: string;
    duration: string;
    date: string;
    sections: {
        label: string;
        content: string[];
        type: "list" | "metrics" | "text";
        metrics?: Record<string, string | number>;
    }[];
}

export const AGENT_REPORTS_DATA: Record<AgentId, ReportData> = {
    lo: {
        title: "LO & Pre-requisites",
        duration: "120s",
        date: "23/02/2026",
        sections: [
            {
                label: "Learning Objectives",
                content: ["Understand core concepts", "Apply practical skills", "Master advanced techniques"],
                type: "list"
            },
            {
                label: "Prerequisites",
                content: ["Basic programming knowledge", "Understanding of data structures", "Familiarity with APIs"],
                type: "list"
            },
            {
                label: "Target Audience",
                content: ["Intermediate to Advanced developers"],
                type: "text"
            }
        ]
    },
    learner: {
        title: "Learner expectation & Outcome Alignment",
        duration: "240s",
        date: "23/02/2026",
        sections: [
            {
                label: "Alignment Analytics",
                content: [],
                type: "metrics",
                metrics: {
                    "Alignment Score": 92,
                    "Learner Feedback Score": 4.6,
                }
            },
            {
                label: "Identified Gaps",
                content: ["Module 3 needs more practice exercises"],
                type: "list"
            },
            {
                label: "Strategic Recommendations",
                content: ["Add 5 additional hands-on labs"],
                type: "list"
            }
        ]
    },
    instruction: {
        title: "Instruction Material Quality",
        duration: "300s",
        date: "23/02/2026",
        sections: [
            {
                label: "Video Content Quality",
                content: ["High resolution video", "Clear audio", "Good pacing"],
                type: "list"
            }
        ]
    },
    content: {
        title: "Course Content",
        duration: "450s",
        date: "23/02/2026",
        sections: [
            {
                label: "Module Breakdown",
                content: ["12 main modules", "48 lessons total"],
                type: "list"
            }
        ]
    },
    assessment: {
        title: "Assessments",
        duration: "180s",
        date: "23/02/2026",
        sections: [
            {
                label: "Quiz Analysis",
                content: ["Quizzes are well structured", "Difficulty matches module content"],
                type: "list"
            }
        ]
    },
    technical: {
        title: "Technical & Usability Issues",
        duration: "200s",
        date: "23/02/2026",
        sections: [
            {
                label: "Device Compatibility",
                content: ["Works well on Desktop", "Minor layout shifts on small mobile devices"],
                type: "list"
            }
        ]
    },
    suggestions: {
        title: "Suggestions of Improvement",
        duration: "150s",
        date: "23/02/2026",
        sections: [
            {
                label: "Top 3 Improvements",
                content: [
                    "Enhance module 3 with interactive labs",
                    "Add a final capstone project section",
                    "Update deprecated library references in module 5"
                ],
                type: "list"
            }
        ]
    }
};
