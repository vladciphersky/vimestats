// jshint esversion: 6
var rank = {
	PLAYER: {rank: "Игрок", prefix: "", color: "#ffffff"},
	VIP: {rank: "VIP", prefix: "[VIP] ", color: "00be00"},
	PREMIUM: {rank: "Premium", prefix: "[Premium] ", color: "00dada"},
	HOLY: {rank: "Holy", prefix: "[Holy] ", color: "ffba2d"},
	IMMORTAL: {rank: "Immortal", prefix: "[Immortal] ", color: "e800d5"},
	BUILDER: {rank: "Билдер", prefix: "[Билдер] ", color: "009c00"},
	MAPLEAD: {rank: "Главный билдер", prefix: "[Гл. Билдер] ", color: "009c00"},
	YOUTUBE: {rank: "YouTube", prefix: "[YouTube] ", color: "fe3f3f"},
	DEV: {rank: "Разработчик", prefix: "[Разработчик] ", color: "00bebe"},
	ORGANIZER: {rank: "Организатор", prefix: "[Организатор] ", color: "00bebe"},
	MODER: {rank: "Модератор", prefix: "[Модер] ", color: "1b00ff"},
	WARDEN: {rank: "Проверенный модератор", prefix: "[Пр. Модер] ", color: "1b00ff"},
	CHIEF: {rank: "Главный модератор", prefix: "[Гл. Модер] ", color: "1b00ff"},
	ADMIN: {rank: "Главный админ", prefix: "[Гл. Админ] ", color: "00bebe"}
};

var guildColors = require('./guildColors');
var request = require('request-promise-native');
const hostname = "https://api.vime.world";

function options(uri, token) {
	if(!uri) return console.error("❌ [OPTIONS] Ошибка в работе библиотеки VimeWorld | Не указан адрес метода");
    
    return {
        uri: (token) ? `${hostname + uri}?token=${token}` : `${hostname + uri}`,
        headers: {
            'User-Agent': (token) ? `NodeJS (EvilBOT | ${uri} | ${token})` : `NodeJS (EvilBOT | ${uri})`
        },
        json: true
    };
}

module.exports = function (token) {
	if(!token) return console.error("❌ Ошибка в работе библиотеки VimeWorld | Не указан API ключ");

    this.returnPrefix = (thisRank) => {
		return rank[thisRank].prefix;
    };

    this.returnColor = (thisRank) => {
		return rank[thisRank].color;
	};

	this.returnGuildColor = (thisColor) => {
		return guildColors[thisColor];
	};

	this.played = (ms) => {
		return moment.duration(ms).format("D [дн.] h [ч.] m [мин.] s [сек.]");
	};

	this.guildCreated = (date) => {
		return moment(date).locale('ru').format('LLL');
	};

	this.getNoun = (number, one, two, five) => {
		number = Math.abs(number);
		number %= 100;
		if (number >= 5 && number <= 20) {
			return five;
		}
		number %= 10;
		if (number == 1) {
			return one;
		}
		if (number >= 2 && number <= 4) {
			return two;
		}
		return five;
	};

    this.getTokenStatus = () => {
		return request(
			options(`/misc/token/${token}`)
		).then((r) => r, (e) => console.error("❌ Ошибка в работе библиотеки VimeWorld | ", e));
    };

	this.getProfile = (userNick) => {
		if(!userNick) return console.error("❌ Ошибка в работе библиотеки VimeWorld | Недостаточно аргументов");
        return request(
			options(`/user/name/${userNick}`, token)
		).then((r) => r, (e) => console.error("❌ Ошибка в работе библиотеки VimeWorld | ", e));
	};

	this.getStats = (userID) => {
		if(!userID) return console.error("❌ Ошибка в работе библиотеки VimeWorld | Недостаточно аргументов");
        return request(
			options(`/user/${userID}/stats`, token)
		).then((r) => r, (e) => console.error("❌ Ошибка в работе библиотеки VimeWorld | ", e));
	};

	this.getGuild = (queryType, query) => {
		if(!queryType || !query) return console.error("❌ Ошибка в работе библиотеки VimeWorld | Недостаточно аргументов");
		return request(
			options(`/guild/get?${queryType}=${query}`)
		).then((r) => r, (e) => console.error("❌ Ошибка в работе библиотеки VimeWorld | ", e));
	};
	
	this.getFriends = (userID) => {
		if(!userID) return console.error("❌ Ошибка в работе библиотеки VimeWorld | Недостаточно аргументов");
        return request(
			options(`/user/${userID}/friends`, token)
		).then((r) => r, (e) => console.error("❌ Ошибка в работе библиотеки VimeWorld | ", e));
	};
	
	this.getAchievements = (userID) => {
		if(!userID) return console.error("❌ Ошибка в работе библиотеки VimeWorld | Недостаточно аргументов");
        return request(
			options(`/user/${userID}/achievements`, token)
		).then((r) => r, (e) => console.error("❌ Ошибка в работе библиотеки VimeWorld | ", e));
	};

	this.getSession = (userID) => {
		if(!userID) return console.error("❌ Ошибка в работе библиотеки VimeWorld | Недостаточно аргументов");
        return request(
			options(`/user/${userID}/session`, token)
		).then((r) => r, (e) => console.error("❌ Ошибка в работе библиотеки VimeWorld | ", e));
	};
	
	this.getStaff = () => {
		return request(
			options(`/online/staff`, token)
		).then((r) => r, (e) => console.error("❌ Ошибка в работе библиотеки VimeWorld | ", e));
	};

	this.getStreams = () => {
		return request(
			options(`/online/streams`, token)
		).then((r) => r, (e) => console.error("❌ Ошибка в работе библиотеки VimeWorld | ", e));
	};
};