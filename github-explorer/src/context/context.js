import React, { useState, useEffect } from "react";
import defaultUser from "./defaultData.js/defaultUser";
import defaultRepos from "./defaultData.js/defaultRepos";
import defaultFollowers from "./defaultData.js/defaultFollowers";
import axios from "axios"; // for fetching github api
// it gets me the info of how many requests the user can do

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

// Provider, Consumer  - use them like this GithubContext.Provider
// we're creating separate component (GithubProvider) for using "GithubContext" so, that in case of more complex logicwe can use "GithubContext" Directly!

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(defaultUser);
  const [repos, setrepos] = useState(defaultRepos);
  const [followers, setFollowers] = useState(defaultFollowers);
  // request loading
  const [requests, setRequests] = useState(0);
  const [loading, setLoading] = useState(false);

  //check error
  const [error, setError] = useState({ show: false, msg: "" });

  const searchGithubUser = async (user) => {
    // console.log(user);
    // toggleError
    toggleError();
    // setloading(true)
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    // console.log(response);
    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;
      axios(`${followers_url}?per_page=100`).then((response) => {
        setFollowers(response.data);
      });
      // more logic here
      // https://api.github.com/users/Sushant2/followers
    } else {
      toggleError(true, "there is no user with that username");
    }
  };

  // check rate
  const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        console.log(data);
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, "sorry, you have exceeded your hourly rate limit!");
          // 2 cases can be : if user doesn't exist or if we have used all are requests
        }
      })
      .catch((err) => console.log(err));
  };

  function toggleError(show = false, msg = "") {
    setError({
      show,
      msg,
    });
  }

  // error
  useEffect(checkRequest, []);
  // useEffect(() => {
  //   checkRequest();
  //   // console.log("hey app loaded");
  // }, []);
  return (
    // githubUser : githubUser insted we're using es6 so if valuename is equal to property name we can directly write propertyname
    // these values are object not string anymore
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

// GithubProvider for wrapping our application
export { GithubProvider, GithubContext };
