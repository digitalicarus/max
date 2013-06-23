/*global define:true,require:true,Backbone:true,$:true,_:true*/
require.config({
	paths: {
		backbone: 'vendor/backbone-min',
		underscore: 'vendor/underscore-min',
		jquery: 'vendor/jquery-2.0.2.min'
	},
	shim: {

		underscore: {
			init: function() {
				"use strict";
				return this._.noConflict();
			}
		},
		jquery: {
			init: function() {
				"use strict";
				return this.$.noConflict();
			}
		},
		backbone: {
			deps: ['underscore', 'jquery'],
			init: function () {
				"use strict";
				return this.Backbone.noConflict();
			}
		}
	}
});

require(['app'], function (app) {
	"use strict";
});


