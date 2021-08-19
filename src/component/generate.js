const getInitialSetup = (user, repo, firstPush = false, newRepo = false) => {
  let content = "";
  if (newRepo && firstPush) {
    content += `git remote add origin git@github.com:${user}/${repo}.git\n`;
    content += "git branch -M main\n";
  }
  content += "git push -u origin main";
  return content;
};

const chunkArray = (myArray, chunk_size) => {
  let index = 0;
  const arrayLength = myArray.length;
  const tempArray = [];
  let myChunk;
  for (index = 0; index < arrayLength; index += chunk_size) {
    myChunk = myArray.slice(index, index + chunk_size);
    tempArray.push(myChunk);
  }
  return tempArray;
};

const fileTemplate = (repo, commits, newRepo) => {
  let content = "#!/bin/bash\n";
  if (newRepo) {
    content += `git init ${repo}\n`;
    content += `cd ${repo}\n`;
    content +=
      "echo '# Automatically generated repo using [segmenthub](https://github.com/dhpradeep/segmenthub)' > README.md\n";
    content += "git add README.md\n";
  }
  content += commits;
  return content;
};

function generateFile(user, repo, commitArray, newRepo) {
  return new Promise(async (resolve, reject) => {
    try {
      var element = document.createElement("a");
      let commits = "";
      const afterChunk = chunkArray(commitArray, 999);
      afterChunk.map((chunkCommit, index) => {
        chunkCommit.push(
          getInitialSetup(user, repo, index === 0 ? true : false, newRepo)
        );
        chunkCommit.map((commit) => {
          commits += `${commit}\n`;
          return commit;
        });
        return commits;
      });
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," +
          encodeURIComponent(fileTemplate(repo, commits, newRepo))
      );
      element.setAttribute("download", "github.sh");
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      resolve();
    } catch (error) {
      reject();
    }
  });
}

export { generateFile };
