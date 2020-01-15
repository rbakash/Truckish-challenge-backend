var issuer = 'Mycorp';
var subject = 'akashrrb@gmail.com';
var audience = 'http://mycorp.in';

var signOptions = {
    issuer: issuer,
    subject: subject,
    audience: audience,
    expiresIn: "60*60*5",
    algorithm: "RS256"
};
module.exports.signOptions = signOptions;

var privateKey = "Truckish";
module.exports.privateKey = privateKey;