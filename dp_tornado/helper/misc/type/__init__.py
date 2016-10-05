# -*- coding: utf-8 -*-


from dp_tornado.engine.helper import Helper as dpHelper


class TypeHelper(dpHelper):
    @property
    def numeric(self):
        if self.helper.misc.system.py_version <= 2:
            return int, long
        else:
            return int,

    @property
    def string(self):
        if self.helper.misc.system.py_version <= 2:
            return basestring,
        else:
            return str,
