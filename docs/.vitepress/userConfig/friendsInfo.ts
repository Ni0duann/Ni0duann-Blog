export interface Friend {
  avatar?: string // 头像链接
  name: string // 用户 id
  link: string // 博客链接
  title?: string // 用户头衔
  tag?: string // 用户标签
  color?: string // 标签颜色
  isMe?: boolean // 是否是自己
}

export const friendsInfo: Friend[] = [
  {
    avatar:
      'https://avatars.githubusercontent.com/u/146628596?s=400&u=fa05f92d95a76a7cd6a01c05c86768e8c8a70243&v=4',
    name: 'Ni0duann',
    title: '努力努力再努力',
    tag: 'Front-End Developer',
    link: '欢迎交换友链！可参考此处信息',
    color: 'sky',
    isMe: true
  },
  {
    avatar: 'https://blog.zbwer.work/assets/avatar.BTzuv0Gg.jpg',
    name: 'zbwer',
    title: '地球其实只是一个柯基的屁股',
    tag: 'Front-End Developer',
    link: 'https://blog.zbwer.work',
    color: 'sky'
  }
]
