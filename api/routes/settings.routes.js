const Router = require("express");
const settingsRouter = Router();
const settingsController = require("../controllers/settings.controller");

settingsRouter.route('/')
    .get(settingsController.findAllSettings)
    .post(settingsController.upsertSetting);

settingsRouter.route('/:key')
    .get(settingsController.findSettingByKey)
    .put(settingsController.updateSetting)
    .delete(settingsController.deleteSetting)

module.exports = settingsRouter;
