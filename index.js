const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file 👀');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('I could not find that file 👀');
      resolve('success');
    });
  });
};

readFilePro(`${__dirname}/dog.txt`).then((data) => {
  console.log(`Breed: ${data}`);
  return superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body);
      return writeFilePro('dog-img.txt', res.body.message);
      fs.writeFile('dog-img.txt', res.body.message, (err) => {
        console.log('saved!!');
      });
    })
    .then(() => {
      console.log('saved');
    })
    .catch((err) => console.log(err.message));
});
