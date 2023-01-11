function sleep(ms, data) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), ms);
    });
  }
  
  sleep(1000)
    .then((data) => {
      console.log("data:", data);
      return promise;
    })
    .then((data) => {
      console.log("data: ", data);
      return sleep(1000, data + 1);
    })
    .then((data) => {
      console.log("data: ", data);
      return sleep(1000, data + 1);
    });
  
  // promise
  //     .then((value) => {
  //         console.log(value);
  //     })
  //     .catch((err) => {
  //         console.log(err);
  //     })
  //     .finally(() => {
  //         console.log("done");
  //     });
  
  /* Callback hell */
  setTimeout(() => {
    console.log("first");
    setTimeout(() => {
      console.log("second");
      setTimeout(() => {
        console.log("third");
      }, 1000);
    }, 5000);
  }, 5000);
  