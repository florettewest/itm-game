var cool = require('cool-ascii-faces');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
var fs = require('fs');
//const route = require('node-router');
console.log('port', process.env.PORT || 5000)
server.listen(process.env.PORT || 5000);

io.on('connection', function(socket) {
    console.log("client connection established");
    socket.on('teamName', (message) => {
        console.log('Message recieved: ', message)
            //writeDataWithKey(message,message,"jsonFiles/teamNames.json")
        readDataFromFile("jsonFiles/teamNames.json").then(data => {
            var teamCount = Object.keys(data).length
            var teamKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l']
            var teamId = message["teamId"];
            console.log("teamId before", teamId)
            if (teamId == "notassigned") {
                teamId = "team-" + teamKeys[teamCount]
            }
            console.log("teamId after", teamId)
            writeFile("jsonFiles/" + teamId + ".json", '{"teamId":"' + teamId + '"}')
            writeDataWithKey(teamId, message["teamName"], "jsonFiles/teamNames.json").then(data => {
                var teamNameMessage = {};
                teamNameMessage["serviceId"] = message["serviceId"]
                teamNameMessage["teamId"] = teamId
                io.emit('teamName', teamNameMessage);
                io.emit('adminPageTeamNames', JSON.parse(data));
                adminPlaneRaceOnLoad().then(teams => {
                    io.emit('adminPlaneRaceOnLoad', teams);
                })
                if (teamCount == 0) {
                    io.emit('adminIntro', true);
                }
            })
        })
    });

    socket.on('adminAllowTeamName', (message) => {
        console.log('Admin allows client to enter name', message)
        io.emit('adminAllowTeamName', message);
    });

    socket.on('teamHomeWelcome', (message) => {
        console.log('team home welcome screen initated ', message)
        io.emit('teamHomeWelcome', message);
    });

    socket.on('quizOnload', (teamId) => {
        console.log('quiz onload ', teamId);
        readDataFromFile("jsonFiles/" + teamId + ".json").then(data => {
            io.emit('quizOnload', data);
        })
    });

    /*socket.on('updateTeamStatResults', (message) => {
        var stats = JSON.parse(message)
        console.log('update team stats results ', stats, stats["teamId"], stats.teamId)
        writeFile("jsonFiles/" + stats["teamId"] + ".json", JSON.stringify(message))
    });*/
    socket.on('adminPageTeamNames', (message) => {
        readDataFromFile("jsonFiles/teamNames.json").then(data => {
            io.emit('adminPageTeamNames', data);
        })
    });
    socket.on('adminPlaneRaceOnLoad', (message) => {
        adminPlaneRaceOnLoad().then(teams => {
            io.emit('adminPlaneRaceOnLoad', teams);
        })
    });
    // socket.on('adminPageTeamNames-initiateCountdown', (message) => {
    //     console.log('countdown initaited: ', message)
    //         //io.emit('teamHomeWelcome', true);
    //     io.emit('adminPageTeamNames-initiateCountdown', true);
    // });
    socket.on('adminPageTeamNames-initiateQuiz', (message) => {
        console.log('Quiz initiated: ', message)
        io.emit('adminPageTeamNames-initiateQuiz', true);
    });
    socket.on('adminIntro', (message) => {
        console.log('admin intro ', message)
    });

    socket.on('planeFinished', (message) => {
        console.log('planeFinished', message)
        io.emit('planeFinished', message);
    });

    socket.on('teamResults', (message) => {
        console.log('Message recieved: ', message)
        writeDataWithKey(message["questionNo"], message, "jsonFiles/" + message["teamId"] + ".json")
        io.emit('teamResultsAdminPlaneMove', message);
    });
    socket.on('adminStats', (message) => {
        var adminData = {}
        adminPlaneRaceOnLoad().then(planeData => {
            adminTeamResults(planeData).then(teamData => {
                adminData['planeData'] =  planeData
                adminData['teamData'] =  teamData
                io.emit('adminStats', adminData);
            })
        })
    });

    // Reset function
    socket.on('resetBtn', (reset) => {
        fs.writeFile('jsonFiles/teamNames.json', '{}', () => {
            console.log('Game reset!')
        })
        // Team a
        fs.unlink('jsonFiles/team-a.json', function (err) {
            if (err) {
                console.error(err);
            }
            console.log('team-a.json has been Deleted');
        });
        // Team b
        fs.unlink('jsonFiles/team-b.json', function (err) {
            if (err) {
                console.error(err);
            }
            console.log('team-b.json has been Deleted');
        });
        // Team c
        fs.unlink('jsonFiles/team-c.json', function (err) {
            if (err) {
                console.error(err);
            }
            console.log('team-c.json has been Deleted');
        });
        // Team d
        fs.unlink('jsonFiles/team-d.json', function (err) {
            if (err) {
                console.error(err);
            }
            console.log('team-d.json has been Deleted');
        });
        // Team e
        fs.unlink('jsonFiles/team-e.json', function (err) {
            if (err) {
                console.error(err);
            }
            console.log('team-e.json has been Deleted');
        });
        // Team f
        fs.unlink('jsonFiles/team-f.json', function (err) {
            if (err) {
                console.error(err);
            }
            console.log('team-f.json has been Deleted');
        });
        // Team g
        fs.unlink('jsonFiles/team-g.json', function (err) {
            if (err) {
                console.error(err);
            }
            console.log('team-g.json has been Deleted');
        });
        // Team h
        fs.unlink('jsonFiles/team-h.json', function (err) {
            if (err) {
                console.error(err);
            }
            console.log('team-h.json has been Deleted');
        });
        // Team i
        fs.unlink('jsonFiles/team-i.json', function (err) {
            if (err) {
                console.error(err);
            }
            console.log('team-i.json has been Deleted');
        });
        // Team j
        fs.unlink('jsonFiles/team-j.json', function (err) {
            if (err) {
                console.error(err);
            }
            console.log('team-j.json has been Deleted');
        });
        // Team k
        fs.unlink('jsonFiles/team-k.json', function (err) {
            if (err) {
                console.error(err);
            }
            console.log('team-k.json has been Deleted');
        });
        // Team l
        fs.unlink('jsonFiles/team-l.json', function (err) {
            if (err) {
                console.error(err);
            }
            console.log('team-l.json has been Deleted');
        });
    });


    // dev controls
    socket.on('devControl-allTeamNames', (message) => {
        readDataFromFile("jsonFiles/teamNames.json").then(data => {
            io.emit('devControl-allTeamNames', data);
        })
    });
    socket.on('devControl-deleteTeam', (teamId) => {
        deleteDataWithKey(teamId, "jsonFiles/teamNames.json").then(data => {
            io.emit('devControl-deleteTeam', teamId)
        })
    });
    socket.on('devControl-initateQuiz', (teamId) => {
        console.log("dev control quiz initiated", teamId)
        io.emit('devControl-initateQuiz', teamId)
    });
    socket.on('devControl-teamResults', (teamId) => {
        readDataFromFile("jsonFiles/" + teamId + ".json").then(data => {
            io.emit('devControl-teamResults', data);
        })
    });
    socket.on('disconnect', () => console.log('Client disconnected'));

});

function adminPlaneRaceOnLoad() {
    return new Promise((resolve, reject) => {
        var teams = '{"teamDetails":[]}'
        console.log("welcome message admin plane move")
        teams = JSON.parse(teams)
        readDataFromFile("jsonFiles/teamNames.json").then(teamNameJsonData => {
            var noOfTeams = Object.keys(teamNameJsonData).length
            var count = 0;
            for (var key in teamNameJsonData) {
                computeCorrectAnswers(teamNameJsonData, key).then(data => {
                    count += 1;
                    teams.teamDetails.push(data)
                    if (count == noOfTeams) {
                        resolve(teams)
                            //io.emit('adminPlaneRaceOnLoad', teams);
                    }
                })
            }
        })
    })
}

function adminTeamResults(planeData) {
    return new Promise((resolve, reject) => {
        console.log('welcome to admin team results ')
        var teamResult = []
        var i = 0
        var teamPromise = []
        for (i; i < planeData['teamDetails'].length; i++) {
            teamName = planeData['teamDetails'][i]['teamId']
            teamPromise.push(
                readDataFromFile("jsonFiles/" + teamName + ".json").then(data => {
                    teamResult.push(data)
                })
            )
        }
        Promise.all(teamPromise).then(values => {
            resolve(teamResult)
        })
    })
}

function computeCorrectAnswers(teamNameJsonData, key) {
    return new Promise((resolve, reject) => {
        var teamDetails = "{}"
        teamDetails = JSON.parse(teamDetails)
        teamDetails["teamName"] = teamNameJsonData[key]
        console.log(teamNameJsonData[key]);
        console.log(teamDetails["teamName"]);
        teamDetails["teamId"] = key

        readDataFromFile("jsonFiles/" + key + ".json").then(data => {
            var noOfAnsCorrect = 0;
            var totalQuestionsAnswered = 0;
            var totalTimeTaken = 0;
            for (var key in data) {
                if (key.startsWith("q") && data[key].answerStatus == "correct") {
                    noOfAnsCorrect += 1;
                }
                if (key.startsWith("q")) {
                    totalQuestionsAnswered += 1;
                }
                if (key.startsWith("q") && data[key].timeTaken != "" && data[key].timeTaken != null && data[key].timeTaken != undefined) {
                    totalTimeTaken += data[key].timeTaken;
                }
            }
            teamDetails["noOfAnsCorrect"] = noOfAnsCorrect
            teamDetails["totalQuestionsAnswered"] = totalQuestionsAnswered
            teamDetails["totalTimeTaken"] = totalTimeTaken
            resolve(teamDetails);
        })
    })
}

function writeFile(file, content) {
    return new Promise((resolve, reject) => {
        fs.exists(file, function(e) {
            if (!e) {
                fs.writeFile(file, content, (err) => {
                    if (err) {
                        resolve(false)
                    }
                    resolve(true)
                    console.log("The file was succesfully saved!");
                });
            }
        })
    })

}

function readDataFromFile(file) {
    return new Promise((resolve, reject) => {
        fs.exists(file, function(e) {
            if (e) {
                fs.readFile(file, function(err, data) {
                    resolve(JSON.parse(data))
                })
            } else {
                resolve(null)
            }
        })
    })
}

function writeDataWithKey(inputKey, value, file) {
    return new Promise((resolve, reject) => {
        readDataFromFile(file).then(data => {
            data[inputKey] = value;
            data = JSON.stringify(data)
            fs.writeFile(file, data, function(err) {
                console.log("writeDataWithKey status", err)
                resolve(data)
            })
        })
    })
};

function deleteDataWithKey(key, file) {
    return new Promise((resolve, reject) => {
        readDataFromFile(file).then(data => {
            delete data[key];
            fs.writeFile(file, JSON.stringify(data), function(err) {
                console.log("write after delete", data)
                resolve(key)
            })
        })
    })
}
//defaults
app.get('/cool', function(request, response) {
    response.send(cool());
});
//routing for teams
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/teams/splash.html');
});
app.get('/team-choice', function (req, res) {
    res.sendFile(__dirname + '/teams/team-choice.html');
});
app.get('/team-home', function(req, res) {
    res.sendFile(__dirname + '/teams/team-home.html');
});
app.get('/countdown', function(req, res) {
    res.sendFile(__dirname + '/teams/countdown.html');
});
app.get('/quiz.html', function(req, res) {
    res.sendFile(__dirname + '/teams/quiz.html');
});
app.get('/game-over.html', function(req, res) {
    res.sendFile(__dirname + '/teams/game-over.html');
});

//routing for admin
app.get('/admin-intro', function(req, res) {
    res.sendFile(__dirname + '/admin/intro-main.html');
});
app.get('/admin-team-main', function(req, res) {
    res.sendFile(__dirname + '/admin/team-main.html');
});
app.get('/countdown-main', function(req, res) {
    res.sendFile(__dirname + '/admin/admin-countdown.html');
});
app.get('/plane-race.html', function(req, res) {
    res.sendFile(__dirname + '/admin/admin-plane-race.html');
});
app.get('/admin-stats', function(req, res) {
    res.sendFile(__dirname + '/admin/admin-stats.html');
});
app.get('/reset', function (req, res) {
    res.sendFile(__dirname + '/admin/reset.html');
});

//routing for misc
app.get('/email', function (req, res) {
    res.sendFile(__dirname + '/email/email.html');
});

//assets css
app.get('/styles/styles.css', function(req, res) {
    res.sendFile(__dirname + '/styles/styles.css');
});

//assets js
app.get('/scripts/app.js', function(req, res) {
    res.sendFile(__dirname + '/scripts/app.js');
});
app.get('/theme.js', function(req, res) {
    res.sendFile(__dirname + '/theme.js');
});

//assets imgs
app.get('/images/planes/smoke.gif', function(req, res) {
    res.sendFile(__dirname + '/images/planes/smoke.gif');
});
app.get('/images/clouds/finish-line.png', function(req, res) {
    res.sendFile(__dirname + '/images/clouds/finish-line.png');
});
app.get('/images/planes/smoke.png', function(req, res) {
    res.sendFile(__dirname + '/images/planes/smoke.png');
});
app.get('/images/planes/blank-smoke.png', function(req, res) {
    res.sendFile(__dirname + '/images/planes/blank-smoke.png');
});
app.get('/images/planes/plane-turquoise.gif', function(req, res) {
    res.sendFile(__dirname + '/images/planes/plane-turquoise.gif');
});
app.get('/images/planes/plane-red.gif', function(req, res) {
    res.sendFile(__dirname + '/images/planes/plane-red.gif');
});
app.get('/images/planes/plane-blue.gif', function(req, res) {
    res.sendFile(__dirname + '/images/planes/plane-blue.gif');
});
app.get('/images/planes/plane-orange.gif', function(req, res) {
    res.sendFile(__dirname + '/images/planes/plane-orange.gif');
});
app.get('/images/planes/plane-yellow.gif', function(req, res) {
    res.sendFile(__dirname + '/images/planes/plane-yellow.gif');
});
app.get('/images/planes/plane-white.gif', function(req, res) {
    res.sendFile(__dirname + '/images/planes/plane-white.gif');
});
app.get('/images/planes/plane-green.gif', function(req, res) {
    res.sendFile(__dirname + '/images/planes/plane-green.gif');
});
app.get('/images/planes/plane-purple.gif', function(req, res) {
    res.sendFile(__dirname + '/images/planes/plane-purple.gif');
});
app.get('/images/planes/plane-brown.gif', function (req, res) {
    res.sendFile(__dirname + '/images/planes/plane-brown.gif');
});
app.get('/images/planes/plane-grey.gif', function (req, res) {
    res.sendFile(__dirname + '/images/planes/plane-grey.gif');
});
app.get('/images/planes/plane-pink.gif', function (req, res) {
    res.sendFile(__dirname + '/images/planes/plane-pink.gif');
});
app.get('/images/planes/plane-violet.gif', function (req, res) {
    res.sendFile(__dirname + '/images/planes/plane-violet.gif');
});
app.get('/images/clouds/clouds-1.png', function(req, res) {
    res.sendFile(__dirname + '/images/clouds/clouds-1.png');
});
app.get('/images/clouds/clouds-2.png', function(req, res) {
    res.sendFile(__dirname + '/images/clouds/clouds-2.png');
});
app.get('/images/clouds/clouds-3.png', function(req, res) {
    res.sendFile(__dirname + '/images/clouds/clouds-3.png');
});
app.get('/images/countdown/number1.png', function(req, res) {
    res.sendFile(__dirname + '/images/countdown/number1.png');
});
app.get('/images/countdown/number2.png', function(req, res) {
    res.sendFile(__dirname + '/images/countdown/number2.png');
});
app.get('/images/countdown/number3.png', function(req, res) {
    res.sendFile(__dirname + '/images/countdown/number3.png');
});
app.get('/images/countdown/number4.png', function(req, res) {
    res.sendFile(__dirname + '/images/countdown/number4.png');
});
app.get('/images/countdown/number5.png', function(req, res) {
    res.sendFile(__dirname + '/images/countdown/number5.png');
});
app.get('/images/countdown/bullseye.png', function(req, res) {
    res.sendFile(__dirname + '/images/countdown/bullseye.png');
});
app.get('/images/cloud9-logo.png', function(req, res) {
    res.sendFile(__dirname + '/images/cloud9-logo.png');
});
app.get('/images/clouds/stars.png', function(req, res) {
    res.sendFile(__dirname + '/images/clouds/stars.png');
});
app.get('/images/clouds/clouds-mobile.png', function(req, res) {
    res.sendFile(__dirname + '/images/clouds/clouds-mobile.png');
});
app.get('/images/boom.gif', function(req, res) {
    res.sendFile(__dirname + '/images/boom.gif');
});
app.get('/email/cloud9-email-title.jpg', function (req, res) {
    res.sendFile(__dirname + '/email/cloud9-email-title.jpg');
});
app.get('/images/Digital-Solutions2.png', function (req, res) {
    res.sendFile(__dirname + '/images/Digital-Solutions2.png');
});





//others
app.get('/jsonFiles/teamNames.json', function(req, res) {
    res.sendFile(__dirname + '/jsonFiles/teamNames.json');
});
app.get('/scripts/questions.json', function(req, res) {
    res.sendFile(__dirname + '/scripts/questions.json');
});
app.get('/fonts/coolvetica.ttf', function(req, res) {
    res.sendFile(__dirname + '/fonts/coolvetica.ttf');
});
app.get('/sounds/cheer.wav', function(req, res) {
    res.sendFile(__dirname + '/sounds/cheer.wav');
});
app.get('/sounds/woo.wav', function(req, res) {
    res.sendFile(__dirname + '/sounds/woo.wav');
});
app.get('/dev', function(req, res) {
    res.sendFile(__dirname + '/dev-control.html');
});