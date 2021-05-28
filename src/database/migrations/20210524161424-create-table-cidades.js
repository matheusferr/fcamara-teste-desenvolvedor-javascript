module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("cidade", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_estado: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "estado",
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

    await queryInterface.addConstraint("cidade", {
      fields: ["nome", "id_estado"],
      type: "unique",
      name: "unique_estado_cidade",
    });
  },

  down: async (queryInterface, _) => {
    await queryInterface.dropTable("cidade");
  },
};
