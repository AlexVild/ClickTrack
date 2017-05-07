'use strict'

angular.module('CTApp', [])
.controller('homeController', function($scope, $interval, $timeout){
    $scope.bpm = 120;
    $scope.perMeasure = 4;
    $scope.noteValues = [4, 8];
    $scope.noteValue = 4;
    $scope.playMet = false;
    var metPos = 0;
    var accent = new Audio('src/accent.wav');
    var beat = new Audio('src/beat.wav');

    var getMetTime = function(){
        if($scope.noteValue == 8){
            return ((60/$scope.bpm) * 1000) / 2;
        } else{
            return (60/$scope.bpm) * 1000;
        }
    }

    var playMetInterval = function(){
        if(metPos >= $scope.perMeasure) metPos = 0;
        if(metPos === 0){
            audioPlay(accent);
        } else{
            audioPlay(beat);
        }
        metPos++;
    };

    var audioPlay = function(clip){
        clip.pause();
        clip.currentTime = 0;
        clip.play();
    }
    var metSample = $interval(playMetInterval, getMetTime());

    $scope.toggleMet = function(){
        metPos = 0;
        $scope.playMet = !$scope.playMet;
    }

    $scope.stopMet = function(){
        $scope.playMet = false;
    }

    $scope.$watch('playMet', function(newV){
        if(newV === false){
            $interval.cancel(metSample);
        } else{
            playMetInterval();
            $timeout(function () {
                metSample = $interval(playMetInterval, getMetTime());
            }, getMetTime);
        }
    });
});
