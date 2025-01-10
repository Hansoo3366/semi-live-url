# Git 저장소가 있는 디렉토리로 이동
cd /volume1/web || exit


#!/bin/bash

date=`date`
github_id="Hansoo3366"
github_Token="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"
github_Address="https://github.com/Hansoo3366/semi-live-url"
logFile="/volume1/web/logs/push.log"
SourceDir="/volume1/web"

cd $SourceDir

echo "git add . ..." && echo "git add . ..." > $logFile 2>&1
echo "`git add .`" >> $logFile 2>&1
echo "" && echo "" >> $logFile 2>&1 && echo "==" >> $logFile 2>&1

echo "git status" && echo "git status" >> $logFile 2>&1
echo "`git status`" >> $logFile 2>&1
echo "" && echo "" >> $logFile 2>&1 && echo "==" >> $logFile 2>&1

echo "git commit -m $date commit" && echo "git commit -m $date commit" >> $logFile 2>&1
echo "`git commit -m "$date commit"`" >> $logFile 2>&1
echo "" && echo "" >> $logFile 2>&1 && echo "==" >> $logFile 2>&1

echo "git push!" && echo "git push!" >> $logFile 2>&1
git push https://$github_id:$github_Token@$github_Address >> $logFile 2>&1

sleep 2

result="`awk '/Everything up-to-date/' $logFile 2>&1`"
echo "$result"


if [ -z "$result" ];then
        echo "git push Success~!" && echo "git push Success~!" >> $logFile 2>&1
else
        echo "!! git push ERROR! please check $logFile !!" && echo "!! git push ERROR! please check $logFile !!" >> $logFile 2>&1
fi

exit 0