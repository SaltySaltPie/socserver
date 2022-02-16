import crypto from "crypto";

interface IAValidPassword {
  password: string;
  hash: string;
  salt: string;
}

export const validPassword = ({
  password,
  hash,
  salt,
}: IAValidPassword): Boolean => {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
};

export const genPassword = (
  password: string
): { salt: string; hash: string } => {
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return { salt, hash };
};
