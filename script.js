var min = 1;
var max = 100;
function setMax(object) {
  max = object.value;
  setObject(
    document.getElementById("getPosts"),
    "Load all posts from " + min + " to " + max,
    false
  );
}
function dispalyPosts(posts) {
  document.getElementById("view").innerHTML = "";
  if (posts[0].offline) {
    document.getElementById("view").innerHTML +=
      "<div class='offline'>You are in offline mode. Posts are loaded from localStogare</div>";
    posts.splice(0, 1);
  }
  for (let post of posts) {
    document.getElementById("view").innerHTML += `
    <div class="post">
      <h1>${post.id}. ${post.title}</h1>
      <div class="author">Posted by ${post.userId}</div>
      <p>${post.body}</p>
    </div>
    `;
  }
}
function getPosts() {
  return fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(res => {
      localStorage.setItem("posts", JSON.stringify(res));
      return res;
    })
    .then(res => res.filter(post => post.id <= max && post.id >= min))
    .catch(e => {
      return [
        { offline: true },
        ...JSON.parse(localStorage.getItem("posts")).filter(
          post => post.id <= max && post.id >= min
        )
      ];
    });
}

let setObject = (object, state = "button", disabled) => {
  object.innerHTML = state;
  object.disabled = disabled;
  object.class;
};
let getData = async object => {
  setObject(object, "Loading posts", true);
  dispalyPosts(await getPosts());
  setObject(object, "Load all posts from " + min + " to " + max, false);
};

console.log(localStorage);
