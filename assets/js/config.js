const apiUrl = "https://quraanforall-a091d1780d5d.herokuapp.com/api";

//Done
function uploadFiles() {
  const uploaderFiles = document.querySelectorAll(".uploader-form"); // get elments by #Id and .class
  uploaderFiles.forEach((element) => {
    for (let i = 0; i < element.files.length; i++) {
      var formData = new FormData();
      // Add the file to the request.
      formData.append("files", element.files[i]);
      formData.append("lang", lang);
      console.log("Uploading file...", element.files[i]);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${apiUrl}/files`);
      xhr.onloadend = () => {
        //hit on api
        if (xhr.status === 200 && xhr.readyState == 4) {
          alert(`File uploaded successfully! ${element.files[i].name}`);
        }
      };
      xhr.send(formData);
    }
  });
}

function displayFiles(files, type) {
  const modal = document.querySelector(`#${type}-${lang}`);

  // Clear existing content in the card body
  modal.innerHTML = "";
  let st = "";
  // Loop through the files and create elements for each file
  files.forEach((file, index) => {
    const fileTypeIcon = getFileTypeIcon(file.fileType);
    const modalId = `${lang}modal${index + 1}`;


/* 
    <div class="wrap" style="width: 400px;
    height: 600px;
    padding: 0;
    overflow: hidden;">
    <iframe src="${file.url}" style=" width: 1200px;
    height: 1800px;
    border: 0;">
    </div>
*/




    // Create a card for each file
    const fileCard = document.createElement("div");
    fileCard.classList.add("col-md-4");
    //  <img src ="${file.url}" width="20%" height="auto" controls></img>
    if(files[0].fileType == 'img' ){
      console.log(files[0].fileType);
      fileCard.innerHTML = `
     
  <img src="${file.url}" width="20%" height="auto" alt="Image">

    `;
      
    }else if(files[0].fileType == 'vid'){
      console.log(files[0].fileType);
      fileCard.innerHTML = `
    <video class="col-sm-5" src="${file.url}" width="40%" height="auto" controls></video>
    `;
    }else{
      console.log(files[0].fileType);
      fileCard.innerHTML = `
    <iframe src="${file.url}" style=" width: 400px;
    height: 400px;
    border: 0;">
    `;
    }
    
    st = st + fileCard.innerHTML;
  });
  modal.innerHTML = st;
}

function getFileTypeIcon(fileType) {
  switch (fileType) {
    case "pdf":
      return '<i class="bi bi-filetype-pdf"></i>';
    case "img":
      return '<i class="bi bi-image"></i>';
    case "vid":
      return '<i class="bi bi-file-earmark-play"></i>';
    default:
      return "";
  }
}

function getFileTypeTitle(fileType) {
  switch (fileType) {
    case "pdf":
      return "PDF";
    case "img":
      return "Image";
    case "vid":
      return "Video";
    default:
      return "File";
  }
}

// GET type   => List
function viewFiles(type) {
  console.log("Test");
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `${apiUrl}/files/${type}?lang=${lang}`);
  xhr.send();
  xhr.onloadend = () => {
    if (xhr.status === 200 && xhr.readyState == 4) {
      const files = JSON.parse(xhr.responseText);
      console.log(`${files} , ${type}`);
      switch (type) {
        case "pdf":
          displayFiles(files, type);
          break;

        case "img":
          displayFiles(files, type);
          break;

        case "vid":
          displayFiles(files, type);
          break;

        default:
          displayFiles(files); // Default to PDF Files Card
          return;
          break;
      }
    } else {
      console.error("Error fetching files:", xhr.statusText);
    }
  };
}

$(document).ready(function () {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://quraanforall-a091d1780d5d.herokuapp.com/api/files/pdf`
  );
  xhr.send();
  xhr.onloadend = () => {
    if (xhr.status === 200 && xhr.readyState == 4) {
      const files = JSON.parse(xhr.responseText);
      document.querySelector(".countpdf").innerHTML = files.length;
    }
  };
});

$(document).ready(function () {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://quraanforall-a091d1780d5d.herokuapp.com/api/files/img`
  );
  xhr.send();
  xhr.onloadend = () => {
    if (xhr.status === 200 && xhr.readyState == 4) {
      const files = JSON.parse(xhr.responseText);
      document.querySelector(".countimg").innerHTML = files.length;
    }
  };
});

$(document).ready(function () {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://quraanforall-a091d1780d5d.herokuapp.com/api/files/vid`
  );
  xhr.send();
  xhr.onloadend = () => {
    if (xhr.status === 200 && xhr.readyState == 4) {
      const files = JSON.parse(xhr.responseText);
      // console.log(files[0].fileType);
      document.querySelector(".countvid").innerHTML = files.length;
    }
  };
});

$(document).ready(function () {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://quraanforall-a091d1780d5d.herokuapp.com/api/files/vid`
  );
  xhr.send();
  xhr.onloadend = () => {
    if (xhr.status === 200 && xhr.readyState == 4) {
      const files = JSON.parse(xhr.responseText);
      // console.log(files[0].fileType);
      document.querySelector(".countvid").innerHTML = files.length;
    }
  };
});

$(document).ready(function () {
  const isVisited = localStorage.getItem("visited");
  if (!isVisited) {
    var xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      "https://quraanforall-a091d1780d5d.herokuapp.com/api/files/count-impressions/count"
    );
    xhr.send();
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
      localStorage.setItem("visited", "true");
    });
  }
});

$(document).ready(function () {
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://quraanforall-a091d1780d5d.herokuapp.com/api/files/count-impressions/counter"
  );
  xhr.send();
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      var visits = JSON.parse(this.responseText).message.count;
      console.log(this.responseText);
    }
    document.querySelector(".visitor").innerHTML = visits;
    let pdf = document.querySelector(".countpdf").innerHTML;
    let img = document.querySelector(".countimg").innerHTML;
    let vid = document.querySelector(".countvid").innerHTML;
    // console.log(parseInt(pdf.trim()), parseInt(img.trim()), parseInt(vid.trim()));
    console.log(pdf.trim(), img.trim(), vid.trim());
    pdf = isNaN(parseInt(pdf.trim())) ?  0 :parseInt(pdf.trim()) ; 
    img = isNaN(parseInt(img.trim())) ?  0 :parseInt(img.trim()) ; 
    vid = isNaN(parseInt(vid.trim())) ?  0 :parseInt(vid.trim()) ; 
    let total = pdf + img + vid;
    document.querySelector('.totaldownload').innerHTML = total;
  });
});

function deleteFiles() {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "DELETE",
    `https://quraanforall-a091d1780d5d.herokuapp.com/api/files`
  );
  xhr.send();
  xhr.onloadend = () => {
    if (xhr.status === 200 && xhr.readyState == 4) {
      alert("Data is deleted");
      window.location.reload();
    }
  };
}

// 0 : ready state didnt hit api   status : 200
// 1: hit on api request
//  2: pass data to api
// 3: process data on api
// 4: response data from api
