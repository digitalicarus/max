/*global define:true,require:true,Backbone:true,$:true,_:true*/
require.config({
	paths: {
		'backbone': 'vendor/backbone-min',
		'underscore': 'vendor/underscore-min',
		'jquery': 'vendor/jquery-2.0.2.min'
	},
	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: function () {
				"use strict";
				return Backbone.noConflict();
			}
		},
		'underscore': {
			exports: function() {
				"use strict";
				return _.noConflict();
			}
		},
		'jquery': {
			exports: function() {
				"use strict";
				return $.noConflict();
			}
		}
	}
});

define('main', ['backbone', 'router'], function (BB, Router) {
	"use strict";
});

require(['main'], function (app) {
	"use strict";
});


