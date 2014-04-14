'use strict';

angular.module('klickrApp')

  .filter('datetime', function () {
		return function(date) {
			var now = moment();
			var d = moment(date);

			// if today, show time
			if ( d.year() === now.year() && d.month() === now.month() && d.date() === now.date() ){
				return d.format('h:mm a');
			}
			// if this year, show month and day
			else if ( d.year() === now.year() ){
				return moment(date).format('MMM D');
			}
			// otherwise, show full date
			else {
				return moment(date).format('DD/MM/YY');
			}
		};
	})

	.filter('duration', function(){
		return function(ms){
			return moment.duration(ms).humanize();
		};
	});