auto.waitFor();
device.wakeUpIfNeeded()
var dwc = device.width/2;
var dhc = device.height/2;
var dw = device.width;
var dh = device.height;
const {gest} = hamibot.env;
log(dw+"-"+dh)
sleep(3000)
if (gest=="up"){
    toast("上滑解锁")
    swipe(500, 2000, 500, 200, 1000);
}
if (gest=="down"){
    gesture(300, [dwc, dh/10], [dwc, dh/10*9])
}
if (gest=="right"){
    gesture(300, [dw/8, dhc], [dw/8*7, dhc])
}
if (gest=="left"){
    gesture(300, [dw/8*7, dhc], [dw/8, dhc])
}//唤醒设备后上滑进入解锁界面
const {phonelock} = hamibot.env;
if (phonelock = "a"){
  const {密码} = hamibot.env;//读取配置中的密码
	var str = 密码.toString();
	var arr = str.split("");//将密码转为数组
	click(100, 120);
	desc(arr[0]).findOne().click();//依此读取数字中的数字并进行输入解锁
	desc(arr[1]).findOne().click();//依此读取数字中的数字并进行输入解锁
	desc(arr[2]).findOne().click();//依此读取数字中的数字并进行输入解锁
	desc(arr[3]).findOne().click();//依此读取数字中的数字并进行输入解锁
	desc(arr[4]).findOne().click();//依此读取数字中的数字并进行输入解锁
	desc(arr[5]).findOne().click();//依此读取数字中的数字并进行输入解锁
}
sleep(300);
log('开始打卡');
launch('com.tencent.mm');
toast('打开微信');
var timeout = 70;

function clickOne(name, num){
  num = typeof num !== 'undefined' ?  num : -1;
  var cnt = 0;
	while((num == -1 ? !click(name) : !click(name, num)) && ++cnt <= timeout) 
    sleep(100);
  if (cnt > timeout){
    recover();
    throw new Error('网络不佳，请重试');
  }
    
}
function findOne(name){
	var cnt = 0;
	while(!selector().text(name).find().size() && ++ cnt <= timeout / 2)
		sleep(100);
  return cnt <= timeout / 2;
}
//
var cntBack = 0;
while(!selector().text('通讯录').find().size() && ++ cntBack <= 20){
	back();
  sleep(300);
}
sleep(300);
launch('com.tencent.mm');
while (!click('通讯录'));
while (!click('公众号'));
while(!click('青岛农业大学学工在线')){
  swipe(500, 2000, 500, 200, 300);
}
while (!click('信息上报'));
toast('信息上报');
sleep(100);
if (findOne('微信登录')){
	while (!click('微信登录'));
  sleep(300);
}
if (findOne('登录')){
	while (!click('登录'));
  sleep(300);
}
className("android.view.View").text("每日上报").findOne().click();
toast('每日上报');
sleep(1000);
swipe(500, 2000, 500, 200, 1000);
swipe(500, 2000, 500, 200, 1000);
swipe(500, 2000, 500, 200, 1000);
swipe(500, 2000, 500, 200, 1000);
swipe(500, 2000, 500, 200, 1000);
while(!click('本人承诺以上填报数据真实有效。（请打勾后提交数据）'));
sleep(1000);
while(!click(535,2260));
const {email} = hamibot.env;
function sendEmail(email,etitle,emsg){
    http.get("https://api.dzzui.com/api/mail?Host=smtp.163.com&Username=qauxinxishangbao@163.com&Password=YHGMOTAGCTYZPNNA&Port=465&SMTPSecure=ssl&addAddress="+email+"&title="+etitle+"&text="+emsg, {}, function(res, err) {
        if (err) {
            console.error("反馈邮件发送失败");
            return;
        }
        log("上报结果已发送到您的邮箱");
    });
}
sendEmail(email,"成功上报回执","QAU每日上报助手已帮您完成平安上报");
toast('填报已完成');
sleep(1000)
home();
