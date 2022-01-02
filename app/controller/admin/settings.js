const settingModel = require('@models/settings');
const definedSetting = require('@config/setting');
exports.index = async (req, res) => {
    const settings = await settingModel.findAll();
    
    const presentedSettings = {};
    settings.forEach(item => {
        presentedSettings[item.setting_name]=item.setting_value
    });
    
    res.adminRender('admin/settings/index', {
        settings: presentedSettings, helpers: {
            isChecked: function (value, option) {
                return parseInt(value) === 1 ? option.fn(this) : option.inverse(this);
            },
        }
    });
};

exports.store = async (req, res) => {
    const settings = req.body;
    console.log(settings)

    const permittedSettingKeys = Object.keys(settings).filter(setting =>{
        return Object.keys(definedSetting).includes(setting)
    });
    console.log(permittedSettingKeys)
    const permittedSettings = {};
    permittedSettingKeys.forEach(key => {
        permittedSettings[key] = settings[key];
    });
    const validatedSetting = { ...definedSetting, ...permittedSettings };
    const result = await settingModel.update(validatedSetting);
    return res.redirect('/admin/settings')
};

