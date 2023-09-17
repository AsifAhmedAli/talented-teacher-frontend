// function getCookie(cname) {
//     let name = cname + "=";
//     let ca = document.cookie.split(";");
//     for (let i = 0; i < ca.length; i++) {
//       let c = ca[i];
//       while (c.charAt(0) == " ") {
//         c = c.substring(1);
//       }
//       if (c.indexOf(name) == 0) {
//         return c.substring(name.length, c.length);
//       }
//     }
//     return "";
//   }

var url_str = window.location.href;
let url = new URL(url_str);
let search_params = url.searchParams;

// get value of "id" parameter
// "100"
if (search_params.has("id")) {
  // "100"
  var id = search_params.get("id");
  //   console.log(search_params.get("id"));
} else {
  window.location.replace("./index.html");
}
// console.log(result);
// console.log(search_params.get("id"));

//   if (id == "") {
//     window.location.replace("login.html");
//   }
//   var token = getCookie("token");
//   if (id == "" || token == "") {
//     // document.getElementById("reg_button").classList.remove = "d-none";
//     document.getElementById("login_button").classList.remove("d-none");
//     // window.location.replace("login.html");
//   } else {
//     // alert("asdf");

//     document.getElementById("logoutbutton").classList.remove("d-none");
//     document.getElementById("login_button").classList.add("d-none");
//     document.getElementById("dashboardbutton").classList.remove("d-none");
//   }
// /teacher/getateacher
document.getElementById("loader1").style.visibility = "visible";
$.ajax({
  type: "get",
  url: `${baseurl}/teacher/getateacher/${id}`,
  success: function (response) {
    // console.log(response);
    if (response.teacher.profile_picture != null) {
      document.getElementById("profile_pica").src =
        response.teacher.profile_picture;
    }
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
    document.getElementById("nameee").innerHTML = response.teacher.name;
    // document.getElementById("nameasdf").innerHTML = response.teacher.name;
    // document.getElementById("nameasdf1").innerHTML = response.teacher.name;

    document.getElementById("posi").innerHTML = response.teacher.position;
    // Add teacher's photos
    var photoSection = document.getElementById("photoSection");
    var generalPhotos = response.teacher.general_photos;
    for (var i = 0; i < generalPhotos.length; i++) {
      var photoUrl = generalPhotos[i].photo_url;
      var photoElement = document.createElement("img");
      photoElement.src = photoUrl;
      photoElement.className = "gallery-photo";
      photoElement.alt = "";

      var photoContainer = document.createElement("div");
      photoContainer.className = "gallery-photo-container";
      photoContainer.appendChild(photoElement);

      var columnIndex = i % 4;
      var columnElement =
        photoSection.getElementsByClassName("col-lg-3")[columnIndex];
      columnElement.appendChild(photoContainer);
    }

    // Add teacher's answers

    if (response.teacher.questions.length > 0) {
      var questions = response.teacher.questions;
      var question1 = questions[0].question1;
      var question2 = questions[0].question2;
      var question3 = questions[0].question3;
      var question4 = questions[0].question4;
      var question5 = questions[0].question5;
      document.getElementById("question1").innerHTML = question1;
      document.getElementById("question2").innerHTML = question2;
      document.getElementById("question3").innerHTML = question3;
      document.getElementById("question4").innerHTML = question4;
      document.getElementById("question5").innerHTML = question5;
    }
    //    document.getElementById("question4").innerHTML = question4;

    document.getElementById("loader1").style.visibility = "hidden";
  },
  error: function (response) {
    console.log(response);
    document.getElementById("loader1").style.visibility = "hidden";
  },
});

// get-teacher-profile for public view

//   var id = getCookie("id");
//   if (id == "") {
//     window.location.replace("login.html");
//   }
//   var token = getCookie("token");
// console.log(token);
// document.getElementById("loader1").style.visibility = "visible";
// $.ajax({
//   type: "get",
//   url: `${baseurl}/teacher/getateacher/${id}`,

//   success: function (response) {
//     // console.log(response.teacher.questions[0]);
//     // profile_picture;
//     if (response.teacher.profile_picture != null) {
//       document.getElementById("profile_pica").src =
//         response.teacher.profile_picture;
//     }
//     // document.getElementById("nav_profile").src =
//     //   response.teacher.profile_picture;
//     if (response.teacher.questions.length == 1) {
//       $("#question1").val(response.teacher.questions[0].question1);
//       $("#question2").val(response.teacher.questions[0].question2);
//       $("#question3").val(response.teacher.questions[0].question3);
//       $("#question4").val(response.teacher.questions[0].question4);
//     }
//     // document.getElementById("fullname").value = response.teacher.name;
//     // document.getElementById("email").value = response.teacher.email;
//     // document.getElementById("phone").value = response.teacher.phone;
//     // document.getElementById("address").value = response.teacher.address;

//     document.getElementById("nameee").innerHTML = response.teacher.name;
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
  url: `${baseurl}/check-doutle-vote-status`,
  success: function (response) {
    console.log(response);
    if (response.response[0].double_vote_on_off == "on") {
      //   console.log("on");
      // document.getElementById("heroVote").classList.add("d-none");
      document.getElementById("doublevote1").classList.add("d-none");
    } else {
      // document.getElementById("heroVote1").classList.add("d-none");
      document.getElementById("doublevote").classList.add("d-none");
    }
    document.getElementById("loader1").style.visibility = "hidden";
  },

  error: function (response) {
    console.log(response);
    document.getElementById("loader1").style.visibility = "hidden";
  },
});

// freevoteform
function freevote() {
  $("#freevoteform").submit(function (event) {
    event.preventDefault();
    // alert(amount + fname + email1);
    var fullname = document.getElementById("fname2").value;
    var email2 = document.getElementById("email2").value;
    document.getElementById("loader1").style.visibility = "visible";
    // var data = JSON.stringify({

    // });
    $.ajax({
      type: "post",
      data: { voter_name: fullname, voter_email: email2 },
      url: `${baseurl}/teachers/${id}/normal-vote`,
      success: function (response) {
        Swal.fire({
          icon: "success",
          title: "Successful!",
          text: response.message,
          // allowOutsideClick: false,
        });
        $("button.swal2-confirm").click(function () {
          location.reload();
        });
        document.getElementById("loader1").style.visibility = "hidden";
      },

      error: function (response) {
        console.log(response);
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: response.responseJSON.error,
          // allowOutsideClick: false,
        });
        $("button.swal2-confirm").click(function () {
          location.reload();
        });
        document.getElementById("loader1").style.visibility = "hidden";
      },
    });
  });
}
// var countDownDate = new Date("Sep 17, 2023 00:00:00").getTime();

// Update the count down every 1 second
// var x = setInterval(function () {
//   // Get today's date and time
//   var now = new Date().getTime();

//   // Find the distance between now and the count down date
//   var distance = countDownDate - now;

//   // Time calculations for days, hours, minutes and seconds
//   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   var seconds = Math.floor((distance % (1000 * 60)) / 1000);

//   // Output the result in an element with id="demo"
//   document.getElementById("demo").innerHTML =
//     days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

//   // If the count down is over, write some text
//   if (distance < 0) {
//     clearInterval(x);
//     document.getElementById("demo").innerHTML = "EXPIRED";
//   }
// }, 1000);

function showmodal(amount) {
  // alert(amount);
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < 50; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  document.cookie = `payment_code=${result}`;

  window.location.replace(
    `https://payv3.xpress-pay.com/pt/76d1b10251a911ee939d005056a61a32?a=${amount}&l4=${result}`
  );
}
