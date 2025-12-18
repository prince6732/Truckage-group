module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [result] = await queryInterface.sequelize.query(
      `SELECT COUNT(*) AS count FROM subscription_types`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (parseInt(result.count) === 0) {
      await queryInterface.bulkInsert('subscription_types', [
        {
          id: 1,
          name: 'Demo',
          price: 3000.00,
          duration: 'month',
          status: true,
        },
      ]);

      console.log("✅ Subscription types seeded successfully");
    } else {
      console.log("ℹ️ Subscription types table already has data. Skipping seeding.");
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('subscription_types', null, {});
    console.log("🗑️ Subscription types deleted.");
  },
};
