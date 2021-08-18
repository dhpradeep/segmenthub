const makeCommit = (dateStringArray, commits) => {
  return Array(commits)
    .fill()
    .map((_, index) => {
      return dateStringArray.map((date) => {
        return `GIT_AUTHOR_DATE="${date}T12:01:01 PM UTC" GIT_COMMITTER_DATE="${date}T12:01:01 PM UTC" git commit --allow-empty -m "Auto Commit by segmenthub"`;
      });
    })
    .flat();
};

export { makeCommit };
