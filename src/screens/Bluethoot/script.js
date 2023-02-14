
//
// ************* Start of bangle code *************
//
export const UPDATE_BANGLE_CODE = `

Bangle.setLCDPower(1);
Bangle.setLCDTimeout(0);
Bangle.setLCDBrightness(0.7);

const minus = require("heatshrink").decompress(atob("kEgwQNKitVqtUAwUBAwIABqAOECAgGDAAIWFAANAA41QgoHNqgHHGwgHbrf/AAXlqsVr4HD/IHJC49W1QACyo/YN56HHS46nHW4wHBHArHBFAjXCCAj1JA=="));
const plus = require("heatshrink").decompress(atob("kEgwQNKgNVqtAAwoIEgoHDqgHBAwYABA49ADwVb8oHCDwVf/IDBqAHWqkVA69b/4AC8oHBr4HD/IHJC49W1Wv/Wqyo3QK453XS44HCq2VYAa3HIATHEa47YDqD1J"));

const colour_bg = '#0000ff';
const colour_def = '#ffffff';
const colour_players = '#ffffff';
const colour_server = '#ff0000';
const colour_points = '#ffff00';
const colour_games = '#00ff00';

const point = ["0", "15", "30", "40", "A"];

var p1_name = "PLAYER 1";
var p2_name = "PLAYER 2";

var p1_idx = 0;
var p1_idx_prev = 0;
var p2_idx = 0;
var p2_idx_prev = 0;

var p1_game = 0;
var p1_game_prev = 0;
var p2_game = 0;
var p2_game_prev = 0;

var p_serving = "1";
var p_serving_prev = "1";

function show_players() {
  g.setColor(colour_players);
  g.setFont("6x8", 1);
  g.drawString(p1_name, 5, 40);
  g.drawString(p2_name, 93, 40);
}

function show_server() {
  g.setColor(colour_server);
  if (p_serving == "1") {
    g.fillCircle(10, 76, 3);
  } else {
    g.fillCircle(164, 76, 3);
  }
}

function show_points() {
  g.setColor(colour_points);
  g.setFont("Vector", 36);
  g.drawString(point[p1_idx], 26, 60);
  g.drawString(point[p2_idx], 110, 60);

}

function show_games() {
  g.setColor(colour_games);
  g.setFont("Vector", 20);
  g.drawString(p1_game, 40, 100);
  g.drawString(p2_game, 126, 100);
}

function save_score() {
  p1_idx_prev = p1_idx;
  p2_idx_prev = p2_idx;
  p1_game_prev = p1_game;
  p2_game_prev = p2_game;
  p_serving_prev = p_serving;
}

function restore_score() {
  p1_idx = p1_idx_prev;
  p2_idx = p2_idx_prev;
  p1_game = p1_game_prev;
  p2_game = p2_game_prev;
  p_serving = p_serving_prev;
  update_screen();
}

function add_point_p1() {
  save_score();
  if (p1_idx == 3 && p2_idx < 3 || p1_idx == 4 && p2_idx < 4) {
    p1_game += 1;
    p1_idx = 0;
    p2_idx = 0;
    if (p_serving == "1") {
      p_serving = "2";
    } else {
      p_serving = "1";
    }
  } else {
    if (p1_idx == 3 && p2_idx == 4) {
      p2_idx = 3;
    } else {
      p1_idx += 1;
    }
  }
  update_screen();
}

function add_point_p2() {
  save_score();
  if (p2_idx == 3 && p1_idx < 3 || p2_idx == 4 && p1_idx < 4) {
    p2_game += 1;
    p1_idx = 0;
    p2_idx = 0;
    if (p_serving == "1") {
      p_serving = "2";
    } else {
      p_serving = "1";
    }
  } else {
    if (p2_idx == 3 && p1_idx == 4) {
      p1_idx = 3;
    } else {
      p2_idx += 1;
    }
  }
  update_screen();
}

function update_screen() {

  g.clear();
  g.setColor(colour_def);
  g.drawImage(plus, 0, 0);
  g.drawImage(plus, 144, 0);
  g.drawImage(minus, 72, 144);
  g.drawLine(88, 40, 88, 126);

  show_players();
  show_server();
  show_points();
  show_games();
}

function init_data(v) {
  s = v.split(';', 7);
  p1_name = s[0];
  p2_name = s[1];
  p_serving = s[2];
  p1_idx = Number(s[3]);
  p2_idx = Number(s[4]);
  p1_game = Number(s[5]);
  p2_game = Number(s[6]);
  save_score();
  update_screen();
}

Bangle.on("touch", (zone, xy) => {

  if (xy.x < 48 && xy.y < 48) {
    add_point_p1();
  } else {
    if (xy.x > 128 && xy.y < 48) {
      add_point_p2();
    } else {
      if (xy.x > 64 && xy.x < 112 && xy.y > 128) {
        restore_score();
      }
    }
  }
});

g.setBgColor(colour_bg);
update_screen();
NRF.on('disconnect', function() {reset();});
setInterval(function(){Bluetooth.println(";"+p1_name+";"+p2_name+";"+p_serving+";"+p1_idx+";"+p2_idx+";"+p1_game+";"+p2_game+";");},2000);

`;
//
// ************* End of bangle code *************
//

const point = ["0", "15", "30", "40", "A"];
var score = [];
var connection;

// Called when we get a line of data
function onLine(v) {
    if (v.slice(0, 1) == ';') {
        score = v.slice(1).split(';', 7);
        //console.log(score);
        document.getElementById("p1_name").innerHTML = score[0];
        document.getElementById("p2_name").innerHTML = score[1];
        if (score[2] == "1") {
            document.getElementById("p1_serving").innerHTML = "*";
            document.getElementById("p2_serving").innerHTML = " ";
        } else {
            document.getElementById("p1_serving").innerHTML = " ";
            document.getElementById("p2_serving").innerHTML = "*";
        }
        document.getElementById("p1_game").innerHTML = score[5];
        document.getElementById("p2_game").innerHTML = score[6];
        document.getElementById("p1_idx").innerHTML = score[3];
        document.getElementById("p2_idx").innerHTML = score[4];
        document.getElementById("p1_point").innerHTML = point[Number(score[3])];
        document.getElementById("p2_point").innerHTML = point[Number(score[4])];

        /* dump score on file on the server
        fetch('score-update.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          body: "text=" + v
        }) */
    }
}

// Connect to bangle
function bt_connect(s) {

    if (connection) {
        connection.close();
        connection = undefined;
    }

    Puck.connect(function(c) {
        if (!c) {
            alert("Couldn't connect!");
            document.getElementById("connect").innerHTML = "Connect";
            return;
        }
        connection = c;
        document.getElementById("connect").innerHTML = "Disconnect";
        // Handle the data we get back, and call 'onLine'
        // whenever we get a line
        var buf = "";
        connection.on("data", function(d) {
            buf += d;
            var l = buf.split("\n");
            buf = l.pop();
            l.forEach(onLine);
        });
        // First, reset the Bangle
        connection.write("reset();\n", function() {
            // Wait for it to reset itself
            setTimeout(function() {
                // Now upload our code to it
                connection.write("\x03\x10if(1){"+BANGLE_CODE+"}\n", function() {
                    console.log("Ready...");
                    if (s) { connection.write("init_data('"+s+"');\n"); }
                });
            }, 1500);
        });
    });
}

// Add point to p1
function add_point_p1() {
    connection.write("add_point_p1();\n");
}

// Add point to p2
function add_point_p2() {
    connection.write("add_point_p2();\n");
}

// Score undo
function restore_score() {
    connection.write("restore_score();\n");
}
