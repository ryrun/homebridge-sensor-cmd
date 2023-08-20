"use strict";
const child_process_1 = require("child_process");
let hap;

class SensorCmd {
    constructor(log, config) {
        var that = this;
        this.log = log;
        this.config = config;

        if (this.config.type === "motion") {
            this.sensorService = new hap.Service.MotionSensor(this.config.name);
        } else if (this.config.type === "contact") {
            this.sensorService = new hap.Service.ContactSensor(this.config.name);
        } else if (this.config.type === "occupancy") {
            this.sensorService = new hap.Service.OccupancySensor(this.config.name);
        } else if (this.config.type === "light") {
            this.sensorService = new hap.Service.LightSensor(this.config.name);
        }
        let timeFunc = function () {
            child_process_1.exec(that.config.command, function (err, stdout) {
                let val = err ? false : stdout;
                if (that.config.type === "motion") {
                    that.sensorService.updateCharacteristic(
                        hap.Characteristic.MotionDetected,
                        Math.min(Math.max(parseInt(stdout), 0), 1)
                    );
                } else if (that.config.type === "contact") {
                    that.sensorService.updateCharacteristic(
                        hap.Characteristic.ContactSensorState,
                        Math.min(Math.max(parseInt(stdout), 0), 1)
                    );
                } else if (that.config.type === "occupancy") {
                    that.sensorService.updateCharacteristic(
                        hap.Characteristic.OccupancyDetected,
                        Math.min(Math.max(parseInt(stdout), 0), 1)
                    );
                } else if (that.config.type === "light") {
                    that.sensorService.updateCharacteristic(
                        hap.Characteristic.CurrentAmbientLightLevel,
                        Math.min(Math.max(parseFloat(stdout), 0.0001), 100000)
                    );
                }
                setTimeout(timeFunc, Math.max(that.config.pollingrate, 1000));
            });
        };
        setTimeout(timeFunc, Math.max(that.config.pollingrate, 1000));

        this.infoService = new hap.Service.AccessoryInformation()
            .setCharacteristic(hap.Characteristic.Manufacturer, 'apexad')
            .setCharacteristic(hap.Characteristic.Model, 'sensor-cmd');
    }

    getServices() {
        return [this.infoService, this.sensorService];
    }
}

module.exports = (api) => {
    hap = api.hap;
    api.registerAccessory('SensorCmd', SensorCmd);
};