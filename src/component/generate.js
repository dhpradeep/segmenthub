function generateFile(user, repo, commitArray, newRepo) {
  return new Promise(async (resolve, reject) => {
    try {
      var element = document.createElement("a");
      let commits = "";
      commitArray.map((commit) => {
        commits += `${commit}\n`;
        return commit;
      });
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," +
          encodeURIComponent(fileTemplate(user, repo, commits, newRepo))
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

const fileTemplate = (user, repo, commits, newRepo) => {
  let content = "#!/bin/bash\n";
  if (newRepo) {
    content += `git init ${repo}\n`;
    content += `cd ${repo}\n`;
    content +=
      "echo '# Automatically generated repo using [segmenthub](https://github.com/dhpradeep/segmenthub)' > README.md\n";
    content += "git add README.md\n";
  }
  content += commits;
  if (newRepo) {
    content += `git remote add origin git@github.com:${user}/${repo}.git\n`;
    content += "git branch -M main\n";
  }
  content += "git push -u origin main";
  return content;
};

export { generateFile };
