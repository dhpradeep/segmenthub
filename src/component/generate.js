function generateFile(user, repo, commitArray) {
  var element = document.createElement("a");
  let commits = "";
  commitArray.map((commit) => {
    commits += `${commit}\n`;
    return commit;
  });
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(fileTemplate(user, repo, commits))
  );
  element.setAttribute("download", "github.sh");
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

const fileTemplate = (user, repo, commits) => {
  let content = "#!/bin/bash\n";
  content += `git init ${repo}\n`;
  content += `cd ${repo}\n`
  content += "touch README.md\n";
  content += "git add README.md\n";
  content += commits;
  content += `git remote add origin git@github.com:${user}/${repo}.git\n`;
  content += "git branch -M main\n";
  content += "git push -u origin main";
  return content;
};

export { generateFile };
