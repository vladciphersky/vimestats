module.exports = class extends Discord.Command {
    get options() {
        return {
            name: "guild",
            usage: "<id/tag/name> <запрос>",
            enabled: true,
            aliases: ['гильдия'],
            description: "Проверка статистики гильдии",
        };
    }

    run(message, args) {
        if(!args[0] || args[0] === "") return message.channel.send(":gear: Укажите тип поиска: `id`, `tag`, `name`");
        
        if(args[0] === "id" || args[0] === "tag" || args[0] === "name") {
            var guildArg = args.slice(1).join(" ");
            if(!guildArg) return message.channel.send(`Вы не указали ${(args[0] === "id") ? "ID" : (args[0] === "tag") ? "тэг" : (args[0] === "name") ? "имя" : ""} гильдии!`);
            vime.getGuild((args[0] === "id") ? "id" : (args[0] === "tag") ? "tag" : (args[0] === "name") ? "name" : "", guildArg).then(guild => {
                var embed = new Discord.Embed().setColor(vime.returnGuildColor(guild.color));
                embed.setTitle(`<${guild.tag}> ${guild.name}`).setURL('https://vime.top/g/' + guild.id);
                if(guild.avatar_url !== null) embed.setThumbnail(guild.avatar_url);

                let sortedLNick;
                guild.members.sort(function(a) {
                    if(a.status === "LEADER") sortedLNick = a.user.username;
                });

                vime.getProfile(sortedLNick).then(user => {
                    var leader = `\`${vime.returnPrefix(user[0].rank) + user[0].username}\``;
                    embed.addField("Информация", `ID: ${guild.id}\nУровень: ${guild.level} [${Math.round(guild.levelPercentage * 100)}%]\nВложено в гильдию: ${guild.totalCoins} <:vw_coins:610677696329940997>\nДата создания: ${vime.guildCreated(Number(guild.created + String("000")))}\nУчастников: ${guild.members.length}\n${leader} - Лидер`);
                    
                    embed.addField("Перки", `${guild.perks["MEMBERS"].name}: ${guild.perks["MEMBERS"].level} уровень\n${guild.perks["COINS"].name}: ${guild.perks["COINS"].level} уровень\n${guild.perks["PARTY"].name}: ${guild.perks["PARTY"].level} уровень\n${guild.perks["MOTD"].name}: ${guild.perks["MOTD"].level} уровень\n${guild.perks["COINS_MULT"].name}: ${guild.perks["COINS_MULT"].level} уровень\n${guild.perks["TAG"].name}: ${guild.perks["TAG"].level} уровень\n${guild.perks["COLOR"].name}: ${guild.perks["COLOR"].level} уровень\n${guild.perks["GUILD_WAR"].name}: ${guild.perks["GUILD_WAR"].level} уровень`);
                    return message.channel.send(embed);
                });
            });
        } else return message.channel.send(":x: Такого типа не существует!");
    }

    disabledRun(message) { return message.channel.send(":x: Команда отключена."); }
};
