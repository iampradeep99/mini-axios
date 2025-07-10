const miniAxios = require('./index');

miniAxios.get('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    console.log('Status:', response.status);
    console.log('Data:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
