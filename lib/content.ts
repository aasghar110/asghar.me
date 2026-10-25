export const person = {
  name: "Ali Asghar",
  title: "Software Engineer",
  location: "Karachi, Pakistan",
  email: "aasghar5445@gmail.com",
  github: "https://github.com/aasghar110",
  linkedin: "https://www.linkedin.com/in/asghar110/",
  employer: "Digital Dividend Global",
  // User-approved portrait; the source is preserved in assets/portraits/.
  portrait: "/images/ali-asghar-navy-polo.webp" as string | null,
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export type Project = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  tags: string[];
  visual: "invo" | "security" | "kidz" | "education" | "investment";
  role: string;
  context: string;
  goal: string;
  contributions: string[];
  technical: string;
  consideration: string;
  link?: string;
  confidential?: boolean;
};

export const projects: Project[] = [
  {
    slug: "invo-pk",
    name: "Invo.pk",
    category: "Full-stack · Independent product",
    summary:
      "Sales, stock, and accounts. One connected workspace for Pakistani businesses.",
    tags: [".NET", "React", "SaaS"],
    visual: "invo",
    role: "Independent development",
    context: "POS, inventory & accounts",
    goal: "Bring everyday billing, stock management, and customer accounts into one product that businesses can use from a phone, tablet, or computer.",
    contributions: [
      "Independently developed the product, bringing backend workflows and the customer-facing application together.",
      "Built connected workflows for sales, inventory, and accounts.",
      "Worked across the application experience, from business setup to day-to-day operations.",
    ],
    technical:
      "The application brings a .NET backend and React interface together. Its public product includes branch management, staff access, reporting, and multilingual workflows.",
    consideration:
      "A sale is more than a receipt: it also changes stock and customer balances. The product is organized around these connected business tasks, with a consistent experience across screen sizes.",
    link: "https://invo.pk/",
  },
  {
    slug: "security-operations",
    name: "Security operations",
    category: "Professional work · Anonymized",
    summary:
      "Making everyday guard operations easier to coordinate and follow through.",
    tags: [".NET", "Angular", "Operations"],
    visual: "security",
    confidential: true,
    role: "Software engineering contribution",
    context: "Workforce operations",
    goal: "Support the daily coordination of guard assignments, rosters, and operational checks in a security management application.",
    contributions: [
      "Contributed to a .NET application for security operations.",
      "Worked on guard rostering and check-call verification workflows.",
      "Collaborated with the engineering team on application structure and feature implementation.",
    ],
    technical:
      "Professional work involving .NET and Angular. Client identity, internal services, deployment details, and proprietary architecture are intentionally excluded from this overview.",
    consideration:
      "Operational interfaces need to make the next task clear. This overview highlights the problem domain; the accompanying diagram is conceptual and does not represent the client's internal architecture.",
  },
  {
    slug: "kidzsearch",
    name: "KidzSearch",
    category: "Final-year project · Mobile & web",
    summary:
      "A final-year project exploring mobile reporting and face matching for missing-child searches.",
    tags: ["Flutter", ".NET", "Dlib"],
    visual: "kidz",
    role: "Final-year project development",
    context: "Hamdard University",
    goal: "Explore a reporting and review workflow that connects missing-child reports with potential sightings, supported by face-matching technology.",
    contributions: [
      "Developed a cross-platform mobile reporting experience using Flutter.",
      "Worked on a .NET backend and Dlib-based face-matching functionality.",
      "Connected reporting with an administrative review workflow.",
    ],
    technical:
      "Built with Flutter for mobile reporting, a .NET backend, and Dlib for face matching. Reporting and administrative review were connected as part of the final-year project.",
    consideration:
      "Face matching suggests potential connections between a report and a sighting. Keeping the reporting context alongside those suggestions helps make the review process understandable.",
  },
  {
    slug: "education-platform",
    name: "Education platform",
    category: "Professional work · Anonymized",
    summary:
      "Backend feature development and maintenance for an educational management platform.",
    tags: ["Backend systems", "Education"],
    visual: "education",
    confidential: true,
    role: "Backend engineering contribution",
    context: "Educational management",
    goal: "Support an existing platform as its education and administrative workflows evolve.",
    contributions: [
      "Developed and maintained backend features within an existing engineering team.",
      "Investigated issues and contributed fixes to application workflows.",
      "Worked with connected services in the education domain.",
    ],
    technical:
      "Backend feature development and maintenance for an established education platform. This anonymized overview focuses on the work; client-specific systems and internal architecture remain private.",
    consideration:
      "Extending an established system means understanding existing behavior before making changes. Maintenance and feature work need to fit the surrounding application and its users.",
  },
  {
    slug: "investment-portal",
    name: "Investment portal",
    category: "Professional work · Anonymized",
    summary:
      "A web application connecting business profiles with investment workflows.",
    tags: ["Node.js", "React", "Full-stack"],
    visual: "investment",
    confidential: true,
    role: "Full-stack engineering contribution",
    context: "Business & investment",
    goal: "Help businesses and investors work through information gathering and review in a shared web application.",
    contributions: [
      "Contributed to a web application using Node.js and React.",
      "Built application features spanning the interface and backend.",
      "Worked on business and investment-related application workflows.",
    ],
    technical:
      "A full-stack web application using Node.js and React. Client information, internal integrations, delivery timelines, and proprietary implementation details are excluded.",
    consideration:
      "A useful portal helps people understand what information is needed and what comes next. The visual is an illustrative relationship map, not a representation of proprietary matching logic.",
  },
];

export const experience = [
  {
    company: "Digital Dividend Global",
    role: "Software Engineer",
    start: "2024-10",
    end: null,
    dates: "Oct 2024 — Present",
    summary:
      "Building and maintaining applications across backend systems, full-stack products, and CMS-based platforms.",
    contributions: [
      "Develop and maintain backend and full-stack application features.",
      "Contribute to applications across education, operations, and business workflows.",
      "Work with teammates to investigate issues, integrate features, and improve existing systems.",
    ],
    technologies: [
      ".NET",
      "Spring Boot",
      "Node.js",
      "React",
      "Angular",
      "Umbraco",
    ],
  },
  {
    company: "GentecSoft",
    role: "Associate Software Engineer",
    start: "2023-06",
    end: "2024-09",
    dates: "Jun 2023 — Sep 2024",
    summary:
      "Worked on business software, including ERP modernization and logistics applications.",
    contributions: [
      "Contributed to moving legacy ERP modules to a web application.",
      "Developed application features with .NET Core and Blazor WebAssembly.",
      "Worked on logistics tracking and digital approval workflows.",
    ],
    technologies: [".NET Core", "Blazor", "Angular", "SQL"],
  },
];

export const strengths = [
  {
    name: "Backend engineering",
    description:
      "My primary focus: application logic, APIs, and the systems behind the interface.",
    tools: ".NET / ASP.NET Core · Java / Spring Boot · Node.js / Express",
  },
  {
    name: "Full-stack development",
    description:
      "Connecting clear interfaces with the services and data that make them useful.",
    tools: "React · Next.js · Angular",
  },
  {
    name: "Platforms & content",
    description:
      "Working within established platforms and adapting them to the problem at hand.",
    tools: "Supabase · Umbraco · Sitefinity",
  },
  {
    name: "Cloud & delivery",
    description:
      "Experience working with cloud environments and repeatable infrastructure workflows.",
    tools: "AWS · Azure · OCI · Infrastructure as Code",
  },
];
