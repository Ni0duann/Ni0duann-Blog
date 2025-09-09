interface Project {
  banner: string; // 图片链接
  title: string; // 项目标题
  description: string; // 项目简介
  link: string; // 项目链接
  tag?: string; // 项目标签
}

/**
 * TODO: 缺项处理
 * 在此处填写你的项目介绍
 */
export const projectsInfo: Project[] = [
  // {
  //   banner: '/project-img/gpt-feishu.png',
  //   title: 'Feishu&ChatGPT',
  //   description: '将 chatGPT 接入飞书对话机器人，支持上下文对话与人格预设，并使用aircode一键部署',
  //   link: 'https://github.com/ZbWeR/feishu-chatGPT-plus-aircode',
  //   tag: 'JavaScript'
  // },
];
