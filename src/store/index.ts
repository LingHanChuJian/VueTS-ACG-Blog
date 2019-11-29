import Vue from 'vue'
import Vuex from 'vuex'
import { Details, Modules } from '@/types/utils'

Vue.use(Vuex)

const modules: Modules = {}
const files: __WebpackModuleApi.RequireContext = require.context('.', false, /\.ts$/)

files.keys().forEach((key: string) => {
    if (key === './index.ts') { return }
    modules[key.replace(/(\.\/|\.ts)/g, '')] = files(key).default
})

export default new Vuex.Store({
    modules,
})
