// Get form data
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

//   name, company, email, password;
// Make Ajax request to signup API
//get teacher
var id = getCookie("id");
if (id == "") {
  window.location.replace("login.html");
}
// console.log(id);
var token = getCookie("token");
document.getElementById("loader1").style.visibility = "visible";
$.ajax({
  type: "get",
  url: `${baseurl}/get-single-teacher/${id}`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  success: function (response) {
    // console.log(response);
    if (response.teacher.profile_picture != null) {
      document.getElementById("nav_profile").src =
        response.teacher.profile_picture;
    }
    // document.getElementById("posi").innerHTML = response.teacher.position;
    document.getElementById("nameee").innerHTML = response.teacher.name;
    $.ajax({
      type: "post",
      url: `${baseurl}/members-of-a-group`,
      data: {
        id: response.teacher.group_id,
      },
      success: function (response) {
        console.log(response);
        var i = 1;
        response.members.forEach((element) => {
          document.getElementById("members_list").innerHTML += `
            <tr>
            <td>${i}</td>
            <td><a target="_blank" href="https://talentedteacher.org/profile_third_party.html?id=${element.id}">${element.name}</a></td>
            <td>${element.email}</td>
            <td>${element.position}</td>
            <td>${element.group_id}</td>
          </tr>`;
          i++;
        });
        document.getElementById("loader1").style.visibility = "hidden";
      },

      error: function (response) {
        console.log(response);

        document.getElementById("loader1").style.visibility = "hidden";
      },
    });

    // document.getElementById("loader1").style.visibility = "visible";
  },
  error: function (error) {
    // console.log(error);
    if (error.responseJSON.message == "Token is not valid") {
      window.location.replace("./login.html");
    }
    // document.getElementById("posi").innerHTML = response.teacher.position;
    // document.getElementById("nameee").innerHTML = response.teacher.name;
    document.getElementById("loader1").style.visibility = "hidden";
  },
});

document.getElementById("loader1").style.visibility = "visible";
$.ajax({
  type: "get",
  url: `${baseurl}/teacher/check-tournament-status`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  success: function (response) {
    console.log(response);
    if (response.msg == "Contest Ended") {
    } else {
      $.ajax({
        type: "get",
        url: `${baseurl}/update-positions`,
        success: function (response) {
          // console.log(response);
          document.getElementById("loader1").style.visibility = "hidden";
        },

        error: function (response) {
          console.log(response);
          document.getElementById("loader1").style.visibility = "hidden";
        },
      });
    }

    document.getElementById("loader1").style.visibility = "hidden";
  },

  error: function (response) {
    console.log(response);
    document.getElementById("loader1").style.visibility = "hidden";
  },
});
