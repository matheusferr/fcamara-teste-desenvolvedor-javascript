module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("estado", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      sigla: {
        type: Sequelize.STRING(2),
        allowNull: false,
      },
      id_pais: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "pais",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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

    await queryInterface.addConstraint("estado", {
      fields: ["sigla", "id_pais"],
      type: "unique",
      name: "unique_pais_estado",
    });
  },

  down: async (queryInterface, _) => {
    await queryInterface.dropTable("estado");
  },
};
