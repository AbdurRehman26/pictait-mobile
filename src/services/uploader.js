import axios from "./dataService";

function getExtension(filename) {
  let parts = filename.split(".");
  return parts[parts.length - 1];
}

export const isImage = filename => {
  let ext = getExtension(filename.name);
  switch (ext.toLowerCase()) {
    case "jpg":
    case "jpeg":
    // case "gif":
    // case "bmp":
    case "png":
      //etc
      return true;
  }
  return false;
};

export const isVideo = filename => {
  let ext = getExtension(filename.name);
  switch (ext.toLowerCase()) {
    // case "m4v":
    // case "avi":
    // case "mpg":
    case "mp4":
      // etc
      return true;
  }
  return false;
};

export const uploadImageCallBack = (file, resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", process.env.REACT_APP_API_KEY + "/newsletterUploader/image");
  const data = new FormData();
  data.append("file", file);
  xhr.setRequestHeader("sessionId", axios.defaults.headers.sessionId);
  // data.append('upload_preset', 'vj7yela1');
  xhr.send(data);
  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.responseText);
    let data = {
      data: {
        link: process.env.REACT_APP_API_KEY + response.data.url
      }
    };
    return resolve(data);
  });
  xhr.addEventListener("error", () => {
    const error = JSON.parse(xhr.responseText);
    return reject(error);
  });
};
