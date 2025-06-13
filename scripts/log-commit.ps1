<#
.SYNOPSIS
自动提交日志变更的Windows脚本
#>

$Date = Get-Date -Format "yyyy-MM-dd"
git add .
git commit -m "log: :sparkles: 打卡 - $Date"
Write-Host "✅ 已提交日志变更: log: 打卡 - $Date"
