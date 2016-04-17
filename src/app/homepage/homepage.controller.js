(function () {
    'use strict';

    angular
        .module('creative')
        .controller('HomepageController', HomepageController);

    /* @ngInject */
    function HomepageController($log) {
        var vm = this,
            NAME = 'HomepageController:';

        activate();

        function activate() {
            $log.debug(NAME, 'Init');
        }

        vm.animateMap = function () {

            jQuery(function ($) {

                pointsPosition();
                animateWork();

                function animateWork() {

                    $('.work > p').each(function () {
                        var val = parseInt($(this).html());

                        $(this).data('end', val);
                        $(this).html("0");
                        $(this).data('delay', parseInt(3000 / val));

                        if ($(this).hasClass('countries'))
                            startWorkAnimation(this, animatePoint);
                        else
                            startWorkAnimation(this);
                    });
                }

                function startWorkAnimation(elem, callback) {
                    var val = parseInt($(elem).html());
                    var end = parseInt($(elem).data('end'));

                    $(elem).html(val + 1);

                    if (typeof callback == "function")
                        callback();

                    if (val < end - 1)
                        setTimeout(function () {
                            startWorkAnimation(elem, callback);
                        }, $(elem).data('delay'));
                }

                function pointsPosition() {

                    $('.map-point').each(function () {
                        var left = parseInt($(this).attr('data-left')) - 35;
                        var top = parseInt($(this).attr('data-top')) + 92;

                        $(this).attr({
                            'data-left': left,
                            'data-top': top
                        });

                        $(this).css('left', left);
                    });
                }

                function animatePoint() {
                    var elem = $('.map-point:not(.active):last');
                    if (!elem)
                        return;

                    elem.addClass('active');
                    elem.css('top', parseInt(elem.attr('data-top')));
                }

            });
        };

        vm.animateSkills = function () {

            var speed = 1;
            var limit = 30;
            animateAll();

            function animateAll() {
                $('.hm-third-slide canvas').each(function () {

                    var points = [];
                    for (var i = 0; i < 2; i++) {
                        points.push({
                            x: Math.random() * $(this).width(),
                            y: Math.random() * $(this).height()
                        });
                    }

                    $(this).data('first-triangle', Math.random() > 0.5 ? 'left' : 'right');
                    $(this).data('second-triangle', Math.random() > 0.5 ? 'bottom' : 'top');
                    $(this)[0].width = $(this).width();
                    $(this)[0].height = $(this).height();

                    animateCanvas(this, points[1], points[0], distanceCalc(points[0], points[1], $(this).width(), $(this).height()));
                });
            }

            /**
             *
             * @param elem selector for canvas
             * @param nPoint next point position
             * @param point current point position
             * @param addPoint values for arithmetic operations
             */
            function animateCanvas(elem, nPoint, point, addPoint) {
                var width = $(elem).width();
                var height = $(elem).height();

                var ctx = $(elem)[0].getContext('2d');
                ctx.clearRect(0, 0, width, height);

                drawTriangles(elem, ctx, width, height, point);

                drawCircles(ctx, point);

                drawText(elem, ctx, point, width);

                // Point direction
                if (nPoint.x >= point.x - limit && nPoint.x <= point.x + limit
                    && nPoint.y >= point.y - limit && nPoint.y <= point.y + limit) {

                    nPoint = {
                        x: Math.random() * width,
                        y: Math.random() * height
                    };

                    addPoint = distanceCalc(point, nPoint, width, height);
                }

                point.x += addPoint.x;
                point.y += addPoint.y;

                setTimeout(function () {
                    animateCanvas(elem, nPoint, point, addPoint);
                }, 25);
            }

            function drawTriangles(elem, ctx, width, height, point) {
                ctx.beginPath();
                if ($(elem).data('second-triangle') == "top") {
                    ctx.moveTo(0, 0);
                    ctx.lineTo(width, 0);
                    ctx.lineTo(point.x, point.y);
                } else {
                    ctx.moveTo(0, height);
                    ctx.lineTo(width, height);
                    ctx.lineTo(point.x, point.y);
                }
                ctx.fillStyle = "#d4271b";
                ctx.fill();

                ctx.beginPath();
                if ($(elem).data('first-triangle') == "left") {
                    ctx.moveTo(0, 0);
                    ctx.lineTo(0, height);
                    ctx.lineTo(point.x, point.y);
                } else {
                    ctx.moveTo(width, 0);
                    ctx.lineTo(width, height);
                    ctx.lineTo(point.x, point.y);
                }
                ctx.fillStyle = "#e3372b";
                ctx.fill();
            }

            function drawCircles(ctx, point) {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 10, 0, 2 * Math.PI);
                ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
                ctx.fill();

                ctx.beginPath();
                ctx.arc(point.x, point.y, 10, 0, 2 * Math.PI);
                ctx.strokeStyle = "rgba(100, 100, 100, 0.05)";
                ctx.lineWidth = 3;
                ctx.setLineDash([]);
                ctx.stroke();
            }

            function drawText(elem, ctx, point, width) {
                // Text and underline
                ctx.setLineDash([1, 2]);
                ctx.lineWidth = 1;
                ctx.strokeStyle = "#fff";
                ctx.fillStyle = "#fff";
                ctx.font = "16px Arial";
                var text = $(elem).attr('data-text');

                if (point.x + 210 < width) {
                    ctx.beginPath();
                    ctx.moveTo(point.x + 13, point.y);
                    ctx.lineTo(point.x + 170, point.y);
                    ctx.stroke();
                    ctx.fillText(text, point.x + 170 - ctx.measureText(text).width, point.y - 5);
                } else {
                    ctx.beginPath();
                    ctx.moveTo(point.x - 13, point.y);
                    ctx.lineTo(point.x - 170, point.y);
                    ctx.stroke();
                    ctx.fillText(text, point.x - 170, point.y - 5);
                }
            }

            function distanceCalc(cPoint, nPoint, width, height) {
                return {
                    x: (nPoint.x - cPoint.x) / width * speed,
                    y: (nPoint.y - cPoint.y) / height * speed
                };
            }
        }
    }


})();

