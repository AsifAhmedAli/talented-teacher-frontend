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
    if (response.teacher.position == 0) {
      response.teacher.position = "No Position";
    } else if (response.teacher.position == 1) {
      response.teacher.position = "1st";
    } else if (response.teacher.position == 2) {
      response.teacher.position = "2nd";
    } else if (response.teacher.position == 3) {
      response.teacher.position = "3rd";
    } else {
      response.teacher.position = response.teacher.position + "th Position";
    }
    document.getElementById("posi").innerHTML = response.teacher.position;
    document.getElementById("nameee").innerHTML = response.teacher.name;
    if (response.teacher.profile_picture != null) {
      document.getElementById("nav_profile").src =
        response.teacher.profile_picture;
    }
    // document.getElementById("nav_profile").innerHTML = response.teacher.name;

    // document.getElementById("loader1").style.visibility = "hidden";
    //current phase

    // document.getElementById("loader1").style.visibility = "visible";
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
          document.getElementById("posi").innerHTML +=
            " Position in " + response.Current_phase;
        }

        document.getElementById("loader1").style.visibility = "hidden";
      },

      error: function (response) {
        console.log(response);
        document.getElementById("loader1").style.visibility = "hidden";
      },
    });
  },

  error: function (response) {
    // console.log(response.responseJSON.message);
    if (response.responseJSON.message == "Token is not valid") {
      window.location.replace("./login.html");
    }
    document.getElementById("loader1").style.visibility = "hidden";
  },
});

//votes
document.getElementById("loader1").style.visibility = "visible";
$.ajax({
  type: "get",
  url: `${baseurl}/all-votes/${id}`,
  success: function (response) {
    // console.log();/
    var i = 1;
    response.response.forEach((element) => {
      document.getElementById("voter_list").innerHTML += `                  
        <tr>
        <td>${i}</td>
        <td>${element.voter_name}</td>
        <td class="text-end">${element.voteCount}</td>
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

//hero votes
document.getElementById("loader1").style.visibility = "visible";
$.ajax({
  type: "get",
  url: `${baseurl}/all-hero-votes/${id}`,
  success: function (response) {
    // console.log(response.response);
    var i = 1;
    response.response.forEach((element) => {
      document.getElementById("hero_voter_id").innerHTML += `                  
        <tr>
        <td>${i}</td>
        <td>${element.voter_name}</td>
        <td class="text-end">${element.voteCount}</td>
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
