const express = require("express");
const Transaction = require("mpesa-mz-nodejs-lib");
const app = express();

const config = {
  public_key: process.env.PUBLIC_KEY,
  api_host: process.env.API_HOST,
  api_key: process.env.API_KEY,
  origin: process.env.ORIGIN,
  service_provider_code: process.env.SERVICE_PROVIDER_CODE,
  initiator_identifier: process.env.INITIATOR_IDENTIFIER,
  security_credential: process.env.SECURITY_CREDENTIAL,
};

const transaction = new Transaction(config);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World! ");
});

app.get("/pay", async (req, res) => {

//  const amount = "250";
  const amount = req.get.amount;
  const phone = "840172008";
  //const reference = req.body.reference;
  //const third_party_reference = req.body.third_party_reference;

  // res.write(process.env.API_KEY);

  if (amount && phone){// && reference && third_party_reference) {
    const date = new Date();

    const timestamp =
      date.getFullYear() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2) +
      ("0" + date.getMilliseconds()).slice(-2);

      //res.write(timestamp);

    try {
        const response = await transaction.c2b({
          amount: amount,
          msisdn: phone,
          reference: "Codigo e Sinais",
          third_party_reference: timestamp
        });
        res.json(response);
    } catch (error) {
        res.json(error);
    }
  } else {
    res.write("Missing query parameters.");
  }
  res.end();
});

app.listen(process.env.PORT || 3000);
