export type Detail = { title: string; body: string };

export type ResumeEntry = {
  id: string;
  period: string;
  title: string;
  organization: string;
  description: string;
};

// Confirmed work experience and education.
export const experience: (ResumeEntry & { highlights: string[] })[] = [
  {
    id: "latest-role",
    period: "February 2024 — Present",
    title: "Senior Software Engineer I",
    organization: "Nanoinsure · Hong Kong",
    description:
      "Building the next generation of insurance technology through backend engineering, conversational AI, and intelligent workflow integration.",
    highlights: [
      "Engineered core backend capabilities for a leading Hong Kong insurer’s point-of-sale (POS) platform, spanning the end-to-end sales journey—from financial needs analysis (FNA) and sales illustrations to policy applications and payments.",
      "Integrated conversational AI into the insurance POS ecosystem, embedding chatbot capabilities directly within the digital sales experience.",
      "Developed AI-enabled communication workflows for Aibora, bringing artificial intelligence into dealer email interactions and communication logging.",
      "Contributed to Aibora’s intelligent comparison capabilities, applying AI to the analysis and comparison of insurance sales illustrations.",
    ],
  },
  {
    id: "previous-role",
    period: "December 2022 — December 2023",
    title: "Software Engineer I",
    organization: "New Galaxy Ltd · Hong Kong",
    description:
      "Delivered full-stack software development for metaverse projects, bringing immersive digital experiences to life.",
    highlights: [
      "Contributed across frontend and backend development to build metaverse applications.",
      "Independently developed reward-based mini-games for company promotional campaigns, creating gamified experiences that connected interactive play with reward opportunities.",
    ],
  },
];

export const education: ResumeEntry[] = [
  {
    id: "purdue-masters",
    period: "August 2017 — August 2019",
    title: "Master of Science in Environmental and Ecological Engineering",
    organization: "Purdue University, West Lafayette",
    description:
      "Expanded an engineering foundation through graduate study in environmental and ecological engineering.",
  },
  {
    id: "purdue-computer-engineering",
    period: "August 2013 — August 2017",
    title: "Bachelor of Science in Computer Engineering",
    organization: "Purdue University, West Lafayette",
    description:
      "Built a foundation in computer engineering before pursuing further interdisciplinary engineering studies.",
  },
];

export const contact: Detail = {
  title: "Your next conversation starts here.",
  body: "This sample is ready for your email address or preferred social profile. Once you choose a contact method, this button can open it directly. No messages are sent from this draft.",
};
