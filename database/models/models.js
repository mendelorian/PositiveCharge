const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_Host,
  user: process.env.DB_User,
  port: process.env.DB_Port,
  password: process.env.DB_Password,
  database: process.env.DB_Name,
  max: 50,
  connectionTimeoutMillis: 1000,
  idleTimeoutMillis: 1000
});

//Add POI Model
pool.addPOI = async (data) => {
  const query = `SELECT * FROM test`;
  const result = await pool.query(query);
  console.log('result in models', result.rows);
  return;
}

module.exports = { pool };

//Auth Model
pool.testModelFunc = async (param) => {
  const query = `SELECT * FROM test`;
  const result = await pool.query(query);
  console.log(result.rows);
  return;
}

//Details Models
pool.lovePoi = async (poiId) => {
  const query = `INSERT INTO test (name) VALUES ('this is a test')`;
  const love = await pool.query(query)
  console.log(love.rows)
  return;
}

pool.grabview = async (poiId) => {
  const query = `SELECT * FROM test`;
  const love = await pool.query(query)
  console.log(love.rows)
  return
}

// exports.detailsModels = {

  // grabview: async (poiId) => {
  //   return dummy.detailData;
  // },

  // lovePoi: async (poiId) => {

  //   const query = `INSERT INTO test (name) VALUES ('this is a test')`;

  // },

//   flagPoi: async (poiId) => {
//     dummy.detailData.flagStatus = !dummy.detailData.flagStatus;
//     return dummy.detailData;
//   },

//   loveExp: async (expId) => {
//     dummy.detailData.experiences[expId].expLoves++;
//     return dummy.detailData;
//   },

//   flagExp: async (expId) => {
//     dummy.detailData.experiences[expId].flagStatus = !dummy.detailData.experiences[expId].flagStatus;
//     return dummy.detailData;
//   },

//   addExperience: async (exp) => {
//     dummy.detailData.experiences['4'] = {
//       expId: 4,
//       expLoves: 0,
//       flagStatus: false,
//       experience: exp,
//       photos: null
//     }
//     return dummy.detailData;
//   },

//   deleteExperience: async (expId) => {
//     delete dummy.detailData.experiences[expId];
//     return dummy.detailData;
//   }

// }

//Filter Models
pool.testModelFunc = async (param) => {
  const query = `SELECT * FROM test`;
  const result = await pool.query(query);
  console.log(result.rows);
  return;
}

//Map Models
pool.testModelFunc = async (param) => {
  const query = `SELECT * FROM test`;
  const result = await pool.query(query);
  console.log(result.rows);
  return;
}

//See POI Models
pool.testModelFunc = async (param) => {
  const query = `SELECT * FROM test`;
  const result = await pool.query(query);
  console.log(result.rows);
  return;
}