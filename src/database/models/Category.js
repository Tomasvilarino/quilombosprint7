module.exports = (sequelize, dataTypes) => {
    let alias = 'Categories'

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER, 
        },
        nombre: {
            type: dataTypes.STRING,
            allowNull: false
        }
    }

    let config = {
        tableName: 'categories',
        timestamps: false
    }

    const Category = sequelize.define(alias, cols, config)

    Category.associate = function (models) {
        Category.hasMany(models.Products, {
            as: 'products',
            foreignKey: 'category_id'
        })
    }

    return Category
}