module.exports = class extends Discord.Command {
    get options() {
        return {
            name: 'ping',
            enabled: true,
            aliases: ['пинг'],
            description: "Пинг-понг!",
        };
    }

    run(message, args) {
        return message.channel.send(`:thinking:`).then(m => {
            m.edit(`🏓 Понг! Пинг клиента: **${this.client.ping}ms**`);
        });
    }

    disabledRun(message) { return message.channel.send(":x: Команда отключена."); }
};