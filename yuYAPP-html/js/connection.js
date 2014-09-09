﻿function checkConnection() {
    var networkState = navigator.connection.type;
var checkserver=0;
    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';


    if(states[networkState]== 'No network connection')
    	{
    	  window.plugins.toast.show('No network connection!', 'long', 'center', function (a) { }, function (b) { });
    	  checkserver=1;   	
    	}
    
    if(checkserver==1)
    	{
    	
    	// window.plugins.toast.show('server connection failed!', 'long', 'center', function (a) { }, function (b) { });
    	 
    	}
   
    	 
    
    hideLoader();
}