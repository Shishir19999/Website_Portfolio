import {
  FaBug, FaCheck, FaRepeat, FaMagnifyingGlass, FaClipboardCheck, FaRobot, FaDatabase,
  FaShieldHalved, FaCode, FaWrench, FaPlug, FaJava, FaGithub, FaLinkedinIn, FaMoon, FaSun,
  FaArrowUp, FaDownload, FaLocationDot, FaGraduationCap, FaBriefcase, FaArrowUpRightFromSquare,
  FaPrint, FaBars, FaXmark, FaGithubAlt, FaFolderOpen, FaFileLines, FaPenRuler,
} from 'react-icons/fa6'
import {
  SiSelenium, SiCypress, SiApachemaven, SiPostman, SiMysql, SiDbeaver, SiApachejmeter,
  SiFigma, SiPrisma, SiTailwindcss, SiBootstrap, SiBurpsuite, SiK6, SiOwasp, SiMongodb,
  SiGit, SiHtml5, SiExpress, SiNextdotjs, SiTypescript, SiJavascript, SiReact, SiNodedotjs, SiJson,
} from 'react-icons/si'

const map = {
  bug: FaBug, check: FaCheck, repeat: FaRepeat, search: FaMagnifyingGlass, clipboard: FaClipboardCheck,
  robot: FaRobot, database: FaDatabase, shield: FaShieldHalved, code: FaCode, wrench: FaWrench,
  api: FaPlug, java: FaJava, github: FaGithub, linkedin: FaLinkedinIn, moon: FaMoon, sun: FaSun,
  up: FaArrowUp, download: FaDownload, pin: FaLocationDot, education: FaGraduationCap,
  work: FaBriefcase, external: FaArrowUpRightFromSquare, print: FaPrint, menu: FaBars, close: FaXmark,
  source: FaGithubAlt, projects: FaFolderOpen, doc: FaFileLines, design: FaPenRuler,
  selenium: SiSelenium, cypress: SiCypress, maven: SiApachemaven, postman: SiPostman, mysql: SiMysql,
  dbeaver: SiDbeaver, jmeter: SiApachejmeter, figma: SiFigma, prisma: SiPrisma, tailwind: SiTailwindcss,
  bootstrap: SiBootstrap, burp: SiBurpsuite, k6: SiK6, owasp: SiOwasp, mongodb: SiMongodb, git: SiGit,
  html5: SiHtml5, express: SiExpress, nextjs: SiNextdotjs, typescript: SiTypescript,
  javascript: SiJavascript, react: SiReact, nodejs: SiNodedotjs, json: SiJson,
}

export function Icon({ name, ...props }) {
  const Cmp = map[name] || FaCheck
  return <Cmp aria-hidden="true" focusable="false" {...props} />
}
