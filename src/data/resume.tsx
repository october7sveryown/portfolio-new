import { Icons } from "@/components/icons";
import  MyImage  from "../../public/landthatjob_screen.png";
import  MyImage2  from "../../public/2.png";
import  MyImage3  from "../../public/3.png";

export const DATA = {
  name: "Yash Thaker",
  initials: "YT",
  url: "https://yashthaker.dev",
  location: "Toronto, ON",
  locationLink: "https://www.google.com/maps/place/sanfrancisco",
  description:
    "Software Engineer. I like building apps and working out.",
  summary:
    "4+ years of experience in tech building cool stuff. Moved to Toronto in 2023 to follow my dreams. Launched my first SaaS in 2024 but failed miserably, however that hasn't stopped me from building more.",
  avatarUrl: "/profile-pic.png",
  skills: [
    "Java",
    "Spring Boot",
    "Angular",
    "React",
    "Next.js",
    "Typescript",
    "Python",
    "Docker",
    "Kubernetes",
    "AWS"
  ],
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
        "My first SaaS app. Generates Resume score, professional summary, cover letters and extracts skills using Generative AI. 25+",
      technologies: [
        "Next.js",
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
        "RAG app to chat with my resume.",
      technologies: [
       "Python",
       "Langchain",
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
