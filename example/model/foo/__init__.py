# -*- coding: utf-8 -*-


from dp_tornado.engine.model import Model as dpModel


class FooModel(dpModel):
    def clear(self):
        dpModel.clear_cached(self.cache_decorator_memory, 10, 20, 30)
        dpModel.clear_cached(self.cache_decorator_local, 30, 20, 10)

    @dpModel.caching(10)
    def cache_decorator_memory(self, a, b, c):
        print('new', 'cache_decorator_memory')
        return a+b+c+self.helper.random.randint(0, 10**7)

    @dpModel.caching('foo.bar/memory', 10)
    def cache_decorator_local(self, a, b, c):
        print('new', 'cache_decorator_local')
        return a+b+c+self.helper.random.randint(0, 10**7)
