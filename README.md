# Screeps
My screeps AI code

If you want to play around with this feel free too ;)

Its not something im doing seriously. Just something im spending a little time on every now and then to think about game AI and efficiency as well as just for fun.

If you want to run this in webstorm or just use node to push this to the internet you will need grunt installed (find it on npm)

Also you will need to make a file in the same folder as this file called "Gruntfile.js" and paste the below contents with your details replaced

(Make sure if you use git you dont upload this file as others will be able to change how your creeps work e.g. make them all suicide)
--------------------
module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: 'your email here',
                password: 'your password here',
                branch: 'tier1',
                ptr: false
            },
            dist: {
                src: ['tier1/*.js']
            }
        }
    });
}
--------------------
