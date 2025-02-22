import { readFileSync, writeFileSync } from 'fs'

const typeToEmojiMap = {
  chore: '🎨',
  feat: '✨',
  fix: '🐛'
}

const COMMIT_EDITING_FILEPATH = process.argv.at(-1)

const inputMsg = readFileSync(COMMIT_EDITING_FILEPATH, 'utf8')

writeFileSync(COMMIT_EDITING_FILEPATH, transform(inputMsg, typeToEmojiMap), 'utf8')

/**
 * 通过将类型前缀替换为相应的表情符号来转换输入消息。
 *
 * @param {string} inputMsg - 以类型前缀开头的输入消息。
 * @param {Object} typeToEmojiMap - 类型前缀与其对应表情符号的映射。
 * @returns {string} - 将类型前缀替换为相应表情符号的转换消息。
 * @throws {Error} - 如果输入消息没有以有效的类型前缀开头，则抛出错误。
 */
function transform(inputMsg, typeToEmojiMap) {
  const [type, emoji] =
    Object.entries(typeToEmojiMap).find(([type]) => inputMsg.startsWith(type)) ?? []

  if (type) {
    return inputMsg.replace(new RegExp(`^${type}`), `${emoji} $&`)
  }

  throw new Error('Invalid type')
}
