_SMS_CONFIRM_DATA = _BAS_SMSCONFIRMDATA[<%= number %>]
if(!_SMS_CONFIRM_DATA)
    fail("No information about this number")


_if(_SMS_CONFIRM_DATA["method"] == "sms-reg.com", function(){
	_call(_BAS_SMSREGAPIREQUEST,{method: "setOperationOver", number: _SMS_CONFIRM_DATA["number"]})!
	var json = _result()
	_SMS_CONFIRM_DATA["id"] = json["tzid"]
	_SMS_CONFIRM_DATA["originalid"] = json["tzid"]
    _BAS_SMSCONFIRMDATA[ _SMS_CONFIRM_DATA["number"] ] = _SMS_CONFIRM_DATA
})!

_if(_SMS_CONFIRM_DATA["method"] == "vr-sms.pro", function(){

	_call(_BAS_VRSMSPROREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "-1", id: _SMS_CONFIRM_DATA["id"]})!

	delete _BAS_SMSCONFIRMDATA[_SMS_CONFIRM_DATA["number"]];
})!

_if(_SMS_CONFIRM_DATA["method"] == "5sim.net", function(){

	_call(_BAS_FIVESIMREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "-1", id: _SMS_CONFIRM_DATA["id"]})!

	delete _BAS_SMSCONFIRMDATA[_SMS_CONFIRM_DATA["number"]];
})!

_if(_SMS_CONFIRM_DATA["method"] == "smska.net", function(){

	_call(_BAS_SMSKAREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "-1", id: _SMS_CONFIRM_DATA["id"]})!

	delete _BAS_SMSCONFIRMDATA[_SMS_CONFIRM_DATA["number"]];
})!

_if(_SMS_CONFIRM_DATA["method"] == "getsms.online", function(){

	_call(_BAS_GETSMSONLINEREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "-1", id: _SMS_CONFIRM_DATA["id"]})!

	delete _BAS_SMSCONFIRMDATA[_SMS_CONFIRM_DATA["number"]];
})!

_if(_SMS_CONFIRM_DATA["method"] == "vak-sms.com", function(){

	_call(_BAS_VAKSMSREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "-1", id: _SMS_CONFIRM_DATA["id"]})!

	delete _BAS_SMSCONFIRMDATA[_SMS_CONFIRM_DATA["number"]];
})!

_if(_SMS_CONFIRM_DATA["method"] == "sms-get.co", function(){

	_call(_BAS_SMSGETREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "-1", id: _SMS_CONFIRM_DATA["id"]})!

	delete _BAS_SMSCONFIRMDATA[_SMS_CONFIRM_DATA["number"]];
})!

_if(_SMS_CONFIRM_DATA["method"] == "cheapsms.ru", function(){

	_call(_BAS_CHEAPSMSREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "-1", id: _SMS_CONFIRM_DATA["id"]})!

	delete _BAS_SMSCONFIRMDATA[_SMS_CONFIRM_DATA["number"]];
})!

_if(_SMS_CONFIRM_DATA["method"] == "virtualsms.ru", function(){

	_call(_BAS_VIRTUALSMSREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "-1", id: _SMS_CONFIRM_DATA["id"]})!

	delete _BAS_SMSCONFIRMDATA[_SMS_CONFIRM_DATA["number"]];
})!

_if(_SMS_CONFIRM_DATA["method"] == "smshub.org", function(){

	_call(_BAS_SMSHUBPIREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "-1", id: _SMS_CONFIRM_DATA["id"]})!

	delete _BAS_SMSCONFIRMDATA[_SMS_CONFIRM_DATA["number"]];
})!

_if(_SMS_CONFIRM_DATA["method"] == "smsvk.net", function(){

	_call(_BAS_SMSVKREQUEST,{api_key: _SMS_CONFIRM_DATA["api"], action: "setStatus", status: "-1", id: _SMS_CONFIRM_DATA["id"]})!

	delete _BAS_SMSCONFIRMDATA[_SMS_CONFIRM_DATA["number"]];
})!

_if(_SMS_CONFIRM_DATA["method"] == "simsms.org", function(){

	_call(_BAS_SIMSMSREQUEST,{apikey: _SMS_CONFIRM_DATA["api"], id: _SMS_CONFIRM_DATA["id"], metod: "denial", service: _SMS_CONFIRM_DATA["service"]})!

	delete _BAS_SMSCONFIRMDATA[_SMS_CONFIRM_DATA["number"]];
})!

_if(_SMS_CONFIRM_DATA["method"] == "smspva.com", function(){

	_call(_BAS_SMSPVAREQUEST,{apikey: _SMS_CONFIRM_DATA["api"], id: _SMS_CONFIRM_DATA["id"], metod: "denial", service: _SMS_CONFIRM_DATA["service"]})!

	delete _BAS_SMSCONFIRMDATA[_SMS_CONFIRM_DATA["number"]];
})!
