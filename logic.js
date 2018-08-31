/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global getAssetRegistry getFactory emit */

/**
 * Sample transaction processor function.
 * @param {org.pfizer.server.Server} tx The sample transaction instance.
 * @transaction
 */
async function Server(tx) {  // eslint-disable-line no-unused-vars
	var factory = getFactory();
    var NS = 'org.pfizer.server';
    var datacenterid = tx.datacenterid;
  	console.log(datacenterid.DataCenterID);
  
  	datacenterid.servers = '';
  
  	if (datacenterid.servers) {
        datacenterid.servers.push(tx);
    } else {
        datacenterid.servers = [tx];
    }
  
  	var temperatureEvent = factory.newEvent(NS, 'TemperatureThresholdEvent');
    temperatureEvent.Frame_SN = "HI";
  	temperatureEvent.Active_Memory = 1;
  	temperatureEvent.Default_Pool_CPUs = 1;
	temperatureEvent.Frame = "Frame";
  	temperatureEvent.HW_Model = "Hardware Model";
  	temperatureEvent.Installed_CPUs = 1;
  	temperatureEvent.Installed_RAM = 1;
  	temperatureEvent.NonProd_Part_CPUs = 1;
  	temperatureEvent.NonProd_Unpart_CPUs = 1;
	temperatureEvent.Prod_Part_CPUs = 1;  
  	temperatureEvent.Prod_Unpart_CPUs = 1;
  	temperatureEvent.Server_Model = "Model";
  	temperatureEvent.datacenterid = datacenterid;
  
    emit(temperatureEvent);
  
  	return getAssetRegistry(NS + '.DataCenterId')
    	.then(function (serverRegistry) {
            return serverRegistry.update(datacenterid);
        });
    
}
