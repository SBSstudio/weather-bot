const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');
const config = require('./config')

const bot = new Telegraf(config.BOT_TOKEN);

bot.start((ctx) => {
    try {
        ctx.replyWithHTML(`<b>Hey, ${ctx.message.chat.first_name} 👋👋</b>\n\n<em>Welcome to <b>Weather Bot</b>.\n\nJust send your city or village's name & you will get the weather.\n\n@TGweatherrobot|@SBS_Studio</em>`)
    } catch (e) {}
})


bot.command('about', async(ctx) => {
    try {
        ctx.replyWithHTML(
            "<code>@TGweatherrobot|@SBS_Studio</code>",
            Markup.inlineKeyboard([
                [
                    Markup.button.url("Update Channel 🗣", 'https://t.me/SBS_Studio'),
                ],

            ])
        )
    } catch (e) {
        console.log(e)
    }
})


bot.command('help', (ctx) => {
    try {
        ctx.reply("Just send your city or village's name & you will get the weather.\n\n@TGweatherrobot|@SBS_Studio")
    } catch (e) {}
});


bot.on('message', async(ctx) => {
    try {
        var weather_data = (await axios.get(`${config.API_URL}${ctx.message.text}`)).data
        if (weather_data.error === null && weather_data.result.length !== 0) {
            var data = weather_data.result[0]
            ctx.replyWithHTML(`Today's weather in <b><u>${data.location.name}</u></b>\n\n<b>${data.current.skytext}</b>\n\n📆 Date : <b>${data.current.date}</b>\n🌫 Sky code : <b>${data.current.skycode}</b>\n🌡 Temperature : <b>${data.current.temperature} °C</b>\n⛅️ Feels like : <b>${data.current.feelslike} °C</b>\n💧 Humidity : <b>${data.current.humidity} %</b>\n💨 Wind speed : <b>${data.current.winddisplay}</b>\n\n⏰Last Update : <b>${data.current.observationtime}</b><em>\n\n@TGweatherrobot|@SBS_Studio</em>`);
        } else {
            ctx.reply("Error ❌\n\nKindly send your city/village name again.\nMake sure if there is a space in your city/village name give that space or try with a big city name nearby you.\n\n@TGweatherrobot|@SBS_Studio");
        }
    } catch (e) {}
})

bot.launch()
