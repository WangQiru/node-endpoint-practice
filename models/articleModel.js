module.exports = (sequelize, DataTypes) =>
    sequelize.define('Article', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        url: DataTypes.TEXT,
        title: DataTypes.TEXT,
        content: DataTypes.TEXT,
        comment: DataTypes.TEXT,
    });
