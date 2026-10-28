import { Icons } from "@/components/icons";
import  MyImage  from "../../public/landthatjob_screen.png";
import  MyImage2  from "../../public/2.png";
import  MyImage3  from "../../public/3.png";

export const DATA = {
  name: "Yash Thaker",
  initials: "YT",
  url: "https://yashthaker.dev",
  location: "Toronto, ON",
  locationLink: "https://www.google.com/maps/place/Toronto,+ON",
  description:
    "Senior Software Developer (Full Stack & Gen AI), AWS Certified Solutions Architect",
  summary:
    "6+ years of building and shipping production software across Python, TypeScript and Java. I get dopamine hits by shipping apps that solve real-world problems.",
  // Longer than the home page summary; used by the chat assistant.
  about:
    "Full-stack developer with 6+ years of experience designing, building and shipping production software across Python and Java stacks. Currently a Senior Software Developer at FunnelX, building a conversational AI SaaS product with Generative AI and voice features. Before that, spent four years building Java, Spring Boot and Angular full-stack software at MCX, a financial (commodity) exchange. Comfortable across Python, TypeScript and Java, has integrated Gen AI APIs (OpenAI, Gemini) into production applications, and has mentored other developers.",
  avatarUrl: "/profile.webp",
  skills: [
    "Python",
    "Typescript",
    "Java",
    "Generative AI",
    "Langchain",
    "FastAPI",
    "Flask",
    "Spring Boot",
    "Vue.js",
    "Angular",
    "React",
    "Next.js",
    "PostgreSQL",
    "Docker",
    "Kubernetes",
    "GCP",
    "AWS"
  ],
  // The full list, grouped; used by the chat assistant.
  stack: {
    "AI / LLM": "LangChain, crewAI, RAG, prompt engineering, OpenAI and Gemini APIs, vector stores (DeepLake, pgvector)",
    Languages: "Python, Java, TypeScript, JavaScript, SQL",
    Frameworks: "Spring Boot, Flask, FastAPI, Vue, Angular, React, Next.js, Electron, Astro, TailwindCSS",
    "Cloud / DevOps": "GCP, AWS, Docker, Kubernetes, Nginx, CI/CD",
    Databases: "PostgreSQL, MongoDB, Redis, DeepLake",
    Tools: "JIRA, Git, GitHub, Postman, Confluence, IntelliJ",
  },
  certifications: [
    "AWS Certified Solutions Architect – Associate",
    "AWS EKS badge from Amazon (passed a 75%+ assessment)",
    "Docker and Kubernetes Essentials from IBM (passed a 75%+ assessment)",
  ],
  achievements: [
    "Highest performance rating on his team (5.2 out of 6) across 4 years at MCX",
    "Featured in local press for a government project at a state-level hackathon",
  ],
  workAuthorization: "Permanent Resident of Canada",
  interests:
    "Hip-hop and R&B, especially Drake, The Weeknd and Post Malone. His GitHub handle, october7sveryown, is a nod to Drake's OVO (October's Very Own).",
  contact: {
    email: "yashthaker.777@gmail.com",
    tel: "+14373132772",
    social: {
      GitHub: {
        url: "https://github.com/october7sveryown",
        icon: Icons.github,
      },
      LinkedIn: {
        url: "https://www.linkedin.com/in/yash-thaker",
        icon: Icons.linkedin,
      },
      X: {
        url: "https://x.com/itsYash777",
        icon: Icons.x,
      }
    },
  },

  work: [
    {
      company: "FunnelX.ai",
      href: "https://www.funnelx.ai",
      location: "Toronto, Canada",
      title: "Senior Software Developer",
      start: "October 2024",
      end: "Present",
      badges: [],
      logoUrl: "https://funnelx.ai/wp-content/uploads/2025/07/favicon_funnelx.png",
      description: "Building a conversational AI SaaS product with Generative AI and voice features.",
      // Current role: details are confidential and this repo is public, so
      // keep this to the basics. The chat answers from this data.
      highlights: [],

    },
    {
      company: "Aarohana Technologies",
      href: "https://aarohana.tech",
      badges: [],
      location: "Toronto, Canada",
      title: "Freelance Software Developer",
      start: "February 2024",
      end: "September 2024",
      logoUrl: "",
      description:
        "Helping companies leverage AI. Building custom software solutions (Web and mobile apps) for clients.",
      highlights: [
        "Worked remotely as a self-employed freelancer.",
        "Built and launched LandThatJob.tech, an AI app for cover letters and skills extraction from job descriptions (Next.js, LangChain, FastAPI); it reached 40+ users organically.",
        "Built a multi-agent app with crewAI and Groq that generates business and marketing plans from a single prompt, with agents handing work to each other.",
        "Built a RAG prototype, \"Chat with my resume\", using the OpenAI API and LangChain.",
        "Redesigned and launched a website for an interior design client with Astro and TailwindCSS; a custom hosting setup cut their annual hosting costs by 30%.",
      ],
    },
    {
      company: "MCX India",
      href: "https://mcxindia.com",
      badges: [],
      location: "Ahmedabad, India",
      title: "Senior Executive - Technology (Software Engineer)",
      logoUrl: "/mcx.png",
      start: "June 2019",
      end: "August 2023",
      description:
        "Reduced application processing time by 50% by implementing digital processing features for various business processes. Improved application security by adhering to OWASP guidelines and implementing a reverse proxy mechanism using nginx. Ensured seamless migration with zero stakeholder impact by migrating the application from CentOS 8 servers to RHEL servers within a stringent deadline.",
      highlights: [
        "Full-stack developer (Java, Spring Boot, Angular) at a financial exchange for four years.",
        "Built 50+ REST APIs in Spring Boot across multiple business workflows, cutting manual processing time by 50%.",
        "Mentored a junior developer through code reviews and pair programming, helping the team improve delivery timelines by 30%.",
        "Improved security by following OWASP guidelines and setting up an Nginx reverse proxy.",
        "Worked with business and compliance teams to gather requirements and align on system enhancements.",
        "Implemented role-based access control for internal and external users.",
        "Rebuilt several processing workflows into a multi-stage tabular UI and made the application mobile-responsive.",
        "Delivered 10+ reporting features for business and compliance teams.",
        "Migrated the application from CentOS 8 to RHEL servers within a tight deadline, with zero stakeholder impact.",
      ],
    },
    {
      company: "Moodcafe",
      badges: [],
      href: "https://moodcafe.in",
      location: "Ahmedabad, India",
      title: "Software Development Intern (Android)",
      logoUrl: "/moodcafe_logo.jpeg",
      start: "Dec 2018",
      end: "Jan 2019",
      description:
        "Resolved bugs/issues reported by users in the Android application . Created fully functional Android UI components for the mobile app. Improved design of UI components",
      highlights: [],
    },
  ],
  education: [
    {
      school: "L.D College of Engineering",
      href: "https://ldce.ac.in/",
      degree: "Bachelor's Degree of Computer Engineering (BE)",
      logoUrl: "/ldce_logo.png",
      start: "2016",
      end: "2019",
    },
    {
      school: "Nirma University",
      href: "https://nirmauni.ac.in/",
      degree: "Diploma in Computer Engineering",
      logoUrl: "/nirma_uni.png",
      start: "2013",
      end: "2016",
    },

  ],
  projects: [
    {
      title: "Land that job - Land your dream job",
      href: "https://landthatjob.tech",
      dates: "Feb 2024 - Mar 2024",
      active: true,
      description:
        "My first SaaS app. Generates Resume score, professional summary, cover letters and extracts skills using Generative AI. Reached 40+ users organically.",
      technologies: [
        "Next.js",
        "Langchain",
        "FastAPI",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI"
      ],
      links: [
        {
          type: "Website",
          href: "https://landthatjob.tech",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: MyImage,
      video:
        "",
    },
    {
      title: "Business plan generator",
      href: "https://github.com/october7sveryown",
      dates: "April 2024 - April 2024",
      active: true,
      description:
        "Generates a business plan for a business idea using Generative AI and multi-agentic workflow.",
      technologies: [
        "Python",
        "crewAI",
        "Ollama",
        "Llama3",
        "Groq"
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/october7sveryown/crew-ai-starter",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: MyImage2,
      video: "",
    },
    {
      title: "Chat with my Resume",
      href: "https://chat-with-resume-app.streamlit.app/",
      dates: "October 2023 - November 2023",
      active: true,
      description:
        "RAG app that answers questions grounded in my resume data.",
      technologies: [
       "Python",
       "Langchain",
       "OpenAI",
       "Streamlit"
      ],
      links: [
        {
          type: "Website",
          href: "https://chat-with-resume-app.streamlit.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/october7sveryown/chat-with-resume-streamlit",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: MyImage3,
      video: "",
    },
  ],
} as const;
