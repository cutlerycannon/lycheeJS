
lychee.define('game.state.Menu').requires([
	'lychee.effect.Alpha',
	'lychee.effect.Position',
	'lychee.game.Background',
	'game.entity.lycheeJS',
	'game.ui.Button',
	'game.ui.Layer'
]).includes([
	'lychee.game.State'
]).exports(function(lychee, game, global, attachments) {

	var _blob = attachments["json"].buffer;


	var Class = function(main) {

		lychee.game.State.call(this, main);


		this.deserialize(_blob);
		this.reshape();

	};


	Class.prototype = {

		deserialize: function(blob) {

			lychee.game.State.prototype.deserialize.call(this, blob);


			var entity = null;
			var height = this.renderer.height;



			/*
			 * WELCOME LAYER
			 */

			entity = this.queryLayer('ui', 'welcome > newgame');
			entity.bind('touch', function() {
				this.main.changeState('game');
			}, this);

			entity = this.queryLayer('ui', 'welcome > highscore');
			entity.bind('touch', function() {
				this.main.changeState('highscore');
			}, this);

			entity = this.queryLayer('ui', 'welcome > settings');
			entity.bind('touch', function() {

				var height   = this.renderer.height;
				var welcome  = this.queryLayer('ui', 'welcome');
				var settings = this.queryLayer('ui', 'settings');

				if (welcome !== null && settings !== null) {

					settings.setPosition({
						y: -1 * height
					});

					settings.addEffect(new lychee.effect.Position({
						type:     lychee.effect.Position.TYPE.easeout,
						duration: 500,
						position: {
							y: 0
						}
					}));

					welcome.addEffect(new lychee.effect.Position({
						type:     lychee.effect.Position.TYPE.easeout,
						duration: 500,
						position: {
							y: 1 * height
						}
					}));

				}

			}, this);



			/*
			 * SETTINGS LAYER
			 */

			entity = this.queryLayer('ui', 'settings');
			entity.position.y = -1 * height;


			var isfullscreen = this.main.viewport.fullscreen === true;

			entity = this.queryLayer('ui', 'settings > fullscreen');
			entity.setLabel('Fullscreen ' + (isfullscreen ? 'On' : 'Off'));
			entity.setState((isfullscreen ? 'active' : 'default'));
			entity.bind('#touch', function(entity) {

				var viewport = this.main.viewport;
				var toggle   = !viewport.fullscreen;

				entity.setLabel('Fullscreen ' + (toggle ? 'On': 'Off'));
				entity.setState((toggle ? 'active' : 'default'));
				viewport.setFullscreen(toggle);

			}, this);


			var issound = this.main.jukebox.sound === true;

			entity = this.queryLayer('ui', 'settings > sound');
			entity.setLabel('Sound ' + (issound ? 'On' : 'Off'));
			entity.setState((issound ? 'active' : 'default'));
			entity.bind('#touch', function(entity) {

				var jukebox = this.main.jukebox;
				var toggle  = !jukebox.sound;

				entity.setLabel('Sound ' + (toggle ? 'On': 'Off'));
				entity.setState((toggle ? 'active' : 'default'));
				jukebox.setSound(toggle);

			}, this);


			var isdebug = lychee.debug === true;

			entity = this.queryLayer('ui', 'settings > debug');
			entity.setLabel('Debug ' + (isdebug ? 'On' : 'Off'));
			entity.setState((isdebug ? 'active' : 'default'));
			entity.bind('#touch', function(entity) {

				var toggle = !lychee.debug;

				entity.setLabel('Debug ' + (toggle ? 'On': 'Off'));
				entity.setState((toggle ? 'active' : 'default'));
				lychee.debug = toggle;

			}, this);


			entity = this.queryLayer('ui', 'settings > back');
			entity.bind('touch', function() {

				var height   = this.renderer.height;
				var welcome  = this.queryLayer('ui', 'welcome');
				var settings = this.queryLayer('ui', 'settings');

				if (welcome !== null && settings !== null) {

					welcome.setPosition({
						y: -1 * height
					});

					welcome.addEffect(new lychee.effect.Position({
						type:     lychee.effect.Position.TYPE.easeout,
						duration: 500,
						position: {
							y: 0
						}
					}));

					settings.addEffect(new lychee.effect.Position({
						type:     lychee.effect.Position.TYPE.easeout,
						duration: 500,
						position: {
							y: 1 * height
						}
					}));

				}

			}, this);

		},

		reshape: function(orientation, rotation) {

			var renderer = this.renderer;
			if (renderer !== null) {

				var entity = null;
				var width  = renderer.width;
				var height = renderer.height;


				entity = this.queryLayer('background', 'background');
				entity.width  = width;
				entity.height = height;

				entity = this.queryLayer('background', 'lycheeJS');
				entity.position.y = 1/2 * height - 32;

			}


			lychee.game.State.prototype.reshape.call(this, orientation, rotation);

		},

		enter: function(data) {

			lychee.game.State.prototype.enter.call(this);

		}

	};


	return Class;

});
