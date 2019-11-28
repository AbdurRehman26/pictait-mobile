import config from "../config/index";
import AsyncStorage from "@react-native-community/async-storage";

async function retrieveItem(key) {
  console.log(key, 22222);
  try {
    const retrievedItem = await AsyncStorage.getItem(key);
    const item = JSON.parse(retrievedItem);
    return item;
  } catch (error) {
    console.log(error.message, 22222224232);
  }
  return;
}

export const uploadImageCallBack = async (file, resolve, reject) => {
  var headers = config.headers;
  headers["Content-Length"] = 348792;
  headers["Content-Type"] = `multipart/form-data;`;
  retrieveItem("access_token")
    .then(data => {
      headers.Authorization = "Bearer " + data;
    })
    .catch(error => {
      console.log("error", error);
    });

  const data = new FormData();

  data.append("file", {
    file: file,
    uri: file.uri,
    type: file.type,
    size: file.fileSize,
    name: file.fileName
  });
  data.append('key' , 'dare');

  const url = config.systemConfig.baseUrl + "file/upload";

  console.log(headers , url, data)
  console.log('uploading image');

  fetch(url, {
    method: "POST",
    headers: headers,
    body: data
  })
    .then(res => res.json())
    .then(response => {
      console.log('response2222' , response)
      return resolve(response);
    })
    .catch(error => {
      console.log('error1111' , error)
      return reject(error);
    });
};
