const makeCommit = (dateStringArray, commits) => {
  return dateStringArray
    .map((date) => {
      return Array(commits)
        .fill()
        .map((_, __) => {
          return `GIT_AUTHOR_DATE="${date}T12:01:01 PM UTC" GIT_COMMITTER_DATE="${date}T12:01:01 PM UTC" git commit --allow-empty -m "Auto Commit by segmenthub" > /dev/null`;
        });
    })
    .flat();
};

export { makeCommit };
