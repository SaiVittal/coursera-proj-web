export type Severity = "Must Do" | "Good To Do";

export interface Recommendation {
    TaskName: string;
    TaskScore?: number;
    Severity: Severity;
    Recommendations: string[];
}

export interface ItemRecommendation {
    TaskName: string;
    Severity: Severity;
    Recommendations: string[];
}

export interface Item {
    ItemName: string;
    ItemType: string;
    ItemScore: number;
    ItemRecommendations: ItemRecommendation[];
}

export interface LO {
    LOName: string;
    LOScore: number;
    LORecommendations: Recommendation[];
}

export interface Module {
    ModuleName: string;
    ModuleRecommendations: Recommendation[];
    LOLevel?: LO[];
    ItemLevel?: Item[];
}

export interface CourseData {
    CourseName: string;
    Glossary: Record<string, string>;
    AgentScore: number;
    CourseTaskScores: { TaskName: string; CourseScore: number }[];
    ModuleTaskScores: { TaskName: string; Modules: { ModuleName: string; ModuleScore: number }[] }[];
    TasksAndHighlights: { TaskName: string; Highlights: string[] }[];
    TasksAndLowlights: { TaskName: string; Lowlights: string[] }[];
    CourseLevel: Record<string, unknown>[];
    ModuleLevel: Module[];
}

export const AGILE_LEADER_DATA: CourseData = {
    "CourseName": "Agile Leader Training",
    "Glossary": {
        "Course Outline Validation": "Ensures the syllabus is clear, structured, and educationally effective for a coherent learning experience.",
        "Learning Objective Validation": "Checks that learning objectives are clear, measurable, and aligned with the intended depth of understanding in a course module.",
        "Content to LO Matching Validation": "Ensures that transcripts and readings effectively support the course’s learning objectives."
    },
    "AgentScore": 4.23,
    "CourseTaskScores": [
        { "TaskName": "Course Outline Validation", "CourseScore": 3.94 },
        { "TaskName": "Learning Objective Validation", "CourseScore": 4.68 },
        { "TaskName": "Content to LO Matching", "CourseScore": 4.05 }
    ],
    "ModuleTaskScores": [
        {
            "TaskName": "Course Outline Validation",
            "Modules": [
                { "ModuleName": "Module 1", "ModuleScore": 4.09 },
                { "ModuleName": "Module 2", "ModuleScore": 4.15 },
                { "ModuleName": "Module 3", "ModuleScore": 4.04 },
                { "ModuleName": "Module 4", "ModuleScore": 4.02 },
                { "ModuleName": "Module 5", "ModuleScore": 3.4 }
            ]
        },
        {
            "TaskName": "Learning Objective Validation",
            "Modules": [
                { "ModuleName": "Module 1", "ModuleScore": 4.63 },
                { "ModuleName": "Module 2", "ModuleScore": 4.51 },
                { "ModuleName": "Module 3", "ModuleScore": 4.73 },
                { "ModuleName": "Module 4", "ModuleScore": 4.75 },
                { "ModuleName": "Module 5", "ModuleScore": 4.78 }
            ]
        },
        {
            "TaskName": "Content to LO Matching Validation",
            "Modules": [
                { "ModuleName": "Module 1", "ModuleScore": 3.84 },
                { "ModuleName": "Module 2", "ModuleScore": 4.2 },
                { "ModuleName": "Module 3", "ModuleScore": 4.13 },
                { "ModuleName": "Module 4", "ModuleScore": 4.14 },
                { "ModuleName": "Module 5", "ModuleScore": 3.95 }
            ]
        },
        {
            "TaskName": "Prerequisite Coverage",
            "Modules": []
        }
    ],
    "TasksAndHighlights": [
        {
            "TaskName": "Course Outline Validation",
            "Highlights": [
                "Modules such as Neuroscience of Change, Deconstructing Your Fears, and Building a New Mindset are relevant to the course and aligned with what they promise to teach."
            ]
        },
        {
            "TaskName": "Learning Objective Validation",
            "Highlights": [
                "The course effectively aligns modules to enhance learning experiences and create a cohesive, supportive educational environment.",
                "Strong alignment across learning objectives fosters a comprehensive, engaging, and effective learning journey for all students."
            ]
        },
        {
            "TaskName": "Content to LO Matching",
            "Highlights": [
                "Agile leader mindset video content comprehensively addressed agile leadership foundational learning objectives.",
                "Habit forming video material covered all habit formation requirements from stated learning objectives."
            ]
        }
    ],
    "TasksAndLowlights": [
        {
            "TaskName": "Course Outline Validation",
            "Lowlights": [
                "Module Building Resilience is missing its syllabus content, so it's difficult to determine what it covers in relation to the rest of the course."
            ]
        },
        {
            "TaskName": "Learning Objective Validation",
            "Lowlights": []
        },
        {
            "TaskName": "Content to LO Matching",
            "Lowlights": [
                "Daily rituals reading failed to address change resilience learning requirements adequately."
            ]
        }
    ],
    "CourseLevel": [],
    "ModuleLevel": [
        {
            "ModuleName": "Neuroscience of Change",
            "ModuleRecommendations": [
                {
                    "TaskName": "Course Outline Validation",
                    "TaskScore": 4.09,
                    "Severity": "Good To Do",
                    "Recommendations": [
                        "Deepen item content explaining the paradox between survival and seeking systems for better understanding.",
                        "Improve the relevance of the 'Agile Workbook' item to the module's core neuroscience themes."
                    ]
                }
            ],
            "LOLevel": [
                {
                    "LOName": "Articulate the paradox of the survival and the seeking system",
                    "LOScore": 4.42,
                    "LORecommendations": [
                        {
                            "TaskName": "Learning Objective Validation",
                            "Severity": "Must Do",
                            "Recommendations": [
                                "Revise syllabus to include a glossary defining \"survival\" and \"seeking\" systems to improve understanding and accessibility for all learners."
                            ]
                        }
                    ]
                },
                {
                    "LOName": "Contrast survival and seeking system",
                    "LOScore": 4.43,
                    "LORecommendations": [
                        {
                            "TaskName": "Learning Objective Validation",
                            "Severity": "Must Do",
                            "Recommendations": [
                                "Revise syllabus: Simplify language to clarify core system distinctions, ensuring novice learners grasp accessible Neuroscience of Change concepts."
                            ]
                        }
                    ]
                },
                {
                    "LOName": "Define negativity bias and its impact on how we perceive change",
                    "LOScore": 4.46,
                    "LORecommendations": [
                        {
                            "TaskName": "Learning Objective Validation",
                            "Severity": "Must Do",
                            "Recommendations": [
                                "Revise syllabus; add a foundational activity defining negativity bias, ensuring comprehension before application to organizational change scenarios."
                            ]
                        }
                    ]
                }
            ],
            "ItemLevel": [
                {
                    "ItemName": "Conditioning",
                    "ItemType": "Video",
                    "ItemScore": 4.13,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Enhance contextual coherence by adding real-world scenarios illustrating survival system mechanics",
                                "Reinforce keyword relevance by consistently defining core survival system terminology for objectives"
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Course Introduction",
                    "ItemType": "Video",
                    "ItemScore": 3.86,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Enhance keyword relevance by incorporating 4–5 key neuroscience terms for objectives",
                                "Expand explanations to define key terms and their significance to the objective"
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Module Introduction",
                    "ItemType": "Video",
                    "ItemScore": 3.1,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Integrate key terms for LO2 and LO5 to strengthen keyword relevance across objectives",
                                "Expand on paradox/contrast with 2–3 examples to improve LO3 and LO4 coverage"
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Negativity Bias",
                    "ItemType": "Video",
                    "ItemScore": 3.51,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Expand explanation of 'survival system' mechanics, integrating 4–5 key terms for relevance",
                                "Enhance keyword relevance by explicitly defining key terms related to 'survival system'"
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Agile Workbook",
                    "ItemType": "Reading",
                    "ItemScore": 2.71,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Expand negativity bias explanation using 2–3 examples showing influence on change perception",
                                "Enhance keyword relevance by defining 'cognitive distortions' and 'confirmation bias' within change management"
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Get help and meet other learners. Join your Community!",
                    "ItemType": "Reading",
                    "ItemScore": 3.45,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Expand explanation of mirror neurons facilitating stimulus interpretation to directly support objectives.",
                                "Integrate 2–3 concrete examples defining key terms related to stimulus processing objectives."
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Maslow's Hierarchy of Needs and Panksepp’s 7 Emotional Syste",
                    "ItemType": "Reading",
                    "ItemScore": 3.44,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Define 4–5 key survival system terms, connecting mechanics and purpose to objectives",
                                "Enhance contextual coherence by adding 2–3 examples illustrating mechanics' contribution to survival"
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Videos on Maslow's Hierarchy Of Needs",
                    "ItemType": "Reading",
                    "ItemScore": 3.56,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Expand explanation by adding 2–3 concrete examples of system mechanics in action",
                                "Define 4–5 key survival system terms to improve keyword relevance for LO1"
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "ModuleName": "Deconstructing Your Fears",
            "ModuleRecommendations": [
                {
                    "TaskName": "Course Outline Validation",
                    "TaskScore": 4.15,
                    "Severity": "Good To Do",
                    "Recommendations": [
                        "Add hands-on activities to deepen the initial objective about change and fear.",
                        "Improve module flow by refining topic sequence to build upon previous items."
                    ]
                }
            ],
            "LOLevel": [
                {
                    "LOName": "Understand where you are with change, deconstruct fears and identify a path forward",
                    "LOScore": 4.17,
                    "LORecommendations": [
                        {
                            "TaskName": "Learning Objective Validation",
                            "Severity": "Must Do",
                            "Recommendations": [
                                "Revise the syllabus to include application-based activities enabling learners to utilize deconstruction techniques when managing their fears effectively."
                            ]
                        }
                    ]
                },
                {
                    "LOName": "Explain what Envisioning is used for and apply it to personal transformation around change",
                    "LOScore": 4.22,
                    "LORecommendations": [
                        {
                            "TaskName": "Learning Objective Validation",
                            "Severity": "Must Do",
                            "Recommendations": [
                                "Revise syllabus to require a detailed action plan, using envisioning, for improved application and demonstrable understanding of techniques."
                            ]
                        }
                    ]
                }
            ],
            "ItemLevel": [
                {
                    "ItemName": "Deconstructing Fears",
                    "ItemType": "Video",
                    "ItemScore": 4.19,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Enhance keyword relevance by explicitly defining and consistently using key terms for objectives",
                                "Expand WSC modeling explanation with 2–3 examples showing how it dis-empowers fear"
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Key Concepts of Module 2",
                    "ItemType": "Video",
                    "ItemScore": 4.01,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Expand key terms defining 'deconstructing fears' and 'identifying a path forward' for LO1",
                                "Enhance LO4 by explaining 'WSC modeling' and incorporating related key terms consistently"
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Module Introduction",
                    "ItemType": "Video",
                    "ItemScore": 3.81,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Enhance keyword relevance by explicitly defining 'change,' 'fear,' and 'path forward' terms.",
                                "Expand explanations connecting 'change,' 'fear,' and 'path forward' to deepen conceptual understanding."
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Tips For Success",
                    "ItemType": "Video",
                    "ItemScore": 4.28,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Enhance LO1 and LO2 by explicitly defining keywords and expanding core principles",
                                "For LO4, add comparative analysis of WSC modeling to other techniques"
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Agile Workbook - Envisioning",
                    "ItemType": "Reading",
                    "ItemScore": 3.77,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Expand key envisioning terms with definitions to reinforce personal transformation learning objectives.",
                                "Enhance content by adding 2–3 concrete examples linking envisioning to personal change."
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Agile Workbook - Mind-mapping",
                    "ItemType": "Reading",
                    "ItemScore": 4.23,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Incorporate 4–5 key mind-mapping terms, defining their application to improve keyword relevance.",
                                "Expand mind-mapping techniques coverage, linking practical applications to stated learning objectives."
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Agile Workbook - WCS Modeling",
                    "ItemType": "Reading",
                    "ItemScore": 3.32,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Integrate 4–5 key WSC modeling and fear terms to enhance keyword relevance",
                                "Expand WSC modeling examples showing direct modification of fear-related thought patterns"
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "ModuleName": "Building a New Mindset",
            "ModuleRecommendations": [
                {
                    "TaskName": "Course Outline Validation",
                    "TaskScore": 4.04,
                    "Severity": "Good To Do",
                    "Recommendations": [
                        "Increase depth for learning objectives with lower depth scores by adding hands-on activities.",
                        "Improve topic diversity by adding labs for more complex concepts within the module."
                    ]
                }
            ],
            "LOLevel": [
                {
                    "LOName": "Define the four stories we tell ourselves and identify the ones you are using the most",
                    "LOScore": 4.33,
                    "LORecommendations": [
                        {
                            "TaskName": "Learning Objective Validation",
                            "Severity": "Must Do",
                            "Recommendations": [
                                "Revise syllabus to add examples; simplify language in readings for better understanding of self-narratives, addressing instructor feedback."
                            ]
                        }
                    ]
                }
            ],
            "ItemLevel": [
                {
                    "ItemName": "Anchoring",
                    "ItemType": "Video",
                    "ItemScore": 4.45,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Expand definitions of 'tools,' 'reframing,' and 'anchoring' to enhance keyword relevance for LO1",
                                "Consider adding 2–3 examples showing how tools shift mindsets, supporting LO1"
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Key Concepts of Module 3",
                    "ItemType": "Video",
                    "ItemScore": 4.46,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Enhance keyword relevance by explicitly defining key terms for the 'four stories'",
                                "Expand 're-designing' steps with relevant terminology, aligning with learning objective three"
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Module Introduction",
                    "ItemType": "Video",
                    "ItemScore": 4.27,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Enhance keyword relevance by explicitly defining 4–5 key agile leader mindset terms.",
                                "Expand contextual coherence by adding 2–3 concrete examples illustrating the agile leader mindset."
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "PDSA Cycle",
                    "ItemType": "Video",
                    "ItemScore": 4.41,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Expand content to explicitly map PDSA phases to leader transformation plan design",
                                "Provide 2–3 PDSA cycle examples addressing specific leadership challenges to enhance application"
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Reframing",
                    "ItemType": "Video",
                    "ItemScore": 4.33,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Enhance LO1/LO2 by adding 4-5 key terms related to reframing/anchoring",
                                "Expand explanation of core concepts in LO1/LO2 to improve coverage completeness"
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Stories We Tell Ourselves",
                    "ItemType": "Video",
                    "ItemScore": 3.64,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Enhance keyword relevance by explicitly defining each story type with examples.",
                                "Reinforce contextual coherence by consistently using defined terms throughout the module."
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Agile Workbook - Anchoring",
                    "ItemType": "Reading",
                    "ItemScore": 3.9,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Expand explanations using 'reframing' and 'anchoring' keywords to reinforce learning objectives",
                                "Enhance content with 2–3 examples of tools building new mindsets and states"
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Agile Workbook - PDSA Cycle",
                    "ItemType": "Reading",
                    "ItemScore": 3.64,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Enhance keyword relevance by integrating 4–5 leadership terms related to the PDSA cycle.",
                                "Expand explanation with 2–3 PDSA cycle examples addressing specific leadership challenges for LO1."
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Agile Workbook - Personal Story",
                    "ItemType": "Reading",
                    "ItemScore": 3.28,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Strengthen keyword relevance by explicitly defining each story type for learning objective 1",
                                "Improve contextual coherence by relating stories to common personal narratives, aligning objectives"
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Agile Workbook - Progress Log (Tracker)",
                    "ItemType": "Reading",
                    "ItemScore": 3.37,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Integrate 4–5 key agile leadership terms to reinforce the 'agile leader mindset' objective.",
                                "Add 2–3 examples illustrating agile leader mindset to improve contextual understanding of objectives."
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Agile Workbook - Reframing",
                    "ItemType": "Reading",
                    "ItemScore": 4.02,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Expand definitions of 'reframing,' 'anchoring,' and 'peak states' to reinforce keyword relevance",
                                "Enhance mindset/change explanation with 2–3 concrete examples for learning objective alignment"
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "ModuleName": "Leader Self-Care",
            "ModuleRecommendations": [
                {
                    "TaskName": "Course Outline Validation",
                    "TaskScore": 4.02,
                    "Severity": "Good To Do",
                    "Recommendations": [
                        "Enhance the positive psychology section with more items to strengthen the foundational understanding.",
                        "Better link reflection tools to agile leader transformation context with a hands-on activity."
                    ]
                }
            ],
            "LOLevel": [],
            "ItemLevel": [
                {
                    "ItemName": "Key Concepts Module 4",
                    "ItemType": "Video",
                    "ItemScore": 4.4,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Enhance keyword relevance by explicitly defining 'source of energy' for LO2.",
                                "Ensure key terms are consistently used and defined within the content for LOs 1,3,4,5."
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Module Introduction",
                    "ItemType": "Video",
                    "ItemScore": 3.1,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Integrate key positive psychology terms to strengthen keyword relevance to learning objectives",
                                "Add concrete examples illustrating personal transformation to enhance contextual coherence with objectives"
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Positive Psychology",
                    "ItemType": "Video",
                    "ItemScore": 3.68,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Enhance energy sources LO by explicitly defining key terms and actionable identification steps.",
                                "Expand stillness LO with 2-3 practice examples and defined benefits for clarity."
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Agile Workbook - Character Strengths",
                    "ItemType": "Reading",
                    "ItemScore": 2.98,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Integrate direct examples illustrating positive psychology principles for personal transformation to meet objectives.",
                                "Enhance keyword relevance by defining and consistently using key terms related to objectives."
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Agile Workbook - Daily Reflection",
                    "ItemType": "Reading",
                    "ItemScore": 3.92,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Enhance key term definitions (e.g., active listening) to support reflection tool objectives",
                                "Expand agile leader transformation scenarios demonstrating reflection tool application for objective alignment"
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Agile Workbook - Gratitude",
                    "ItemType": "Reading",
                    "ItemScore": 4.08,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Enhance keyword relevance by incorporating 'mindfulness,' 'appreciation,' and 'positive affirmation' terms",
                                "Expand explanation of conceptual connections between gratitude and personal transformation objectives"
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Agile Workbook - Stillness",
                    "ItemType": "Reading",
                    "ItemScore": 4.13,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Enhance keyword relevance by incorporating 2–3 key terms related to stillness",
                                "Reinforce the benefits of stillness by consistently using these terms throughout explanation"
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Agile Workbook - Your Source of Energy",
                    "ItemType": "Reading",
                    "ItemScore": 4.31,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Enhance keyword relevance by defining 4-5 key terms related to energy sources.",
                                "Incorporate actionable steps consistently throughout content to better align with learning objectives."
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "ModuleName": "Building Resilience",
            "ModuleRecommendations": [
                {
                    "TaskName": "Course Outline Validation",
                    "TaskScore": 3.4,
                    "Severity": "Good To Do",
                    "Recommendations": [
                        "Enhance action plan objective with more hands-on activities and items to increase depth.",
                        "Strengthen module's connection to the course by clarifying relevance across all items and assignments."
                    ]
                }
            ],
            "LOLevel": [
                {
                    "LOName": "Practice new experiences to build change-tolerance in low-stakes environments",
                    "LOScore": 4.49,
                    "LORecommendations": [
                        {
                            "TaskName": "Learning Objective Validation",
                            "Severity": "Must Do",
                            "Recommendations": [
                                "To improve the syllabus, clarify the assignment instructions, ensuring novice learners grasp key concepts before application in practice."
                            ]
                        }
                    ]
                }
            ],
            "ItemLevel": [
                {
                    "ItemName": "Action",
                    "ItemType": "Video",
                    "ItemScore": 4.36,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Integrate 4–5 key terms related to action plan design for keyword relevance.",
                                "Expand explanation of personalized action plan elements to improve coverage completeness."
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Daily Rituals",
                    "ItemType": "Video",
                    "ItemScore": 3.94,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Enhance keyword relevance by defining and consistently using 4–5 key action-plan terms.",
                                "Strengthen coherence by adding 2–3 concrete examples applying keywords in action-plan scenarios."
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Power of Association Pleasure and Pain",
                    "ItemType": "Video",
                    "ItemScore": 4.35,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Expand explanations of change resiliency concepts to strengthen semantic alignment with learning objectives.",
                                "Consider adding detailed examples to improve coverage completeness and reinforce change resiliency objectives."
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Agile Workbook - Daily Rituals",
                    "ItemType": "Reading",
                    "ItemScore": 2.14,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Explicitly define key terms related to change resiliency for learning objective one",
                                "Strengthen LO2 by adding real-world scenarios where change-tolerance can be practiced"
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Agile Workbook - New Experiences",
                    "ItemType": "Reading",
                    "ItemScore": 3.5,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Enhance keyword relevance by defining 4–5 key terms related to change-tolerance.",
                                "Expand contextual coherence by adding 2–3 examples illustrating change-tolerance in practice."
                            ]
                        }
                    ]
                },
                {
                    "ItemName": "Agile Workbook - Setting Boundaries",
                    "ItemType": "Reading",
                    "ItemScore": 3.1,
                    "ItemRecommendations": [
                        {
                            "TaskName": "Content to LO Matching Validation",
                            "Severity": "Good To Do",
                            "Recommendations": [
                                "Expand pitfall content with 2–3 real-world examples illustrating each pitfall for objectives",
                                "Define key agile terms and compare leadership styles to enhance objective understanding"
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

export const getCourseData = (slug: string): CourseData => {
    const title = slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

    // Return a clone with the correct title
    return {
        ...AGILE_LEADER_DATA,
        CourseName: title
    };
};
