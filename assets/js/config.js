const apiUrl = "http://localhost:8080/api/";

function uploadFiles() {
  const uploaderFiles = document.querySelectorAll(".uploader-form"); // get elments by #Id and .class
  uploaderFiles.forEach((element) => {
    for (let i = 0; i < element.files.length; i++) {
      var formData = new FormData();
      // Add the file to the request.
      formData.append("File", element.files[i]);
      console.log("Uploading file...", element.files[i]);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${apiUrl}/files`);
      xhr.onloadend = () => {
        // window.location.reload();
      };
      xhr.send(formData);
    }
  });
}

function viewFiles(type) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `${apiUrl}/files`);
  xhr.onloadend = () => {
    xhr.send(formData);
  };
  switch (type) {
    case "pdf":

      break;

    case "img":
      break;

    case "vid":
      break;

    default:
      return;
      break;
  }
}
