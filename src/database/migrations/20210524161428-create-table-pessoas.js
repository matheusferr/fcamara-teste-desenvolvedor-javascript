module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("pessoa", {
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
      cpf: {
        type: Sequelize.STRING(11),
        allowNull: false,
        unique: true,
      },
      data_nascimento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nome_mae: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nome_pai: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      local_nascimento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "cidade",
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
  },

  down: async (queryInterface, _) => {
    await queryInterface.dropTable("pessoa");
  },
};
