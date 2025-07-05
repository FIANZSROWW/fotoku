const FormData = require("form-data");
const fs = require("fs");
global.tebaktebakan = global.tebaktebakan || {};
const {
  downloadContentFromMessage
} = require("@whiskeysockets/baileys");
const {
  fromBuffer
} = require("file-type");
const os = require("os");
const util = require("util");
const axios = require("axios");
const fetch = require("node-fetch");
const moment = require("moment-timezone");
require("../Control/Function.js");
const chalk = require("chalk");
let antilink = JSON.parse(fs.readFileSync("./data/antilink.json"));
const Premium = JSON.parse(fs.readFileSync("./data/premium.json"));
fs.writeFileSync("./data/antilink.json", JSON.stringify(antilink, null, 2));
const userCooldown = new Set();
module.exports = async (_0x44929d, _0xc06c9e) => {
  try {
    if (!_0xc06c9e.message) {
      return;
    }
    if (_0xc06c9e.key && _0xc06c9e.key.remoteJid === "status@broadcast") {
      return;
    }
    if (!global.isPublic && !global.owner.includes(_0xc06c9e.sender.split("@")[0]) && !_0xc06c9e.key.fromMe) {
      return;
    }
    const _0x3cea4a = global.prefix || ".";
    const _0x1009a4 = _0xc06c9e.message?.conversation || _0xc06c9e.message?.extendedTextMessage?.text || "";
    const _0x11ebd1 = _0x1009a4.startsWith(_0x3cea4a);
    const _0x36624e = _0x11ebd1 ? _0x1009a4.slice(_0x3cea4a.length).trim().split(/ +/).shift().toLowerCase() : "";
    const _0x435aa5 = _0x11ebd1 ? _0x1009a4.trim().split(/ +/).slice(1) : [];
    const _0x3587c0 = _0x435aa5.join(" ");
    const _0x5c5deb = _0xc06c9e.quoted || _0xc06c9e;
    const _0x5ec8cd = _0x5c5deb?.msg?.mimetype || _0x5c5deb?.mimetype || null;
    const _0x51a6c6 = _0xc06c9e.sender;
    const _0x1363ca = await _0x44929d.decodeJid(_0x44929d.user.id);
    const _0x286bbb = global.owner.includes(_0x51a6c6.split("@")[0]) || _0xc06c9e.key.fromMe;
    const _0x2fdceb = Premium.includes(_0xc06c9e.chat);
    if (userCooldown.has(_0x51a6c6)) {
      return;
    }
    userCooldown.add(_0x51a6c6);
    setTimeout(() => userCooldown.delete(_0x51a6c6), 3000);
    _0xc06c9e.isGroup = _0xc06c9e.chat.endsWith("g.us");
    _0xc06c9e.metadata = _0xc06c9e.isGroup ? await _0x44929d.groupMetadata(_0xc06c9e.chat).catch(() => ({})) : {};
    const _0x4e7d1c = _0xc06c9e.metadata.participants || [];
    _0xc06c9e.isAdmin = _0x4e7d1c.some(_0x33bdc5 => _0x33bdc5.admin && _0x33bdc5.id === _0x51a6c6);
    _0xc06c9e.isBotAdmin = _0x4e7d1c.some(_0x1ea87f => _0x1ea87f.admin && _0x1ea87f.id === _0x1363ca);
    const _0x1ce985 = {
      key: {
        participant: "0@s.whatsapp.net",
        ...(_0xc06c9e.chat ? {
          remoteJid: "status@broadcast"
        } : {})
      },
      message: {
        locationMessage: {
          name: "Script KlzBotz. 2025",
          jpegThumbnail: ""
        }
      }
    };
    const _0x2668f8 = _0x4ac18f => {
      const _0x47952f = Math.floor(_0x4ac18f / 86400);
      const _0x1ce440 = Math.floor(_0x4ac18f % 86400 / 3600);
      const _0x31ba17 = Math.floor(_0x4ac18f % 3600 / 60);
      const _0x3bbb62 = Math.floor(_0x4ac18f % 60);
      return _0x47952f + " hari, " + _0x1ce440 + " jam, " + _0x31ba17 + " menit, " + _0x3bbb62 + " detik";
    };
    const _0x42fece = _0x2668f8(process.uptime());
    const _0x574269 = {};
    if (_0xc06c9e.isGroup) {
      const _0x169876 = /https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]+/gi;
      const _0x5c57b5 = antilink.find(_0xdbb774 => _0xdbb774.id === _0xc06c9e.chat);
      if (_0x5c57b5 && _0x169876.test(_0x1009a4)) {
        if (!_0xc06c9e.isAdmin && !_0x286bbb) {
          const _0x2762c7 = Date.now();
          const _0x3ede38 = _0x574269[_0x51a6c6] || 0;
          if (_0x2762c7 - _0x3ede38 > 5000) {
            _0x574269[_0x51a6c6] = _0x2762c7;
            if (_0x5c57b5.kick) {
              await _0x44929d.sendMessage(_0xc06c9e.chat, {
                text: "🚫 Tautan grup terdeteksi! " + _0xc06c9e.pushName + " akan dikeluarkan."
              }, {
                quoted: _0xc06c9e
              });
              await _0x44929d.groupParticipantsUpdate(_0xc06c9e.chat, [_0x51a6c6], "remove");
            } else {
              await _0x44929d.sendMessage(_0xc06c9e.chat, {
                text: "🚫 Tautan grup terdeteksi dan telah dihapus."
              }, {
                quoted: _0xc06c9e
              });
              await _0x44929d.sendMessage(_0xc06c9e.chat, {
                delete: {
                  remoteJid: _0xc06c9e.chat,
                  fromMe: false,
                  id: _0xc06c9e.key.id,
                  participant: _0xc06c9e.key.participant || _0x51a6c6
                }
              });
            }
          }
        }
      }
    }
    const _0x560a6e = _0xc06c9e.pushName || _0x51a6c6.split("@")[0];
    const _0x548896 = moment().tz("Asia/Jakarta").format("dddd, DD MMMM YYYY");
    const _0x4daeb6 = _0x3da47a => {
      _0x3da47a = Number(_0x3da47a);
      const _0x52d1a8 = Math.floor(_0x3da47a / 86400);
      const _0x4ede41 = Math.floor(_0x3da47a % 86400 / 3600);
      const _0x44749a = Math.floor(_0x3da47a % 3600 / 60);
      return _0x52d1a8 + " hari, " + _0x4ede41 + " jam, " + _0x44749a + " menit";
    };
    if (global.tebaktebakan?.[_0xc06c9e.sender]) {
      const _0x2ce117 = _0xc06c9e.text.toLowerCase();
      const _0x3bb5cb = global.tebaktebakan[_0xc06c9e.sender];
      if (_0x2ce117 === _0x3bb5cb.jawaban) {
        clearTimeout(_0x3bb5cb.timeout);
        delete global.tebaktebakan[_0xc06c9e.sender];
        _0x44929d.sendMessage(_0xc06c9e.chat, {
          text: "✅ *Benar!* Kamu berhasil menjawab."
        }, {
          quoted: _0xc06c9e
        });
        const _0x1950e2 = global.owner[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        _0x44929d.sendMessage(_0x1950e2, {
          text: "✅ *Jawaban Benar dari* wa.me/" + _0xc06c9e.sender.split("@")[0] + "\nSoal: " + _0x3bb5cb.soal + "\nJawaban: " + _0x2ce117
        });
      } else {
        _0x44929d.sendMessage(_0xc06c9e.chat, {
          text: "❌ *Salah!* Coba lagi ya."
        }, {
          quoted: _0xc06c9e
        });
      }
    }
    if (global.math && global.math[_0xc06c9e.sender]) {
      const _0x380531 = 30000;
      const _0x3e0273 = global.math[_0xc06c9e.sender];
      if (Date.now() - _0x3e0273.waktu > _0x380531) {
        _0xc06c9e.reply("⏰ *Waktu habis!*\nJawaban yang benar adalah: *" + _0x3e0273.jawaban + "*");
        delete global.math[_0xc06c9e.sender];
        return;
      }
      if (_0xc06c9e.body.trim() === _0x3e0273.jawaban) {
        _0xc06c9e.reply("✅ Jawaban benar! Kamu pintar! 🎉");
        delete global.math[_0xc06c9e.sender];
      } else {
        _0xc06c9e.reply("❌ Jawaban salah, coba lagi!");
      }
    }
    if (global.tebakgambar && global.tebakgambar[_0xc06c9e.sender]) {
      let _0x2aef16 = global.tebakgambar[_0xc06c9e.sender];
      if (Date.now() - _0x2aef16.waktu > 60000) {
        _0xc06c9e.reply("⏰ Waktu habis!\nJawaban yang benar adalah: *" + _0x2aef16.jawaban + "*");
        delete global.tebakgambar[_0xc06c9e.sender];
        return;
      }
      if (_0xc06c9e.body.toLowerCase() === _0x2aef16.jawaban) {
        _0xc06c9e.reply("✅ Benar! Kamu hebat! 🎉");
        delete global.tebakgambar[_0xc06c9e.sender];
      } else {
        _0xc06c9e.reply("❌ Salah! Coba lagi.");
      }
    }
    let _0xcc85e = [];
    try {
      _0xcc85e = JSON.parse(fs.readFileSync(path.join(__dirname, "./data/owner.json")));
    } catch {
      _0xcc85e = [];
    }
    switch (_0x36624e) {
      case "menu":
        {
          const _0x331d64 = ("\n• *Halo " + (_0xc06c9e.pushName || _0x51a6c6.split("@")[0]) + " " + global.ucapan() + "*\n• *Bot Name: KlzBotz 🤖*\n• 📆 " + moment().tz("Asia/Jakarta").locale("id").format("dddd, LL") + "\n• ⏱ Runtime Bot: " + _0x42fece + "\n• Prefix: *" + global.prefix + "*\n\n*📁 Menu Server*\n- .cekram\n- .cekhost\n- .ip\n- .cekuptime\n- .cekspeed\n- .info\n- .uptime\n\n*🤖Menu Robot*\n- .public\n- .self\n- .addowner\n- .delowner\n- .listowner\n\n*✨Menu Grup*\n- .antilink nokik on/off\n- .antilink kik on/off\n- .promote @tag/reply\n- .demote @tag/reply\n- .bukagrup\n- .tutupgrup\n- .hidetag\n- .kick\n- .buatgc\n*Menu Store*\n- .pay\n\n*Menu Panel*\n- .1gb-10gb-unli \n- .cadmin\n- .listpanel\n- .addakses\n- .delakses\n- .listakses\n- .listadmin\n- .delpanel\n- .deladmin\n- .clearserver \n\n*Menu Game*\n- .menugame\n\n*Customer Service Klz*\n- .laporbug\n- .tim\n- .cs\n- .hubungics\n\n*Lz Menu*\n- .ssweb\n- .rvo\n- .stalktiktok\n- .ffstalk\n- .cekidch\n- .brat\n- .qc\n- .tourl\n- .resetlink\n- .tagall\n- .sc\n- .cekstatussc \n\n          ").trim();
          await _0x44929d.sendMessage(_0xc06c9e.chat, {
            image: {
              url: global.gambar
            },
            caption: _0x331d64,
            mentions: [_0xc06c9e.sender]
          }, {
            quoted: _0x1ce985
          });
        }
        break;
      case "ip":
      case "cekip":
        {
          const _0x19da16 = await fetch("https://api.myip.com");
          const _0x12aec3 = await _0x19da16.json();
          const _0x5468f5 = "🌐 *IP Bot:*\n> IP      : " + _0x12aec3.ip + "\n> Country : " + _0x12aec3.country + "\n> Code    : " + _0x12aec3.cc;
          await _0x44929d.sendMessage(_0xc06c9e.chat, {
            text: _0x5468f5
          }, {
            quoted: _0xc06c9e
          });
        }
        break;
      case "cekram":
        {
          const _0x58f287 = (os.totalmem() / 1024 / 1024).toFixed(2);
          const _0x40d164 = (os.freemem() / 1024 / 1024).toFixed(2);
          const _0x51ca2e = (_0x58f287 - _0x40d164).toFixed(2);
          const _0x3570ad = (_0x51ca2e / _0x58f287 * 100).toFixed(2);
          const _0x4b305b = "💾 *RAM Info*\n> Total    : " + _0x58f287 + " MB\n> Digunakan: " + _0x51ca2e + " MB (" + _0x3570ad + "%)\n> Tersisa  : " + _0x40d164 + " MB";
          await _0x44929d.sendMessage(_0xc06c9e.chat, {
            text: _0x4b305b
          }, {
            quoted: _0xc06c9e
          });
        }
        break;
      case "cekuptime":
        {
          const _0x477c20 = os.uptime();
          const _0x1eabba = Math.floor(_0x477c20 / 3600);
          const _0x2d10a9 = Math.floor(_0x477c20 % 3600 / 60);
          const _0x47f1a0 = _0x477c20 % 60;
          const _0x33830e = "⏱ Uptime Server: " + _0x1eabba + " jam " + _0x2d10a9 + " menit " + _0x47f1a0 + " detik";
          await _0x44929d.sendMessage(_0xc06c9e.chat, {
            text: _0x33830e
          }, {
            quoted: _0xc06c9e
          });
        }
        break;
      case "cekhost":
        {
          const _0x1a209a = "🖥️ *Host Info*\n> Hostname : " + os.hostname() + "\n> Platform : " + os.platform() + "\n> Type     : " + os.type() + "\n> Arch     : " + os.arch() + "\n> CPU      : " + os.cpus()[0].model;
          await _0x44929d.sendMessage(_0xc06c9e.chat, {
            text: _0x1a209a
          }, {
            quoted: _0xc06c9e
          });
        }
        break;
      case "cekspeed":
      case "ping":
        {
          const _0x3dccda = Date.now();
          await _0x44929d.sendMessage(_0xc06c9e.chat, {
            text: "⏳ Mengukur..."
          }, {
            quoted: _0xc06c9e
          });
          const _0x3b246a = Date.now();
          const _0x3a9f44 = _0x3b246a - _0x3dccda;
          await _0x44929d.sendMessage(_0xc06c9e.chat, {
            text: "⚡ Respon: " + _0x3a9f44 + " ms"
          }, {
            quoted: _0xc06c9e
          });
        }
        break;
      case "info":
        {
          const _0x447dbe = "🤖 *Bot Info*\n> Creator : @klzdev\n> Runtime : " + _0x42fece + "\n> Library : Baileys\n> Mode    : " + (global.isPublic ? "Public" : "Self") + "\n> Version : 1.0.0";
          await _0x44929d.sendMessage(_0xc06c9e.chat, {
            text: _0x447dbe
          }, {
            quoted: _0xc06c9e
          });
        }
        break;
      case "public":
        if (!_0x286bbb) {
          return;
        }
        global.isPublic = true;
        await _0x44929d.sendMessage(_0xc06c9e.chat, {
          text: "✅ Mode diubah ke *Public*."
        }, {
          quoted: _0xc06c9e
        });
        break;
      case "self":
        if (!_0x286bbb) {
          return;
        }
        global.isPublic = false;
        await _0x44929d.sendMessage(_0xc06c9e.chat, {
          text: "✅ Mode diubah ke *Self*."
        }, {
          quoted: _0xc06c9e
        });
        break;
      case "antilink":
      case "antilinkgc":
        {
          if (!_0x286bbb && !_0xc06c9e.isAdmin) {
            return _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "❌ Hanya admin/owner!"
            }, {
              quoted: _0xc06c9e
            });
          }
          if (!_0xc06c9e.isGroup) {
            return _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "❌ Khusus grup."
            }, {
              quoted: _0xc06c9e
            });
          }
          let _0x5e1155 = antilink.find(_0x36ab09 => _0x36ab09.id === _0xc06c9e.chat);
          if (!_0x435aa5[0] || !_0x435aa5[1]) {
            const _0xd5eb6f = _0x5e1155 ? "Aktif ✅ (" + (_0x5e1155.kick ? "kick" : "nokik") + ")" : "Tidak Aktif ❌";
            return _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "Contoh: .antilink kick on\nStatus: " + _0xd5eb6f
            }, {
              quoted: _0xc06c9e
            });
          }
          const _0xf93224 = _0x435aa5[0].toLowerCase();
          const _0x1b0d3c = _0x435aa5[1].toLowerCase();
          const _0x1d3ab2 = ["kick", "kik"].includes(_0xf93224);
          const _0x195034 = _0x1b0d3c === "on";
          const _0xf4d39f = _0x1b0d3c === "off";
          if (_0x195034) {
            antilink = antilink.filter(_0x54f368 => _0x54f368.id !== _0xc06c9e.chat);
            antilink.push({
              id: _0xc06c9e.chat,
              kick: _0x1d3ab2
            });
            fs.writeFileSync("./data/antilink.json", JSON.stringify(antilink, null, 2));
            await _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "✅ Antilink aktif. Mode: " + (_0x1d3ab2 ? "kick" : "nokik")
            }, {
              quoted: _0xc06c9e
            });
          }
          if (_0xf4d39f) {
            antilink = antilink.filter(_0x34a4bc => _0x34a4bc.id !== _0xc06c9e.chat);
            fs.writeFileSync("./data/antilink.json", JSON.stringify(antilink, null, 2));
            await _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "❌ Antilink dinonaktifkan."
            }, {
              quoted: _0xc06c9e
            });
          }
        }
        break;
      case "promote":
      case "adminin":
        {
          if (!_0xc06c9e.isGroup) {
            return _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "❌ Perintah ini hanya bisa digunakan di grup."
            }, {
              quoted: _0xc06c9e
            });
          }
          if (!_0xc06c9e.isAdmin) {
            return _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "❌ Kamu bukan admin grup."
            }, {
              quoted: _0xc06c9e
            });
          }
          if (!_0xc06c9e.isBotAdmin) {
            return _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "❌ Bot bukan admin grup."
            }, {
              quoted: _0xc06c9e
            });
          }
          let _0x2e3cb2;
          if (_0xc06c9e.mentionedJid && _0xc06c9e.mentionedJid.length > 0) {
            _0x2e3cb2 = _0xc06c9e.mentionedJid[0];
          } else if (_0xc06c9e.quoted && _0xc06c9e.quoted.sender) {
            _0x2e3cb2 = _0xc06c9e.quoted.sender;
          } else {
            return _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "❌ Tag atau reply member yang ingin jadi admin."
            }, {
              quoted: _0xc06c9e
            });
          }
          await _0x44929d.groupParticipantsUpdate(_0xc06c9e.chat, [_0x2e3cb2], "promote");
          await _0x44929d.sendMessage(_0xc06c9e.chat, {
            text: "✅ Berhasil Promote " + _0x2e3cb2.split("@")[0] + " dan menjadi admin"
          }, {
            quoted: _0xc06c9e
          });
        }
        break;
      case "demote":
      case "turunin":
        {
          if (!_0xc06c9e.isGroup) {
            return _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "❌ Perintah ini hanya bisa digunakan di grup."
            }, {
              quoted: _0xc06c9e
            });
          }
          if (!_0xc06c9e.isAdmin) {
            return _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "❌ Kamu bukan admin grup."
            }, {
              quoted: _0xc06c9e
            });
          }
          if (!_0xc06c9e.isBotAdmin) {
            return _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "❌ Bot bukan admin grup woyla"
            }, {
              quoted: _0xc06c9e
            });
          }
          let _0x552759;
          if (_0xc06c9e.mentionedJid && _0xc06c9e.mentionedJid.length > 0) {
            _0x552759 = _0xc06c9e.mentionedJid[0];
          } else if (_0xc06c9e.quoted && _0xc06c9e.quoted.sender) {
            _0x552759 = _0xc06c9e.quoted.sender;
          } else {
            return _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "❌ Tag atau reply admin yang ingin di demote."
            }, {
              quoted: _0xc06c9e
            });
          }
          await _0x44929d.groupParticipantsUpdate(_0xc06c9e.chat, [_0x552759], "demote");
          await _0x44929d.sendMessage(_0xc06c9e.chat, {
            text: "✅ Sukses demote " + _0x552759.split("@")[0] + " dan tidak jadi admin lagi😂."
          }, {
            quoted: _0xc06c9e
          });
        }
        break;
      case "bukagrup":
      case "buka":
        {
          if (!_0xc06c9e.isGroup) {
            return _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "❌ Perintah ini hanya bisa digunakan di dalam grup."
            }, {
              quoted: _0xc06c9e
            });
          }
          if (!_0xc06c9e.isAdmin && !_0x286bbb) {
            return _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "❌ Hanya admin grup atau owner bot yang bisa membuka grup."
            }, {
              quoted: _0xc06c9e
            });
          }
          if (!_0xc06c9e.isBotAdmin) {
            return _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "❌ Bot belum jadi admin"
            }, {
              quoted: _0xc06c9e
            });
          }
          await _0x44929d.groupSettingUpdate(_0xc06c9e.chat, "not_announcement");
          await _0x44929d.sendMessage(_0xc06c9e.chat, {
            text: "✅ Grup Sukses di buka. dan semua anggota bisa berbicara"
          }, {
            quoted: _0xc06c9e
          });
        }
        break;
      case "tutupgrup":
      case "tutup":
        {
          if (!_0xc06c9e.isGroup) {
            return _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "❌ Perintah ini hanya bisa digunakan di dalam grup."
            }, {
              quoted: _0xc06c9e
            });
          }
          if (!_0xc06c9e.isAdmin && !_0x286bbb) {
            return _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "❌ Hanya admin grup atau owner bot yang bisa menutup grup."
            }, {
              quoted: _0xc06c9e
            });
          }
          if (!_0xc06c9e.isBotAdmin) {
            return _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "❌ Bot harus menjadi admin untuk menutup grup."
            }, {
              quoted: _0xc06c9e
            });
          }
          await _0x44929d.groupSettingUpdate(_0xc06c9e.chat, "announcement");
          await _0x44929d.sendMessage(_0xc06c9e.chat, {
            text: "✅ Grup telah ditutup. Sekarang hanya admin yang dapat mengirim pesan."
          }, {
            quoted: _0xc06c9e
          });
        }
        break;
      case "ht":
      case "hidetag":
        {
          if (!_0xc06c9e.isGroup) {
            return _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "❌ Perintah ini hanya bisa digunakan di grup."
            }, {
              quoted: _0xc06c9e
            });
          }
          if (!_0xc06c9e.isAdmin && !_0x286bbb) {
            return _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "❌ Hanya admin atau owner bot yang bisa menggunakan perintah ini."
            }, {
              quoted: _0xc06c9e
            });
          }
          if (!_0x3587c0) {
            return _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "❌ Masukkan teks yang ingin dikirim ke semua anggota grup.\n\nContoh: .ht Halo semua!"
            }, {
              quoted: _0xc06c9e
            });
          }
          const _0x17de06 = _0xc06c9e.metadata.participants.map(_0x4caff8 => _0x4caff8.id).filter(_0x2fd8c8 => _0x2fd8c8 !== _0x1363ca);
          await _0x44929d.sendMessage(_0xc06c9e.chat, {
            text: _0x3587c0,
            mentions: _0x17de06
          }, {
            quoted: _0xc06c9e
          });
        }
        break;
      case "tourl":
        {
          const _0x314aad = _0xc06c9e.quoted || _0xc06c9e;
          const _0x6f5eae = (_0x314aad.msg || _0x314aad).mimetype || "";
          if (!/image|video|audio|application/.test(_0x6f5eae)) {
            return _0x542b91("Kirim atau reply media yang ingin diubah ke URL.");
          }
          async function _0x461844(_0x25dbc8, _0x168598) {
            const _0x3bf4bd = _0x168598.split("/")[0];
            const _0x4dce5d = await downloadContentFromMessage(_0x25dbc8, _0x3bf4bd);
            const _0x5bec01 = [];
            for await (let _0x306057 of _0x4dce5d) {
              _0x5bec01.push(_0x306057);
            }
            return Buffer.concat(_0x5bec01);
          }
          async function _0x516c58(_0x27f405) {
            try {
              const {
                ext: _0x1450f3
              } = await fromBuffer(_0x27f405);
              const _0x45954a = new FormData();
              _0x45954a.append("fileToUpload", _0x27f405, "file." + _0x1450f3);
              _0x45954a.append("reqtype", "fileupload");
              const _0x379df6 = await fetch("https://catbox.moe/user/api.php", {
                method: "POST",
                body: _0x45954a
              });
              return await _0x379df6.text();
            } catch (_0x2a54cd) {
              console.error("Upload Error:", _0x2a54cd);
              return null;
            }
          }
          try {
            const _0x3b0d88 = await _0x461844(_0x314aad, _0x6f5eae);
            const _0x11d8f7 = await _0x516c58(_0x3b0d88);
            if (!_0x11d8f7 || !_0x11d8f7.startsWith("https://")) {
              throw new Error("Gagal mengunggah media ke Catbox.");
            }
            await _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: _0x11d8f7
            }, {
              quoted: _0xc06c9e
            });
          } catch (_0xf7bab3) {
            console.error("❌ Tourl Error:", _0xf7bab3);
            await _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "❌ Terjadi kesalahan saat mengubah media menjadi URL.\n\n" + _0xf7bab3.message
            }, {
              quoted: _0xc06c9e
            });
          }
        }
        break;
      case "kick":
        {
          if (!_0xc06c9e.isGroup) {
            return _0xc06c9e.reply("❌ Fitur ini hanya untuk grup!");
          }
          if (!_0xc06c9e.isAdmin) {
            return _0xc06c9e.reply("❌ Kamu bukan admin grup.");
          }
          if (!_0xc06c9e.isBotAdmin) {
            return _0xc06c9e.reply("❌ Bot bukan admin grup.");
          }
          let _0x399a25 = _0xc06c9e.mentionedJid || (_0xc06c9e.quoted ? [_0xc06c9e.quoted.sender] : []);
          if (!_0x399a25.length) {
            return _0xc06c9e.reply("❌ Tag atau balas pesan pengguna yang ingin dikeluarkan.");
          }
          let _0x360866 = _0x399a25.filter(_0x2decac => _0x2decac !== _0x1363ca && _0x2decac !== _0xc06c9e.sender);
          if (!_0x360866.length) {
            return _0xc06c9e.reply("❌ Tidak bisa mengeluarkan diri sendiri atau bot.");
          }
          try {
            await _0x44929d.groupParticipantsUpdate(_0xc06c9e.chat, _0x360866, "remove");
            await _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "✅ Berhasil mengeluarkan " + _0x360866.map(_0x4c170a => "@" + _0x4c170a.split("@")[0]).join(", "),
              mentions: _0x360866
            }, {
              quoted: _0xc06c9e
            });
          } catch (_0x351b5b) {
            console.error("Kick Error:", _0x351b5b);
            _0xc06c9e.reply("❌ Gagal mengeluarkan anggota.");
          }
        }
        break;
      case "autoread":
      case "auto-read":
        {
          if (!_0x435aa5[0]) {
            return _0xc06c9e.reply("📌 Contoh penggunaan:\n" + global.prefix + "autoread on\n" + global.prefix + "autoread off");
          }
          const _0x331ab4 = _0x435aa5[0].toLowerCase();
          if (_0x331ab4 !== "on" && _0x331ab4 !== "off") {
            return _0xc06c9e.reply("❌ Pilihan hanya: on atau off");
          }
          global.autoread = _0x331ab4 === "on";
          _0xc06c9e.reply("✅ Auto-read telah *" + (global.autoread ? "diaktifkan" : "dinonaktifkan") + "*.");
        }
        break;
      case "payment":
      case "pay":
        {
          const _0x4f4a9a = "\n*Daftar Payment *" + global.namaowner + "* 🔖*\n\n* *Dana :* " + global.dana + "\n* *Ovo :* " + global.ovo + "\n* *Gopay :* " + global.gopay + "\n\n*Penting!*\nWajib kirimkan bukti transfer demi keamanan bersama!\n";
          return _0x44929d.sendMessage(_0xc06c9e.chat, {
            image: {
              url: global.qris
            },
            caption: _0x4f4a9a
          }, {
            quoted: _0xc06c9e
          });
        }
        break;
        function _0x542b91(_0x1e19cb) {
          return _0xc06c9e.reply("Format salah! Contoh penggunaan:\n" + _0x1e19cb);
        }
      case "1gb":
      case "2gb":
      case "3gb":
      case "4gb":
      case "5gb":
      case "6gb":
      case "7gb":
      case "8gb":
      case "9gb":
      case "10gb":
      case "unlimited":
      case "unli":
        {
          if (!_0x286bbb && !_0x2fdceb) {
            return _0xc06c9e.reply("Fitur ini hanya untuk dalam grup *reseller panel*!\nJoin grup *reseller panel* langsung chat " + global.owner);
          }
          if (!_0x3587c0) {
            return _0x542b91("username,628XXX");
          }
          const _0x352040 = _0x448e69 => _0x448e69.charAt(0).toUpperCase() + _0x448e69.slice(1);
          const _0x349a12 = _0x28a77e => {
            const _0x5c2790 = new Date(_0x28a77e);
            return _0x5c2790.getDate().toString().padStart(2, "0") + "/" + (_0x5c2790.getMonth() + 1).toString().padStart(2, "0") + "/" + _0x5c2790.getFullYear();
          };
          let _0x352bef;
          let _0x119e05;
          let _0x820266 = _0x3587c0.split(",");
          if (_0x820266.length > 1) {
            let [_0x3fe07b, _0xd94ecc] = _0x820266.map(_0x2fb102 => _0x2fb102.trim());
            if (!_0x3fe07b || !_0xd94ecc) {
              return _0x542b91("username,628XXX");
            }
            _0x352bef = _0xd94ecc.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
            _0x119e05 = _0x3fe07b.toLowerCase();
          } else {
            _0x119e05 = _0x3587c0.toLowerCase();
            _0x352bef = _0xc06c9e.isGroup ? _0xc06c9e.sender : _0xc06c9e.chat;
          }
          try {
            var _0x171b31 = await _0x44929d.onWhatsApp(_0x352bef.split("@")[0]);
            if (_0x171b31.length < 1) {
              return _0xc06c9e.reply("Nomor target tidak terdaftar di WhatsApp!");
            }
          } catch (_0x53f686) {
            return _0xc06c9e.reply("Terjadi kesalahan saat mengecek nomor WhatsApp: " + _0x53f686.message);
          }
          const _0x200fea = {
            "1gb": {
              ram: "1000",
              disk: "1000",
              cpu: "40"
            },
            "2gb": {
              ram: "2000",
              disk: "1000",
              cpu: "60"
            },
            "3gb": {
              ram: "3000",
              disk: "2000",
              cpu: "80"
            },
            "4gb": {
              ram: "4000",
              disk: "2000",
              cpu: "100"
            },
            "5gb": {
              ram: "5000",
              disk: "3000",
              cpu: "120"
            },
            "6gb": {
              ram: "6000",
              disk: "3000",
              cpu: "140"
            },
            "7gb": {
              ram: "7000",
              disk: "4000",
              cpu: "160"
            },
            "8gb": {
              ram: "8000",
              disk: "4000",
              cpu: "180"
            },
            "9gb": {
              ram: "9000",
              disk: "5000",
              cpu: "200"
            },
            "10gb": {
              ram: "10000",
              disk: "5000",
              cpu: "220"
            },
            unlimited: {
              ram: "0",
              disk: "0",
              cpu: "0"
            }
          };
          let {
            ram: _0x5de666,
            disk: _0x53dc54,
            cpu: _0x23cded
          } = _0x200fea[_0x36624e] || {
            ram: "0",
            disk: "0",
            cpu: "0"
          };
          let _0x5bddfe = _0x119e05.toLowerCase();
          let _0x4438e6 = _0x5bddfe + "@klzcpanel.com";
          let _0x8c57fc = _0x352040(_0x5bddfe) + " Server";
          let _0x774e87 = _0x5bddfe + "9990";
          try {
            let _0x4a1d47 = await fetch(domain + "/api/application/users", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + apikey
              },
              body: JSON.stringify({
                email: _0x4438e6,
                username: _0x5bddfe,
                first_name: _0x8c57fc,
                last_name: "Server",
                language: "en",
                password: _0x774e87
              })
            });
            let _0x2f1ff2 = await _0x4a1d47.json();
            if (_0x2f1ff2.errors) {
              return _0xc06c9e.reply("Error: " + JSON.stringify(_0x2f1ff2.errors[0], null, 2));
            }
            let _0x2ca15c = _0x2f1ff2.attributes;
            let _0x1b547f = await fetch(domain + ("/api/application/nests/" + nestid + "/eggs/") + egg, {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + apikey
              }
            });
            let _0x12a49a = await _0x1b547f.json();
            let _0x3c7582 = _0x12a49a.attributes.startup;
            let _0x5e0631 = await fetch(domain + "/api/application/servers", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + apikey
              },
              body: JSON.stringify({
                name: _0x8c57fc,
                description: _0x349a12(Date.now()),
                user: _0x2ca15c.id,
                egg: parseInt(egg),
                docker_image: "ghcr.io/parkervcp/yolks:nodejs_20",
                startup: _0x3c7582,
                environment: {
                  INST: "npm",
                  USER_UPLOAD: "0",
                  AUTO_UPDATE: "0",
                  CMD_RUN: "npm start"
                },
                limits: {
                  memory: _0x5de666,
                  swap: 0,
                  disk: _0x53dc54,
                  io: 500,
                  cpu: _0x23cded
                },
                feature_limits: {
                  databases: 5,
                  backups: 5,
                  allocations: 5
                },
                deploy: {
                  locations: [parseInt(loc)],
                  dedicated_ip: false,
                  port_range: []
                }
              })
            });
            let _0x38680d = await _0x5e0631.json();
            if (_0x38680d.errors) {
              return _0xc06c9e.reply("Error: " + JSON.stringify(_0x38680d.errors[0], null, 2));
            }
            let _0x78b92c = _0x38680d.attributes;
            let _0x2befc5 = _0x352bef;
            let _0x269de4 = "┏━━⊱ *DATA PANEL KAMU* ⊰━━┓\n┃  \n┃  📦 *ID:* " + _0x78b92c.id + "\n┃  👤 *Username:* " + _0x2ca15c.username + "\n┃  🔐 *Password:* " + _0x774e87 + "\n┃  🗓️ *Aktif Sejak:* " + _0x349a12(Date.now()) + "\n┃  \n┃  💻 *Spesifikasi:*\n┃  • RAM: " + (_0x5de666 == "0" ? "Unlimited" : _0x5de666 / 1000 + " GB") + "\n┃  • Disk: " + (_0x53dc54 == "0" ? "Unlimited" : _0x53dc54 / 1000 + " GB") + "\n┃  • CPU: " + (_0x23cded == "0" ? "Unlimited" : _0x23cded + "%") + "\n┃  \n┃  🌐 *Panel:* " + global.domain + "\n┃  \n┃  📌 Simpan baik-baik data ini!\n┗━━━━━━━━━━━━━━━━━━━━━┛";
            await _0x44929d.sendMessage(_0x2befc5, {
              image: {
                url: global.gambar
              },
              caption: _0x269de4
            }, {
              quoted: _0xc06c9e
            });
            if (_0x2befc5 !== _0xc06c9e.chat) {
              await _0xc06c9e.reply("✅ Panel berhasil dibuat! Data telah dikirim ke: " + _0x352bef.split("@")[0]);
            }
          } catch (_0x41f05e) {
            return _0xc06c9e.reply("Terjadi kesalahan: " + _0x41f05e.message);
          }
        }
        break;
      case "listpanel":
      case "listp":
      case "listserver":
        {
          if (!_0x286bbb && !_0x2fdceb) {
            return _0xc06c9e.reply("Fitur ini hanya untuk dalam grup *reseller panel*!\nJoin grup *reseller panel* langsung chat " + global.owner);
          }
          let _0x193e37 = await fetch(domain + "/api/application/servers", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey
            }
          });
          let _0x2a4c21 = await _0x193e37.json();
          let _0x8d1027 = _0x2a4c21.data;
          if (_0x8d1027.length < 1) {
            return _0xc06c9e.reply("Tidak ada server panel!");
          }
          let _0x274797 = "*📡 Daftar Server Panel*\n\n";
          for (let _0x41779f of _0x8d1027) {
            let _0xb91931 = _0x41779f.attributes;
            let _0x221795 = _0xb91931.limits.memory == 0 ? "Unlimited" : (_0xb91931.limits.memory / 1000).toFixed(2) + " GB";
            let _0x293336 = _0xb91931.limits.cpu == 0 ? "Unlimited" : _0xb91931.limits.cpu + "%";
            let _0x564d0c = _0xb91931.limits.disk == 0 ? "Unlimited" : (_0xb91931.limits.disk / 1000).toFixed(2) + " GB";
            let _0x56477c = _0xb91931.created_at.split("T")[0];
            _0x274797 += "*" + _0xb91931.id + " [" + _0xb91931.name + "]*\n• RAM: " + _0x221795 + "\n• CPU: " + _0x293336 + "\n• Disk: " + _0x564d0c + "\n• Created: " + _0x56477c + "\n\n";
          }
          await _0x44929d.sendMessage(_0xc06c9e.chat, {
            text: _0x274797.trim()
          }, {
            quoted: _0xc06c9e
          });
        }
        break;
      case "cadmin":
        {
          function _0x206d1f(_0x43bdfa) {
            return _0xc06c9e.reply("Format salah! Contoh penggunaan:\n" + _0x3cea4a + "cadmin " + _0x43bdfa);
          }
          if (!_0x286bbb) {
            return _0xc06c9e.reply("❌ Hanya owner utama yang bisa menggunakan perintah ini!");
          }
          if (!_0x3587c0) {
            return _0x206d1f("username,628XXX");
          }
          function _0x3e81e3(_0x4e7ef7) {
            if (!_0x4e7ef7) {
              return "";
            }
            return _0x4e7ef7.charAt(0).toUpperCase() + _0x4e7ef7.slice(1);
          }
          function _0x4b15f9(_0xe4951e) {
            const _0x29dfea = new Date(_0xe4951e);
            const _0x8b7e1d = ("0" + _0x29dfea.getDate()).slice(-2);
            const _0x22f207 = ("0" + (_0x29dfea.getMonth() + 1)).slice(-2);
            const _0x16d323 = _0x29dfea.getFullYear();
            return _0x8b7e1d + "-" + _0x22f207 + "-" + _0x16d323;
          }
          let _0x53f3ca;
          let _0x239271;
          let _0x2e25f7 = _0x3587c0.split(",");
          if (_0x2e25f7.length > 1) {
            let [_0x19fbc4, _0x2b464d] = _0x3587c0.split(",");
            if (!_0x19fbc4 || !_0x2b464d) {
              return _0x206d1f("username,628XXX");
            }
            _0x53f3ca = _0x2b464d.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
            _0x239271 = _0x19fbc4.toLowerCase();
          } else {
            _0x239271 = _0x3587c0.toLowerCase();
            _0x53f3ca = _0xc06c9e.isGroup ? _0xc06c9e.sender : _0xc06c9e.chat;
          }
          var _0x171b31 = await _0x44929d.onWhatsApp(_0x53f3ca.split("@")[0]);
          if (_0x171b31.length < 1) {
            return _0xc06c9e.reply("Nomor target tidak terdaftar di WhatsApp!");
          }
          let _0x4cbc49 = _0x239271.toLowerCase();
          let _0x2a7241 = _0x4cbc49 + "@gmail.com";
          let _0x4eaafb = _0x3e81e3(_0x2e25f7[0]);
          let _0xdd5c6e = _0x4cbc49 + "001";
          let _0x1eff82 = await fetch(domain + "/api/application/users", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey
            },
            body: JSON.stringify({
              email: _0x2a7241,
              username: _0x4cbc49,
              first_name: _0x4eaafb,
              last_name: "Admin",
              root_admin: true,
              language: "en",
              password: _0xdd5c6e.toString()
            })
          });
          let _0x16eff8 = await _0x1eff82.json();
          if (_0x16eff8.errors) {
            return _0xc06c9e.reply(JSON.stringify(_0x16eff8.errors[0], null, 2));
          }
          let _0x367633 = _0x16eff8.attributes;
          var _0x545536 = _0x53f3ca;
          if (_0x53f3ca !== _0xc06c9e.chat) {
            await _0xc06c9e.reply("Berhasil membuat akun admin panel ✅\ndata akun sudah dikirim ke " + _0x53f3ca.split("@")[0]);
          }
          var _0x183d42 = "\n*🚀 Akun Hosting Admin Panel Kamu Telah Aktif! 🚀*\n\n*🆔 User ID:* " + _0x367633.id + "  \n*👤 Username:* " + _0x367633.username + "  \n*🔐 Password:* " + _0xdd5c6e.toString() + "  \n*📅 Tanggal Aktif:* " + _0x4b15f9(Date.now()) + "\n\n*🔗 URL Panel:* https://" + global.domain + "\n\n---\n\n*📌 Informasi Penting:*  \n• Masa aktif akun 1 bulan sejak aktivasi.  \n• Simpan data login dengan baik dan rahasia.  \n• Gunakan layanan sesuai kebijakan dan peraturan hosting.  \n• Dilarang melakukan tindakan merugikan, seperti hacking, spam, atau pelanggaran lainnya.  \n• Pelanggaran dapat menyebabkan penangguhan atau penghapusan akun tanpa pemberitahuan.  \n• Jangan menghapus file sistem penting agar hosting tetap stabil dan berjalan optimal.\n\n---\n\nTerima kasih telah mempercayakan kebutuhan hosting Anda kepada kami!.\n> " + global.namaowner + "\n";
          let _0x1112b3 = global.gambar;
          const _0xe07c15 = await fetch(_0x1112b3);
          const _0x205310 = await _0xe07c15.buffer();
          await _0x44929d.sendMessage(_0x545536, {
            image: _0x205310,
            caption: _0x183d42
          }, {
            quoted: _0xc06c9e
          });
        }
        break;
      case "addakses":
      case "addaksesgc":
        {
          if (!_0x286bbb) {
            return _0xc06c9e.reply("Fitur ini khusus untuk owner bot!");
          }
          if (!_0xc06c9e.isGroup) {
            return _0xc06c9e.reply("Fitur ini hanya bisa digunakan di dalam grup!");
          }
          const _0x21e390 = _0xc06c9e.chat;
          if (Premium.includes(_0x21e390)) {
            return _0xc06c9e.reply("Grup ini sudah memiliki akses reseller panel!");
          }
          Premium.push(_0x21e390);
          try {
            await fs.writeFileSync("./data/premium.json", JSON.stringify(Premium, null, 2));
            _0xc06c9e.reply("Berhasil menambahkan grup sebagai reseller panel ✅");
          } catch (_0x3ad4a8) {
            console.error(_0x3ad4a8);
            _0xc06c9e.reply("Gagal menyimpan data akses. Silakan coba lagi.");
          }
        }
        break;
      case "delakses":
      case "delaksesgc":
        {
          if (!_0x286bbb) {
            return _0xc06c9e.reply("Fitur ini khusus untuk owner bot!");
          }
          if (!_0xc06c9e.isGroup) {
            return _0xc06c9e.reply("Fitur ini hanya bisa digunakan di dalam grup!");
          }
          if (Premium.length === 0) {
            return _0xc06c9e.reply("Tidak ada grup reseller panel.");
          }
          const _0x2aace1 = _0x3587c0 ? _0x3587c0.trim() : _0xc06c9e.chat;
          if (_0x2aace1.toLowerCase() === "all") {
            Premium.length = 0;
            fs.writeFileSync("./data/premium.json", JSON.stringify(Premium, null, 2));
            return _0xc06c9e.reply("Berhasil menghapus *semua grup reseller panel ✅");
          }
          if (!Premium.includes(_0x2aace1)) {
            return _0xc06c9e.reply("Grup ini bukan grup reseller panel");
          }
          const _0x226f39 = Premium.indexOf(_0x2aace1);
          Premium.splice(_0x226f39, 1);
          fs.writeFileSync("./data/premium.json", JSON.stringify(Premium, null, 2));
          return _0xc06c9e.reply("Berhasil menghapus grup reseller panel ✅");
        }
        break;
      case "listadmin":
        {
          if (!_0x286bbb) {
            return _0xc06c9e.reply("Fitur ini hanya untuk owner! Hubungi: " + global.owner);
          }
          let _0x1e65a9 = await fetch(domain + "/api/application/users", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey
            }
          });
          let _0x15c517 = await _0x1e65a9.json();
          let _0x4cef9c = _0x15c517.data;
          if (_0x4cef9c.length < 1) {
            return _0xc06c9e.reply("Tidak ada admin panel");
          }
          let _0x1cda48 = "";
          _0x4cef9c.forEach(_0x3598fb => {
            if (_0x3598fb.attributes.root_admin !== true) {
              return;
            }
            _0x1cda48 += "\n📡 *" + _0x3598fb.attributes.id + " [" + _0x3598fb.attributes.first_name + "]*\n• Nama    : " + _0x3598fb.attributes.first_name + "\n• Created : " + _0x3598fb.attributes.created_at.split("T")[0] + "\n";
          });
          await _0x44929d.sendMessage(_0xc06c9e.chat, {
            text: _0x1cda48.trim()
          }, {
            quoted: _0xc06c9e
          });
        }
        break;
      case "laporbug":
        {
          if (!_0x3587c0) {
            return _0xc06c9e.reply("Silakan tulis laporan bug yang ingin kamu sampaikan.");
          }
          let _0x2a9cc0 = new Date();
          let _0x452492 = _0x2a9cc0.toLocaleString("id-ID", {
            timeZone: "Asia/Jakarta",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          });
          let _0x1dadb0 = "*📢 LAPORAN BUG*\n\n" + ("*👤 Pengirim:* @" + _0xc06c9e.sender.split("@")[0] + "\n") + ("*📱 Nomor:* " + _0xc06c9e.sender.replace("@s.whatsapp.net", "") + "\n") + ("*🗓️ Waktu:* " + _0x452492 + "\n\n") + ("*📝 Laporan:*\n" + _0x3587c0);
          await _0x44929d.sendMessage("6289654219158@s.whatsapp.net", {
            text: _0x1dadb0,
            mentions: [_0xc06c9e.sender]
          });
          await _0xc06c9e.reply("Terima kasih sudah melaporkan bug. Tim kami akan segera menindaklanjutinya.");
        }
        break;
      case "tim":
        {
          const _0x2bcdd0 = "\n*👨‍💻 Tim KlzBotz Panel & Script*\n\n• Klz (Owner & Developer)\n\nTerima kasih telah menggunakan KlzBotz!\nKami Akan selalu meningkatkan Pelayanan Kami🚀\n  ".trim();
          await _0x44929d.sendMessage(_0xc06c9e.chat, {
            text: _0x2bcdd0
          }, {
            quoted: _0xc06c9e
          });
        }
        break;
      case "cs":
        {
          const _0x155908 = "\n*📞 Customer Service KlzBotz*\n\nNama: Klz \nWA: 6289654219158  \nJam Layanan: 09\n10.00 - 21.00 WIB  \n\nSilakan hubungi jika ada kendala atau pertanyaan!\n  ".trim();
          await _0x44929d.sendMessage(_0xc06c9e.chat, {
            text: _0x155908
          }, {
            quoted: _0xc06c9e
          });
        }
        break;
      case "hubungics":
      case "csai":
        {
          if (!_0x3587c0) {
            return _0xc06c9e.reply("Silakan ketik pesan yang ingin kamu sampaikan ke Customer Service.");
          }
          let _0x168229 = "*📩 Pesan Baru untuk CS KlzBotz*\n\n" + ("*👤 Dari:* @" + _0xc06c9e.sender.split("@")[0] + "\n") + ("*📝 Pesan:*\n" + _0x3587c0);
          await _0x44929d.sendMessage("6289654219158@s.whatsapp.net", {
            text: _0x168229,
            mentions: [_0xc06c9e.sender]
          });
          const _0xf4894c = "Terima kasih sudah menghubungi CS KlzBotz. Kami akan segera membalas pesan Anda.\n\n🤖 *Dibalas oleh sistem AI KlzBotz*";
          await _0xc06c9e.reply(_0xf4894c);
        }
        break;
      case "delpanel":
        {
          const _0x2db828 = {
            capital: function (_0x2ea368) {
              return _0x2ea368.replace(/\b\w/g, _0x124e7d => _0x124e7d.toUpperCase());
            }
          };
          if (!_0x286bbb && !_0x2fdceb) {
            return _0xc06c9e.reply("Fitur ini hanya untuk dalam grup *reseller panel*!\nJoin grup *reseller panel* langsung chat " + global.owner);
          }
          if (!_0x3587c0) {
            return _0x542b91("idnya");
          }
          let _0x16fe29 = await fetch(domain + "/api/application/servers", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey
            }
          });
          let _0x1e0d83 = await _0x16fe29.json();
          let _0x2548f2 = _0x1e0d83.data;
          let _0x25afd7;
          let _0x52f196;
          for (let _0x15dce6 of _0x2548f2) {
            let _0x2aa219 = _0x15dce6.attributes;
            if (Number(_0x3587c0) === _0x2aa219.id) {
              _0x25afd7 = _0x2aa219.name.toLowerCase();
              _0x52f196 = _0x2aa219.name;
              let _0x1524d0 = await fetch(domain + "/api/application/servers/" + _0x2aa219.id, {
                method: "DELETE",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + apikey
                }
              });
              if (!_0x1524d0.ok) {
                let _0x471e60 = await _0x1524d0.json();
                return _0xc06c9e.reply("❌ Gagal menghapus server:\n" + JSON.stringify(_0x471e60.errors?.[0] || _0x471e60, null, 2));
              }
            }
          }
          let _0xb3df0d = await fetch(domain + "/api/application/users", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey
            }
          });
          let _0x1fec8d = await _0xb3df0d.json();
          let _0x3d3f84 = _0x1fec8d.data;
          for (let _0x3bdb3e of _0x3d3f84) {
            let _0x469e28 = _0x3bdb3e.attributes;
            if (_0x469e28.first_name.toLowerCase() === _0x25afd7) {
              let _0x30a719 = await fetch(domain + "/api/application/users/" + _0x469e28.id, {
                method: "DELETE",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + apikey
                }
              });
              if (!_0x30a719.ok) {
                let _0x310e07 = await _0x30a719.json();
                return _0xc06c9e.reply("❌ Gagal menghapus user:\n" + JSON.stringify(_0x310e07.errors?.[0] || _0x310e07, null, 2));
              }
            }
          }
          if (!_0x25afd7) {
            return _0xc06c9e.reply("⚠️ Gagal menghapus server!\nID server tidak ditemukan.");
          }
          await _0x44929d.sendMessage(_0xc06c9e.chat, {
            text: "✅ *Sukses menghapus server panel*\nNama: *" + _0x2db828.capital(_0x52f196) + "*"
          }, {
            quoted: _0xc06c9e
          });
        }
        break;
      case "deladmin":
        {
          if (!_0x286bbb) {
            return _0xc06c9e.reply("Fitur ini hanya bisa digunakan oleh *Owner*!");
          }
          if (!_0x3587c0) {
            return _0x542b91("idnya");
          }
          let _0x248073 = await fetch(domain + "/api/application/users", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey
            }
          });
          let _0x113406 = await _0x248073.json();
          let _0x432de5 = _0x113406.data;
          let _0x252820 = null;
          let _0xc7fe0 = null;
          for (let _0x1d5164 of _0x432de5) {
            let _0xfdaf36 = _0x1d5164.attributes;
            if (_0xfdaf36.id == _0x3587c0 && _0xfdaf36.root_admin === true) {
              _0x252820 = _0xfdaf36.username;
              _0xc7fe0 = _0xfdaf36.id;
              let _0x9728aa = await fetch(domain + "/api/application/users/" + _0xc7fe0, {
                method: "DELETE",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + apikey
                }
              });
              if (!_0x9728aa.ok) {
                let _0x43273c = await _0x9728aa.json();
                return _0xc06c9e.reply("Gagal menghapus akun admin:\n" + JSON.stringify(_0x43273c.errors?.[0] || _0x43273c, null, 2));
              }
              break;
            }
          }
          if (_0xc7fe0 == null) {
            return _0xc06c9e.reply("Gagal menghapus akun!\nID admin tidak ditemukan atau bukan admin.");
          }
          await _0x44929d.sendMessage(_0xc06c9e.chat, {
            text: "✅ *Sukses menghapus akun admin panel*\nUsername: *" + func.capital(_0x252820) + "*"
          }, {
            quoted: _0xc06c9e
          });
        }
        break;
      case "game":
      case "menugame":
        {
          let _0x1c7d4a = "🎮 *MENU GAME - KlzBotz Game System*\n\n🧠 *Game Seru Pilihan*:\n1. .tebak → Tebak kata acak\n2. .math → Soal matematika\n3. .suit → Batu-Gunting-Kertas\n4. .tebakgambar → Tebak dari gambar\n5. .rate → Seberapa persen...?\n\nKetik nama command (contoh: *.math*) untuk bermain. Selamat bersenang-senang!\n";
          await _0x44929d.sendMessage(_0xc06c9e.chat, {
            text: _0x1c7d4a
          }, {
            quoted: _0xc06c9e
          });
        }
        break;
      case "tebak":
        {
          if (global.tebaktebakan[_0xc06c9e.sender]) {
            return _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "🕐 Kamu masih punya soal aktif!"
            });
          }
          let _0xd935a0 = JSON.parse(fs.readFileSync("./data/soal.json"));
          if (!Array.isArray(_0xd935a0) || _0xd935a0.length < 1) {
            return _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "❗ Soal tidak tersedia."
            });
          }
          let _0x42393b = _0xd935a0[Math.floor(Math.random() * _0xd935a0.length)];
          global.tebaktebakan[_0xc06c9e.sender] = {
            soal: _0x42393b.pertanyaan,
            jawaban: _0x42393b.jawaban.toLowerCase(),
            timeout: setTimeout(() => {
              _0x44929d.sendMessage(_0xc06c9e.chat, {
                text: "⏰ Waktu habis!\nJawaban: *" + _0x42393b.jawaban + "*"
              });
              delete global.tebaktebakan[_0xc06c9e.sender];
            }, 60000)
          };
          _0x44929d.sendMessage(_0xc06c9e.chat, {
            text: "🧠 *Tebak-Tebakan:*\n" + _0x42393b.pertanyaan
          });
          let _0x3845c6 = global.owner[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          _0x44929d.sendMessage(_0x3845c6, {
            text: "📨 *Soal Dikirim dari* wa.me/" + _0xc06c9e.sender.split("@")[0] + "\n\n❓ *" + _0x42393b.pertanyaan + "*\n✅ Jawaban: " + _0x42393b.jawaban
          });
        }
        break;
      case "clearserver":
        {
          if (!_0x286bbb) {
            return _0xc06c9e.reply(msg.owner);
          }
          await _0x44929d.sendMessage(_0xc06c9e.chat, {
            text: "⏳ Memproses penghapusan semua user & server panel yang *bukan admin*..."
          }, {
            quoted: _0xc06c9e
          });
          try {
            const _0x656637 = global.domain;
            const _0x2b8887 = global.apikey;
            const _0x4838c9 = {
              Authorization: "Bearer " + _0x2b8887,
              "Content-Type": "application/json",
              Accept: "application/json"
            };
            async function _0x534fb7() {
              try {
                const _0x22742b = await axios.get(_0x656637 + "/api/application/users", {
                  headers: _0x4838c9
                });
                return _0x22742b.data.data;
              } catch (_0x510a57) {
                await _0x44929d.sendMessage(_0xc06c9e.chat, {
                  text: "❌ Gagal mendapatkan user:\n" + JSON.stringify(_0x510a57.response?.data || _0x510a57.message, null, 2)
                }, {
                  quoted: _0xc06c9e
                });
                return [];
              }
            }
            async function _0x44b5eb() {
              try {
                const _0x3533f8 = await axios.get(_0x656637 + "/api/application/servers", {
                  headers: _0x4838c9
                });
                return _0x3533f8.data.data;
              } catch (_0x271612) {
                await _0x44929d.sendMessage(_0xc06c9e.chat, {
                  text: "❌ Gagal mendapatkan server:\n" + JSON.stringify(_0x271612.response?.data || _0x271612.message, null, 2)
                }, {
                  quoted: _0xc06c9e
                });
                return [];
              }
            }
            async function _0x4c8671(_0x19abca) {
              try {
                await axios.delete(_0x656637 + "/api/application/servers/" + _0x19abca, {
                  headers: _0x4838c9
                });
                console.log("✅ Server " + _0x19abca + " dihapus");
              } catch (_0x448abe) {
                console.error("❌ Gagal hapus server " + _0x19abca + ":", _0x448abe.response?.data || _0x448abe.message);
              }
            }
            async function _0x5acd36(_0xf35d2d) {
              try {
                await axios.delete(_0x656637 + "/api/application/users/" + _0xf35d2d, {
                  headers: _0x4838c9
                });
                console.log("✅ User " + _0xf35d2d + " dihapus");
              } catch (_0x2184ff) {
                console.error("❌ Gagal hapus user " + _0xf35d2d + ":", _0x2184ff.response?.data || _0x2184ff.message);
              }
            }
            async function _0x426efe() {
              const _0x2d8c2f = await _0x534fb7();
              const _0x37e9e3 = await _0x44b5eb();
              let _0x187136 = 0;
              let _0x564a20 = 0;
              for (const _0x4968f7 of _0x2d8c2f) {
                if (_0x4968f7.attributes.root_admin) {
                  console.log("⏭ Lewati admin: " + _0x4968f7.attributes.username);
                  continue;
                }
                const _0x1b32e4 = _0x4968f7.attributes.id;
                const _0x35d71b = _0x37e9e3.filter(_0x579203 => _0x579203.attributes.user === _0x1b32e4);
                for (const _0x49c821 of _0x35d71b) {
                  await _0x4c8671(_0x49c821.attributes.id);
                  _0x187136++;
                }
                await _0x5acd36(_0x1b32e4);
                _0x564a20++;
              }
              await _0x44929d.sendMessage(_0xc06c9e.chat, {
                text: "✅ *Penghapusan selesai!*\n\n🧑‍💻 User Dihapus: " + _0x564a20 + "\n📦 Server Dihapus: " + _0x187136 + "\n\nSemua user dan server non-admin berhasil dihapus."
              }, {
                quoted: _0xc06c9e
              });
            }
            return _0x426efe();
          } catch (_0x1478f3) {
            return _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "❌ Terjadi error:\n" + JSON.stringify(_0x1478f3, null, 2)
            }, {
              quoted: _0xc06c9e
            });
          }
        }
        break;
      case "cekkecepatan":
      case "uptime":
        {
          const _0x2a737d = require("os");
          const _0x2466cc = require("node-os-utils");
          const _0x10216a = require("performance-now");
          const _0x3fca29 = _0x59c1cc => {
            _0x59c1cc = Number(_0x59c1cc);
            const _0x3b3df7 = Math.floor(_0x59c1cc / 86400);
            const _0x205daa = Math.floor(_0x59c1cc % 86400 / 3600);
            const _0x3de955 = Math.floor(_0x59c1cc % 3600 / 60);
            const _0x25b93a = Math.floor(_0x59c1cc % 60);
            return _0x3b3df7 + "d " + _0x205daa + "h " + _0x3de955 + "m " + _0x25b93a + "s";
          };
          async function _0x1f6bca(_0x274790) {
            const _0x255753 = _0x10216a();
            const _0x1b9505 = await _0x2466cc.os.oos();
            const _0x426e8d = await _0x2466cc.drive.info();
            const _0x243212 = await _0x2466cc.mem.info();
            const _0x1c750c = (_0x243212.totalMemMb / 1024).toFixed(2);
            const _0x5dc69f = (_0x243212.usedMemMb / 1024).toFixed(2);
            const _0x2906b5 = (_0x243212.freeMemMb / 1024).toFixed(2);
            const _0x457945 = _0x2a737d.cpus().length;
            const _0x5ec1dd = _0x3fca29(_0x2a737d.uptime());
            const _0x8003b2 = _0x3fca29(process.uptime());
            const _0x31a6ef = (_0x10216a() - _0x255753).toFixed(3);
            const _0x5d1e78 = new Date();
            const _0x65965e = _0x5d1e78.toLocaleString("id-ID", {
              timeZone: "Asia/Jakarta",
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit"
            });
            const _0x269f99 = ("\n╭───〔  ⚙️ STATUS PANEL 〕───⟪\n│ 🖥️ OS      : " + _0x2466cc.os.type() + "\n│ 💾 RAM     : " + _0x5dc69f + "/" + _0x1c750c + " GB (used)\n│ 📂 Sisa RAM: " + _0x2906b5 + " GB\n│ 🗃️ Disk    : " + _0x426e8d.usedGb + "/" + _0x426e8d.totalGb + " GB\n│ 🧠 CPU     : " + _0x457945 + " Cores\n│ 🔄 Uptime  : " + _0x5ec1dd + "\n╰────────────────────────────⟫\n\n╭───〔 🤖 STATUS BOT 〕───⟪\n│ 🚀 Speed     : " + _0x31a6ef + " sec\n│ 🕒 Runtime   : " + _0x8003b2 + "\n│ 🧬 Arch      : " + _0x2a737d.arch() + "\n│ 🛠️ CPU       : " + _0x2a737d.cpus()[0].model + "\n│ 🏷️ Hostname  : " + _0x2a737d.hostname() + "\n│ 📆 Time Now  : " + _0x65965e + "\n╰────────────────────────────⟫\n        ").trim();
            return _0x44929d.sendMessage(_0x274790.chat, {
              text: _0x269f99
            }, {
              quoted: _0x274790
            });
          }
          return _0x1f6bca(_0xc06c9e);
        }
        break;
      case "math":
        {
          if (_0xc06c9e.isGroup && !isPublic && !_0x286bbb) {
            return _0xc06c9e.reply("Fitur ini hanya untuk owner atau saat mode publik aktif.");
          }
          const _0x442ddd = [{
            soal: "7 + 3",
            jawaban: "10"
          }, {
            soal: "12 - 4",
            jawaban: "8"
          }, {
            soal: "5 x 2",
            jawaban: "10"
          }, {
            soal: "20 ÷ 4",
            jawaban: "5"
          }, {
            soal: "8 + 6",
            jawaban: "14"
          }, {
            soal: "15 - 9",
            jawaban: "6"
          }, {
            soal: "3 x 4",
            jawaban: "12"
          }, {
            soal: "36 ÷ 6",
            jawaban: "6"
          }, {
            soal: "9 + 10",
            jawaban: "19"
          }, {
            soal: "100 - 99",
            jawaban: "1"
          }, {
            soal: "6 x 7",
            jawaban: "42"
          }, {
            soal: "49 ÷ 7",
            jawaban: "7"
          }, {
            soal: "11 + 22",
            jawaban: "33"
          }, {
            soal: "30 - 18",
            jawaban: "12"
          }, {
            soal: "9 x 5",
            jawaban: "45"
          }, {
            soal: "81 ÷ 9",
            jawaban: "9"
          }, {
            soal: "13 + 17",
            jawaban: "30"
          }, {
            soal: "27 - 8",
            jawaban: "19"
          }, {
            soal: "4 x 6",
            jawaban: "24"
          }, {
            soal: "64 ÷ 8",
            jawaban: "8"
          }, {
            soal: "25 + 30",
            jawaban: "55"
          }, {
            soal: "72 - 36",
            jawaban: "36"
          }, {
            soal: "8 x 8",
            jawaban: "64"
          }, {
            soal: "90 ÷ 10",
            jawaban: "9"
          }, {
            soal: "17 + 3",
            jawaban: "20"
          }, {
            soal: "99 - 33",
            jawaban: "66"
          }];
          let _0x143b85 = _0x442ddd[Math.floor(Math.random() * _0x442ddd.length)];
          global.math = global.math || {};
          global.math[_0xc06c9e.sender] = {
            jawaban: _0x143b85.jawaban,
            waktu: Date.now()
          };
          _0xc06c9e.reply("🧠 *Soal Matematika:*\n\n" + _0x143b85.soal + " = ?\n\n⏳ *Jawab dalam 30 detik!*");
        }
        break;
      case "suit":
        {
          if (!_0x3587c0) {
            return _0xc06c9e.reply("Ketik: *suit gunting*, *suit batu*, atau *suit kertas*");
          }
          let _0x6c8d67 = ["batu", "gunting", "kertas"];
          let _0x2eea70 = _0x6c8d67[Math.floor(Math.random() * _0x6c8d67.length)];
          let _0x52d8fa = _0x3587c0.toLowerCase();
          if (!_0x6c8d67.includes(_0x52d8fa)) {
            return _0xc06c9e.reply("Pilihan tidak valid! Ketik salah satu:\n*suit batu*, *suit gunting*, *suit kertas*");
          }
          let _0x32518b = "";
          if (_0x52d8fa === _0x2eea70) {
            _0x32518b = "🤝 Seri! Kita memilih yang sama.";
          } else if (_0x52d8fa === "batu" && _0x2eea70 === "gunting" || _0x52d8fa === "gunting" && _0x2eea70 === "kertas" || _0x52d8fa === "kertas" && _0x2eea70 === "batu") {
            _0x32518b = "🎉 Kamu menang!";
          } else {
            _0x32518b = "😢 Kamu kalah!";
          }
          _0xc06c9e.reply("🪨 *Suit Game!*\n\n*Pilihanmu:* " + _0x52d8fa + "\n*Pilihan bot:* " + _0x2eea70 + "\n\n📢 *Hasil:* " + _0x32518b);
        }
        break;
      case "tebakgambar":
        {
          if (global.tebakgambar && global.tebakgambar[_0xc06c9e.sender]) {
            return _0xc06c9e.reply("Kamu masih punya soal yang belum dijawab!");
          }
          _0xc06c9e.reply("🔍 Mengambil soal...");
          try {
            let _0x2d3e0a = await fetch("https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json");
            let _0xb0c202 = await _0x2d3e0a.json();
            let _0x5a1261 = _0xb0c202[Math.floor(Math.random() * _0xb0c202.length)];
            global.tebakgambar = global.tebakgambar || {};
            global.tebakgambar[_0xc06c9e.sender] = {
              jawaban: _0x5a1261.jawaban.toLowerCase(),
              waktu: Date.now()
            };
            await _0x44929d.sendMessage(_0xc06c9e.chat, {
              image: {
                url: _0x5a1261.img
              },
              caption: "🖼️ *Tebak Gambar!*\nJawab dalam 60 detik.\n\nKetik jawabanmu langsung di chat!"
            }, {
              quoted: _0xc06c9e
            });
          } catch (_0x3497a2) {
            console.error(_0x3497a2);
            _0xc06c9e.reply("❌ Gagal mengambil soal.");
          }
        }
        break;
      case "rate":
        {
          if (!_0x3587c0) {
            return _0xc06c9e.reply("Kirim pertanyaan atau topik yang ingin kamu *rate*.\nContoh: *rate aku ganteng nggak?*");
          }
          const _0x3e8866 = Math.floor(Math.random() * 101);
          let _0x4150b3 = "";
          if (_0x3e8866 >= 90) {
            _0x4150b3 = "🔥 Sempurna!";
          } else if (_0x3e8866 >= 75) {
            _0x4150b3 = "✨ Bagus banget!";
          } else if (_0x3e8866 >= 50) {
            _0x4150b3 = "😎 Lumayan lah.";
          } else if (_0x3e8866 >= 30) {
            _0x4150b3 = "😐 Biasa aja.";
          } else {
            _0x4150b3 = "😬 Hmm... bisa lebih baik.";
          }
          _0xc06c9e.reply("📊 *Rate untuk:* " + _0x3587c0 + "\n\n💯 *Nilai:* " + _0x3e8866 + "%\n🗣️ *Komentar:* " + _0x4150b3);
        }
        break;
      case "ssweb":
        {
          if (!_0x3587c0) {
            return _0xc06c9e.reply("Kirim URL website yang ingin di-screenshot.\nContoh: *.ssweb https://klzbotz.my.id*");
          }
          if (!/^https?:\/\//i.test(_0x3587c0)) {
            return _0xc06c9e.reply("URL harus diawali dengan http:// atau https://");
          }
          let _0xf07797 = "https://image.thum.io/get/fullpage/" + _0x3587c0;
          try {
            await _0x44929d.sendMessage(_0xc06c9e.chat, {
              image: {
                url: _0xf07797
              },
              caption: "🖼️ Sukses ss dari: " + _0x3587c0
            }, {
              quoted: _0xc06c9e
            });
          } catch (_0x12313c) {
            console.error(_0x12313c);
            _0xc06c9e.reply("❌ Gagal mengambil screenshot. Pastikan URL valid dan dapat diakses.");
          }
        }
        break;
      case "rvo":
      case "readviewonce":
        {
          if (!_0xc06c9e.quoted) {
            return _0x542b91("dengan reply pesannya");
          }
          const _0x4b52d4 = _0xc06c9e.quoted.fakeObj?.message;
          if (!_0x4b52d4) {
            return _0xc06c9e.reply("❌ Struktur pesan tidak ditemukan.");
          }
          const _0x1020fa = Object.keys(_0x4b52d4)[0];
          const _0x2a2f83 = _0x4b52d4[_0x1020fa];
          if (!_0x2a2f83?.viewOnce && _0xc06c9e.quoted.mtype !== "viewOnceMessageV2" && _0xc06c9e.quoted.mtype !== "viewOnceMessage") {
            return _0xc06c9e.reply("❌ Itu bukan pesan *view-once*!");
          }
          try {
            const _0x4dff7f = await downloadContentFromMessage(_0x2a2f83, _0x1020fa === "imageMessage" ? "image" : _0x1020fa === "videoMessage" ? "video" : "audio");
            let _0x1e281b = Buffer.from([]);
            for await (const _0x269446 of _0x4dff7f) {
              _0x1e281b = Buffer.concat([_0x1e281b, _0x269446]);
            }
            if (/video/.test(_0x1020fa)) {
              return _0x44929d.sendMessage(_0xc06c9e.chat, {
                video: _0x1e281b,
                caption: _0x2a2f83.caption || ""
              }, {
                quoted: _0xc06c9e
              });
            } else if (/image/.test(_0x1020fa)) {
              return _0x44929d.sendMessage(_0xc06c9e.chat, {
                image: _0x1e281b,
                caption: _0x2a2f83.caption || ""
              }, {
                quoted: _0xc06c9e
              });
            } else if (/audio/.test(_0x1020fa)) {
              return _0x44929d.sendMessage(_0xc06c9e.chat, {
                audio: _0x1e281b,
                mimetype: "audio/mpeg",
                ptt: true
              }, {
                quoted: _0xc06c9e
              });
            } else {
              return _0xc06c9e.reply("❌ Jenis media tidak didukung.");
            }
          } catch (_0x497f33) {
            console.error(_0x497f33);
            _0xc06c9e.reply("❌ Gagal mengambil media. Mungkin pesan sudah expired atau tidak valid.");
          }
        }
        break;
        const {
          TiktokStalk: _0x4cad49
        } = require("@tobyg74/tiktok-api-dl");
      case "stalktiktok":
      case "ttstalk":
        {
          if (!_0x3587c0) {
            return _0x542b91("usernamenya");
          }
          try {
            const _0x173905 = await _0x4cad49(_0x3587c0);
            if (_0x173905.status !== "success") {
              throw new Error(_0x173905.message);
            }
            const _0x2aae00 = _0x173905.result.users;
            const _0x2cf8a8 = _0x173905.result.stats;
            const _0x4ace5b = "👤 TikTok Stalk\n\n🔖 Username: @" + _0x2aae00.username + "\n📝 Nama: " + _0x2aae00.nickname + "\n👥 Followers: " + _0x2cf8a8.followerCount + "\n👣 Mengikuti: " + _0x2cf8a8.followingCount + "\n❤️ Likes: " + _0x2cf8a8.heartCount + "\n🎥 Video: " + _0x2cf8a8.videoCount + "\n🌐 Bio: " + (_0x2aae00.signature || "-") + "\n";
            await _0x44929d.sendMessage(_0xc06c9e.chat, {
              image: {
                url: _0x2aae00.avatar
              },
              caption: _0x4ace5b
            }, {
              quoted: _0xc06c9e
            });
          } catch (_0x3884b3) {
            console.error(_0x3884b3);
            _0xc06c9e.reply("❌ Gagal stalking TikTok. Pastikan username benar dan coba lagi.");
          }
        }
        break;
      case "ffstalk":
        {
          if (!_0x3587c0) {
            return _0x542b91("masukkan UID FF");
          }
          try {
            const _0x1d4dcf = await fetch("https://gocode.id/api/freefire/?id=" + _0x3587c0 + "&key=gocode-trial");
            const _0x280382 = await _0x1d4dcf.json();
            if (!_0x280382 || !_0x280382.nickname) {
              return _0xc06c9e.reply("❌ UID tidak ditemukan. Pastikan UID benar.");
            }
            const _0x22f72e = "🎮 *Free Fire Stalk*\n\n🔢 UID: " + _0x280382.id + "\n📝 Nickname: " + _0x280382.nickname + "\n🕒 Server Time: " + _0x280382.time_server;
            await _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: _0x22f72e
            }, {
              quoted: _0xc06c9e
            });
          } catch (_0x2b110d) {
            console.error(_0x2b110d);
            _0xc06c9e.reply("❌ Gagal menghubungi API Free Fire.");
          }
        }
        break;
      case "cekidch":
      case "idch":
        {
          if (!_0x3587c0) {
            return _0xc06c9e.reply("Contoh:\n.idch https://whatsapp.com/channel/XXXXXXXXXXXXXXX");
          }
          if (!_0x3587c0.includes("https://whatsapp.com/channel/")) {
            return _0xc06c9e.reply("❌ Link channel tidak valid.");
          }
          try {
            let _0x576656 = _0x3587c0.split("https://whatsapp.com/channel/")[1].trim();
            let _0x3c548d = await _0x44929d.newsletterMetadata("invite", _0x576656);
            let _0x4cab80 = "🆔 ID Channel: " + _0x3c548d.id + "\n📛 Nama       : " + _0x3c548d.name + "\n👥 Pengikut   : " + (_0x3c548d.subscribers?.toLocaleString() || 0);
            return _0xc06c9e.reply(_0x4cab80);
          } catch (_0x59cdea) {
            console.log(_0x59cdea);
            return _0xc06c9e.reply("⚠️ Gagal mengambil data channel. Pastikan link benar dan bot kamu support fitur channel.");
          }
        }
        break;
      case "listakses":
        {
          const _0x150d0a = require("fs");
          const _0xfb4df2 = "./data/premium.json";
          if (!_0x286bbb) {
            return _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "❌ Hanya owner yang bisa menggunakan perintah ini."
            }, {
              quoted: _0xc06c9e
            });
          }
          if (!_0x150d0a.existsSync(_0xfb4df2)) {
            return _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "❌ File data premium.json tidak ditemukan."
            }, {
              quoted: _0xc06c9e
            });
          }
          let _0x4fc2ca = JSON.parse(_0x150d0a.readFileSync(_0xfb4df2));
          if (!Array.isArray(_0x4fc2ca) || _0x4fc2ca.length < 1) {
            return _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "📭 Tidak ada grup reseller panel yang terdaftar."
            }, {
              quoted: _0xc06c9e
            });
          }
          let _0x2c5562 = await _0x44929d.groupFetchAllParticipating();
          let _0x32eda8 = "*📋 Daftar Akses Grup Reseller:*\n";
          for (let _0xb55c89 of _0x4fc2ca) {
            let _0xa1ac39 = _0x2c5562[_0xb55c89]?.subject || "Grup tidak ditemukan atau bot sudah keluar.";
            _0x32eda8 += "\n• ID: " + _0xb55c89 + "\n• Nama: " + _0xa1ac39 + "\n";
          }
          return _0x44929d.sendMessage(_0xc06c9e.chat, {
            text: _0x32eda8
          }, {
            quoted: _0xc06c9e
          });
        }
        break;
      case "addowner":
        {
          if (!_0x286bbb) {
            return _0xc06c9e.reply(msg.owner);
          }
          if (!_0x3587c0 && !_0xc06c9e.quoted && (!_0xc06c9e.mentionedJid || _0xc06c9e.mentionedJid.length === 0)) {
            return _0x542b91("6285XX atau @tag");
          }
          let _0x2527fb = "";
          if (_0xc06c9e.quoted) {
            _0x2527fb = _0xc06c9e.quoted.sender;
          } else if (_0xc06c9e.mentionedJid && _0xc06c9e.mentionedJid.length > 0) {
            _0x2527fb = _0xc06c9e.mentionedJid[0];
          } else if (_0x3587c0) {
            const _0x126986 = _0x3587c0.replace(/[^0-9]/g, "");
            if (!_0x126986) {
              return _0xc06c9e.reply("Format nomor tidak valid!");
            }
            _0x2527fb = _0x126986 + "@s.whatsapp.net";
          } else {
            return _0x542b91("6285XX atau @tag");
          }
          if (typeof _0x2527fb !== "string") {
            return _0xc06c9e.reply("Nomor tidak valid!");
          }
          if (!_0x2527fb.includes("@s.whatsapp.net")) {
            return _0xc06c9e.reply("Nomor harus dalam format WhatsApp JID (misal: 628xxx@s.whatsapp.net)");
          }
          if (ownplus.includes(_0x2527fb)) {
            return _0xc06c9e.reply("Nomor " + _0x2527fb.split("@")[0] + " sudah terdaftar sebagai owner!");
          }
          if (_0x2527fb === _0x1363ca) {
            return _0xc06c9e.reply("Nomor " + _0x2527fb.split("@")[0] + " sudah terdaftar sebagai owner!");
          }
          if (_0x2527fb.split("@")[0] === global.owner) {
            return _0xc06c9e.reply("Nomor " + _0x2527fb.split("@")[0] + " sudah terdaftar sebagai owner!");
          }
          ownplus.push(_0x2527fb);
          await fs.writeFileSync("./data/owner.json", JSON.stringify(ownplus, null, 2));
          return _0xc06c9e.reply("Sukses menjadikan " + _0x2527fb.split("@")[0] + " sebagai *owner*");
        }
        break;
      case "delowner":
        {
          if (!_0x286bbb) {
            return _0xc06c9e.reply(msg.owner);
          }
          if (!_0x3587c0 && !_0xc06c9e.quoted) {
            return _0x542b91("6285XX atau @tag");
          }
          if (_0x3587c0 === "all") {
            ownplus.length = 0;
            await fs.writeFileSync("../data/owner.json", JSON.stringify(ownplus, null, 2));
            return _0xc06c9e.reply("Berhasil menghapus semua owner ✅");
          }
          let _0x259813 = "";
          if (_0xc06c9e.quoted) {
            _0x259813 = _0xc06c9e.quoted.sender;
          } else if (_0xc06c9e.mentionedJid && _0xc06c9e.mentionedJid.length > 0) {
            _0x259813 = _0xc06c9e.mentionedJid[0];
          } else if (_0x3587c0) {
            const _0x3c8630 = _0x3587c0.replace(/[^0-9]/g, "");
            if (!_0x3c8630) {
              return _0xc06c9e.reply("Format nomor tidak valid!");
            }
            _0x259813 = _0x3c8630 + "@s.whatsapp.net";
          } else {
            return _0x542b91("6285XX atau @tag");
          }
          if (typeof _0x259813 !== "string") {
            return _0xc06c9e.reply("Nomor tidak valid!");
          }
          if (!_0x259813.includes("@s.whatsapp.net")) {
            return _0xc06c9e.reply("Nomor harus dalam format WhatsApp JID (misal: 628xxx@s.whatsapp.net)");
          }
          if (!ownplus.includes(_0x259813)) {
            return _0xc06c9e.reply("Nomor " + _0x259813.split("@")[0] + " tidak terdaftar sebagai owner!");
          }
          if (_0x259813 === _0x1363ca) {
            return _0xc06c9e.reply("Nomor " + _0x259813.split("@")[0] + " tidak bisa dihapus!");
          }
          if (_0x259813.split("@")[0] === global.owner) {
            return _0xc06c9e.reply("Nomor " + _0x259813.split("@")[0] + " adalah owner utama dan tidak bisa dihapus!");
          }
          const _0x63af2 = ownplus.indexOf(_0x259813);
          if (_0x63af2 !== -1) {
            ownplus.splice(_0x63af2, 1);
          }
          await fs.writeFileSync("./data/owner.json", JSON.stringify(ownplus, null, 2));
          return _0xc06c9e.reply("Sukses menghapus " + _0x259813.split("@")[0] + " sebagai *owner*");
        }
        break;
      case "listowner":
        {
          const _0x524c25 = require("fs");
          const _0x33c4b0 = require("path");
          const _0x3912b2 = _0x33c4b0.join(__dirname, "../data/owner.json");
          let _0x32fae8 = [];
          try {
            _0x32fae8 = JSON.parse(_0x524c25.readFileSync(_0x3912b2));
          } catch {
            _0x32fae8 = [];
          }
          let _0x49fe9b = "*Owner Utama:*\n@" + global.owner;
          if (_0x32fae8.length > 0) {
            _0x49fe9b += "\n\n*Owner Tambahan:*\n";
            for (let _0x5b48f7 of _0x32fae8) {
              _0x49fe9b += "@" + _0x5b48f7.split("@")[0] + "\n";
            }
          } else {
            _0x49fe9b += "\n\n_Tidak ada owner tambahan._";
          }
          await _0x44929d.sendMessage(_0xc06c9e.chat, {
            text: _0x49fe9b,
            mentions: [global.owner + "@s.whatsapp.net", ..._0x32fae8]
          }, {
            quoted: _0xc06c9e
          });
        }
        break;
      case "brat":
        {
          if (!_0x3587c0) {
            return _0x542b91("Hello World!");
          }
          const _0x23f201 = require("axios");
          const {
            Sticker: _0x3c4342
          } = require("wa-sticker-formatter");
          try {
            await _0x44929d.sendMessage(_0xc06c9e.chat, {
              react: {
                text: "✨",
                key: _0xc06c9e.key
              }
            });
            const _0x180906 = _0x3587c0.replace(_0x36624e, "").trim();
            if (!_0x180906) {
              return _0x542b91("Hello World!");
            }
            const _0x42fb3d = global.APIs.beta + "/api/maker/brat?text=" + encodeURIComponent(_0x180906) + "&apikey=" + global.beta;
            console.log("🌐 URL:", _0x42fb3d);
            const _0x361ed2 = await _0x23f201.get(_0x42fb3d, {
              responseType: "arraybuffer"
            });
            const _0x1f392f = _0x361ed2.data;
            const _0xc2bbd = new _0x3c4342(_0x1f392f, {
              pack: global.namaowner || "KlzBotz",
              author: "",
              type: "full",
              quality: 70
            });
            const _0x282bc1 = await _0xc2bbd.toBuffer();
            await _0x44929d.sendMessage(_0xc06c9e.chat, {
              react: {
                text: "🤩",
                key: _0xc06c9e.key
              }
            });
            await _0x44929d.sendMessage(_0xc06c9e.chat, {
              sticker: _0x282bc1
            }, {
              quoted: _0xc06c9e
            });
          } catch (_0x151dae) {
            console.error("❌ Error membuat stiker:\n", _0x151dae);
            await _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "❌ Gagal membuat stiker!\n\n" + _0x151dae.message
            }, {
              quoted: _0xc06c9e
            });
          }
        }
        break;
      case "qc":
        {
          if (!_0x3587c0) {
            return _0x542b91("Teksnya");
          }
          const _0xf625d3 = require("axios");
          const {
            Sticker: _0x1e36ff
          } = require("wa-sticker-formatter");
          let _0x3de36d = ["#000000", "#ff2414", "#22b4f2", "#eb13f2"];
          let _0x52e773;
          try {
            _0x52e773 = await _0x44929d.profilePictureUrl(_0xc06c9e.sender, "image");
          } catch (_0x4ab815) {
            _0x52e773 = "https://files.catbox.moe/gqs7oz.jpg";
          }
          let _0x37a468 = _0x3de36d[Math.floor(Math.random() * _0x3de36d.length)];
          const _0x209694 = {
            type: "quote",
            format: "png",
            backgroundColor: _0x37a468,
            width: 512,
            height: 768,
            scale: 2,
            messages: [{
              entities: [],
              avatar: true,
              from: {
                id: 1,
                name: _0xc06c9e.pushName,
                photo: {
                  url: _0x52e773
                }
              },
              text: _0x3587c0,
              replyMessage: {}
            }]
          };
          try {
            const _0xbba4a = await _0xf625d3.post("https://bot.lyo.su/quote/generate", _0x209694, {
              headers: {
                "Content-Type": "application/json"
              }
            });
            const _0x2abdfe = Buffer.from(_0xbba4a.data.result.image, "base64");
            const _0x1648bc = new _0x1e36ff(_0x2abdfe, {
              pack: global.packname || "KlzBotz",
              author: "",
              type: "full",
              quality: 70
            });
            const _0x382586 = await _0x1648bc.toBuffer();
            await _0x44929d.sendMessage(_0xc06c9e.chat, {
              sticker: _0x382586
            }, {
              quoted: _0xc06c9e
            });
          } catch (_0x56be2c) {
            console.error("❌ Gagal generate quote:\n", _0x56be2c);
            await _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "❌ Gagal membuat stiker QC\n\n" + _0x56be2c.message
            }, {
              quoted: _0xc06c9e
            });
          }
        }
        break;
      case "resetlink":
        {
          if (!_0xc06c9e.chat.endsWith("@g.us")) {
            return _0xc06c9e.reply("❌ Fitur ini hanya untuk grup.");
          }
          const _0x271d85 = await _0x44929d.groupMetadata(_0xc06c9e.chat);
          const _0x1ba3f9 = _0x271d85.participants;
          const _0x24f07b = _0x1ba3f9.filter(_0x29e3c8 => _0x29e3c8.admin !== null).map(_0x34d9cd => _0x34d9cd.id);
          const _0x17fdf9 = _0x24f07b.includes(_0xc06c9e.sender);
          if (!_0x17fdf9) {
            return _0xc06c9e.reply("❌ Hanya admin yang bisa reset link grup.");
          }
          try {
            await _0x44929d.groupRevokeInvite(_0xc06c9e.chat);
            const _0x2199ce = await _0x44929d.groupInviteCode(_0xc06c9e.chat);
            await _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: "✅ *Link grup berhasil direset!*\n\n🔗 https://chat.whatsapp.com/" + _0x2199ce
            }, {
              quoted: _0xc06c9e
            });
          } catch (_0x4bfbb8) {
            console.error("❌ Error reset link:", _0x4bfbb8);
            _0xc06c9e.reply("❌ Gagal mereset link grup.");
          }
        }
        break;
      case "tagall":
        {
          if (!_0xc06c9e.isGroup) {
            return _0xc06c9e.reply("❌ Fitur ini hanya untuk grup.");
          }
          const _0x554ee0 = await _0x44929d.groupMetadata(_0xc06c9e.chat);
          const _0x1192e1 = _0x554ee0.participants;
          const _0x151388 = _0x1192e1.filter(_0x431715 => _0x431715.admin !== null).map(_0x11bc23 => _0x11bc23.id);
          const _0x65fc31 = _0x151388.includes(_0xc06c9e.sender);
          if (!_0x65fc31) {
            return _0xc06c9e.reply("❌ Hanya admin yang bisa menggunakan perintah ini.");
          }
          const _0x202148 = _0x3587c0 || "Nothing";
          const _0x8e1fb2 = _0x1192e1.map(_0x59870c => _0x59870c.id);
          const _0xfbd68d = _0x8e1fb2.map(_0x5720a6 => "@" + _0x5720a6.split("@")[0]).join("\n");
          const _0xf38f1b = "⋙ *PESAN DARI ADMIN GROUP* ⋘\n\n*" + _0x202148 + "*\n\n" + _0xfbd68d + "\n___________________________________________";
          await _0x44929d.sendMessage(_0xc06c9e.chat, {
            text: _0xf38f1b,
            mentions: _0x8e1fb2
          }, {
            quoted: _0xc06c9e
          });
        }
        break;
      case "buatgc":
        {
          if (!_0x286bbb) {
            return _0xc06c9e.reply(msg.owner);
          }
          const _0x114ddc = _0x3587c0 || "";
          if (!_0x114ddc) {
            return _0xc06c9e.reply("Masukkan nama grup!\nContoh: *.buatgc* marketplace");
          }
          try {
            let _0x67b49 = await _0x44929d.groupCreate(_0x114ddc, []);
            const _0x16b3bf = "https://chat.whatsapp.com/" + (await _0x44929d.groupInviteCode(_0x67b49.id));
            let _0x3fe82f = ("\n*✅ Grup Berhasil Dibuat!*\n\n📛 *Nama:* " + _0x114ddc + "\n🔗 *Link:* " + _0x16b3bf + "\n        ").trim();
            return _0xc06c9e.reply(_0x3fe82f);
          } catch (_0xe85fcf) {
            console.error("❌ Gagal membuat grup:", _0xe85fcf);
            return _0xc06c9e.reply("❌ Gagal membuat grup. Mungkin akun bot dibatasi.");
          }
        }
        break;
      case "script":
      case "sc":
        {
          const _0x20c47b = "\n📂 *SCRIPT KLZBOTZ V1*\n\n📌 *Fitur Utama:*\n• 🧠 .brat — Buat stiker teks AI\n• 🔗 .tourl — Ubah media jadi URL\n• 👥 .buatgc — Buat grup otomatis\n• 🧾 .tagall — Tag semua member grup\n• 💬 .welcome — Sambutan otomatis\n• 📎 .resetlink — Dapat link undangan baru\n• 📸 .qc — Quote chat jadi gambar\n• ⚙️ .createpanel — Buat panel Pterodactyl otomatis\n• ⚙️ Mode self/public, antilink, dan fitur dasar lainnya\n\n📁 *Teknologi:*\n• Baileys MD\n• Struktur modular\n• Support pairing QR/kode\n• Bisa di-enkripsi pkg\n• No Enc \n\n💰 *Harga:* Rp25.000\n🛠️ *Support pemakaian & pemasangan awal*\n".trim();
          const _0x55180d = "https://files.catbox.moe/pk19h3.mp4";
          await _0x44929d.sendMessage(_0xc06c9e.chat, {
            video: {
              url: _0x55180d
            },
            caption: _0x20c47b
          }, {
            quoted: _0xc06c9e
          });
        }
        break;
      case "cekstatussc":
        {
          _0xc06c9e.reply("> Dev : @klzdev \n> Status sc : free");
        }
        break;
    }
    if (_0x286bbb && _0x1009a4) {
      if (_0x1009a4.startsWith("=>")) {
        try {
          let _0x1cb499 = await eval("(async () => { " + _0x3587c0 + " })()");
          await _0x44929d.sendMessage(_0xc06c9e.chat, {
            text: util.inspect(_0x1cb499)
          }, {
            quoted: _0xc06c9e
          });
        } catch (_0x27b50e) {
          await _0x44929d.sendMessage(_0xc06c9e.chat, {
            text: String(_0x27b50e)
          }, {
            quoted: _0xc06c9e
          });
        }
      } else if (_0x1009a4.startsWith(">")) {
        try {
          let _0x39b4e8 = await eval(_0x3587c0);
          await _0x44929d.sendMessage(_0xc06c9e.chat, {
            text: util.inspect(_0x39b4e8)
          }, {
            quoted: _0xc06c9e
          });
        } catch (_0x530e76) {
          await _0x44929d.sendMessage(_0xc06c9e.chat, {
            text: String(_0x530e76)
          }, {
            quoted: _0xc06c9e
          });
        }
      } else if (_0x1009a4.startsWith("$")) {
        const {
          exec: _0x34bab9
        } = require("child_process");
        _0x34bab9(_0x1009a4.slice(1), (_0xdc8763, _0x1cf91a, _0x217928) => {
          if (_0xdc8763) {
            return _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: String(_0xdc8763)
            }, {
              quoted: _0xc06c9e
            });
          }
          if (_0x1cf91a) {
            return _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: _0x1cf91a
            }, {
              quoted: _0xc06c9e
            });
          }
          if (_0x217928) {
            return _0x44929d.sendMessage(_0xc06c9e.chat, {
              text: _0x217928
            }, {
              quoted: _0xc06c9e
            });
          }
        });
      }
    }
  } catch (_0x494879) {
    console.error("Handler Error:", _0x494879);
    await _0x44929d.sendMessage(global.owner + "@s.whatsapp.net", {
      text: _0x494879.toString()
    }, {
      quoted: _0xc06c9e
    });
  }
};
const file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.greenBright("File updated:"), file);
  delete require.cache[file];
  require(file);
});