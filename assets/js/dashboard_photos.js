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
var token = getCookie("token");

document.getElementById("loader1").style.visibility = "visible";
$.ajax({
  type: "get",
  url: `${baseurl}/get-single-teacher/${id}`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  success: function (response) {
    // console.log();
    response.teacher.general_photos.forEach((key) => {
      // console.log(key);
      document.getElementById("photo_container").innerHTML += `          
      <div class="col-lg-3 col-md-6 col-sm-12">
        <div class="gallery-photo-container">
        <button class="btn icon-btn btn-danger" onclick="deletephotos('${key.id}', '${id}')">
          <span class="material-symbols material-symbols-rounded">delete</span>
        </button>
        <img src="${key.photo_url}" class="gallery-photo" alt="">
      </div>
    </div>
    `;
    });
    document.getElementById("nameee").innerHTML = response.teacher.name;
    if (response.teacher.profile_picture != null) {
      document.getElementById("nav_profile").src =
        response.teacher.profile_picture;
    }
    document.getElementById("loader1").style.visibility = "hidden";
  },

  error: function (response) {
    // console.log(response);
    if (response.responseJSON.message == "Token is not valid") {
      window.location.replace("./login.html");
    }
    document.getElementById("loader1").style.visibility = "hidden";
  },
});

function uploadphotos() {
  document.getElementById("loader1").style.visibility = "visible";
  var elem = document.getElementById("upload_photos");

  // console.log(elem.files.length);
  var form = new FormData();
  for (i = 0; i < elem.files.length; i++) {
    form.append("photos", elem.files[i], elem.files[i].name);
    // console.log("a");
  }
  form.append("id", id);
  // fileName.forEach((key) => {
  //   form.append("photos", key, key.name);
  // });

  var settings = {};

  $.ajax({
    url: `${baseurl}/teacher/upload-photos`,
    method: "POST",
    timeout: 0,
    processData: false,
    mimeType: "multipart/form-data",
    contentType: false,
    data: form,
    success: function (response) {
      // console.log(response);
      document.getElementById("loader1").style.visibility = "hidden";
      Swal.fire({
        icon: "success",
        title: "Successful!",
        text: "Photos uploaded successfully!",
        // allowOutsideClick: false,
      });
      $("button.swal2-confirm").click(function () {
        location.reload();
      });
    },

    error: function (response) {
      document.getElementById("loader1").style.visibility = "hidden";
      var res_error = JSON.parse(response.responseText);
      // if (response.responseJSON.error == "Email already registered") {
      Swal.fire({
        title: "Error!",
        text: res_error.error,
        icon: "error",
      });
      // }
    },
  });
}

function deletephotos(x, id) {
  document.getElementById("loader1").style.visibility = "visible";
  $.ajax({
    type: "delete",
    url: `${baseurl}/teacher/delete-photo/${x}`,
    data: {
      id: id,
    },
    success: function (response) {
      // console.log(response);
      Swal.fire({
        icon: "success",
        title: "Successful!",
        text: response.message,
        // allowOutsideClick: false,
      });
      $("button.swal2-confirm").click(function () {
        location.reload();
      });
      // var i = 1;
      document.getElementById("loader1").style.visibility = "hidden";
    },

    error: function (response) {
      // console.log(response);
      Swal.fire({
        title: "Error!",
        text: response.responseJSON.error,
        icon: "error",
      });
      document.getElementById("loader1").style.visibility = "hidden";
    },
  });
}
