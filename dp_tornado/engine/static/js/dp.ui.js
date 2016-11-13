if (!dp) var dp = {};

dp.ui = {
    _initiated: false,
    init: function(obj) {
        if (!obj && dp.ui._initiated) return;
        dp.ui._initiated = true;
        dp.ui.element.init(obj);
    },
    util: {
        _alert_template: undefined,
        alert: function(a, b, c, d, e) {
            if (dp.ui.util._alert_template == undefined) {
                dp.ui.util._alert_template = dp_jqlib('<div />').addClass('dp4css-alert');
                dp.ui.util._alert_template.append(dp_jqlib('<div />').addClass('_bg'));

                var _box = dp_jqlib('<div />').addClass('_box');

                _box.append(dp_jqlib('<div />').addClass('_msg'));
                _box.append(dp_jqlib('<div />').addClass('_ico').text('!'));
                _box.append(dp_jqlib('<div />').addClass('_btn'));

                dp.ui.util._alert_template.append(_box);
            }

            var template = dp.ui.util._alert_template.clone();
            template.attr('id', 'uniqid-' + dp.helper.string.uniqid());

            var message = template.find('._msg');
            var button = template.find('._btn');
            var box = template.find('._box');

            var _msg = undefined;
            var _msg_html = undefined;
            var _buttons = [];

            if (typeof(a) == 'object' && !b && !c && !d && !e) {
                if (a.message && a.html) {
                    _msg_html = a.message;
                }
                else if (a.message) {
                    _msg = a.message;
                }

                if (a.buttons) {
                    for (var i in a.buttons) {
                        _buttons.push([a.buttons[i][0], a.buttons[i][1]]);
                    }
                }
            }
            else if (typeof(a) == 'string' && !b && !c && !d && !e) {
                _msg = a;

                if (b === null) {

                }
                else {
                    _buttons.push(['OK', undefined]);
                }
            }
            else if (typeof(a) == 'string' && typeof(b) == 'string' && !c && !d && !e) {
                _msg = a;
                _buttons.push([b, undefined]);
            }
            else if (typeof(a) == 'string' && typeof(b) == 'function' && !c && !d && !e) {
                _msg = a;
                _buttons.push(['OK', b]);
            }
            else if (typeof(a) == 'string' && typeof(b) == 'function' && typeof(c) == 'string' && !d && !e) {
                _msg = a;
                _buttons.push([c, b]);
            }
            else if (typeof(a) == 'string' && typeof(b) == 'function' && typeof(c) == 'function' && !d && !e) {
                _msg = a;
                _buttons.push(['OK', b]);
                _buttons.push(['Cancel', c]);
            }
            else if (typeof(a) == 'string' && typeof(b) == 'function' && typeof(c) == 'string' && typeof(d) == 'function' && !e) {
                _msg = a;
                _buttons.push([c, b]);
                _buttons.push(['Cancel', d]);
            }
            else if (typeof(a) == 'string' && typeof(b) == 'function' && typeof(c) == 'string' && typeof(d) == 'function' && typeof(e) == 'string') {
                _msg = a;
                _buttons.push([c, b]);
                _buttons.push([e, d]);
            }

            if (_msg_html) {
                message.html(_msg_html);
            }
            else if (_msg) {
                message.text(_msg);
                message.html(message.text().replace(/\n/gi, '<br />'));
            }

            var box_height = 0;
            var pongdang = 25;

            var _dismiss = function() {
                box.animate({
                    'margin-top': (((box_height / 2) + (pongdang * 2)) * -1) + 'px'
                }, 150, function() {
                    box.animate({
                        'margin-top': (((box_height / 2) - (pongdang * 6)) * -1) + 'px',
                        'opacity': 0
                    }, 150);

                    template.fadeTo(300, 0, function() {
                        template.remove();
                    });
                });
            };

            dp_jqlib(_buttons).each(function(k, e) {
                var btn = dp_jqlib('<button />');
                btn.addClass('_i-' + k);
                btn.text(e[0]);
                btn.click(function() {
                    if (e[1] && typeof(e[1]) == 'function') {
                        e[1](template);
                    }

                    _dismiss();
                });

                button.append(btn);
            });

            dp_jqlib('body').append(template);

            box_height = box.height();

            template.fadeTo(0, 0.001);
            box.fadeTo(0, 0.001);
            box.css('margin-top', (((box_height / 2) + (pongdang * 10)) * -1) + 'px');

            template.fadeTo(200, 1.0);
            box.delay(50).animate({
                'margin-top': (((box_height / 2) - pongdang) * -1) + 'px',
                'opacity': 1.0
            }, 200, function() {
                box.animate({
                    'margin-top': ((box_height / 2 + (pongdang / 2)) * -1) + 'px'
                }, 140, function() {
                    box.animate({
                        'margin-top': ((box_height / 2) * -1) + 'px'
                    }, 140);
                });
            });

            return template;
        },
        noti: function(a, b, c, d) {
            alert('not implemented yet.');
        }
    },
    element: {
        init: function(obj) {
            dp.ui.element.input.delegate.on_return(obj);
            dp.ui.element.input.delegate.on_focus(obj);
        },
        input: {
            delegate: {
                on_return: function(obj) {
                    if (!obj) obj = dp_jqlib('body');
                    obj.find('input[dp-on-return][dp-on-return-installed!=yes]').each(function() {
                        var _id = dp_jqlib(this).attr('id') || 'uniqid-' + dp.helper.string.uniqid();

                        dp_jqlib(this).attr('id', _id);
                        dp_jqlib(this).attr('dp-on-return-installed', 'yes');

                        dp_jqlib(this).keypress(function(e) {
                            if (dp_jqlib(this).attr('dp-on-return-busy') == 'yes') {
                                return;
                            }

                            if (e.keyCode == 13) {
                                dp_jqlib(this).attr('dp-on-return-busy', 'yes');
                                setTimeout(dp_jqlib(this).attr('dp-on-return'), 0);
                                setTimeout("dp_jqlib('#" + _id + "').attr('dp-on-return-busy', 'no');", 150);

                                e.preventDefault();
                            }
                        });
                    });
                },
                on_focus: function(obj) {
                    if (!obj) obj = dp_jqlib('body');
                    obj.find('input[dp-on-focus][dp-on-focus-installed!=yes]').each(function() {
                        var _id = dp_jqlib(this).attr('id') || 'uniqid-' + dp.helper.string.uniqid();

                        dp_jqlib(this).attr('id', _id);
                        dp_jqlib(this).attr('dp-on-focus-installed', 'yes');

                        dp_jqlib(this).focus(function(e) {
                            setTimeout(dp_jqlib(this).attr('dp-on-focus'), 0);
                        });
                    });
                }
            }
        }
    }
};

dp_init(function() {
    dp.init();
});