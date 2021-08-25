const axios = require('axios');
const n = new Promise((resolve) => {
    axios.get('url', {
        headers: {
            'x-function-id': 'unnp'
        }
      })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.log(error);
      });
});
n.then((res)=> {
    console.log(res);

});


