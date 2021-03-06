var sys = require('sys');
var fs = require('fs');
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
startRails(3000);

function puts(error, stdout, stderr) {sys.puts(stdout)}
function startRails(port) {
	var out = fs.openSync('./out_' + 'rails lamp app' + '.log', 'a');
	var err = fs.openSync('./out_' + 'rails lamp app' + '.log', 'a');
	console.log("Stopping and starting rail app");
    
    // Start up bundle install
    var child = spawn("ruby", ["~/RubyTest/bin/bundle", "install"], {
		detached: true,
		stdio: ['ignore', out, err]
	});
    
    // Run Puma
    	child = spawn("bundle", ["~/RubyTest/bin/exec", "puma", "-C", "config/puma.rb"], {//, "server -p " + port], {
		detached: true,
		stdio: ['ignore', out, err]
	});
    
    /*
		child = spawn("ruby", ["~/RubyTest/bin/rails", "server", "-p", port], {//, "server -p " + port], {
		detached: true,
		stdio: ['ignore', out, err]
	});
    */
    
    
	child.unref();
}