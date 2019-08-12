module.exports = class extends Discord.Command {
    get options() {
        return {
            name: "staff",
            enabled: true,
            aliases: ['стафф'],
            description: "Онлайн модераторов на сервере",
        };
    }

    run(message, args) {
        vime.getStaff().then(res => {
            var moders = res.map((e, i) => 
                `${i + 1}. ${vime.returnPrefix(e.rank)} \`${e.username}\`. ${e.online.message}`
            ).join('\n');

            return message.channel.send(`Модеров онлайн: ${res.length}\n\n${moders}`);
        });
    }

    disabledRun(message) { return message.channel.send(":x: Команда отключена."); }
};