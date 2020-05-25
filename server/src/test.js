const { db } = require("../../pgAdaptor");

db.any('SELECT * FROM public."Platform"').then((res) => {
  console.log(res);
});
