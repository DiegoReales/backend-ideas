const CustomError = require('../helpers/custom-error.helper');
const { generateToken }  = require('../helpers/jwt.helper');
let _userService = null;

class AuthService {
  constructor({ UserService }) {
    _userService = UserService;
  }

  async signUp(user) {
    const { username } = user;  
    const userExist = await _userService.getUserByUsername(username);
    if (userExist) throw new CustomError(401, "Usuario ya existe");
    return await _userService.create(user);
  }

  async signIn(user) {
    const { username, password } = user;
    const userExist = await _userService.getUserByUsername(username);
    if (!userExist) throw new CustomError(404, "Usuario no existe");
    const validPassword = userExist.comparePassword(password);
    if (!validPassword) throw new CustomError(400, "Contraseña invalida");
    const userToEncode = {
      id: userExist._id,
      username: userExist.username,
      name: userExist.name
    }
    const token = generateToken(userToEncode);
    return  { token, user: userToEncode };
  }
}

module.exports = AuthService;