<#
.SYNOPSIS
自动提交日志变更的Windows脚本
#>

$Date = Get-Date -Format "yyyy-MM-dd"
git add .
git commit -m "log: :sparkles: 更新日志 - $Date"
Write-Host "✅ 已提交日志变更: log: 更新日志 - $Date"
