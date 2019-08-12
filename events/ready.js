module.exports = class extends Discord.Event {
  run() {
    vime.getTokenStatus().then(res => {
      if(res.type === "DEV" && res.valid === true)
        return console.info("[BOOT | VimeWorld] Подключён к API сервису через API ключ (" + res.token + ").");
      else
        return console.info("[BOOT | VimeWorld] Ошибка подключения к API сервису: неверный токен");
    });
    
    /* this.client.user.setPresence({
      game: {
        name: "просмотр статистики",
        type: 0
      }
    }); */
    
    return console.info(`[BOOT] Бот запущен и авторизован через аккаунт ${this.client.user.tag} (${this.client.user.id}).`);
  }
};