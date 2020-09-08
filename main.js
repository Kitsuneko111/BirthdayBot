const Discord = require('discord.js')
const client = new Discord.Client()
const express = require('express')

const app = express()
app.get('/', (req, res)=>{
  res.sendStatus(200)
})
app.listen(process.env.PORT)

client.on('ready', ()=>{
    client.user.setActivity("for updates!", {type:"WATCHING"})
    console.log('logged in to '+client.guilds.size+' servers')
})
client.on('message', message=>{
    if(message.author.bot) return
    let content = message.content
    if(!content.toLowerCase().startsWith('b ')) return
    content = content.substring(1)
    args = content.split(/ +/)
    command = args.shift()
    switch(command.toLowerCase()){
        case "day":
            if(args.length != 2) return message.reply('Please give me a single user to ping and mention a channel.')
            user = message.mentions.members.first()
            if(!user) user = message.guild.members.find(val => val.id == args[0]||val.user.username == args[0] || val.nickname == args[0])
            if(!user) return message.reply('Invalid user.')
            channel = message.mentions.channels.first()
            if(!channel) channel = message.guild.channels.find(val => val.id == args[1] || val.name == args[1])
            if(!channel) return message.reply('Invalid channel.')
            channel.send(`Happy Birthday ${user}!`)
            
    }
})
client.login(process.env.TOKEN)