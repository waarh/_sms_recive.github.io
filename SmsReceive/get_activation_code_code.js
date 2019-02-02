_SMS_CONFIRM_DATA = _BAS_SMSCONFIRMDATA[<%= number %>]
    if(!_SMS_CONFIRM_DATA)
        fail("No information about this number")


_if(_SMS_CONFIRM_DATA["method"] == "sms-reg.com", function(){
    _if(_SMS_CONFIRM_DATA["not_first"], function(){

        var url = "http://api.sms-reg.com/getNumRepeat.php?tzid=" + _SMS_CONFIRM_DATA["originalid"] + "&apikey=" + _SMS_CONFIRM_DATA["api"]
        _call(_BAS_SMSREGAPIREQUEST,{method: "getNumRepeat", url: url})!
        var json = _result()

        _SMS_CONFIRM_DATA["id"] = json["tzid"]
        _BAS_SMSCONFIRMDATA[ _SMS_CONFIRM_DATA["number"] ] = _SMS_CONFIRM_DATA

        _SMS_MAX_WAIT = Date.now() + 60000 * (<%= max_wait %>)
        _do(function(){
            if(Date.now() > _SMS_MAX_WAIT)
                fail("Sms Reg Error: Timeout for getState");

            _call(_BAS_SMSREGAPIREQUEST,{method: "getState", number: _SMS_CONFIRM_DATA["number"], dontcheckresp: true})!
            var json = _result()

            if(json["response"] === "TZ_NUM_PREPARE")
            {
                _break();
            }

            if(json["response"] !== "TZ_INPOOL")
            {
                fail("Sms Reg Error: " + json["response"] + " for getNum");
            }

        })!

    })!

	_SMS_MAX_WAIT = Date.now() + 60000 * (<%= max_wait %>)
	_do(function(){
        if(Date.now() > _SMS_MAX_WAIT)
			fail("Sms Reg Error: Timeout during solve");

        _call(_BAS_SMSREGAPIREQUEST,{method: "getState", number: _SMS_CONFIRM_DATA["number"], dontcheckresp: true})!
        var json = _result()

        if(json["response"] === "TZ_NUM_ANSWER")
        {
            <%= variable %> = json["msg"]
            _SMS_CONFIRM_DATA["not_first"] = true
        	_BAS_SMSCONFIRMDATA[ _SMS_CONFIRM_DATA["number"] ] = _SMS_CONFIRM_DATA
            _break();
        }

        if(json["response"] !== "TZ_NUM_WAIT" && json["response"] !== "TZ_NUM_PREPARE")
        {
            fail("Sms Reg Error: " + json["response"] + " for getNum");
        }


    })!


})!

_if(_SMS_CONFIRM_DATA["method"] == "sms-activate.ru", function(){

    _if_else(_SMS_CONFIRM_DATA["not_first"], function(){
        _call(_BAS_SMSACTIVATEPIREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "3", id: _SMS_CONFIRM_DATA["id"]})!
        var arr = _result()
        if(arr[0].indexOf("ACCESS_") != 0)
        {
            fail("Error during sms-activate setStatus(3) " + arr.join(":"))
        }

    }, function(){
        _call(_BAS_SMSACTIVATEPIREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "1", id: _SMS_CONFIRM_DATA["id"]})!
        var arr = _result()
        if(arr[0].indexOf("ACCESS_") != 0)
        {
            fail("Error during sms-activate setStatus(1) " + arr.join(":"))
        }
    })!



    _SMS_MAX_WAIT = Date.now() + 60000 * (<%= max_wait %>)
    _do(function(){
        if(Date.now() > _SMS_MAX_WAIT)
            fail("Sms Activate Error: Timeout during solve");

        _call(_BAS_SMSACTIVATEPIREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "getStatus", id: _SMS_CONFIRM_DATA["id"]})!

        var arr = _result()

        if(arr[0] == "STATUS_OK")
        {
            <%= variable %> = arr.slice(1).join(":")
            _SMS_CONFIRM_DATA["not_first"] = true
            _BAS_SMSCONFIRMDATA[ _SMS_CONFIRM_DATA["number"] ] = _SMS_CONFIRM_DATA
            _break();
        }


        if(arr[0] != "STATUS_WAIT_CODE" && arr[0] != "STATUS_WAIT_RETRY")
        {
            fail("Error during sms-activate getStatus " + arr.join(":"))
        }


    })!


})!

_if(_SMS_CONFIRM_DATA["method"] == "smspva.com", function(){
    _if(_SMS_CONFIRM_DATA["not_first"], function(){
        _call(_BAS_SMSPVAREQUEST,{apikey: _SMS_CONFIRM_DATA["api"], metod: "get_proverka", service: _SMS_CONFIRM_DATA["service"], number: _SMS_CONFIRM_DATA["number"]})!
        var json = _result()
        if(json["response"] != "ok")
        {
            fail("failed to get_proverka from smspva " + JSON.stringify(json))
        }
        if(parseInt(json["id"]) == 0)
            fail("Fail to get second sms with smspva")
        _SMS_CONFIRM_DATA["id"] = json["id"]
        _BAS_SMSCONFIRMDATA[ _SMS_CONFIRM_DATA["prefix"] + _SMS_CONFIRM_DATA["number"] ] = _SMS_CONFIRM_DATA
    })!

    _SMS_MAX_WAIT = Date.now() + 60000 * (<%= max_wait %>)
    _do(function(){
        if(Date.now() > _SMS_MAX_WAIT)
            fail("SmsPva Error: Timeout during solve");

        _call(_BAS_SMSPVAREQUEST,{apikey: _SMS_CONFIRM_DATA["api"], id: _SMS_CONFIRM_DATA["id"], metod: "get_sms", service: _SMS_CONFIRM_DATA["service"], country: _SMS_CONFIRM_DATA["country"]})!
        var json = _result()
        if(json["response"] == "1")
        {
            <%= variable %> = json["sms"]
            _SMS_CONFIRM_DATA["not_first"] = true
            _BAS_SMSCONFIRMDATA[ _SMS_CONFIRM_DATA["prefix"] + _SMS_CONFIRM_DATA["number"] ] = _SMS_CONFIRM_DATA
            _break();
        }

        if(json["response"] != "2")
        {
            fail("Error during smspva get_sms " +JSON.stringify(json))
        }

    })!


})!

_if(_SMS_CONFIRM_DATA["method"] == "smsactivation.pro", function(){
	
	_if(_SMS_CONFIRM_DATA["not_first"], function(){
        _call(_BAS_SMSACTIVATIONPROREQUEST,{a: "sms", b: "renew", c: _SMS_CONFIRM_DATA["api"], d: _SMS_CONFIRM_DATA["number"]})!
        var resp = _result()
        
		if(resp != "ok")
        {
            fail("failed to get_proverka from smactivation.pro " + resp)
        }
        
        _BAS_SMSCONFIRMDATA[ _SMS_CONFIRM_DATA["number"] ] = _SMS_CONFIRM_DATA
    })!
	
	
	_SMS_MAX_WAIT = Date.now() + 60000 * (<%= max_wait %>)
	_do(function(){
        if(Date.now() > _SMS_MAX_WAIT)
            fail("smactivation.pro Error: Timeout during solve");

        _call(_BAS_SMSACTIVATIONPROREQUEST,{a: "get", b: "sms",  c: _SMS_CONFIRM_DATA["number"], d: _SMS_CONFIRM_DATA["secret"], e: _SMS_CONFIRM_DATA["country"]})!
        var resp = _result()
		
        if(resp != "Error|Not Receive")
        {
            <%= variable %> = resp
            _SMS_CONFIRM_DATA["not_first"] = true
            _BAS_SMSCONFIRMDATA[  _SMS_CONFIRM_DATA["number"] ] = _SMS_CONFIRM_DATA
            _break();
        }

		if(/error/i.test(resp) || /threads/i.test(resp))
		{
			fail("Error during smactivation.pro get sms " + resp)
		}
    })!
	
})!

_if(_SMS_CONFIRM_DATA["method"] == "vr-sms.pro", function(){

    _if_else(_SMS_CONFIRM_DATA["not_first"], function(){
        _call(_BAS_VRSMSPROREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "3", id: _SMS_CONFIRM_DATA["id"]})!
        var arr = _result()
        if(arr[0].indexOf("ACCESS_") != 0)
        {
            fail("Error during vr-sms.pro setStatus(3) " + arr.join(":"))
        }

    }, function(){
        _call(_BAS_VRSMSPROREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "1", id: _SMS_CONFIRM_DATA["id"]})!
        var arr = _result()
        if(arr[0].indexOf("ACCESS_") != 0)
        {
            fail("Error during vr-sms.pro setStatus(1) " + arr.join(":"))
        }
    })!



    _SMS_MAX_WAIT = Date.now() + 60000 * (<%= max_wait %>)
    _do(function(){
        if(Date.now() > _SMS_MAX_WAIT)
            fail("VR-SMS.PRO Error: Timeout during solve");

        _call(_BAS_VRSMSPROREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "getStatus", id: _SMS_CONFIRM_DATA["id"]})!

        var arr = _result()

        if(arr[0] == "STATUS_OK")
        {
            <%= variable %> = arr.slice(1).join(":")
            _SMS_CONFIRM_DATA["not_first"] = true
            _BAS_SMSCONFIRMDATA[ _SMS_CONFIRM_DATA["number"] ] = _SMS_CONFIRM_DATA
            _break();
        }


        if(arr[0] != "STATUS_WAIT_CODE" && arr[0] != "STATUS_WAIT_RETRY")
        {
            fail("Error during vr-sms.pro getStatus " + arr.join(":"))
        }


    })!


})!

_if(_SMS_CONFIRM_DATA["method"] == "5sim.net", function(){

    _if_else(_SMS_CONFIRM_DATA["not_first"], function(){
        _call(_BAS_FIVESIMREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "3", id: _SMS_CONFIRM_DATA["id"]})!
        var arr = _result()
        if(arr[0].indexOf("ACCESS_") != 0)
        {
            fail("Error during 5sim.net setStatus(3) " + arr.join(":"))
        }

    }, function(){
        _call(_BAS_FIVESIMREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "1", id: _SMS_CONFIRM_DATA["id"]})!
        var arr = _result()
        if(arr[0].indexOf("ACCESS_") != 0)
        {
            fail("Error during 5sim.net setStatus(1) " + arr.join(":"))
        }
    })!



    _SMS_MAX_WAIT = Date.now() + 60000 * (<%= max_wait %>)
    _do(function(){
        if(Date.now() > _SMS_MAX_WAIT)
            fail("5sim.net Error: Timeout during solve");

        _call(_BAS_FIVESIMREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "getStatus", id: _SMS_CONFIRM_DATA["id"]})!

        var arr = _result()

        if(arr[0] == "STATUS_OK")
        {
            <%= variable %> = arr.slice(1).join(":")
            _SMS_CONFIRM_DATA["not_first"] = true
            _BAS_SMSCONFIRMDATA[ _SMS_CONFIRM_DATA["number"] ] = _SMS_CONFIRM_DATA
            _break();
        }


        if(arr[0] != "STATUS_WAIT_CODE" && arr[0] != "STATUS_WAIT_RETRY")
        {
            fail("Error during 5sim.net getStatus " + arr.join(":"))
        }


    })!


})!

_if(_SMS_CONFIRM_DATA["method"] == "smsvk.net", function(){

    _if_else(_SMS_CONFIRM_DATA["not_first"], function(){
        _call(_BAS_SMSVKREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "3", id: _SMS_CONFIRM_DATA["id"]})!
        var arr = _result()
        if(arr[0].indexOf("ACCESS_") != 0)
        {
            fail("Error during smsvk.net setStatus(3) " + arr.join(":"))
        }

    }, function(){
        _call(_BAS_SMSVKREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "1", id: _SMS_CONFIRM_DATA["id"]})!
        var arr = _result()
        if(arr[0].indexOf("ACCESS_") != 0)
        {
            fail("Error during smsvk.net setStatus(1) " + arr.join(":"))
        }
    })!



    _SMS_MAX_WAIT = Date.now() + 60000 * (<%= max_wait %>)
    _do(function(){
        if(Date.now() > _SMS_MAX_WAIT)
            fail("smsvk.net Error: Timeout during solve");

        _call(_BAS_SMSVKREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "getStatus", id: _SMS_CONFIRM_DATA["id"]})!

        var arr = _result()

        if(arr[0] == "STATUS_OK")
        {
            <%= variable %> = arr.slice(1).join(":")
            _SMS_CONFIRM_DATA["not_first"] = true
            _BAS_SMSCONFIRMDATA[ _SMS_CONFIRM_DATA["number"] ] = _SMS_CONFIRM_DATA
            _break();
        }


        if(arr[0] != "STATUS_WAIT_CODE" && arr[0] != "STATUS_WAIT_RETRY")
        {
            fail("Error during smsvk.net getStatus " + arr.join(":"))
        }


    })!


})!

_if(_SMS_CONFIRM_DATA["method"] == "getsms.online", function(){

    _if_else(_SMS_CONFIRM_DATA["not_first"], function(){
        _call(_BAS_GETSMSONLINEREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "3", id: _SMS_CONFIRM_DATA["id"]})!
        var arr = _result()
        if(arr[0].indexOf("ACCESS_") != 0)
        {
            fail("Error during GETSMS.ONLINE setStatus(3) " + arr.join(":"))
        }

    }, function(){
        _call(_BAS_GETSMSONLINEREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "1", id: _SMS_CONFIRM_DATA["id"]})!
        var arr = _result()
        if(arr[0].indexOf("ACCESS_") != 0)
        {
            fail("Error during GETSMS.ONLINE setStatus(1) " + arr.join(":"))
        }
    })!



    _SMS_MAX_WAIT = Date.now() + 60000 * (<%= max_wait %>)
    _do(function(){
        if(Date.now() > _SMS_MAX_WAIT)
            fail("GETSMS.ONLINE Error: Timeout during solve");

        _call(_BAS_GETSMSONLINEREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "getStatus", id: _SMS_CONFIRM_DATA["id"]})!

        var arr = _result()

        if(arr[0] == "STATUS_OK")
        {
            <%= variable %> = arr.slice(1).join(":")
            _SMS_CONFIRM_DATA["not_first"] = true
            _BAS_SMSCONFIRMDATA[ _SMS_CONFIRM_DATA["number"] ] = _SMS_CONFIRM_DATA
            _break();
        }


        if(arr[0] != "STATUS_WAIT_CODE" && arr[0] != "STATUS_WAIT_RETRY")
        {
            fail("Error during GETSMS.ONLINE getStatus " + arr.join(":"))
        }


    })!


})!

_if(_SMS_CONFIRM_DATA["method"] == "vak-sms.com", function(){

    _if_else(_SMS_CONFIRM_DATA["not_first"], function(){
        _call(_BAS_VAKSMSREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "3", id: _SMS_CONFIRM_DATA["id"]})!
        var arr = _result()
        if(arr[0].indexOf("ACCESS_") != 0)
        {
            fail("Error during vak-sms.com setStatus(3) " + arr.join(":"))
        }

    }, function(){
        _call(_BAS_VAKSMSREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "1", id: _SMS_CONFIRM_DATA["id"]})!
        var arr = _result()
        if(arr[0].indexOf("ACCESS_") != 0)
        {
            fail("Error during vak-sms.com setStatus(1) " + arr.join(":"))
        }
    })!



    _SMS_MAX_WAIT = Date.now() + 60000 * (<%= max_wait %>)
    _do(function(){
        if(Date.now() > _SMS_MAX_WAIT)
            fail("vak-sms.com Error: Timeout during solve");

        _call(_BAS_VAKSMSREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "getStatus", id: _SMS_CONFIRM_DATA["id"]})!

        var arr = _result()

        if(arr[0] == "STATUS_OK")
        {
            <%= variable %> = arr.slice(1).join(":")
            _SMS_CONFIRM_DATA["not_first"] = true
            _BAS_SMSCONFIRMDATA[ _SMS_CONFIRM_DATA["number"] ] = _SMS_CONFIRM_DATA
            _break();
        }


        if(arr[0] != "STATUS_WAIT_CODE" && arr[0] != "STATUS_WAIT_RETRY")
        {
            fail("Error during vak-sms.com getStatus " + arr.join(":"))
        }


    })!


})!

_if(_SMS_CONFIRM_DATA["method"] == "sms-get.co", function(){

    _if_else(_SMS_CONFIRM_DATA["not_first"], function(){
        _call(_BAS_SMSGETREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "3", id: _SMS_CONFIRM_DATA["id"]})!
        var arr = _result()
        if(arr[0].indexOf("ACCESS_") != 0)
        {
            fail("Error during sms-get.co setStatus(3) " + arr.join(":"))
        }

    }, function(){
        _call(_BAS_SMSGETREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "1", id: _SMS_CONFIRM_DATA["id"]})!
        var arr = _result()
        if(arr[0].indexOf("ACCESS_") != 0)
        {
            fail("Error during sms-get.co setStatus(1) " + arr.join(":"))
        }
    })!



    _SMS_MAX_WAIT = Date.now() + 60000 * (<%= max_wait %>)
    _do(function(){
        if(Date.now() > _SMS_MAX_WAIT)
            fail("sms-get.co Error: Timeout during solve");

        _call(_BAS_SMSGETREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "getStatus", id: _SMS_CONFIRM_DATA["id"]})!

        var arr = _result()

        if(arr[0] == "STATUS_OK")
        {
            <%= variable %> = arr.slice(1).join(":")
            _SMS_CONFIRM_DATA["not_first"] = true
            _BAS_SMSCONFIRMDATA[ _SMS_CONFIRM_DATA["number"] ] = _SMS_CONFIRM_DATA
            _break();
        }


        if(arr[0] != "STATUS_WAIT_CODE" && arr[0] != "STATUS_WAIT_RETRY")
        {
            fail("Error during sms-get.co getStatus " + arr.join(":"))
        }


    })!


})!

_if(_SMS_CONFIRM_DATA["method"] == "simsms.org", function(){
	
    _if(_SMS_CONFIRM_DATA["not_first"], function(){
        _call(_BAS_SIMSMSREQUEST,{apikey: _SMS_CONFIRM_DATA["api"], metod: "get_proverka", service: _SMS_CONFIRM_DATA["service"], number: _SMS_CONFIRM_DATA["number"]})!
        var json = _result()
        if(json["response"] != "ok")
        {
            fail("failed to get_proverka from simsms.org " + JSON.stringify(json))
        }
        if(parseInt(json["id"]) == 0)
            fail("Fail to get second sms with simsms.org")
        _SMS_CONFIRM_DATA["id"] = json["id"]
        _BAS_SMSCONFIRMDATA[ _SMS_CONFIRM_DATA["prefix"] + _SMS_CONFIRM_DATA["number"] ] = _SMS_CONFIRM_DATA
    })!

    _SMS_MAX_WAIT = Date.now() + 60000 * (<%= max_wait %>)
    _do(function(){
        if(Date.now() > _SMS_MAX_WAIT)
            fail("simsms.org Error: Timeout during solve");

        _call(_BAS_SIMSMSREQUEST,{apikey: _SMS_CONFIRM_DATA["api"], id: _SMS_CONFIRM_DATA["id"], metod: "get_sms", service: _SMS_CONFIRM_DATA["service"], country: _SMS_CONFIRM_DATA["country"], sms: "sms"})!
        var json = _result()
        if(json["response"] == "1")
        {
            <%= variable %> = json["sms"]
            _SMS_CONFIRM_DATA["not_first"] = true
            _BAS_SMSCONFIRMDATA[ _SMS_CONFIRM_DATA["prefix"] + _SMS_CONFIRM_DATA["number"] ] = _SMS_CONFIRM_DATA
            _break();
        }

        if(json["response"] != "2")
        {
            fail("Error during simsms.org get_sms " +JSON.stringify(json))
        }

    })!

})!

_if(_SMS_CONFIRM_DATA["method"] == "cheapsms.ru", function(){

    _if_else(_SMS_CONFIRM_DATA["not_first"], function(){
        _call(_BAS_CHEAPSMSREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "3", id: _SMS_CONFIRM_DATA["id"]})!
        var arr = _result()
        if(arr[0].indexOf("ACCESS_") != 0)
        {
            fail("Error during CHEAPSMS.PRO setStatus(3) " + arr.join(":"))
        }

    }, function(){
        _call(_BAS_CHEAPSMSREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "1", id: _SMS_CONFIRM_DATA["id"]})!
        var arr = _result()
        if(arr[0].indexOf("ACCESS_") != 0)
        {
            fail("Error during CHEAPSMS.PRO setStatus(1) " + arr.join(":"))
        }
    })!



    _SMS_MAX_WAIT = Date.now() + 60000 * (<%= max_wait %>)
    _do(function(){
        if(Date.now() > _SMS_MAX_WAIT)
            fail("CHEAPSMS.PRO Error: Timeout during solve");

        _call(_BAS_CHEAPSMSREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "getStatus", id: _SMS_CONFIRM_DATA["id"]})!

        var arr = _result()

        if(arr[0] == "STATUS_OK")
        {
            <%= variable %> = arr.slice(1).join(":")
            _SMS_CONFIRM_DATA["not_first"] = true
            _BAS_SMSCONFIRMDATA[ _SMS_CONFIRM_DATA["number"] ] = _SMS_CONFIRM_DATA
            _break();
        }


        if(arr[0] != "STATUS_WAIT_CODE" && arr[0] != "STATUS_WAIT_RETRY")
        {
            fail("Error during CHEAPSMS.PRO getStatus " + arr.join(":"))
        }


    })!


})!

_if(_SMS_CONFIRM_DATA["method"] == "give-sms.com", function(){

    _if(_SMS_CONFIRM_DATA["not_first"], function(){
        _call(_BAS_SIMSMSREQUEST,{apikey: _SMS_CONFIRM_DATA["api"], method: "get_proverka", service: _SMS_CONFIRM_DATA["service"], number: _SMS_CONFIRM_DATA["number"]})!
        var json = _result()
        if(json["response"] != "ok")
        {
            fail("failed to get_proverka from give-sms.com " + JSON.stringify(json))
        }
        if(parseInt(json["id"]) == 0)
            fail("Fail to get second sms with give-sms.com")
        _SMS_CONFIRM_DATA["id"] = json["id"]
        _BAS_SMSCONFIRMDATA[ _SMS_CONFIRM_DATA["prefix"] + _SMS_CONFIRM_DATA["number"] ] = _SMS_CONFIRM_DATA
    })!

    _SMS_MAX_WAIT = Date.now() + 60000 * (<%= max_wait %>)
    _do(function(){
        if(Date.now() > _SMS_MAX_WAIT)
            fail("give-sms.com Error: Timeout during solve");

        _call(_BAS_SIMSMSREQUEST,{apikey: _SMS_CONFIRM_DATA["api"], id: _SMS_CONFIRM_DATA["id"], method: "getcode", service: _SMS_CONFIRM_DATA["service"], country: _SMS_CONFIRM_DATA["country"], sms: "sms"})!
        var json = _result()
        if(json["response"] == "1")
        {
            <%= variable %> = json["sms"]
            _SMS_CONFIRM_DATA["not_first"] = true
            _BAS_SMSCONFIRMDATA[ _SMS_CONFIRM_DATA["prefix"] + _SMS_CONFIRM_DATA["number"] ] = _SMS_CONFIRM_DATA
            _break();
        }

        if(json["response"] != "2")
        {
            fail("Error during give-sms.com get_sms " +JSON.stringify(json))
        }

    })!

})!

_if(_SMS_CONFIRM_DATA["method"] == "smshub.org", function(){

    _if_else(_SMS_CONFIRM_DATA["not_first"], function(){
        _call(_BAS_SMSHUBPIREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "3", id: _SMS_CONFIRM_DATA["id"]})!
        var arr = _result()
        if(arr[0].indexOf("ACCESS_") != 0)
        {
            fail("Error during smshub.org setStatus(3) " + arr.join(":"))
        }

    }, function(){
        _call(_BAS_SMSHUBPIREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "1", id: _SMS_CONFIRM_DATA["id"]})!
        var arr = _result()
        if(arr[0].indexOf("ACCESS_") != 0)
        {
            fail("Error during smshub.org setStatus(1) " + arr.join(":"))
        }
    })!



    _SMS_MAX_WAIT = Date.now() + 60000 * (<%= max_wait %>)
    _do(function(){
        if(Date.now() > _SMS_MAX_WAIT)
            fail("smshub.org Error: Timeout during solve");

        _call(_BAS_SMSHUBPIREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "getStatus", id: _SMS_CONFIRM_DATA["id"]})!

        var arr = _result()

        if(arr[0] == "STATUS_OK")
        {
            <%= variable %> = arr.slice(1).join(":")
            _SMS_CONFIRM_DATA["not_first"] = true
            _BAS_SMSCONFIRMDATA[ _SMS_CONFIRM_DATA["number"] ] = _SMS_CONFIRM_DATA
            _break();
        }


        if(arr[0] != "STATUS_WAIT_CODE" && arr[0] != "STATUS_WAIT_RETRY")
        {
            fail("Error during smshub.org getStatus " + arr.join(":"))
        }


    })!


})!

_if(_SMS_CONFIRM_DATA["method"] == "smska.net", function(){

    _if_else(_SMS_CONFIRM_DATA["not_first"], function(){
        _call(_BAS_SMSKAREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "3", id: _SMS_CONFIRM_DATA["id"]})!
        var arr = _result()
        if(arr[0].indexOf("ACCESS_") != 0)
        {
            fail("Error during smska.net setStatus(3) " + arr.join(":"))
        }

    }, function(){
        _call(_BAS_SMSKAREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "1", id: _SMS_CONFIRM_DATA["id"]})!
        var arr = _result()
        if(arr[0].indexOf("ACCESS_") != 0)
        {
            fail("Error during smska.net setStatus(1) " + arr.join(":"))
        }
    })!



    _SMS_MAX_WAIT = Date.now() + 60000 * (<%= max_wait %>)
    _do(function(){
        if(Date.now() > _SMS_MAX_WAIT)
            fail("smska.net Error: Timeout during solve");

        _call(_BAS_SMSKAREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "getStatus", id: _SMS_CONFIRM_DATA["id"]})!

        var arr = _result()

        if(arr[0] == "STATUS_OK")
        {
            <%= variable %> = arr.slice(1).join(":")
            _SMS_CONFIRM_DATA["not_first"] = true
            _BAS_SMSCONFIRMDATA[ _SMS_CONFIRM_DATA["number"] ] = _SMS_CONFIRM_DATA
            _break();
        }


        if(arr[0] != "STATUS_WAIT_CODE" && arr[0] != "STATUS_WAIT_RETRY")
        {
            fail("Error during smska.net getStatus " + arr.join(":"))
        }


    })!


})!

_if(_SMS_CONFIRM_DATA["method"] == "virtualsms.ru", function(){

    _if_else(_SMS_CONFIRM_DATA["not_first"], function(){
        _call(_BAS_VIRTUALSMSREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "3", id: _SMS_CONFIRM_DATA["id"]})!
        var arr = _result()
        if(arr[0].indexOf("ACCESS_") != 0)
        {
            fail("Error during virtualsms.ru setStatus(3) " + arr.join(":"))
        }

    }, function(){
        _call(_BAS_VIRTUALSMSREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "1", id: _SMS_CONFIRM_DATA["id"]})!
        var arr = _result()
        if(arr[0].indexOf("ACCESS_") != 0)
        {
            fail("Error during virtualsms.ru setStatus(1) " + arr.join(":"))
        }
    })!



    _SMS_MAX_WAIT = Date.now() + 60000 * (<%= max_wait %>)
    _do(function(){
        if(Date.now() > _SMS_MAX_WAIT)
            fail("virtualsms.ru Error: Timeout during solve");

        _call(_BAS_VIRTUALSMSREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "getStatus", id: _SMS_CONFIRM_DATA["id"]})!

        var arr = _result()

        if(arr[0] == "STATUS_OK")
        {
            <%= variable %> = arr.slice(1).join(":")
            _SMS_CONFIRM_DATA["not_first"] = true
            _BAS_SMSCONFIRMDATA[ _SMS_CONFIRM_DATA["number"] ] = _SMS_CONFIRM_DATA
            _break();
        }


        if(arr[0] != "STATUS_WAIT_CODE" && arr[0] != "STATUS_WAIT_RETRY")
        {
            fail("Error during virtualsms.ru getStatus " + arr.join(":"))
        }


    })!


})!







