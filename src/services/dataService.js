const headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
};


const postFeed = params => {

    return fetch('http://snappyt.com/api/post', {
      method: "POST",
      headers: headers,
      body: params
    })

};

export {
	postFeed
}