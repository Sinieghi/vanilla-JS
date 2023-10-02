const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector("#new-post form");
const fetchBtn = document.querySelector("#available-posts button");
const postList = document.querySelector("ul");
const xhr = new XMLHttpRequest();
function sendHttpsRequest(method, url, data) {
  const promise = new Promise((res, rej) => {
    /* Request with XMLHttpRequest */
    xhr.open(method, url, true);
    xhr.responseType = "json";
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        res(xhr.response);
      } else {
        rej(new Error("Something went wrong"));
      }
      //mesma coisa que xhr.response = 'json'
      //const listOfContent = JSON.parse(xhr.response);
    };
    //o data vem por aqui, bem confuso a estrutura desse xhr
    xhr.onerror = function () {
      rej(new Error("Failed to send request"));
    };

    xhr.setRequestHeader("content-type", "application/json");
    const response = xhr.send(JSON.stringify(data));
    //formData format
    // console.log(data);
    // xhr.send(data);
  });
  return promise;
  // console.log(JSON.stringify(data), method);
  // return fetch(
  //   url,
  //   data && {
  //     method: method.toLowerCase(),
  //     body: JSON.stringify(data),
  //     headers: {
  //       "Content-Type": "application/json; charset=UTF-8",
  //       accept: "application/json",
  //     },
  //   }
  // )
  //   .then((res) => {
  //     if (res.status >= 200 && res.status < 300) return res.json();
  //     else {
  //       return res.json().then((errData) => {
  //         throw new Error(errData);
  //       });
  //     }
  //   })
  //   .catch((err) => console.log(err));
}
// new ErrorEvent("fail on fetch", (err) => {
//   console.log("hello there");
// });
const setLoadingAnimation = (loading) => {
  if (loading) {
    document.getElementById("loading")?.classList.add("is-loading");
  } else {
    document.getElementById("loading")?.classList.remove("is-loading");
  }
};
function fetchPosts() {
  //usando o .then
  sendHttpsRequest("GET", "http://localhost:2000/api/v1/users/content")
    .then((listOfContent) => {
      for (const list of listOfContent.usersContent) {
        const postEl = document.importNode(postTemplate.content, true);
        // if (!list) {
        //   postEl.querySelector("li").remove();
        //   return;
        // }
        postEl.querySelector("h1").textContent = list.title;
        postEl.querySelector("p").textContent = list.content;

        postEl.querySelector("li").id = list.userId;
        console.log(list);
        if (listElement.children.length > 1) {
          listElement.replaceChildren(postEl);
        }
        listElement.append(postEl);
      }
    })
    .catch((err) => console.log(err));
}
let isLoadingPost = false;
async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title,
    content,
    userId,
  };

  //using FormData for send data
  //se passar o form aqui o FormData coleta a data automaticamente e envia
  const fd = new FormData(form);
  console.log(fd);
  // const fd = new FormData();
  // fd.append("title", title);
  // fd.append("content", content);
  // fd.append("userId", userId);
  // fd.append("file", dt, "photo.png");

  try {
    isLoadingPost = true;
    setLoadingAnimation(isLoadingPost);
    const response = await sendHttpsRequest(
      "POST",
      "http://localhost:2000/api/v1/users/content",
      post
    );
    // const response = await sendHttpsRequest(
    //   "POST",
    //   "http://localhost:2000/api/v1/users/content",
    //   fd
    // );
    if (response.msg === "success!") {
      isLoadingPost = false;
      setLoadingAnimation(isLoadingPost);
    }
  } catch (error) {
    isLoadingPost = false;
    console.log(error);
  }
}

fetchBtn.addEventListener("click", () => {
  fetchPosts();
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const enterTitle = e.currentTarget.querySelector("#title").value;
  const enterContent = e.currentTarget.querySelector("#content").value;
  if (!enterTitle) {
    const warning = document.createElement("p");
    warning.textContent = "please provide all values";
    warning.classList = "warning-empty-data";
    e.target.querySelector(".form-control").append(warning);
    setTimeout(() => {
      e.target.querySelector(".warning-empty-data").remove();
    }, 2000);
    return;
  }
  if (!enterContent) {
    const warning = document.createElement("p");
    warning.textContent = "please provide all values";
    warning.classList = "warning-empty-data";
    e.target.querySelector(".sec").append(warning);
    setTimeout(() => {
      e.target.querySelector(".warning-empty-data").remove();
    }, 2000);
    return;
  }
  createPost(enterTitle, enterContent);
});

postList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const postId = e.target.closest("li").id;
    console.log(postId);
    sendHttpsRequest("DELETE", `http://localhost:2000/api/v1/users/${postId}`);
  }
});
