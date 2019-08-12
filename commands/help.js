module.exports = class extends Discord.Command {
    get options() {
        return {
            name: 'help',
            enabled: true,
            aliases: ['хелп'],
            description: "Помощь по командам"
        };
    }

    run(message, args) {
        const map = e => `${(e.enabled === true) ? "✅" : "❌"} | \`${this.client.prefix}${e.name}${(e.usage) ? ` ${e.usage}` : ""}\` | ${e.description}`;
        const commands = this.client.commands.map(map).join('\n');
        message.channel.send(`Время работы бота: ${vime.played(this.client.uptime)}\nДоступные команды:\n\n${commands}`);
    }

    disabledRun(message) { return message.channel.send(":x: Команда отключена."); }
};