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
