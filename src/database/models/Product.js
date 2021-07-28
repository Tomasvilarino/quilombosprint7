module.exports = (sequelize, dataTypes) => {

    let alias = 'Products'

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER, 
        },
        nombre: {
            type: dataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: dataTypes.TEXT,
            allowNull: false,
        },
        imagen: {
            type: dataTypes.TEXT,
        },
        precio: {
            type: dataTypes.STRING,
            allowNull: false
        } ,
        stock: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        category_id: {
            type: dataTypes.INTEGER,
            references: {model: "Categories", key: "id"}
        } 
    }

    let config = {
        tableName: "products",
        timestamps: false
    }

    const Product = sequelize.define(alias, cols, config)

    Product.associate = function (models) {
        Product.belongsTo(models.Categories, {
            as: 'categories',
            foreignKey: 'category_id'
        })
    }
    

    return Product
}