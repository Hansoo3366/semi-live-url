# Git 작업 수행
if [[ `git status --porcelain` ]]; then
  git add .
  git commit -m "Automated commit at $(date)"
  git push origin main
else
  echo "No changes to commit"

echo "Current directory: $(pwd)"

cd /volume1/web || exit

echo "After cd: $(pwd)"
fi