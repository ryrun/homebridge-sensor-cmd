# homebridge-sensor-cmd

[![mit license](https://badgen.net/badge/license/MIT/red)](https://github.com/ryrun/homebridge-sensor-cmd/blob/master/LICENSE)

---

Based on https://github.com/apexad/homebridge-sensor-cmd

Just checked how homebridge plugins work, changed the original for some new features.

---

[Homebridge](https://github.com/homebridge/homebridge) plugin that is a proof of concept to create something functional in a ridiculously small amount of code (50 lines to be exaxt, also this README is just 25 lines).  
It impliments a Contact/Motion/Occupancy Sensor that is triggered via the output of a command line/shell script.  
The script simply needs to return a `1` or `0`

## Configuration
This easiest way to use this plugin is to use [homebridge-config-ui-x](https://www.npmjs.com/package/homebridge-config-ui-x).  
To configure, add to the `accessories` section of Homebridge's `config.json` after installing the plugin.

**Config:**
```json
{
  "accessory": "SensorCmd",
  "name": "<name of the sensor>",
  "type": "<sensor type: contact/motion/occupancy) - default is Contact>",
  "command": "<command-line/shell command to execute>"
}
```
