# Git 저장소가 있는 디렉토리로 이동
cd /volume1/web || exit

# Git 작업 수행
if [[ `git status --porcelain` ]]; then
  git add .
  git commit -m "Automated commit at $(date)"
  git push origin main
else
  echo "No changes to commit"
fi