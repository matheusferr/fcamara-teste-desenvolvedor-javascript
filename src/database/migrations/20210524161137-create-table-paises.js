module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("pais", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      sigla: {
        type: Sequelize.STRING(2),
        allowNull: false,
        unique: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, _) => {
    await queryInterface.dropTable("pais");
  },
};
