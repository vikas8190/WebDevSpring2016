/**
 * Created by vilas on 17-03-2016.
 */
module.exports = function(app,db) {
    var userModel = require("./models/user.model.server.js")(db);
    var formModel = require("./models/form.model.server.js")(db);
    var fieldModel = require("./models/field.model.server.js")(db);
    var userService = require("./services/user.service.server.js")(app, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var fieldService = require("./services/field.service.server.js")(app, fieldModel);
}
