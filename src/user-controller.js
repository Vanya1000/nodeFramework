import User from "./user-model.js";

/* const users = [
	{ id: 1, name: "Vanya", age: 25 },
	{ id: 2, name: "Vova", age: 26 },
	{ id: 3, name: "Vasya", age: 27 }, // use uuid
]; */

const getUsers = async (req, res) => {
  try {
    if (req.params.id) {
      const user = await User.findById(req.params.id);
      res.sendMy(user);
    } else {
      const users = await User.find();
      res.sendMy(users);
    }
    res.sendMy(users);
  } catch (e) {
    res.sendMy(e.message, 400);
  }

  /* if (req.params.id) {
		const user = users.find((user) => user.id === Number(req.params.id));
		if (user) {
			res.sendMy(user);
		} else {
			res.end("404 Not Found");
		}
	} else{
		res.sendMy(users);
	} */
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.sendMy(user);
		console.log(user);
  } catch (e) {
    res.sendMy(e.message, 400);
  }

  // users.push({ ...req.body, id: users.at(-1).id + 1 });
  // res.sendMy(users);
};

export { getUsers, createUser };
