import jwt from "jsonwebtoken";
import "dotenv/config";

const { JWT_SECRET } = process.env;

const payload = {
  email: "wivexi2833@astimei.com",
};

const token = jwt.sign(payload, JWT_SECRET, {
  expiresIn: "24h",
});

// console.log(token);
const decodeToken = jwt.decode(token);
// console.log(decodeToken);

try {
  const { email } = jwt.verify(token, JWT_SECRET);
  console.log(email);
} catch (error) {
  console.log(error.message);
}
