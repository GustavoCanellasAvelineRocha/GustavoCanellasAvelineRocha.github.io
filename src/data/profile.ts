export type Image = { src: string; alt: string; width: number; height: number; position?: string }

export type Project = {
  id: string
  image?: Image
  title: string
  subtitle?: string
  description: string
  highlights: string[]
  result?: string
  tech: string[]
  areas: string[]
  context?: string
  repoUrl?: string
  liveUrl?: string
  featured?: boolean
}

export type Experience = {
  company: string
  image?: Image
  client?: string
  role: string
  location: string
  start: string
  end?: string
  note?: string
  summary?: string
  highlights: string[]
}

export type Award = {
  title: string
  issuer: string
  date: string
  description?: string
}

export type SkillGroup = { category: string; items: string[] }

export type Education = { institution: string; degree: string; start: string; end: string }

export type Language = { name: string; level: string }

export type Profile = {
  name: string
  shortName: string
  headline: string
  tagline: string
  about: string[]
  location: string
  photo?: Image
  cv?: string
  links: { github: string; linkedin: string; email: string }
  stats: { value: string; label: string }[]
  skills: SkillGroup[]
  projects: Project[]
  experience: Experience[]
  awards: Award[]
  education: Education[]
  certifications: string[]
  languages: Language[]
}

export const profile: Profile = {
  name: 'Gustavo Cañellas Aveline Rocha',
  shortName: 'Gustavo Aveline',
  headline: 'Full-stack Developer',
  tagline:
    'I build enterprise systems with Java/Spring Boot and React/TypeScript, from Kafka-driven microservices to cloud-native deployments.',
  about: [
    "I'm a Full-stack Developer with 3 years of experience, currently at Instituto de Pesquisas Eldorado, embedded in Dell Technologies' global engineering organization alongside teams in the US, India, Romania and Ireland.",
    'My day-to-day is Kafka-driven microservices, AWS, Kubernetes and production observability with Splunk and Grafana, plus back-end automation that takes manual work off people\'s plates.',
    "I use AI coding tools every day (Claude Code, GitHub Copilot, Windsurf/Devin) and I'm leading my team's adoption of Spec-Driven Development across multiple AI agents.",
    'I hold a Bachelor’s in Information Systems from PUCRS, where my thesis benchmarked Transformer models against traditional approaches for stock forecasting.',
  ],
  location: 'Porto Alegre, RS, Brazil',
  photo: {
    src: '/images/speech-speaking.jpg',
    alt: 'Gustavo Aveline giving the graduation speech at PUCRS',
    width: 960,
    height: 1200,
    position: '50% 40%',
  },
  links: {
    github: 'https://github.com/GustavoCanellasAvelineRocha',
    linkedin: 'https://www.linkedin.com/in/gustavo-aveline',
    email: 'gustavoaveline@gmail.com',
  },
  stats: [
    { value: '3+', label: 'years building enterprise software' },
    { value: '4', label: 'graduation awards, including Best Thesis' },
    { value: '10/10', label: 'final grade of my thesis' },
    { value: '4', label: 'countries on my current teams' },
  ],
  skills: [
    { category: 'Back-end', items: ['Java 8/11/17/21', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'Hibernate', 'Maven', 'Gradle', 'Node.js', 'C# / .NET'] },
    { category: 'APIs & Architecture', items: ['REST API Design', 'Swagger/OpenAPI', 'Microservices', 'Kafka', 'Event-Driven Architecture', 'Design Patterns'] },
    { category: 'Front-end', items: ['React', 'Redux', 'Context API', 'TypeScript', 'Angular', 'Micro-Frontends', 'Styled-Components', 'Material-UI', 'Bootstrap', 'SCSS'] },
    { category: 'Databases', items: ['Oracle SQL', 'PostgreSQL', 'MySQL', 'MongoDB'] },
    { category: 'Cloud & DevOps', items: ['Docker', 'Podman', 'Kubernetes', 'Helm', 'PCF', 'AWS (EC2, S3)', 'GitLab CI/CD', 'JFrog Artifactory', 'Snyk', 'Git'] },
    { category: 'Testing & Observability', items: ['JUnit 5', 'Mockito', 'Integration Testing', 'Jest', 'React Testing Library', 'Splunk', 'Grafana'] },
    { category: 'AI', items: ['Claude Code', 'GitHub Copilot', 'Windsurf/Devin', 'Spec-Driven Development', 'Prompt Engineering', 'AI Code Review'] },
    { category: 'Data & ML', items: ['Python', 'pandas', 'PyTorch', 'TensorFlow'] },
  ],
  projects: [
    {
      id: 'thesis-forecasting',
      image: {
        src: '/images/thesis-defense.jpg',
        alt: 'Gustavo with the thesis committee in front of the title slide of his thesis defense at PUCRS',
        width: 1600,
        height: 999,
      },
      title: 'Transformers vs. Traditional Models for Stock Forecasting',
      subtitle: 'Undergraduate thesis',
      context: 'PUCRS',
      description:
        "Benchmarked ARIMA, LSTM (TensorFlow), PatchTST (PyTorch) and Google's TimesFM foundation model on 10 years of B3 stock data (VALE3, ABEV3, ITUB4), evaluated with MAPE, MSE, RMSE and MASE.",
      highlights: [
        'Reproducible Python pipeline for data collection, cleaning and normalization',
        'Isolated Conda environments per model; fundamental indicators tested as covariates',
      ],
      result: 'Graded 10 out of 10 and named the best thesis of the Information Systems program. PatchTST had the lowest error on all three stocks.',
      tech: ['Python', 'PyTorch', 'TensorFlow', 'pandas'],
      areas: ['Data & AI'],
      featured: true,
    },
    {
      id: 'ages-stress',
      image: {
        src: '/images/ages-team.jpg',
        alt: 'The AGES team that built the stress management app, in a PUCRS classroom',
        width: 800,
        height: 797,
      },
      title: 'Stress Management App',
      subtitle: 'AGES IV Project Lead',
      context: 'Experimental Software Engineering Agency, PUCRS',
      description:
        'Led a team through the end-to-end development of an application based on a WHO protocol for stress management, owning planning, prototyping and architecture.',
      highlights: [
        'Supported other teams technically, ran agile ceremonies and reviewed code',
        'Presented progress in client meetings',
      ],
      result: 'Led planning, prototyping and architecture, and was the person the team turned to with technical questions.',
      tech: ['React', 'Tailwind', 'Java', 'Spring Boot', 'PostgreSQL', 'AWS'],
      areas: ['Front-end', 'Backend', 'Cloud & DevOps'],
    },
  ],
  experience: [
    {
      company: 'Instituto de Pesquisas Eldorado',
      image: {
        src: '/images/eldorado.jpg',
        alt: 'Gustavo in front of the Eldorado logo at the office',
        width: 480,
        height: 403,
      },
      client: 'Dell Technologies',
      role: 'Full-stack Developer',
      location: 'Porto Alegre, RS, Brazil',
      start: 'Aug 2025',
      summary:
        "Mid-level developer across three global teams (US, India, Romania, Ireland) in Dell's engineering organization: Kafka/Spring Boot platform development, Kubernetes migration and observability tooling.",
      highlights: [
        'Develop and maintain RESTful APIs in Java and Spring Boot for a core platform that integrates with other projects through Kafka.',
        'Built an OCR-based document verification service that automates a manual review step.',
        'Piloting Spec-Driven Development (SDD) across multiple AI agents to structure AI-assisted coding workflows.',
        'Migrated Java applications from PCF to Kubernetes, from containerization to autoscaling and CI/CD.',
        'Review merge requests and work directly with Product Owners and UX to refine requirements.',
        'Support the Data Science team with Splunk/Grafana dashboards and Oracle queries, speeding up troubleshooting.',
      ],
    },
    {
      company: 'DBC Company',
      client: 'TicketLog',
      role: 'Full-stack Developer',
      location: 'Porto Alegre, RS, Brazil',
      start: 'Mar 2024',
      end: 'Jul 2025',
      note: 'Promoted from Front-End Intern',
      summary:
        'Contributed across two global teams, modernizing a legacy Java/JSP/ColdFusion platform and building new features on a modern Java/Angular stack.',
      highlights: [
        'Developed enterprise systems in Java and Spring Boot, focusing on RESTful API design, messaging integration and scalable code.',
        'Modernized a legacy Java, JSP and ColdFusion codebase toward clean code principles and current frameworks.',
        'Shipped responsive, modular front-end features on a modern Java and Angular stack.',
        'Refactored 20+ interdependent validation rules from nested if/else into a Chain of Responsibility, each testable and extensible on its own.',
        'Wrote optimized queries and managed schema evolution on Oracle and Sybase transactional systems.',
      ],
    },
    {
      company: 'DBC Company',
      role: 'Front-End Developer Intern',
      location: 'Porto Alegre, RS, Brazil',
      start: 'Dec 2023',
      end: 'Mar 2024',
      highlights: [
        'Completed a 4-month front-end training program: HTML, CSS, JavaScript, TypeScript, React, Angular, Context API and Redux.',
        "Selected by peers as tech lead for the team's final project: defined the architecture, chose the stack and delivered a React/Redux app on time.",
      ],
    },
  ],
  awards: [
    {
      title: 'Best Undergraduate Thesis in Information Systems',
      issuer: 'PUCRS',
      date: '2025',
      description: 'Transformers vs. Traditional Models for Stock Forecasting, graded 10/10 and recognized as the best thesis of the Information Systems program.',
    },
    {
      title: 'Academic Excellence Award',
      issuer: 'PUCRS',
      date: '2025',
      description: 'Awarded for the highest overall GPA in the Information Systems program.',
    },
    {
      title: 'Outstanding Student Award',
      issuer: 'PUCRS',
      date: '2025',
      description: 'Recognized as an outstanding student of the graduating class.',
    },
    {
      title: 'Marcelino Champagnat Award (Friend of the Class)',
      issuer: 'PUCRS',
      date: '2025',
      description: 'Voted by classmates as the student who most helped, supported and befriended others.',
    },
    {
      title: 'AGES IV project lead',
      issuer: 'PUCRS',
      date: '',
      description: 'Led the team that built a WHO-based stress management app and was the go-to person for technical questions.',
    },
    {
      title: 'Promoted from Intern to Full-stack Developer',
      issuer: 'DBC Company',
      date: 'Mar 2024',
      description: 'Promoted after the front-end training program, where peers also elected me tech lead of the final project.',
    },
  ],
  education: [
    {
      institution: 'Pontifícia Universidade Católica do Rio Grande do Sul (PUCRS)',
      degree: "Bachelor's in Information Systems",
      start: 'Mar 2022',
      end: 'Dec 2025',
    },
  ],
  certifications: [
    'Alura: Java, Spring Boot, Docker, Kubernetes',
    'Udemy: Angular, React, Kafka',
    'SCRUM Foundation Professional Certificate (SFPC)',
  ],
  languages: [
    { name: 'Portuguese', level: 'Native' },
    { name: 'English', level: 'Advanced (C1)' },
    { name: 'Spanish', level: 'Conversational' },
  ],
}
