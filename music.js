const Discord = require('discord.js');
const bot = new Discord.Client();

bot.login('MjE1MTM1OTY4ODI5NzY3Njgx.CvcDzw.TyW3Zg9K7C3DTn2JzE8AUD5Hovg');

bot.on('ready', () =>
{
	console.log('DJ is ready!');
	myID = "164149768040218624";
	bot.user.setStatus('online');
});

bot.on('message', message =>
{
	if (message.author.id != bot.user.id)
	{
		if(message.content.startsWith("!"))
		{
			prefix = '!';
			console.log(message.content);		
			
			//music
			if(message.content.startsWith(prefix + "play"))
			{
				if(message.guild !== null)
				{
					if(message.guild.id === '164102646569893888') // Nya, See
					{
						allowedTextChannel = "dj_snoop_dogg";
						allowedTextChannelID = "232926823581745152";
						allowedVoiceChannel = "DJ Snoop Dogg";
						allowedVoiceChannelID = "232668021406171138";
						botChannel = message.member.guild.channels.find('name', allowedVoiceChannel).members.find('user', bot.user);
						userChannel = message.member.guild.channels.find('name', allowedVoiceChannel).members.find('user', message.author);					
					}
					else if (message.guild.id === '168429519244361729') // Temp
					{
						allowedTextChannel = "code";
						allowedTextChannelID = "225810581721055232";
						allowedVoiceChannel = "Music only";
						allowedVoiceChannelID = "232658228318568449";
						botChannel = message.member.guild.channels.find('name', allowedVoiceChannel).members.find('user', bot.user);
						userChannel = message.member.guild.channels.find('name', allowedVoiceChannel).members.find('user', message.author);					
					}
					
					if(message.content === prefix + "playend")
					{
						if (message.channel.id === allowedTextChannelID)
						{
							if(botChannel === null)
							{
								message.channel.sendMessage("I'm not playing music.");
							}
							else
							{
								getOut(message, allowedVoiceChannel);
							}
						}
						else
						{
							message.channel.sendMessage("Please be in the " + message.member.guild.channels.find('name', allowedTextChannel) + " channel to end music.");
						}
					}
					else
					{
						if (message.channel.id === allowedTextChannelID)
						{
							var ytdl = require('ytdl-core');
							play = message.content.split(prefix + 'play ').slice(1);
							play = play[0];
							voiceChannel = message.member.guild.channels.find('name', allowedVoiceChannel);
							if (userChannel === null) 
							{
								return message.channel.sendMessage('Please be in the ' + allowedVoiceChannel + ' voice channel first!');
							}
							else
							{
								if(botChannel === null)
								{
									voiceChannel.join().then(connnection => 
									{
										if (play.startsWith('http'))
										{
											let stream = ytdl(play, {audioonly: true, lowest: true});
											const dispatcher = connnection.playStream(stream, {passes: 1});
											dispatcher.on('end', () => 
											{
												getOut(message, allowedVoiceChannel);
											});	
										}
										else
										{
											url = YouTube(message, play).then(user =>
											{
												console.log('url: ' + url);
												let stream = ytdl(url, {audioonly: true, lowest: true});
												const dispatcher = connnection.playStream(stream, {passes: 1});
												dispatcher.on('end', () => 
												{
													getOut(message, allowedVoiceChannel);
												});	
											});								
										}
									});
								
								}
								else
								{
									getOut(message, allowedVoiceChannel);
									
									setTimeout( () => 
									{
										voiceChannel.join().then(connnection => 
										{
											if (play.startsWith('http'))
											{
												let stream = ytdl(play, {audioonly: true, lowest: true});
												const dispatcher = connnection.playStream(stream, {passes: 1});
												dispatcher.on('end', () => 
												{
													getOut(message, allowedVoiceChannel);
													//voiceChannel.leave();
												});	
											}
											else
											{
												url = YouTube(message, play).then(user =>
												{
													console.log('url: ' + url);
													let stream = ytdl(url, {audioonly: true, lowest: true});
													const dispatcher = connnection.playStream(stream, {passes: 1});
													dispatcher.on('end', () => 
													{
														getOut(message, allowedVoiceChannel);
														//voiceChannel.leave();
													});	
												});								
											}
										});
									}, 2500);
								}
							}
						}
						else
						{
							message.channel.sendMessage("Please be in the " + message.member.guild.channels.find('name', allowedTextChannel) + " channel to request music.");
						}					
					}
				}
				else
				{
					message.channel.sendMessage("Nice try, but no.");
				}
			}			
/*ping*/	if (message.content === prefix + "!ping") 
			{
				var startTime = new Date().getTime();
				message.channel.sendMessage("!!!ping").then(message => 
				{
					var elapsed = new Date().getTime() - startTime;
					return message.edit('Response delay: ' + elapsed + ' ms.');
				}).catch(console.error);
			}			
			//exit
			if (message.content === prefix + "!exit")
			{
				bot.user.setStatus('idle',"");
				process.exit();
			}
			//youtube
			if(message.content.startsWith(prefix + "yt"))
			{
				vid = message.content.split(prefix + 'yt ').slice(1);
				YouTube(message, vid);
			}
			if (message.content.startsWith(prefix + "!setavatar"))
			{			
				bot.user.setAvatar('pics/snoopdogg.jpg').catch(console.log);
			}		
		}
		else
		{

		}
	}
});

function getOut(message, allowedVoiceChannel)
{
	voiceChannel = message.member.guild.channels.find('name', allowedVoiceChannel);
	voiceChannel.leave();
	bot.user.setGame('nothing.');
}

function YouTube(message, searchText)
{
	return new Promise((resolve) => 
	{
		var search = require('youtube-search');
		maxResults = 10;
		var opts = 
		{
			maxResults: maxResults,
			key: 'AIzaSyDXBQMasA8ql1D9KRD4BL_milhFGA7BPVk'
		};
		search(searchText, opts, function(err, results)
		{
			for (result = 0; result <= maxResults; result++)
			{
				if(err) return console.log(err);
				console.log('Result ' + result + ' was returned.');
				if(results[result].kind === "youtube#video")
				{
					url = results[result].link;
					if (message.content.startsWith("!yt"))
					{
						console.log("I just sent " + results[result].title);
						message.channel.sendMessage(url);
						break;						
					}
					else
					{
							setTimeout( () => 
							{
								resolve(url); 
							}, 1000);
							message.channel.sendMessage('Now playing: **' + results[result].title + '**.')
							bot.user.setGame(results[result].title);
							break;
					}					
				}
				else
				{
					if (result === maxResults)
					{
						console.log("Too many incorrect youtube types prevented.");
						message.channel.sendMessage("Too many incorrect youtube types prevented.");
					}
				}
			}
		});
	});
}