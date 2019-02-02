_if(<%= service %> == "sms-reg.com", function(){
	var country = _BAS_GETSMSCOUTRYCODE(<%= service %>, <%= country %>);
	if(country.length == 0)
		country = "all"

	var url = "http://api.sms-reg.com/getNum.php?service=" + _BAS_GETSMSSITECODE(<%= service %>, <%= site %>) + "&apikey=" + (<%= apikey %>) + "&country=" + country + "&appid=RUBMC9BX6OIRJG3S"
	_call(_BAS_SMSREGAPIREQUEST,{method: "getNum", url: url})!
    var json = _result()
    _SMS_CONFIRM_DATA = {id: json["tzid"], api: (<%= apikey %>), method: "sms-reg.com", originalid: json["tzid"]}

    _SMS_MAX_WAIT = Date.now() + 600000
	_do(function(){
        if(Date.now() > _SMS_MAX_WAIT)
			fail("Sms Reg Error: Timeout for getState");

        var url = "http://api.sms-reg.com/getState.php?tzid=" + _SMS_CONFIRM_DATA["id"] + "&apikey=" + _SMS_CONFIRM_DATA["api"]
        _call(_BAS_SMSREGAPIREQUEST,{method: "getState", url: url, dontcheckresp: true})!
        var json = _result()


        if(json["response"] === "TZ_NUM_PREPARE")
        {
            _SMS_CONFIRM_DATA["number"] = json["number"]
        	_BAS_SMSCONFIRMDATA[json["number"]] = _SMS_CONFIRM_DATA
            _break()
        }

        if(json["response"] !== "TZ_INPOOL")
        {
            fail("Sms Reg Error: " + json["response"] + " for getNum");
        }

    })!

    <%= variable %> = _SMS_CONFIRM_DATA["number"]
})!

_if(<%= service %> == "sms-activate.ru", function(){

	var country = _BAS_GETSMSCOUTRYCODE(<%= service %>, <%= country %>);
	if(country.length == 0)
		country = "0"

	var ref = "browserAutomationStudio"

    _call(_BAS_SMSACTIVATEPIREQUEST,{api_key: (<%= apikey %>), action: "getNumber", service: _BAS_GETSMSSITECODE(<%= service %>, <%= site %>), country: country, ref: ref})!
    var arr = _result()
    if(arr[0] == "NO_NUMBERS")
    {
        _sms_ban_service(60)
    }

    if(arr[0] != "ACCESS_NUMBER")
    {
        fail("Error during sms-activate getNumber " + arr.join(":"))
    }
    _SMS_CONFIRM_DATA = {id: arr[1], api: (<%= apikey %>), domain: <%= service %>, method: <%= service %>, originalid: arr[1], number: arr[2]}
    _BAS_SMSCONFIRMDATA[arr[2] ] = _SMS_CONFIRM_DATA

    <%= variable %> = _SMS_CONFIRM_DATA["number"]
})!

_if(<%= service %> == "smspva.com", function(){

	var country = _BAS_GETSMSCOUTRYCODE(<%= service %>, <%= country %>);
	if(country.length == 0)
		country = "RU"
    _call(_BAS_SMSPVAREQUEST,{apikey: (<%= apikey %>), id: 1, metod: "get_number", service: _BAS_GETSMSSITECODE(<%= service %>, <%= site %>), country: country})!
    var json = _result()
	
	if(json == "API KEY NOT FOUND!")
	{
		fail("Wrong API key for smspva.com service!")
	}
	
    if(json["response"] != "1")
    {
        fail("failed to get number from smspva " + JSON.stringify(json))
    }

		var prefix = json["CountryCode"].replace("+","")

    _SMS_CONFIRM_DATA = {id: json["id"], api: (<%= apikey %>), method: "smspva.com", originalid: json["id"], number: json["number"], service: _BAS_GETSMSSITECODE(<%= service %>, <%= site %>),prefix: prefix, country: country}
    _BAS_SMSCONFIRMDATA[ prefix + json["number"] ] = _SMS_CONFIRM_DATA

    <%= variable %> = prefix + _SMS_CONFIRM_DATA["number"]
})!

_if(<%= service %> == "smsactivation.pro", function(){

	var country = _BAS_GETSMSCOUTRYCODE(<%= service %>, <%= country %>);
	if(country.length == 0)
		country = "ru"
	
	var sitecode = _BAS_GETSMSSITECODE(<%= service %>, <%= site %>)

	if(sitecode == "0")
		fail("Not supported site for smsactivation.pro")
	
    _call(_BAS_SMSACTIVATIONPROREQUEST,{a: "get", b: "number", c: sitecode, d: (<%= apikey %>), e: country})!
    var resp = _result()
	
	if(resp == "Error|access denied")
		fail("Wrong API key for smsactivation.pro service!")
	
    if(/error/i.test(resp) || /threads/i.test(resp))
		_sms_ban_service(60)
        fail("failed to get number from smsactivation.pro " + resp)

    _SMS_CONFIRM_DATA = {secret: (<%= apikey %>), method: "smsactivation.pro", number: resp, service: sitecode, country: country}
    _BAS_SMSCONFIRMDATA[ resp ] = _SMS_CONFIRM_DATA

    <%= variable %> = resp
})!

_if(<%= service %> == "smspva.com", function(){

	var country = _BAS_GETSMSCOUTRYCODE(<%= service %>, <%= country %>);
	if(country.length == 0)
		country = "RU"
    _call(_BAS_SMSPVAREQUEST,{apikey: (<%= apikey %>), id: 1, metod: "get_number", service: _BAS_GETSMSSITECODE(<%= service %>, <%= site %>), country: country})!
    var json = _result()
	
	if(json == "API KEY NOT FOUND!")
	{
		fail("Wrong API key for smspva.com service!")
	}
	
    if(json["response"] != "1")
    {
        fail("failed to get number from smspva.com " + JSON.stringify(json))
    }

		var prefix = json["CountryCode"].replace("+","")

    _SMS_CONFIRM_DATA = {id: json["id"], api: (<%= apikey %>), method: "smspva.com", originalid: json["id"], number: json["number"], service: _BAS_GETSMSSITECODE(<%= service %>, <%= site %>),prefix: prefix, country: country}
    _BAS_SMSCONFIRMDATA[ prefix + json["number"] ] = _SMS_CONFIRM_DATA

    <%= variable %> = prefix + _SMS_CONFIRM_DATA["number"]
})!

_if(<%= service %> == "vr-sms.pro", function(){

	var country = _BAS_GETSMSCOUTRYCODE(<%= service %>, <%= country %>);
	if(country.length == 0)
		country = "0"

	var ref = ""
	if(<%= service %> == "vr-sms.pro")
	{
		ref = "beznikname@gmail.com"
	}


    _call(_BAS_VRSMSPROREQUEST,{api_key: (<%= apikey %>), action: "getNumber", service: _BAS_GETSMSSITECODE(<%= service %>, <%= site %>), country: country, ref: ref})!
    var arr = _result()
    if(arr[0] == "NO_NUMBERS")
    {
        _sms_ban_service(60)
    }

    if(arr[0] != "ACCESS_NUMBER")
    {
        fail("Error during vr-sms.pro getNumber " + arr.join(":"))
    }
    _SMS_CONFIRM_DATA = {id: arr[1], api: (<%= apikey %>), method: <%= service %>, originalid: arr[1], number: arr[2]}
    _BAS_SMSCONFIRMDATA[arr[2] ] = _SMS_CONFIRM_DATA

    <%= variable %> = _SMS_CONFIRM_DATA["number"]
})!

_if(<%= service %> == "5sim.net", function(){

	var country = _BAS_GETSMSCOUTRYCODE(<%= service %>, <%= country %>);
	if(country.length == 0)
		country = "0"

	var ref = ""
	if(<%= service %> == "5sim.net")
	{
		ref = "1001001"
	}


    _call(_BAS_FIVESIMREQUEST,{api_key: (<%= apikey %>), action: "getNumber", service: _BAS_GETSMSSITECODE(<%= service %>, <%= site %>), country: country, ref: ref})!
    var arr = _result()
    if(arr[0] == "NO_NUMBERS")
    {
        _sms_ban_service(60)
    }

    if(arr[0] != "ACCESS_NUMBER")
    {
        fail("Error during 5sim.net getNumber " + arr.join(":"))
    }
    _SMS_CONFIRM_DATA = {id: arr[1], api: (<%= apikey %>), method: <%= service %>, originalid: arr[1], number: arr[2]}
    _BAS_SMSCONFIRMDATA[arr[2] ] = _SMS_CONFIRM_DATA

    <%= variable %> = _SMS_CONFIRM_DATA["number"]
})!

_if(<%= service %> == "smska.net", function(){

	var country = _BAS_GETSMSCOUTRYCODE(<%= service %>, <%= country %>);
	if(country.length == 0)
		country = "0"

	var ref = ""
	if(<%= service %> == "smska.net")
	{
		ref = "beznikname@gmail.com"
	}


    _call(_BAS_SMSKAREQUEST,{api_key: (<%= apikey %>), action: "getNumber", service: _BAS_GETSMSSITECODE(<%= service %>, <%= site %>), country: country, operator: "any", ref: ref})!
    var arr = _result()
    if(arr[0] == "NO_NUMBERS")
    {
        _sms_ban_service(60)
    }

    if(arr[0] != "ACCESS_NUMBER")
    {
        fail("Error during smska.net getNumber " + arr.join(":"))
    }
    _SMS_CONFIRM_DATA = {id: arr[1], api: (<%= apikey %>), method: <%= service %>, originalid: arr[1], number: arr[2]}
    _BAS_SMSCONFIRMDATA[arr[2] ] = _SMS_CONFIRM_DATA

    <%= variable %> = _SMS_CONFIRM_DATA["number"]
})!

_if(<%= service %> == "getsms.online", function(){

	var country = _BAS_GETSMSCOUTRYCODE(<%= service %>, <%= country %>);
	if(country.length == 0)
		country = "ru"

	var ref = ""
	if(<%= service %> == "getsms.online")
	{
		ref = "beznikname@gmail.com"
	}


    _call(_BAS_GETSMSONLINEREQUEST,{api_key: (<%= apikey %>), action: "getNumber", service: _BAS_GETSMSSITECODE(<%= service %>, <%= site %>), country: country, ref: ref})!
    var arr = _result()
    if(arr[0] == "NO_NUMBERS")
    {
        _sms_ban_service(60)
    }

    if(arr[0] != "ACCESS_NUMBER")
    {
        fail("Error during getsms.online getNumber " + arr.join(":"))
    }
    _SMS_CONFIRM_DATA = {id: arr[1], api: (<%= apikey %>), method: <%= service %>, originalid: arr[1], number: arr[2]}
    _BAS_SMSCONFIRMDATA[arr[2] ] = _SMS_CONFIRM_DATA

    <%= variable %> = _SMS_CONFIRM_DATA["number"]
})!

_if(<%= service %> == "vak-sms.com", function(){

	var ref = ""
	if(<%= service %> == "vak-sms.com")
	{
		ref = "1001001"
	}


    _call(_BAS_VAKSMSREQUEST,{api_key: (<%= apikey %>), action: "getNumber", service: _BAS_GETSMSSITECODE(<%= service %>, <%= site %>), operator: "any", ref: ref})!
    var arr = _result()
    if(arr[0] == "NO_NUMBERS")
    {
        _sms_ban_service(60)
    }

    if(arr[0] != "ACCESS_NUMBER")
    {
        fail("Error during vak-sms.com getNumber " + arr.join(":"))
    }
    _SMS_CONFIRM_DATA = {id: arr[1], api: (<%= apikey %>), method: <%= service %>, originalid: arr[1], number: arr[2]}
    _BAS_SMSCONFIRMDATA[arr[2] ] = _SMS_CONFIRM_DATA

    <%= variable %> = _SMS_CONFIRM_DATA["number"]
})!

_if(<%= service %> == "sms-get.co", function(){

	var country = _BAS_GETSMSCOUTRYCODE(<%= service %>, <%= country %>);
	if(country.length == 0)
		country = "0"

	var ref = ""
	if(<%= service %> == "sms-get.co")
	{
		ref = "1001001"
	}


    _call(_BAS_SMSGETREQUEST,{api_key: (<%= apikey %>), action: "getNumber", service: _BAS_GETSMSSITECODE(<%= service %>, <%= site %>), country: country, ref: ref})!
    var arr = _result()
    if(arr[0] == "NO_NUMBERS")
    {
        _sms_ban_service(60)
    }

    if(arr[0] != "ACCESS_NUMBER")
    {
        fail("Error during sms-get.co getNumber " + arr.join(":"))
    }
    _SMS_CONFIRM_DATA = {id: arr[1], api: (<%= apikey %>), method: <%= service %>, originalid: arr[1], number: arr[2]}
    _BAS_SMSCONFIRMDATA[arr[2] ] = _SMS_CONFIRM_DATA

    <%= variable %> = _SMS_CONFIRM_DATA["number"]
})!

_if(<%= service %> == "simsms.org", function(){

	var country = _BAS_GETSMSCOUTRYCODE(<%= service %>, <%= country %>);
	if(country.length == 0)
		country = "RU"
    _call(_BAS_SIMSMSREQUEST,{apikey: (<%= apikey %>), id: 1, metod: "get_number", service: _BAS_GETSMSSITECODE(<%= service %>, <%= site %>), country: country})!
    var json = _result()
	
	if(json == "API KEY NOT FOUND!")
	{
		fail("Wrong API key for simsms.org service!")
	}
	
    if(json["response"] != "1")
    {
        fail("failed to get number from simsms.org " + JSON.stringify(json))
    }

		var prefix = json["CountryCode"].replace("+","")

    _SMS_CONFIRM_DATA = {id: json["id"], api: (<%= apikey %>), method: "simsms.org", originalid: json["id"], number: json["number"], service: _BAS_GETSMSSITECODE(<%= service %>, <%= site %>),prefix: prefix, country: country}
    _BAS_SMSCONFIRMDATA[ prefix + json["number"] ] = _SMS_CONFIRM_DATA

    <%= variable %> = prefix + _SMS_CONFIRM_DATA["number"]
})!
		
_if(<%= service %> == "cheapsms.ru", function(){

	var ref = ""
	if(<%= service %> == "cheapsms.ru")
	{
		ref = "24893"
	}


    _call(_BAS_CHEAPSMSREQUEST,{api_key: (<%= apikey %>), action: "getNumber", service: _BAS_GETSMSSITECODE(<%= service %>, <%= site %>), ref: ref})!
    var arr = _result()
    if(arr[0] == "NO_NUMBERS")
    {
        _sms_ban_service(60)
    }

    if(arr[0] != "ACCESS_NUMBER")
    {
        fail("Error during cheapsms.ru getNumber " + arr.join(":"))
    }
    _SMS_CONFIRM_DATA = {id: arr[1], api: (<%= apikey %>), method: <%= service %>, originalid: arr[1], number: arr[2]}
    _BAS_SMSCONFIRMDATA[arr[2] ] = _SMS_CONFIRM_DATA

    <%= variable %> = _SMS_CONFIRM_DATA["number"]
})!

_if(<%= service %> == "smshub.org", function(){

	var country = _BAS_GETSMSCOUTRYCODE(<%= service %>, <%= country %>);
	if(country.length == 0)
		country = "0"


    _call(_BAS_SMSHUBPIREQUEST,{api_key: (<%= apikey %>), action: "getNumber", service: _BAS_GETSMSSITECODE(<%= service %>, <%= site %>), country: country})!
    var arr = _result()
    if(arr[0] == "NO_NUMBERS")
    {
        _sms_ban_service(60)
    }

    if(arr[0] != "ACCESS_NUMBER")
    {
        fail("Error during smshub.org getNumber " + arr.join(":"))
    }
    _SMS_CONFIRM_DATA = {id: arr[1], api: (<%= apikey %>), method: <%= service %>, originalid: arr[1], number: arr[2]}
    _BAS_SMSCONFIRMDATA[arr[2] ] = _SMS_CONFIRM_DATA

    <%= variable %> = _SMS_CONFIRM_DATA["number"]
})!

_if(<%= service %> == "smsvk.net", function(){


	var ref = ""
	if(<%= service %> == "smsvk.net")
	{
		ref = "1001001"
	}


    _call(_BAS_SMSVKREQUEST,{api_key: (<%= apikey %>), action: "getNumber", service: _BAS_GETSMSSITECODE(<%= service %>, <%= site %>), ref: ref})!
    var arr = _result()
    if(arr[0] == "NO_NUMBERS")
    {
        _sms_ban_service(60)
    }

    if(arr[0] != "ACCESS_NUMBER")
    {
        fail("Error during smsvk.net getNumber " + arr.join(":"))
    }
    _SMS_CONFIRM_DATA = {id: arr[1], api: (<%= apikey %>), method: <%= service %>, originalid: arr[1], number: arr[2]}
    _BAS_SMSCONFIRMDATA[arr[2] ] = _SMS_CONFIRM_DATA

    <%= variable %> = _SMS_CONFIRM_DATA["number"]
})!

_if(<%= service %> == "virtualsms.ru", function(){


	var ref = ""
	if(<%= service %> == "virtualsms.ru")
	{
		ref = "76716B21CEAA4FB888BD95FA0DFB893A"
	}


    _call(_BAS_VIRTUALSMSREQUEST,{api_key: (<%= apikey %>), action: "getNumber", service: _BAS_GETSMSSITECODE(<%= service %>, <%= site %>), ref: ref})!
    var arr = _result()
    if(arr[0] == "NO_NUMBERS")
    {
        _sms_ban_service(60)
    }

    if(arr[0] != "ACCESS_NUMBER")
    {
        fail("Error during virtualsms.ru getNumber " + arr.join(":"))
    }
    _SMS_CONFIRM_DATA = {id: arr[1], api: (<%= apikey %>), method: <%= service %>, originalid: arr[1], number: arr[2]}
    _BAS_SMSCONFIRMDATA[arr[2] ] = _SMS_CONFIRM_DATA

    <%= variable %> = _SMS_CONFIRM_DATA["number"]
})!

_if(<%= service %> == "give-sms.com", function(){

	var country = _BAS_GETSMSCOUTRYCODE(<%= service %>, <%= country %>);

    _call(_BAS_GIVESMSREQUEST,{apikey: (<%= apikey %>), id: 1, method: "getnumber", service: _BAS_GETSMSSITECODE(<%= service %>, <%= site %>)})!
    var json = _result()
	
	if(json == "API KEY NOT FOUND!")
	{
		fail("Wrong API key for give-sms.com service!")
	}
	
    if(json["response"] != "1")
    {
        fail("failed to get number from give-sms.com " + JSON.stringify(json))
    }

		var prefix = json["CountryCode"].replace("+","")

    _SMS_CONFIRM_DATA = {id: json["id"], api: (<%= apikey %>), method: "give-sms.com", originalid: json["id"], number: json["number"], service: _BAS_GETSMSSITECODE(<%= service %>, <%= site %>),prefix: prefix}
    _BAS_SMSCONFIRMDATA[ prefix + json["number"] ] = _SMS_CONFIRM_DATA

    <%= variable %> = prefix + _SMS_CONFIRM_DATA["number"]
})!
		
