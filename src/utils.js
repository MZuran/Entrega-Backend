import { dirname } from 'path';
import { fileURLToPath } from 'url';

//Bcrypt
import bcrypt from "bcrypt";
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

//Dirname
const _filename = fileURLToPath(import.meta.url)
const _dirname = dirname(_filename);

export default _dirname