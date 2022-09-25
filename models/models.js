import sequelize from '../utils/db.js'
import {DataTypes} from 'sequelize'

const User = sequelize.define('user', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    phone: {type: DataTypes.STRING, allowNull: false},
    username: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
})

const BasketProduct = sequelize.define('basket_product', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING(1024), allowNull: false},
    measure: {type: DataTypes.STRING, allowNull: false,},
    rating: {type: DataTypes.INTEGER, defaultValue: 0}
})

const Department = sequelize.define('department', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})





User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

Department.hasMany(Product)
Product.belongsTo(Department)

Category.hasMany(Product)
Product.belongsTo(Category)

Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)

Department.hasMany(Category)
Category.belongsTo(Department)



export default {
    Department,
    Category,
    User,
    Basket,
    BasketProduct,
    Product,
}