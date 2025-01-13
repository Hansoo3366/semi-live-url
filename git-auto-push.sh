# Git 저장소가 있는 디렉토리로 이동
cd /volume1/web || exit


#!/bin/bash

date=$(date)
github_id="Hansoo3366"
github_Token="${GITHUB_TOKEN}"  # 환경 변수 사용
github_Address="github.com/Hansoo3366/semi-live-url"
logFile="/volume1/web/logs/push.log"
SourceDir="/volume1/web"

# 디렉토리 이동
cd $SourceDir || { echo "Failed to change directory to $SourceDir"; exit 1; }

# Git 명령 실행
{
    echo "== Git 작업 시작 =="

    echo "git add ."
    git add .

    echo "git status"
    git status

    echo "git commit -m \"$date commit\""
    git commit -m "$date commit"

    echo "git push"
    git push https://$github_id:$github_Token@$github_Address

    echo "== Git 작업 완료 =="
} >> $logFile 2>&1

# 결과 처리
if [ $? -eq 0 ]; then
    echo "git push Success~!" >> $logFile
else
    echo "!! git push ERROR! please check $logFile !!" >> $logFile
fi

exit 0