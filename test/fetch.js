import axios from 'axios'

const url = 'https://blog.csdn.net/qq744746842/article/details/114265353'
const postSearch = (data) => {
  data.data.is_preview = true
  return new Promise((resolve) => {
    axios({
      method: 'post',
      url,
      data: data.data
    })
      .then(function (aa) {
        resolve(aa)
      })
      .catch(function (error) {
        console.log(2)
      })
  })
}

const n = () => {
  return new Promise((resolve) => {
    axios.get(url, {
      headers: {
        'x-bytefaas-function-id': 'xxx'
      }
    })
      .then(function (response) {
        postSearch(response).then((res) => {
          console.log('--------0----------')
          resolve(res)
        }).catch((error) => {
          console.log('--------1----------', 2)
        })
      })
      .catch(function (error) {
        console.log(2)
      })
  })
}
export default n
// n.then((res)=> {
//     console.log(1);
// });
