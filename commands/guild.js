/*

Внимание! Данная команда отключена для использования, и имеет код из ping.js
Вы можете написать для неё код, и сделать Pull Request. Я даже буду рад этому. :)

*/

module.exports = class extends Discord.Command {
    get options() {
        return {
            name: "guild",
            usage: "<id/tag/name> <запрос>",
            enabled: false,
            aliases: ['гильдия'],
            description: "Проверка статистики гильдии",
        };
    }

    run(message, args) {
        return message.channel.send(`:thinking:`).then(m => {
            m.edit(`🏓 Понг! Пинг клиента: **${this.client.ping}ms**`);
        });
    }

    disabledRun(message) { return message.channel.send(":x: Команда отключена."); }
};
