#!/bin/bash
# 自动提交日志变更的脚本

DATE=$(date +"%Y-%m-%d")
git add .
git commit -m "log: :sparkles: 打卡 $DATE"
echo "✅ 已提交日志变更: log: 打卡 - $DATE"
