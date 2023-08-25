function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// var id = getCookie("id");
// if (id == "") {
//   window.location.replace("login.html");
// }
// document.getElementById("loader1").style.visibility = "visible";
// $.ajax({
//   type: "get",
//   url: `${baseurl}/get-single-teacher/${id}`,
//   success: function (response) {
//     document.getElementById("reg_button").classList.add("d-none");
//     document.getElementById("login_button").classList.add("d-none");
//     document.getElementById("dashboardbutton").classList.remove("d-none");

//     document.getElementById("loader1").style.visibility = "hidden";
//   },

//   error: function (response) {
//     console.log(response);
//     document.getElementById("loader1").style.visibility = "hidden";
//   },
// });

document.getElementById("loader1").style.visibility = "visible";
$.ajax({
  type: "get",
  url: `${baseurl}/check-registration-status`,
  success: function (response) {
    // console.log(response);
    if (response.response[0].status == "on") {
      //   console.log("on");
      // document.getElementById("dashboardbutton").classList.remove("d-none");
    } else {
      document.getElementById("reg_button2").classList.add("d-none");
      // document.getElementById("regbutton1").classList.add("d-none");
      document.getElementById("reg_button").classList.add("d-none");
      // document.getElementById("login_button").classList.add("d-none");
    }
    document.getElementById("loader1").style.visibility = "hidden";
  },

  error: function (response) {
    console.log(response);
    document.getElementById("loader1").style.visibility = "hidden";
  },
});

//check-if logged in or not
var id = getCookie("id");
// if (id == "") {
//   window.location.replace("login.html");
// }
var token = getCookie("token");
// dashboardbutton
// console.log(id);
// console.log(token);
if (id == "" || token == "") {
  // document.getElementById("reg_button").classList.remove = "d-none";
  document.getElementById("login_button").classList.remove("d-none");
  // window.location.replace("login.html");
} else {
  // alert("asdf");

  document.getElementById("logoutbutton").classList.remove("d-none");
  document.getElementById("login_button").classList.add("d-none");
  document.getElementById("dashboardbutton").classList.remove("d-none");
}
// console.log(token);
// console.log(id);
// document.getElementById("loader1").style.visibility = "visible";
// $.ajax({
//   type: "get",
//   url: `${baseurl}/check-registration-status`,
//   success: function (response) {
//     // console.log(response);
//     if (response.response[0].status == "on") {
//       //   console.log("on");
//       // document.getElementById("dashboardbutton").classList.remove("d-none");
//     } else {
//       document.getElementById("reg_button").classList.add("d-none");
//       document.getElementById("login_button").classList.add("d-none");
//     }
//     document.getElementById("loader1").style.visibility = "hidden";
//   },

//   error: function (response) {
//     console.log(response);
//     document.getElementById("loader1").style.visibility = "hidden";
//   },
// });
