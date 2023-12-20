let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color_option")
  );
  document.querySelectorAll(".colors-list li").forEach((ele) => {
    ele.classList.remove("active");
    if (ele.dataset.color === mainColors) {
      ele.classList.add("active");
    }
  });
}

let settingBox = document.querySelector(".setting-box");
let toggleSetting = document.querySelector(".toggle-setting i");
toggleSetting.onclick = function () {
  toggleSetting.classList.toggle("fa-spin");
  settingBox.classList.toggle("open");
};

const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      `${e.target.dataset.color}`
    );
    localStorage.setItem("color_option", e.target.dataset.color);
    handleActive(e);
  });
});
let landing = document.querySelector(".landing");
let imgArray = ["01", "02", "03", "04"];
let backgroundInterval;
let backgroundOption = true;
let backgroundLocalItem = localStorage.getItem("background_option");
if (backgroundLocalItem !== null) {
  document.querySelectorAll(".option-box span").forEach((e) => {
    e.classList.remove("active");
  });
  if (backgroundLocalItem === `true`) {
    backgroundOption = true;
    document.querySelector(".yes").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector(".no").classList.add("active");
  }
}
function randomBack() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let random = Math.floor(Math.random() * imgArray.length);
      landing.style.backgroundImage =
        'url("images/' + imgArray[random] + '.jpg")';
    }, 5000);
  }
}
let iconLinks = document.querySelector(".icon-links");
let allLinks = document.querySelector("ul.links");
iconLinks.onclick = function (e) {
  e.stopPropagation();
  allLinks.classList.toggle("links-small");
};

document.addEventListener("click",  (e) => {
  if (e.target !== iconLinks && e.target !== allLinks) {
    if (allLinks.classList.contains("links-small")) {
      allLinks.classList.toggle("links-small");
    }
  }
});
allLinks.onclick = function(e) {
  e.stopPropagation();
}

let allSpan = document.querySelectorAll(".option-box span");
allSpan.forEach((ele) => {
  ele.addEventListener("click", function (e) {
  handleActive(e)
    if (e.target.dataset.background === `yes`) {
      backgroundOption = true;
      randomBack();
      localStorage.setItem("background_option", "true");
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", "false");
    }
  });
});
randomBack();

let stats = document.querySelector(".stats .container");
window.onscroll = function () {
  let statsOffsetHeight = stats.offsetTop;
  let statsOuterHeight = stats.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > statsOffsetHeight + statsOuterHeight - windowHeight) {
    document.querySelectorAll(".stats .prog-holder span").forEach(function (e) {
      e.style.width = e.dataset.progress;
    });
  }
};

document.querySelectorAll(".series .box img").forEach((e) => {
  e.addEventListener("click", (ele) => {
    let div = document.createElement("div");
    div.className = "popup-overlay";
    document.body.appendChild(div);

    let imgDiv = document.createElement("div");
    imgDiv.className = "popup-box";
    let img = document.createElement("img");
    img.src = e.src;
    imgDiv.appendChild(img);
    document.body.appendChild(imgDiv);
    if (e.alt !== null) {
      let imgHeading = document.createElement("h3");
      let imgText = document.createTextNode(e.alt);
      imgHeading.appendChild(imgText);
      imgDiv.prepend(imgHeading);
      let closeButton = document.createElement("span");
      let closeButtonText = document.createTextNode("x");
      closeButton.appendChild(closeButtonText);
      imgDiv.appendChild(closeButton);
      closeButton.className = "close-button";
    }
  });
});
document.addEventListener("click", function (e) {
  if (e.target.className === "close-button") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

const bullets = document.querySelectorAll(".nav-bullets .bullet");
const links = document.querySelectorAll(".links a");

function scrollTOPlace (elements) {
  elements.forEach(e => {
    e.addEventListener("click", function (ele) {
        ele.preventDefault();
      document.querySelector(ele.target.dataset.section).scrollIntoView({
        behavior: 'smooth'
      })
    })
  });
}
scrollTOPlace(bullets);
scrollTOPlace(links);


function handleActive(e) {
  e.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });
  e.target.classList.add("active");
}
let bulletSpan = document.querySelectorAll(".bullet-box span");
let bulletsContainer = document.querySelector(".nav-bullets")
let bullerLocalStorage = localStorage.getItem("bullet_option");
if (bullerLocalStorage !== null) {
  bulletSpan.forEach((ele) => {
      ele.classList.remove("active");
  });
  if (bullerLocalStorage === "block") {
    bulletsContainer.style.display ="block";
    document.querySelector(".bullet-box .yes").classList.add("active")
  } else {
    bulletsContainer.style.display ="none";
    document.querySelector(".bullet-box .no").classList.add("active")
  }
}
bulletSpan.forEach((e) => {
  e.addEventListener("click", (ele) => {
    if (ele.target.dataset.display === "yes") {
      localStorage.setItem("bullet_option", 'block');
      bulletsContainer.style.display = "block";
    } else {
      localStorage.setItem("bullet_option", 'none');
      bulletsContainer.style.display = "none";
    }
    handleActive(ele);
  })
});

document.querySelector(".reset-option").addEventListener("click",  function () {
  localStorage.removeItem("bullet_option");
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  window.location.reload();
})
