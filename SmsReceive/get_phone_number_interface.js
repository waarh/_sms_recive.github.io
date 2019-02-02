<div class="container-fluid">
   <%= _.template($('#input_constructor').html())({id:"Service", description:tr(""), default_selector: "string", disable_int:true, value_string: "sms-activate.ru", variants: ["sms-activate.ru", "cheapsms.ru", "vr-sms.pro", "5sim.net", "vak-sms.com", "simsms.org", "smspva.com", "smska.net", "sms-get.co", "sms-reg.com", "virtualsms.ru", "getsms.online", "smsvk.net", "smsactivation.pro", "smshub.org", "give-sms.com(not rdy)", "onlinesim.ru(not rdy)", "sms-acktiwator.ru(not rdy)", "sms-online.pro(not rdy)"]}) %>

  <div class="col-xs-12">
    <form class="form-horizontal">
      <div class="form-group">
        <div class="col-xs-2">
          <div class="input-group">
            <span data-preserve="true" data-preserve-type="select" data-preserve-id="Select">
              <select class="form-control input-sm" id="Select" placeholder="Site">
				<option value="*" selected="selected">*</option>
                <option value="1688.com">1688.com</option>
                <option value="4лапы">4лапы</option>
                <option value="4game">4game</option>
                <option value="АЗС">АЗС</option>
                <option value="Альфа страхование">Альфа страхование</option>
                <option value="Виктория.рф">Виктория.рф</option>
                <option value="Глобус">Глобус</option>
                <option value="Дикси">Дикси</option>
                <option value="Друг Вокруг">Друг Вокруг</option>
                <option value="Казино Online">Казино Online</option>
                <option value="Лента">Лента</option>
                <option value="Магнолия">Магнолия</option>
                <option value="Макс страхование">Макс страхование</option>
                <option value="Мвидео">Мвидео</option>
                <option value="Новые лидеры">Новые лидеры</option>
                <option value="Окей">Окей</option>
                <option value="Перекрёсток">Перекрёсток</option>
                <option value="Почта Банк">Почта Банк</option>
                <option value="Пятерочка">Пятерочка</option>
                <option value="Росгосстрах страхование">Росгосстрах страхование</option>
                <option value="Роснефть">Роснефть</option>
                <option value="Связной">Связной</option>
                <option value="Ситимобил Такси">Ситимобил Такси</option>
                <option value="СОГАЗ страхование">СОГАЗ страхование</option>
                <option value="Табачные дела">Табачные дела</option>
                <option value="Такси Максим">Такси Максим</option>
                <option value="Тинькофф страхование">Тинькофф страхование</option>
                <option value="Фотострана">Фотострана</option>
                <option value="Эльдорадо">Эльдорадо</option>
                <option value="Яндекс.Деньги">Яндекс деньги</option>
                <option value="Яндекс.Еда">Яндекс Еда</option>
                <option value="Яндекс.Такси">Яндекс такси</option>
                <option value="Adidas">Adidas</option>
                <option value="agroserver.ru">agroserver.ru</option>
                <option value="Airbnb">Airbnb</option>
                <option value="Alibaba">Alibaba</option>
                <option value="Amazon">amazon</option>
                <option value="AOL">Aol</option>
                <option value="Auto">Auto</option>
                <option value="Avito">Avito</option>
                <option value="Badoo">Badoo</option>
                <option value="Beetalk">Beetalk</option>
                <option value="bigd.host">bigd.host</option>
                <option value="BIGLION">BIGLION</option>
                <option value="Bigo Live">Bigo Live</option>
                <option value="Blablacar">Blablacar</option>
                <option value="Blizzard">blizzard</option>
				<option value="blockchain.com">blockchain.com</option>
				<option value="BurgerKing">BurgerKing</option>
				<option value="Careem">Careem</option>
				<option value="Cash Show">Cash Show</option>
				<option value="CDKeys.com">CDKeys.com</option>
				<option value="CL">CL</option>
				<option value="Craigslist">Craigslist</option>
				<option value="Delivery Club">Delivery Club</option>
				<option value="Discord">Discord</option>
				<option value="Dodopizza">Dodopizza</option>
				<option value="Drom">Drom</option>
				<option value="Dukascopy">Dukascopy</option>
				<option value="Ebay">Ebay</option>
				<option value="Electroneum">Electroneum</option>
				<option value="Enjin Wallet">Enjin Wallet</option>
				<option value="Facebook">Facebook</option>
				<option value="FAIL">FAIL</option>
				<option value="FastMail">FastMail</option>
				<option value="FIFA">FIFA</option>
				<option value="Fishka">Fishka</option>
				<option value="Fiverr">Fiverr</option>
				<option value="Fix price">Fix price</option>
				<option value="foodmarkets.ru">foodmarkets.ru</option>
				<option value="G2A">G2A</option>
				<option value="Gameflip">Gameflip</option>
				<option value="GearBest">GearBest</option>
				<option value="Gem4me">Gem4me</option>
				<option value="GetResponse">GetResponse</option>
				<option value="Gett Taxi">Gett Taxi</option>
				<option value="Google">Google</option>
				<option value="GrabTaxi">GrabTaxi</option>
				<option value="Gusli">Gusli</option>
				<option value="Hashgard">hashgard</option>
				<option value="Holvi">Holvi</option>
				<option value="HQ Trivia">HQ Trivia</option>
				<option value="icard">icard</option>
				<option value="ICQ">ICQ</option>
				<option value="IMO messager">IMO messager</option>
				<option value="Instagram">Instagram</option>
				<option value="JD.com">JD.com</option>
				<option value="Kakaotalk">Kakaotalk</option>
				<option value="Kwai">kwai</option>
				<option value="lazada">lazada</option>
				<option value="Line messenger">Line messenger</option>	
				<option value="LinkedIn">LinkedIn</option>
				<option value="LiveScore">LiveScore</option>
				<option value="Lyft">Lyft</option>
				<option value="Mail">Mail</option>
				<option value="Mamba">Mamba</option>
				<option value="meatinfo.ru">meatinfo.ru</option>
				<option value="MeetMe">MeetMe</option>
				<option value="Microsoft">Microsoft</option>
				<option value="Naver">Naver</option>
				<option value="Nike">Nike</option>
				<option value="Nimses">Nimses</option>
				<option value="OK.ru">Ok.ru</option>				
				<option value="OlaCabs">OlaCabs</option>
				<option value="OLX">OLX</option>
				<option value="Periscope">Periscope</option>
				<option value="Premiumlist">Premiumlist</option>
				<option value="protonmail.com">protonmail.com</option>
				<option value="purse.io">purse.io</option>
				<option value="QIP">QIP</option>
				<option value="QIWI">QIWI</option>
				<option value="Rambler">Rambler</option>
				<option value="Scout">scout</option>
				<option value="SeoSprint">SeoSprint</option>
				<option value="Sipnet.ru">Sipnet.ru</option>		
				<option value="Snapchat">Snapchat</option>
				<option value="Spaces">Spaces</option>	
				<option value="Sportmaster">Sportmaster</option>
				<option value="Spotify">Spotify</option>	
				<option value="Steam">Steam</option>
				<option value="Steemit">Steemit</option>	
				<option value="Sunlight">sunlight</option>
				<option value="Tantan">tantan</option>	
				<option value="TaoBao">TaoBao</option>
				<option value="Telegram">Telegram</option>	
				<option value="TencentQQ">TencentQQ</option>
				<option value="Tinder">Tinder</option>	
				<option value="Tinkoff">Tinkoff</option>
				<option value="Twilio">Twilio</option>
				<option value="Twitter">Twitter</option>
				<option value="Ubank">Ubank</option>
				<option value="Uber">Uber</option>
				<option value="UpWork">UpWork</option>	
				<option value="Viber">Viber</option>
				<option value="VK">Vkontakte</option>	
				<option value="Voopee">voopee</option>
				<option value="WebMoney">WebMoney</option>	
				<option value="WeChat">WeChat</option>
				<option value="Weebly">Weebly</option>	
				<option value="Weibo">Weibo</option>
				<option value="weku">weku</option>	
				<option value="WhatsApp">WhatsApp</option>
				<option value="Winston">Winston</option>	
				<option value="Yahoo">Yahoo</option>
				<option value="Yandex">Yandex</option>
				<option value="Youla">Youla</option>
				<option value="Zalo">Zalo</option>
				<option value="Zoho">Zoho</option>
                <option value="Other">Другое</option>
              </select>
            </span>
          </div>
        </div>
        <label class="control-label text-right tr" style="padding-top:5px !important;">Site</label>
      </div>
    </form>
  </div>

  <%= _.template($('#input_constructor').html())({id:"Country", description:tr("Country"), default_selector: "string", disable_int:true, value_string: "RU", variants:
  [
    "RU<br/><span style='color:gray'>Russian Federation</span>",
    "KZ<br/><span style='color:gray'>Kazakhstan</span>",
    "UA<br/><span style='color:gray'>Ukraine</span>",
    "EE<br/><span style='color:gray'>Estonia</span>",
    "FR<br/><span style='color:gray'>France</span>",
    "ID<br/><span style='color:gray'>Indonesia</span>",
    "IL<br/><span style='color:gray'>Israel</span>",
    "KG<br/><span style='color:gray'>Kyrgyzstan</span>",
    "LV<br/><span style='color:gray'>Latvia</span>",
    "LT<br/><span style='color:gray'>Litva</span>",
    "NL<br/><span style='color:gray'>Netherlands</span>",
    "NI<br/><span style='color:gray'>Nigeria</span>",
    "PY<br/><span style='color:gray'>Paraguay</span>",
    "PH<br/><span style='color:gray'>Philippines</span>",
    "PL<br/><span style='color:gray'>Poland</span>",
    "RO<br/><span style='color:gray'>Romania</span>",
    "UK<br/><span style='color:gray'>United Kingdom</span>",
    "VN<br/><span style='color:gray'>Vietnam</span>",
    "CN<br/><span style='color:gray'>China</span>",
    "US<br/><span style='color:gray'>United States</span>",
    "HK<br/><span style='color:gray'>Hong Kong</span>",
    "BY<br/><span style='color:gray'>Belarus</span>",
    "DE<br/><span style='color:gray'>Germany</span>",
	"BR<br/><span style='color:gray'>Brasil</span>",
	"EG<br/><span style='color:gray'>Egypt</span>",
	"KH<br/><span style='color:gray'>Kambojia</span>",
	"KE<br/><span style='color:gray'>Kenia</span>",
	"KO<br/><span style='color:gray'>Kongo</span>",
	"MO<br/><span style='color:gray'>Macao</span>",
	"MY<br/><span style='color:gray'>Malaysia</span>",
	"MM<br/><span style='color:gray'>Manyama</span>",
	"MA<br/><span style='color:gray'>Madagascar</span>",
	"TH<br/><span style='color:gray'>Tailand</span>",
	"TA<br/><span style='color:gray'>Tanzania</span>",
	"NZ<br/><span style='color:gray'>New Zeland</span>",
	"AR<br/><span style='color:gray'>Argentina</span>",
	
  ]}) %>


  <%= _.template($('#input_constructor').html())({id:"Apikey", description:tr("Api key"), default_selector: "string", disable_int:true}) %>
 
  <%= _.template($('#variable_constructor').html())({id:"Save", description:tr("Variable To Save"), default_variable: "PHONE_NUMBER"}) %>

</div>

<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
