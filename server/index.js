const express = require('express');
const cors = require('cors');
const presentList = require('./presentList.json');
const quittingList = require('./quittingList.json');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type,Authorization'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

console.log();

app.get('/presentList', (req, res) => {
  const length = req.query.length;
  const id = Number(req.query.id);
  if (id) {
    let patient = presentList.find((el) => el.historyNumber === id) || {};
    res.json({
      historyNumber: patient.historyNumber,
      firstName: patient.firstName,
      lastName: patient.lastName,
      patrName: patient.patrName,
      birthDate: patient.birthDate,
      diagnosis: patient.diagnosis,
    });
  } else if (length) {
    res.json(presentList.length);
  } else {
    const list = presentList.map((patient) => {
      return {
        historyNumber: patient.historyNumber,
        firstName: patient.firstName,
        lastName: patient.lastName,
        patrName: patient.patrName,
        bedNumber: patient.bedNumber,
      };
    });
    res.json(list);
  }
});
app.get('/quittingList', (req, res) => {
  const length = req.query.length;
  const id = Number(req.query.id);
  if (id) {
    let patient = quittingList.find((el) => el.historyNumber === id) || {};
    res.json({
      historyNumber: patient.historyNumber,
      firstName: patient.firstName,
      lastName: patient.lastName,
      patrName: patient.patrName,
      birthDate: patient.birthDate,
      diagnosis: patient.diagnosis,
    });
  } else if (length) {
    res.json(quittingList.length);
  } else {
    const list = quittingList.map((patient) => {
      return {
        historyNumber: patient.historyNumber,
        firstName: patient.firstName,
        lastName: patient.lastName,
        patrName: patient.patrName,
        cause: patient.cause,
      };
    });
    res.json(list);
  }
});

app.use(cors());
app.listen(PORT, () => {
  console.log(`App has been started on port ${PORT}`);
});
