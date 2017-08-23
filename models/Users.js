import bcrypt from 'bcrypt';

export default (sequelize, dataType) => {
  const Users = sequelize.define('Users', {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    email: {
      type: dataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    password: {
      type: dataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    }
  },
  {
    hooks: {
      beforeCreate: user => {
        const salt = bcrypt.genSaltSync()
        user.set('password', bcrypt.hashSync(user.password, salt))
      }
    },
    // classMethods: {
    //   isPassword: (encodedPassword, password) => {
    //     console.log("ACACACACA" + encodedPassword + " " +  password)
    //       const v = bcrypt.compareSync(password, encodedPassword)
    //       console.log(v)
    //       return v
    //   },
    // }
  })

  Users.isPassword = (encodedPassword, password) =>  bcrypt.compareSync(password, encodedPassword);

  return Users
}
