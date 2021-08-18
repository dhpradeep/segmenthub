import "./App.css";
import { callMethod } from "./component";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import image2005 from "./assets/2005.JPG";

const App = () => {
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const [repo, setRepo] = useState("");
  const [user, setUser] = useState("");
  const [commits, setCommits] = useState(1);
  const [animation, setAnimation] = useState(true);
  const [loading, setLoading] = useState(false);
  const [newRepo, setNewRepo] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimation(false);
    }, 3000);
  });

  const isEmpty = (field) => field === "";
  const hasError = () => {
    let errors = false;
    if (newRepo) {
      errors =
        isEmpty(fromYear) ||
        isEmpty(toYear) ||
        isEmpty(commits) ||
        isEmpty(repo) ||
        isEmpty(user);
    } else {
      errors = isEmpty(fromYear) || isEmpty(toYear) || isEmpty(commits);
    }
    return errors;
  };

  const delay = (time) => {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  };
  const downloadFile = async () => {
    setLoading(true);
    if (hasError()) {
      alert("Fill the form!!");
      setLoading(false);
      return;
    }
    try {
      await delay(3000);
      await callMethod(
        user,
        repo,
        Number(fromYear),
        Number(toYear),
        Number(commits),
        newRepo
      );
      setLoading(false);
    } catch (error) {
      alert("Input range and commits are exceed!!");
      setLoading(false);
    }
  };

  return (
    <div
      className="container"
      style={{
        border: "2px dashed #000",
        marginTop: "20px",
        marginBottom: "20px",
        paddingBottom: "40px",
        paddingTop: "40px",
        color: "#fff",
      }}
    >
      <div className="mycontainer" style={{ padding: "20px" }}>
        <div className="row">
          <div className="col">
            <h3 className="text-default text-center">Segmenthub</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            {animation ? (
              <i className="fa fa-spinner fa-spin" />
            ) : (
              <div className="social">
                <a
                  href="https://facebook.com/dhpradeep25"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa fa-facebook" />
                </a>
                <a
                  href="https://github.com/dhpradeep/segmenthub"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa fa-github" />
                </a>
                <a
                  href="https://www.linkedin.com/in/dhpradeep25/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa fa-linkedin" />
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h3 className="text-warning">Instructions</h3>
            <ol>
              <li>Create a new repository on github.</li>
              <li>
                Fill the form.
                <ol>
                  <li>From Year: create segment commit from.</li>
                  <li>To Year: create segment commit to.</li>
                  <li>Github repo: repo you created on step 1.</li>
                  <li>Github username: your github username.</li>
                  <li>
                    No. of commits: no of commits that you wants to create.
                  </li>
                </ol>
              </li>
              <li>
                Press Generate Commits and save generated shell script file.
              </li>
              <li>
                Run shell script (make sure you have correct github access).
              </li>
            </ol>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-6">
            <br />
            <label htmlFor="fromYear">From Year</label>
            <input
              onChange={(e) => setFromYear(e.target.value)}
              value={fromYear}
              id="fromYear"
              className="form-control"
              type="number"
              min="1970"
              placeholder="1970"
            />
          </div>
          <div className="form-group col-md-6">
            <br />
            <label htmlFor="toYear">To Year</label>
            <input
              onChange={(e) => setToYear(e.target.value)}
              value={toYear}
              id="toYear"
              className="form-control"
              type="number"
              placeholder="2099"
              max="2099"
            />
          </div>
          <div className="form-group col-md-12">
            <br />
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                onChange={(e) => setNewRepo(e.target.checked)}
                checked={newRepo}
              />
              <label class="form-check-label" for="flexCheckChecked">
                New Repo ?
              </label>
            </div>
          </div>
          {newRepo ? (
            <>
              <div className="form-group col-md-6">
                <br />
                <label htmlFor="repo">Your Github Repository</label>
                <input
                  onChange={(e) => setRepo(e.target.value)}
                  value={repo}
                  id="repo"
                  className="form-control"
                  type="text"
                  placeholder="repository"
                />
              </div>
              <div className="form-group col-md-6">
                <br />
                <label htmlFor="username">Your Github Username</label>
                <input
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  id="username"
                  className="form-control"
                  type="text"
                  placeholder="username"
                />
              </div>
            </>
          ) : null}
          <div className="form-group col-md-6">
            <br />
            <label htmlFor="commits">No. Of Commits/day</label>
            <input
              onChange={(e) => setCommits(e.target.value)}
              value={commits}
              id="commits"
              className="form-control"
              type="number"
              placeholder="50"
            />
          </div>
          <div className="form-group col-md-12 text-center">
            <br />
            <button
              disabled={loading}
              type="button"
              onClick={() => downloadFile()}
              className="btn btn-primary"
            >
              {loading ? (
                <i className="fa fa-spinner fa-spin" />
              ) : (
                <span>Generate Commits</span>
              )}
            </button>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="row">
        <div className="col-md-12">
          <h4 style={{ color: "#000" }}>Sample Images</h4>
        </div>
        <div className="col">
          <img src={image2005} alt="segment sample" style={{ width: "100%" }} />
        </div>
      </div>
    </div>
  );
};

export default App;
