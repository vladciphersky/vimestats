module.exports = class extends Discord.Command {
    get options() {
        return {
            name: "stats",
            usage: "<никнейм>",
            enabled: true,
            aliases: ["стата"],
            description: "Проверка статистики игрока",
        };
    }

    run(message, args) {
        if(!args[0]) return message.channel.send(":x: Вы не указали никнейм игрока.");
            vime.getProfile(args[0]).then((res) => {
                if(!res[0]) return message.channel.send(`:x: Данного игрока нет на сервере, или вы ввели неверный никнейм.`);
                if(args[1]) return message.channel.send(`ℹ Статистику игрока в играх, вы можете просмотреть здесь: https://vime.top/p/${res[0].username}#stats-player`);
                let achcount;
                vime.getAchievements(res[0].id).then((ach) => {
                    achcount = ach.achievements.length;

                let fcount;
                vime.getFriends(res[0].id).then((frs) => {
                    fcount = frs.friends.length;

                let session;
                vime.getSession(res[0].id).then((sess) => {
                    session = `${(sess.online.value === true) ? "💚" : "❤"} \`${sess.online.message}\``;

                var embed = new Discord.Embed().setColor(vime.returnColor(res[0].rank));
                embed.setTitle("Статистика за всё время").setURL('https://vime.top/p/' + res[0].username);
                
                embed.addField("Игрок", `${vime.returnPrefix(res[0].rank) + res[0].username}\n${session}`);
                embed.addField("Статистика", `Уровень: ${res[0].level} [${Math.round(res[0].levelPercentage * 100)}%]\nID игрока: ${res[0].id}\nВремя в игре: \`${vime.played(Number(res[0].playedSeconds + String("000")))}\`\nКол-во достижений: ${achcount}\nДрузей: ${fcount}`);
                embed.setThumbnail('https://skin.vimeworld.ru/helm/' + res[0].username + '.png');

                return message.channel.send(embed);
            }); }); }); });
    }

    disabledRun(message) { return message.channel.send(":x: Команда отключена."); }
};