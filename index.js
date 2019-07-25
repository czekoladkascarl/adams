const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const token = process.env.token;
const bot = new Discord.Client({disableEveryone: true});
const newUsers = [];

bot.on("ready", async () =>{
  console.log(`${bot.user.username} gotowy`);
  bot.user.setGame("Jestem pomocnikiem na serwerze IslandRP");
});

bot.on("message", async message =>{
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  //botinfo
  if(cmd ===`${prefix}botinfo`){
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setTitle("Bot Info")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Nazwa bota", bot.user.username)
    .addField("Utworzony", bot.user.createdAt);

    return message.channel.send(botembed);
  }
 //sinfo
  if(cmd ===`${prefix}sinfo`){
    let sicon = message.guild.iconURL;
    let sembed = new Discord.RichEmbed()
    .setTitle("Server Info")
    .setColor("#ff0000")
    .setThumbnail(sicon)
    .addField("Nazwa serwera", message.guild.name)
    .addField("Utworzony", message.guild.createdAt)
    .addField("Ilość członków", message.guild.memberCount)
    .addField("Dołączyłeś", message.member.joinedAt)

    return message.channel.send(sembed);
  }
    //zglos
    if(cmd ===`${prefix}zglos`){
      let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!rUser) return message.channel.send("Nie odnalazłem członka");
      let reason = args.join(" ").slice(22);

      let rEmbed = new Discord.RichEmbed()
      .setColor("#030000")
      .setTitle("**REPORT**")
      .addField("Zgloszony uzytkownik", `${rUser} ID: ${rUser.id}`)
      .addField("Powód", `${reason}`)
      .addField("Zgłoszony przez", `${message.author}`)

      let zgloszeniachannel = message.guild.channels.find('name', "zgloszenia");

      message.delete().catch(O_o=>{});
      zgloszeniachannel.send(rEmbed);

    }
    //zglos
    if(cmd ===`${prefix}ticket`){
      let reason = args.join(" ");

      let pEmbed = new Discord.RichEmbed()
      .setColor("#030000")
      .setTitle("**Problem**")
      .addField("Treść", `${reason}`)
      .addField("Zgłoszony przez", `${message.author}`)

      let problemychannel = message.guild.channels.find('name', "problemy");

      message.delete().catch(O_o=>{});
      problemychannel.send(pEmbed);

    }
    //mute
    if(cmd === `${prefix}mute`){
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!tomute) return message.reply("Nie znaleźiono użytkownika");
      if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Nie możesz wyciszyć administratora");
      let muterole = message.guild.roles.find(`name`, "muted");
      //start of create role
      if(!muterole){
        try{
          muterole = await message.guild.createRole({
            name: "muted",
            color: "#000000",
            permissions:[]
          })
          message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false
            });
          });
        }catch(e){
          console.log(e.stack);
        }
      }
      //end of create role
      let mutetime = args[1];
      if(!mutetime) return message.reply("Określ czas");

      await(tomute.addRole(muterole.id));
      message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

      setTimeout(function(){
        tomute.removeRole(muterole.id);
        message.channel.send(`<@${tomute.id}> został odciszony`);
      }, ms(mutetime));

}
//chuj
if(cmd === `${prefix}chuj`){
  var rozmiar1 = Math.floor((Math.random() *45 ) + 10);
  var rozmiar2 = Math.floor((Math.random() *15 ) + 1);
    message.channel.send(`${message.author} ma **${rozmiar1}** cm`)


}


});


bot.login(token);
