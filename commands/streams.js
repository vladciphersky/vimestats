module.exports = class extends Discord.Command {
    get options() {
        return {
            name: "streams",
            enabled: true,
            aliases: ['стримы'],
            description: "Онлайн стримов на сервере",
        };
    }

    run(message, args) {
        vime.getStreams().then(res => {
            var streams = vime.getNoun(res.length,
                `активен ${res.length} стрим`,
                `активно ${res.length} стрима`,
                `активно ${res.length} стримов`);
            var streamsList = res.map((e, i) => 
                `${i + 1}. ${e.title}\nВедёт: ${e.owner} (https://vime.top/p/${e.owner})\nСсылка: ${e.url}\nСмотрят: ${e.viewers} чел.\nСтрим идёт: ${vime.played(Number(e.duration + String("000")))}`
            ).join('\n');

            return message.channel.send(`Сейчас ${streams}\n\n${streamsList}`);
        });
    }

    disabledRun(message) { return message.channel.send(":x: Команда отключена."); }
};