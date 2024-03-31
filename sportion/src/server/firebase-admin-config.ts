import * as admin from 'firebase-admin';

const firebaseAdminConfig = {
  "type": "service_account",
  "project_id": "sportion-8817d",
  "private_key_id": "11bcfaae63ac4ed44efdbff90e8dcdb3b4cccd11",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCq+u3bsAYgTHjI\nVhosqtaryF9XmHMCAdI6u5VCMNkpHvPrtXL3GwXJMe8Y4nJsAEY9YPVU920spEG0\nplW5r8tmwT+FO//13IeDwIZFKTX/GLpDbKeJfLbfn3tnaTuLm0oIuEmlE59YJnzJ\nKE5p9fSRhsBPlIE2TxzqpUmhHTAh3xZgB5Qq4LlIwLD99f93i0Pc5OXXhymV+5wC\nwA8n+MOjOK5PNeNoVBcvXYwlrNWuJT3hLL2itFsVi+4g7x62LbMd8BeZ2HDu30uK\nV7bup8kM6IlOwTWM9ZZBFMJIEYcpG2KPAI9lfwiYTh7C0ESZucUyZuTS9R40tsLA\n13AGZVZ5AgMBAAECggEACusVL1cxPPTFLb3Z1ApgxP15oSVaCsHFA/0gjeaCp46T\ncvTWT5NJLkzjAMrNFbp6wcakQ/W84gHnNDr+9GmWaoximwZ21ONtP+uWZ2o3SX/x\nvQZ+OFhfcS5E+hiNNeAHvUDPaxwyq7VheJL7Vube5EAfnbVU/vvUU+OULRapETCL\n3qp7BMEtUmz/ijZTyta5+euPExr7r07FxrTHdvUFR0Qjm2tmGKpBOxSF5oBtEpKZ\nffSJDcThwK6ZmokgyEKPgNkoB4t6JcZGqBNTum3dGZR2Adp+fjCEIuobHasI321/\nMS6rdIf6GuCYSOpVYPVcWDZX6tQGsolQavSVWQtM1QKBgQDqsZXa0GnfbI1Qq+1c\nk1GJqsReJRc+JNBorVxYfb87+vUqeNNVaxhie7/kJf6CoeqAUsi0N+oS2bBOhfYU\neYDeN5zXRiOlubdKPufUjiDuvOCaIV5o+7mCfNRZUPchdXZlOyuR2vSkG2zv5dhI\n/VrSsVqCEUbaKTFVRISYHM+2fwKBgQC6gJsYRrGxVAPJlSVyjm6mw91NukN2GTz/\nANFClCxsySXqglX7qiRIp0Y+ieg306qeM+rbVj2eU/AJe9pvY82x4o2tSmCUkRH1\nCfw44zZxIf8HUg7KUsdX4nSGlfRgiPxdYqTPWEr7CcZCCiLYexwhU28biw8BhJPd\n5rMblxYnBwKBgQC8ONBGPP+sABMVr80dgcjS7/Gsz3JklIHQcbit/6tvH0WgWmaj\nCtDzquuqvg3wFotLfxkX7//6Pjv3vdgtc4S2s0NGIypTry4gjXLANXyT+0bmVfyx\nlbChxhtHxndsjhf1+A5pW4D4XEZx35QmdYpxj2tXBSQdswutptXwaKrtYQKBgDzW\nKsF2fgw8PagKENcXgxy/E3eBZPQnM3BzUc+ICh3KV6Xxsh6P15ojhpRr4+YiE6vb\nf6bgsOTuuIQ/dHeVdMmr/08hzfNohxUJls7vvxiUYF6A8/YnnoMaiaxFShwbU0cb\nIGvKf1r4S0XLjKZVMk3kq3+uksyJ9LoTwSUk2cMNAoGAKO6PNCw/LPNBoMxjKjn1\n74SQQZpqLUhlfWHoQt4xOhnSv8r/eCbgWsTAi+NH56igyxl6ArTJNhlOPzwy/1Ko\nCgbDQV+elX6pah0Av8eT0ZGxzCXQiHkCHRqQwuIRiSsDneHlnyAG+YanOTqYP7mv\nIBwOZG5KlJbaW6E+qglQqfs=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-k6mh0@sportion-8817d.iam.gserviceaccount.com",
  "client_id": "104734395663983735273",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-k6mh0%40sportion-8817d.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};
if (admin.apps.length === 0) {
  admin.initializeApp({
    // @ts-ignore
    credential: admin.credential.cert(firebaseAdminConfig),
  });
}

export const { firestore, auth: adminAuth } = admin;
