import config from "../src/configs/configs";
import MongoDBConfig from "../src/databases/MongoDBConfig";
import User from "../src/models/user";

console.log(config);

const uri = config.mongodb.uri;
const user = config.mongodb.user;
const password = config.mongodb.password;

if (uri && user && password) {
  const mongoConfig = new MongoDBConfig(uri, user, password);

  // Función asincrónica para crear y guardar un usuario
  const createAndSaveUser = async () => {
    // Conéctate a la base de datos
    await mongoConfig.connect();

    // Crea un nuevo usuario
    const newUser = new User({
      name: "Test User",
      email: "test2@example.com",
      password: "testpassword",
      role: "USER_ROLE",
    });

    try {
      // Guarda el usuario en la base de datos
      await newUser.save();
      console.log("User created:", newUser);
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      // Cierra la conexión después de realizar las operaciones
      console.log("Disconnected from MongoDB");
      await mongoConfig.disconnect();
    }
  };

  createAndSaveUser(); // Llama a la función para crear y guardar el usuario
} else {
  console.error("MongoDB connection parameters are not defined.");
}
