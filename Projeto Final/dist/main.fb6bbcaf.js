// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"js/main.js":[function(require,module,exports) {
var wholeSeries = "https://api.themoviedb.org/3/tv/2316-the-office?api_key=ec6b96f04a4a808c5b1d5668e190c03c&language=pt-BR";
var urlCrew = "https://api.themoviedb.org/3/tv/2316-the-office/credits?api_key=ec6b96f04a4a808c5b1d5668e190c03c&language=pt-BR";
var urlSeasons = "https://api.themoviedb.org/3/tv/2316-the-office?api_key=ec6b96f04a4a808c5b1d5668e190c03c&/"; // home page

fetch(wholeSeries).then(function (res) {
  return res.json();
}).then(function (json) {
  return homePage(json);
});

function homePage(json) {
  var whereToAdd = document.querySelector('.row');
  var infos = json;
  var whatToAdd = "<div class=\"row featurette\">\n        <div class=\"col-md-7\">\n          <h2 class=\"featurette-heading\">".concat(infos.name, "<span class=\"text-muted\"></span></h2>\n          <h3>").concat(infos.vote_average, "</h3>\n          <p class=\"lead\">").concat(infos.overview, "</p>\n          <p>Primeira exibi\xE7\xE3o: ").concat(infos.first_air_date, "</p>\n        </div>\n        <div class=\"col-md-5\">\n          <img class=\"bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto\" width=\"500\" height=\"500\" src=\"http://image.tmdb.org/t/p/w185/").concat(infos.poster_path, "\">\n        </div>\n      </div> ");
  whereToAdd.insertAdjacentHTML('beforeend', whatToAdd);
  var check = new RegExp("d?");
  var inferno = document.getElementById('find');
  inferno.addEventListener('keyup', function () {
    var numberValue = document.querySelector('input#find').value;

    if (check.test(numberValue) == true) {
      inferno.value = '';
      seta = document.querySelector('.row');
      season_number = numberValue;
      urlGetEpisodes = "https://api.themoviedb.org/3/tv/2316/season/".concat(infos.seasons.season_number = numberValue, "?api_key=ec6b96f04a4a808c5b1d5668e190c03c&language=en-US");
      seta.innerHTML = '';
      fetch(urlGetEpisodes).then(function (res) {
        return res.json();
      }).then(function (json) {
        return showEpisodes(json, seta);
      });
    } else {
      console.log('entrou');
      var erro = "<div class=\"alert alert-warning\" role=\"alert\">\n      Epis\xF3dios Indispon\xEDveis\n      </div>";
      inferno.value = erro;
      inferno.insertAdjacentHTML('beforeend', whatToAdd);
    }
  });
}

var getSeasons = document.querySelectorAll('#seasons');
var getDetails = document.querySelectorAll('#details');
var getExtras = document.querySelectorAll('#extras');
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = getDetails[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var button = _step.value;
    button.addEventListener('click', function (e) {
      fetch(urlCrew).then(function (res) {
        return res.json();
      }).then(function (json) {
        return showCrew(json);
      });
    });
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return != null) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

function showCrew(json) {
  var crew = json.cast;
  var addCrew = document.querySelector('.row');
  document.querySelector('.row').innerHTML = '';
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = crew[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var character = _step2.value;
      var whatToAdd = "<div class=\"col-lg-4\" id=\"first\">\n\n        <img class=\"bd-placeholder-img rounded-circle\" width=\"140\" height=\"140\" src='http://image.tmdb.org/t/p/w185/".concat(character.profile_path, "'>\n        <h2>").concat(character.character, "</h2>\n        <p>").concat(character.name, "</p>\n\n        <p><a class=\"btn btn-secondary\" href=\"", "https://www.themoviedb.org/person/".concat(character.id, "?language=pt-BR"), "\" target=\"blank\" role=\"button\">View details &raquo;</a></p>\n    \n      </div><!-- /.col-lg-4 -->");
      addCrew.insertAdjacentHTML('beforeend', whatToAdd);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

var _iteratorNormalCompletion3 = true;
var _didIteratorError3 = false;
var _iteratorError3 = undefined;

try {
  for (var _iterator3 = getSeasons[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
    var buttonSeason = _step3.value;
    buttonSeason.addEventListener('click', function (e) {
      fetch(urlSeasons).then(function (res) {
        return res.json();
      }).then(function (json) {
        return showSeasons(json);
      });
    });
  }
} catch (err) {
  _didIteratorError3 = true;
  _iteratorError3 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
      _iterator3.return();
    }
  } finally {
    if (_didIteratorError3) {
      throw _iteratorError3;
    }
  }
}

function showSeasons(json) {
  document.querySelector('.row').innerHTML = '';
  var seasons = json.seasons;
  var addSeasons = document.querySelector('.row');
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    var _loop = function _loop() {
      var season = _step4.value;
      var whatToAdd = "<div class=\"row featurette\">\n      <div class=\"col-md-7\">\n        <h2 class=\"featurette-heading\">".concat(season.name, "<span class=\"text-muted\"></span></h2>\n        <p class=\"lead\">").concat(season.overview, "</p>\n      </div>\n      <div class=\"col-md-5\">\n        <img class=\"bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto\" width=\"500\" height=\"500\" src='http://image.tmdb.org/t/p/w185/").concat(season.poster_path, "'>\n      </div>\n      <h3 class=\"lead\">Epis\xF3dios</h3><i class=\"fas fa-angle-down\"></i>\n    </div>");

      if (season.name != "Specials") {
        addSeasons.insertAdjacentHTML('beforeend', whatToAdd);

        var _seta = addSeasons.lastChild.querySelector('h3');

        var icon = document.lastChild.querySelector('i');

        _seta.addEventListener('click', function () {
          var urlGetEpisodes = "https://api.themoviedb.org/3/tv/2316/season/".concat(season.season_number, "?api_key=ec6b96f04a4a808c5b1d5668e190c03c&language=en-US");
          fetch(urlGetEpisodes).then(function (res) {
            return res.json();
          }).then(function (json) {
            return showEpisodes(json, _seta);
          });
        });

        icon.addEventListener('click', function () {
          _seta.innerHTML = '<h3 class="lead">Episódios</h3>';
        });
      }
    };

    for (var _iterator4 = seasons[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }
}

function showEpisodes(json, seta) {
  var episodes = json.episodes;
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = episodes[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var episode = _step5.value;
      var whatToAdd = "<div>\n    <h2>".concat(episode.episode_number, ": ").concat(episode.name, "</h2>\n    <h5>Review: ").concat(episode.vote_average, "</h5>\n    <p>").concat(episode.overview, "</p>\n    </div>");
      seta.insertAdjacentHTML('beforeend', whatToAdd);
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }
}
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54494" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.map